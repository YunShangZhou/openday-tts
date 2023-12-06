"use client";
import Image from "next/image";

import { roleCardData, roleNameMap } from "@/constant";
import TopTitleImg from "@/assets/image/home-top-title.png";
import StarSvg from "@/assets/svg/star.svg";
import microphoneSvg from "@/assets/svg/microphone.svg";

import styles from "./index.module.scss";
import classnames from "classnames/bind";
import { useState } from "react";
import Link from "next/link";
const cx = classnames.bind(styles);

const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const renderRoleCardList = () => {
    return (
      <div className={cx("card-list")}>
        {roleCardData.map((item, index) => {
          return (
            <div
              className={cx(
                "item",
                ...item.classNames,
                index === activeIndex ? "item--active" : ""
              )}
              style={item.style}
              key={index}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              <Image src={item.src} layout="fill" alt="" />
              <div className={cx("introduce")}>
                <Image src={StarSvg} alt="" width={44} height={44} />
                <span className={cx("name")}>{item.name}</span>
                <span className={cx("en")}>GAME FOR OPEN DAY</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cx("home")}>
      <Image
        className={cx("top-title-img")}
        src={TopTitleImg.src}
        alt=""
        width={565}
        height={256}
      />
      <div className={cx("description")}>你想变成谁，给大家送新年祝福？</div>
      <div className={cx("card-list-wrap")}>
        {renderRoleCardList()}
        <Link
          href={`/speech?role=${roleNameMap?.[activeIndex]?.[0]}`}
          className={cx(
            "confirm-btn",
            activeIndex < 0 ? "confirm-btn--disabled" : ""
          )}
        >
          确定
        </Link>
      </div>
      <Image
        className={cx("microphone-svg")}
        src={microphoneSvg}
        alt=""
        width={172}
        height={330}
      />
    </div>
  );
};

export default Home;
