import { CSSProperties } from "react";

import role1Img from "@/assets/image/role-1.png";
import role2Img from "@/assets/image/role-2.png";
import role3Img from "@/assets/image/role-3.png";
import role4Img from "@/assets/image/role-4.png";

import role1AvatarImg from "@/assets/image/role-1-avatar.png";
import role2AvatarImg from "@/assets/image/role-2-avatar.png";
import role3AvatarImg from "@/assets/image/role-3-avatar.png";
import role4AvatarImg from "@/assets/image/role-4-avatar.png";

interface roleCardDataProps {
  src: string;
  name: string;
  style?: CSSProperties;
  classNames: string[];
}

export const TOTAL_TIME = 60;
export const PER_FRAME = 60;

export const roleData: Record<string, any> = {
  maomao: {
    group: "fuxi",
    realName: "卯卯",
    name: "萝莉音",
    age: "少年",
    gender: "女",
    emotion: ["neutral", "happy", "angry", "sad", "fear", "surprise"],
    emotion_intensity: true,
    emotion_max_mapping: 1,
    tags: ["纯", "甜"],
    desc: "看板娘，可爱女声",
    example_sentence: "去吹吹夏日的晚风吧，也许会遇见浪漫呢 ！",
    
    avatar: role1AvatarImg.src,
    dialog: "不知何故，总觉得今日比去岁冷了不少。入冬后下过几场大雪，汴京大半都裹上了新雪。"
  },
  yewenzhou: {
    group: "fuxi",
    name: "叶问舟",
    age: "青年",
    gender: "男",
    emotion: ["neutral"],
    emotion_intensity: false,
    emotion_max_mapping: 1,
    tags: ["磁性", "浑厚", "温柔"],
    desc: "温柔男声",
    example_sentence: "这尺八之音。竟能与我如此契合！",
  
    avatar: role2AvatarImg.src,
    dialog: "不知何故，总觉得今日比去岁冷了不少。入冬后下过几场大雪，汴京大半都裹上了新雪。"
  },
  guxizhao: {
    group: "fuxi",
    name: "顾惜朝",
    age: "青年",
    gender: "男",
    emotion: ["neutral"],
    emotion_intensity: false,
    emotion_max_mapping: 1,
    tags: ["高贵", "磁性", "温柔"],
    desc: "傲气洒脱男",
    example_sentence: "时至今日，你们，可还肯听我一言？",
 
    avatar: role3AvatarImg.src,
    dialog: "不知何故，总觉得今日比去岁冷了不少。入冬后下过几场大雪，汴京大半都裹上了新雪。"
  },
  yexueqing: {
    group: "fuxi",
    name: "叶雪青",
    age: "青年",
    gender: "女",
    emotion: ["neutral"],
    emotion_intensity: false,
    emotion_max_mapping: 1,
    tags: ["温柔", "苏", "纯", "甜"],
    desc: "温柔女声",
    example_sentence: "只要有一丝希望，我都会去试试。",
  
    avatar: role4AvatarImg.src,
    dialog: "不知何故，总觉得今日比去岁冷了不少。入冬后下过几场大雪，汴京大半都裹上了新雪。"
  },
};

export const roleNameMap = Object.entries(roleData).map((item) => {
  return [item[0], item[1].name];
});

export const roleCardData: roleCardDataProps[] = [
  {
    src: role1Img.src,
    name: "萝莉音",
    classNames: ["rotate--12deg"],
  },
  {
    src: role2Img.src,
    name: "叶问舟",
    style: {},
    classNames: [],
  },
  {
    src: role3Img.src,
    name: "顾惜朝",
    classNames: ["rotate--12deg"],
  },
  {
    src: role4Img.src,
    name: "叶雪青",
    classNames: [],
  },
];

export const roleAvatarImgMap: Record<string, string> = {
  maomao: role1AvatarImg.src,
  yewenzhou: role2AvatarImg.src,
  guxizhao: role3AvatarImg.src,
  yexueqing: role4AvatarImg.src,
};

