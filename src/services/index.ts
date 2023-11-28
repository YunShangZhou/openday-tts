const prefix = "";

export const getCovertSpeechUrl = (params: any) => {
  return fetch(`${prefix}/tts`, {
    method: "POST",
    body: JSON.stringify(params),
  }).then((r) => r.json());
};
