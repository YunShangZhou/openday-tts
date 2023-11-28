"use client";
import { roleNameMap } from "@/constant";
import { getCovertSpeechUrl } from "@/services";
import { base64ToURL, blobToBase64, getAudioUrl } from "@/utils";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [role, setRole] = useState<string>("xunmengchu");
  const [recording, setRecording] = useState<boolean>(false);

  const [audioUrl, setAudioUrl] = useState<string>("");
  const [b64Data, setB64Data] = useState<any>("");

  const recorderInstance = useRef<any>();

  useEffect(() => {
    getAudioUrl(recorderInstance, setAudioUrl, setB64Data);
  }, []);

  useEffect(() => {
    if (!recording && !!b64Data) {
      fetchSpeech();
    }
  }, [b64Data]);

  const fetchSpeech = async () => {
    const params = {
      // speech,
      speech: b64Data,
      tags: { "voice.speaker": role },
      appkey: "crowdsourcing-vc",
      avatar_id: "default",
      inputs: ["speech"],
      outputs: ["speech"],
    };

    const res = await getCovertSpeechUrl(params);
    if (res) {
      const { speech } = res;
      const url: string = base64ToURL(speech);
      setAudioUrl(url);
    }
  };

  const handleRoleToggle = (name: string) => {
    setRole(name);
  };

  const handleRecord = () => {
    // TODO: 录音逻辑
    // start();
    recorderInstance.current.start();
    setRecording(true);
  };

  const handleStop = async () => {
    recorderInstance.current.stop();
    setRecording(false);
  };

  return (
    <main className="min-h-screen w-3/5 flex flex-col justify-center items-center my-0 mx-auto">
      <div className="flex justify-between w-full mb-4">
        {roleNameMap.map(([en, cn], index) => {
          return (
            <div
              key={index}
              className={`p-4 border border-black cursor-pointer hover:bg-gray-200 ${
                index === activeIndex && "bg-red-200"
              }`}
              onClick={() => {
                setActiveIndex(index);
                handleRoleToggle(en);
              }}
            >
              {cn}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 items-center justify-center w-full">
        {recording ? (
          <div style={{ width: "400px", borderRight: "1px solid black" }}>
            录音中...
          </div>
        ) : (
          <audio className="flex-1" controls src={audioUrl} />
        )}
        <div className="flex gap-2 items-center justify-center">
          {recording ? (
            <button onClick={handleStop}>完成</button>
          ) : (
            <button onClick={handleRecord}>录音</button>
          )}
        </div>
      </div>
    </main>
  );
}
