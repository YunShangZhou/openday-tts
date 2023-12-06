"use client";

import Image from "next/image";
import badgeSvg from "@/assets/svg/badge.svg";
import starSvg from "@/assets/svg/star.svg";

import styles from "./index.module.scss";
import classnames from "classnames/bind";
import { roleData } from "@/constant";
const cx = classnames.bind(styles);

const CurrentDev: React.FC = () => {
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
        </div>
      </div>
      <button className={cx("back-btn")}>返回</button>
    </div>
  );
};

export default CurrentDev;
