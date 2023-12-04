"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import noticeSvg from "@/assets/svg/notice.svg";
import voiceGraphImg from "@/assets/image/voice-graph.png";

import styles from "./index.module.scss";
import classnames from "classnames/bind";
import { roleData } from "@/constant";
import { useEffect, useRef, useState } from "react";
import { base64ToURL, getAudioUrl } from "@/utils";
import { getCovertSpeechUrl } from "@/services";
const cx = classnames.bind(styles);

const TOTAL_TIME = 60;
const PER_FRAME = 60;

const Home: React.FC = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as string;

  const [currentFrame, setCurrentFrame] = useState<number>(
    TOTAL_TIME * PER_FRAME
  ); // 倒计时 * 每秒帧数
  const timer = useRef<any>(null);
  const [recording, setRecording] = useState<boolean>(false);

  const [audioUrl, setAudioUrl] = useState<string>("");
  const [b64Data, setB64Data] = useState<any>("");

  const recorderInstance = useRef<any>(null);

  useEffect(() => {
    console.log(`>>> audioUrl`, audioUrl);
  }, [audioUrl]);

  useEffect(() => {
    getAudioUrl(recorderInstance, setAudioUrl, setB64Data);
  }, []);

  useEffect(() => {
    if (recorderInstance.current !== null && !recording) {
      console.log("开始录制...");
      console.log(`recorderInstance.current`, recorderInstance.current);
      recorderInstance.current.start();
      setRecording(true);
    }
  }, [recorderInstance.current]);

  useEffect(() => {
    console.log("111");
    if (!recording && !!b64Data) {
      console.log("222");
      fetchSpeech();
    }
  }, [b64Data]);

  useEffect(() => {
    if (timer.current === null) {
      timer.current = setInterval(() => {
        setCurrentFrame((prev) => prev - 1);
      }, 1000 * (1 / 60)); // 以60帧/s方式渲染
    }
    if (currentFrame === 0) {
      clearInterval(timer.current);
    }
  }, [currentFrame]);

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
    console.log(`>>>>> res`, res);
    if (res) {
      const { speech } = res;
      const url: string = base64ToURL(speech);
      setAudioUrl(url);
    }
  };

  const handleReset = () => {
    setCurrentFrame(TOTAL_TIME * PER_FRAME);
    setAudioUrl("");
  };

  const handleFetch = () => {
    console.log(`>>> 过年`);
    recorderInstance.current.stop();
    setRecording(false);
  };

  return (
    <div className={cx("speech-covert")}>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <div className={cx("title-wrap")}>
            <Image
              className={cx("prefix")}
              src={roleData[role].avatar}
              width={80}
              height={80}
              alt=""
            />
            <div className={cx("text")}>新岁书笺</div>
          </div>
          <div className={cx("tip")}>
            请用心朗读以下内容，并在最后大声说出你的祝福哦～
          </div>
        </div>
        <div className={cx("body")}>
          <div className={cx("desc-wrap")}>
            <span className={cx("text")}>
              不知何故，总觉得今日比去岁冷了不少。入冬后下过几场大雪，汴京大半都裹上了新雪。
            </span>
            <br />
            <span className={cx("text")}>
              {roleData[role].realName || roleData[role].name}
              祝在座的各位，在新的一年里____________！
            </span>
          </div>
          <div className={cx("recorder-wrap")}>
            <Image
              className={cx("voice-graph")}
              src={voiceGraphImg.src}
              alt=""
              width={840}
              height={200}
            />
            <div className={cx("progress-wrap")}>
              {audioUrl === "" && (
                <div className={cx("progress")}>
                  <div
                    className={cx("progress-inner")}
                    style={{
                      width: `${
                        (currentFrame * 100) / (TOTAL_TIME * PER_FRAME)
                      }%`,
                    }}
                  />
                </div>
              )}
              {audioUrl && <audio className="flex-1" controls src={audioUrl} />}
              <span className={cx("text")}>{`祝福语音计时 ${Math.ceil(
                currentFrame / PER_FRAME
              )}s`}</span>
            </div>
          </div>
          <div className={cx("btns-wrap")}>
            {audioUrl === "" && (
              <button
                className={cx("btn", "complete-btn")}
                onClick={handleFetch}
              >
                {recording ? "完成" : "开始"}
              </button>
            )}
            {(currentFrame === 0 || audioUrl) && (
              <button className={cx("btn", "reset-btn")} onClick={handleReset}>
                重新录制
              </button>
            )}
          </div>
        </div>
        <div className={cx("footer")}>
          <div className={cx("text-wrap")}>
            <Image
              className={cx("prefix")}
              src={noticeSvg.src}
              alt=""
              width={24}
              height={24}
            />
            <span>
              以上声音为模仿音色，非声优本人，且仅供内部展示，不做任何商业用途
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
