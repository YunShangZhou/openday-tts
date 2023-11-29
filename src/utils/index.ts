export function getAudioUrl(
  recorderInstance: any,
  onSetUrl: (url: string) => void,
  onSetBase64: (data: any) => void
) {
  if (navigator?.mediaDevices?.getUserMedia) {
    console.log("getUserMedia supported.");
    const constraints = { audio: true };
    let chunks: any[] = [];

    const onSuccess = function (stream: any) {
      recorderInstance.current = new MediaRecorder(stream);
      // ability: 生成可视化音频
      // visualize(stream);

      // onstop
      recorderInstance.current.onstop = function (e: any) {
        const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });

        blobToBase64(blob).then((res) => {
          onSetBase64(res);
        });

        const url = window.URL.createObjectURL(blob);
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

    navigator?.mediaDevices?.getUserMedia?.(constraints).then(onSuccess, onError);
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
