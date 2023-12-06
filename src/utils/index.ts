export function getAudioUrl(
  recorderInstance: any,
  onSetUrl: (url: string) => void,
  onSetBase64: (data: any) => void,
  onStart?: () => void
) {
  if (navigator?.mediaDevices?.getUserMedia) {
    console.log("getUserMedia supported.");
    const constraints = { audio: true };
    let chunks: any[] = [];

    const onSuccess = function (stream: any) {
      recorderInstance.current = new MediaRecorder(stream);
      // ability: 生成可视化音频
      visualize(stream);

      if (onStart) {
        onStart();
        recorderInstance.current.start();
      }

      // onstop
      recorderInstance.current.onstop = function (e: any) {
        const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
        console.log(`>>>> blob`, blob);
        blobToBase64(blob).then((res) => {
          onSetBase64(res);
        });

        const url = window.URL.createObjectURL(blob);
        // console.log(`>>>>> origin radio url`, url);
        onSetUrl(url);

        chunks = [];
      };

      // ondataavailable
      recorderInstance.current.ondataavailable = function (e: any) {
        chunks.push(e.data);
      };
    };

    const onError = function (err: string) {
      console.log("The following error occured: " + err);
    };

    navigator?.mediaDevices
      ?.getUserMedia?.(constraints)
      .then(onSuccess, onError);
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
}

export async function blobToBase64(blobData: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // notice: 需要过滤掉前缀，否则不视为有效b64编码。
      // const mockData = ["data:audio/wav; codecs=opus;base64", "纯b64编码"];
      const base64Data = (reader?.result as any)?.split?.(",")?.[1];

      resolve(base64Data);
    };
    reader.readAsDataURL(blobData);
  });
}

export const base64ToURL = (base64: string) => {
  const binaryStr = atob(base64);
  const buffer = new ArrayBuffer(binaryStr.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binaryStr.length; i++) {
    view[i] = binaryStr.charCodeAt(i);
  }
  const blob = new Blob([view], { type: "audio/mp3" });
  const url = URL.createObjectURL(blob);

  return url;
};

// 声谱可视化
export const visualize = (stream: any) => {
  let audioCtx;

  const canvas: HTMLCanvasElement | null =
    document.querySelector("#visualizer");
  if (!canvas) {
    console.error("Not match relatived canvas dom!");
    return;
  }

  const canvasCtx = canvas.getContext("2d");

  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  const source = audioCtx.createMediaStreamSource(stream);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  //analyser.connect(audioCtx.destination);

  draw();

  function draw() {
    const WIDTH = canvas!.width;
    const HEIGHT = canvas!.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    // 设置canvas背景颜色为透明
    canvasCtx!.clearRect(0, 0, WIDTH, HEIGHT);

    canvasCtx!.lineWidth = 1;
    canvasCtx!.strokeStyle = "rgba(255,255,255,0.5)";

    canvasCtx!.beginPath();

    let sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = (v * HEIGHT) / 2;
      if (i === 0) {
        canvasCtx!.moveTo(x, y);
      } else {
        canvasCtx!.lineTo(x, y);
      }
      x += sliceWidth;
    }

    canvasCtx!.lineTo(canvas!.width, canvas!.height / 2);
    canvasCtx!.stroke();
  }
};
