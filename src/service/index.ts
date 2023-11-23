const prefix = "";

export const getCovertSpeechUrl = (params: any) => {
  return fetch(`${prefix}/tts`, {
    method: "post",
    body: JSON.stringify(params),
  }).then((r) => r.json());
};
