const roleData = {
  xunmengchu: {
    group: "fuxi",
    name: "寻梦初",
    age: "青年",
    gender: "女",
    emotion: ["neutral"],
    emotion_intensity: false,
    emotion_max_mapping: 1,
    tags: ["沙", "温柔"],
    desc: "温柔高音质女声",
    example_sentence: "等待太久得来的东西，多半已经不是当初自己想要的样子了。",
  },
  xinxiaoman: {
    group: "fuxi",
    name: "辛小满",
    age: "中年",
    gender: "男",
    emotion: ["neutral"],
    emotion_intensity: false,
    emotion_max_mapping: 1,
    tags: ["浑厚", "阳光"],
    desc: "爽朗高音质男声",
    example_sentence:
      "你是来接你的心上人的吧？可美丽的鸟儿不会再在窝里唱歌了。",
  },
  zimu: {
    group: "fuxi",
    name: "子沐",
    age: "少年",
    gender: "女",
    emotion: ["neutral"],
    emotion_intensity: false,
    emotion_max_mapping: 1,
    tags: ["阳光", "甜"],
    desc: "活泼女声",
    example_sentence:
      "你是来接你的心上人的吧？可美丽的鸟儿不会再在窝里唱歌了。",
  },
};

export const roleNameMap = Object.entries(roleData).map((item) => {
  return [item[0], item[1].name];
});
