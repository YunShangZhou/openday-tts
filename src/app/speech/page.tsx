"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import badgeSvg from "@/assets/svg/badge.svg";
import starSvg from "@/assets/svg/star.svg";
import noticeSvg from "@/assets/svg/notice.svg";

import styles from "./index.module.scss";
import classnames from "classnames/bind";
import { PER_FRAME, TOTAL_TIME, roleData } from "@/constant";
import { useEffect, useRef, useState } from "react";
import { base64ToURL, getAudioUrl } from "@/utils";
import { getCovertSpeechUrl } from "@/services";
import Link from "next/link";
const cx = classnames.bind(styles);

interface SpeechCovertProp {
  onSetAudioUrl: (url: string) => void;
}

interface SpeechPlayProp {
  audioUrl: string;
}

const SpeechCovert: React.FC<SpeechCovertProp> = (prop) => {
  const { onSetAudioUrl } = prop;

  const searchParams = useSearchParams();
  const role = searchParams.get("role") as string;

  const [currentFrame, setCurrentFrame] = useState<number>(
    TOTAL_TIME * PER_FRAME
  ); // 倒计时 * 每秒帧数
  const timer = useRef<any>(null);
  const [recording, setRecording] = useState<boolean>(false);

  const [_, setAudioUrl] = useState<string>(""); // notice: 原录音暂无使用，但保留变量
  const [b64Data, setB64Data] = useState<any>("");

  const recorderInstance = useRef<any>(null);

  useEffect(() => {
    getAudioUrl(recorderInstance, setAudioUrl, setB64Data, () => {
      setRecording(true);
    });
  }, []);

  useEffect(() => {
    if (!recording && !!b64Data) {
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
    if (res) {
      const { speech } = res;
      const url: string = base64ToURL(speech);
      onSetAudioUrl(url);
    }
  };

  // const handleReset = () => {
  //   setCurrentFrame(TOTAL_TIME * PER_FRAME);
  //   onSetAudioUrl("");
  //   setRecording(true);
  //   recorderInstance.current.start();
  // };

  const handleFetch = () => {
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
              {roleData?.[role]?.realName || roleData[role].name}
              祝在座的各位，在新的一年里____________！
            </span>
          </div>
          <div className={cx("recorder-wrap")}>
            <canvas
              id="visualizer"
              className={cx("visualizer")}
              height="168"
              width="840"
            ></canvas>
            <div className={cx("progress-wrap")}>
              {/* {audioUrl === "" && (
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
              )} */}
              {/* {audioUrl && <audio className="flex-1" controls src={audioUrl} />} */}
              {/* <span className={cx("text")}>{`祝福语音计时 ${Math.ceil(
                currentFrame / PER_FRAME
              )}s`}</span> */}
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
              <span className={cx("text")}>祝福语音计时</span>
            </div>
          </div>
          <div className={cx("btns-wrap")}>
            {/* {audioUrl === "" && (
              <button
                className={cx("btn", "complete-btn")}
                onClick={() => {
                  handleFetch();
                }}
              >
                完成
              </button>
            )} */}
            {/* {(currentFrame === 0 || audioUrl) && (
              <button className={cx("btn", "reset-btn")} onClick={handleReset}>
                重新录制
              </button>
            )} */}
            <button
              className={cx("btn", "complete-btn")}
              onClick={() => {
                handleFetch();
              }}
            >
              完成
            </button>
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

const SpeechPlay: React.FC<SpeechPlayProp> = (prop) => {
  const { audioUrl } = prop;
  const role = "maomao";
  return (
    <div className={cx("speech-play")}>
      <div className={cx("center-card")}>
        <Image
          className={cx("badge")}
          src={badgeSvg}
          alt=""
          width={203}
          height={203}
        />
        <div className={cx("header")}>
          <div className={cx("title-wrap")}>
            <Image
              className={cx("prefix")}
              src={starSvg}
              alt=""
              width={53}
              height={53}
            />
            <span className={cx("text")}>新岁书笺</span>
          </div>
          <div className={cx("slogan-list")}>
            <div className={cx("item")}>
              <span className={cx("text")}>GAME FOR OPEN DAY</span>
              <Image
                className={cx("suffix")}
                src={starSvg}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className={cx("item")}>
              <span className={cx("text")}>GAME FOR OPEN DAY</span>
              <Image
                className={cx("suffix")}
                src={starSvg}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className={cx("item")}>
              <span className={cx("text")}>GAME FOR OPEN DAY</span>
              <Image
                className={cx("suffix")}
                src={starSvg}
                alt=""
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("desc-wrap")}>
            <span className={cx("text")}>
              不知何故，总觉得今日比去岁冷了不少。入冬后下过几场大雪，汴京大半都裹上了新雪。
            </span>
            <br />
            <span className={cx("text")}>
              {roleData?.[role]?.realName || roleData[role].name}
              祝在座的各位，在新的一年里____________！
            </span>
          </div>
          <audio className="flex-1 invisible" autoPlay src={audioUrl} />
        </div>
      </div>
      <Link href="/" className={cx("back-btn")}>
        返回
      </Link>
    </div>
  );
};

const Index: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string>("");
  return (
    <>
      {audioUrl === "" ? (
        <SpeechCovert
          onSetAudioUrl={(url: string) => {
            setAudioUrl(url);
          }}
        />
      ) : (
        <SpeechPlay audioUrl={audioUrl} />
      )}
    </>
  );
};

export default Index;
