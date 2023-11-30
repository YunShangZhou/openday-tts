import Image from "next/image";

import TopTitleImg from "@/assets/image/home-top-title.png";
import StarSvg from "@/assets/svg/star.svg";

import styles from "./index.module.css";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);

const Home: React.FC = () => {
  const renderRoleCardList = () => {
    return (
      <>
        {roleCardList.map((item, index) => {
          return (
            <div className={cx("card-item")} style={item.style} key={index}>
              <div className={cx("introduce")}>
                <Image src={StarSvg} alt="" width={44} height={44} />
                <span className={cx("name")}>{item.name}</span>
                <span className={cx("en")}>GAME FOR OPEN DAY</span>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className={cx("home")}>
      <Image src={TopTitleImg.src} alt="" width={565} height={256} />
      <div className={cx("description")}>你想变成谁，给大家送新年祝福？</div>
      {renderRoleCardList()}
    </div>
  );
};

export default Home;
