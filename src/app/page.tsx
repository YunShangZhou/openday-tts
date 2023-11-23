"use client";
import { getCovertSpeechUrl } from "@/service";
import { getAudioUrl } from "@/utils";
import Image from "next/image";
import { useEffect, useReducer, useRef, useState } from "react";

const roleMap = [
  {
    name: "Tom",
  },
  {
    name: "Sandy",
  },
  {
    name: "Allen",
  },
];

export default function Home() {
  const [role, setRole] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);

  const [audioUrl, setAudioUrl] = useState<string>("");
  const [b64Data, setB64Data] = useState<any>("");

  const recorderInstance = useRef<any>();

  // fetchSpeech(role, b64Data);
  // const { data } = useSWR([ ] , ([])=> fetcher())

  useEffect(() => {
    getAudioUrl(recorderInstance, setAudioUrl, setB64Data);
  }, []);

  useEffect(() => {
    if (!recording) {
      fetchSpeech();
    }
  }, [b64Data]);

  const fetchSpeech = async () => {
    const params = {
      tags: {
        ["voice.speaker"]: "",
      },
      speech: b64Data,
      appkey: "crowdsourcing-vc",
      avatar_id: "default",
      inputs: ["speech"],
      outputs: ["speech"],
    };
    params.tags["voice.speaker"] = "yucangyuan" || role;

    const res = await getCovertSpeechUrl(params);
    console.log(`>>> res`, res);

    // setAudioUrl(res.data.url)
  };

  const handleClick = () => {};
  const handleRoleToggle = (name: string) => {
    console.log(`>>> role name`, name);
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
        {roleMap.map((item, index) => {
          return (
            <div
              key={index}
              className="p-4 border border-black cursor-pointer hover:bg-gray-200"
              onClick={() => handleRoleToggle(item.name)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 items-center justify-center w-full">
        <audio className="flex-1" controls src={audioUrl} />
        <div className="flex gap-2 items-center justify-center">
          <button disabled={recording} onClick={handleRecord}>
            录音
          </button>
          <button disabled={!recording} onClick={handleStop}>
            完成
          </button>
          <div className="flex gap-4 items-center justify-center color:red">
            <span>状态:</span>
            {recording ? <span>录音中...</span> : <span>🤚停止</span>}
          </div>
        </div>
      </div>
    </main>
  );
}
