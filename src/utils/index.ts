export function getAudioUrl(
  recorderInstance: any,
  onSetUrl: (url: string) => void,
  onSetBlobData: (data: any) => void
) {
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    const constraints = { audio: true };
    let chunks: any[] = [];

    const onSuccess = function (stream: any) {
      recorderInstance.current = new MediaRecorder(stream);
      // ability: 生成可视化音频
      // visualize(stream);

      // onstop
      recorderInstance.current.onstop = function (e: any) {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        console.log(`>>>>> blob`, blob);

        blobToBase64(blob).then((res) => {
          console.log(`>>> res`, res);
          onSetBlobData(res);
        });
        const url = window.URL.createObjectURL(blob);
        onSetUrl(url);

        chunks = [];
      };

      // ondataavailable
      recorderInstance.current.ondataavailable = function (e: any) {
        chunks.push(e.data);
        console.log(`>>>> final chunks`, chunks);
      };
    };

    const onError = function (err: string) {
      console.log("The following error occured: " + err);
    };

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
}

export function blobToBase64(blobData: Blob) {
  return new Promise((resolve, reject) => {
    // 假设有一个 Blob 对象
    let blob = new Blob([blobData], { type: "text/plain" });

    // 创建一个 FileReader 对象
    let reader = new FileReader();

    // 监听 FileReader 的 onload 事件
    reader.onload = function (event) {
      // 获取 Base64 编码的数据
      let base64 = event.target.result;
      // console.log(base64);
      resolve(base64);
    };

    // 读取 Blob 对象为 Data URL
    reader.readAsDataURL(blob);
  });
}
