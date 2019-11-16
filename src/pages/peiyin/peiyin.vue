<template>
  <div class="container">
    <div class="list">
      <div class="item" @click="play(index)" v-for="(item,index) in list" :key="item">

        <img :src="item.poster" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "5星配音师：小艾 - 女",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py01_bg.mp3",
          poster: "/static/images/p1.jpg"
        },
        {
          title: "5星配音师：小娜 - 女",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py02_bg.mp3",
          poster: "/static/images/p2.jpg"
        },
        {
          title: "4星配音师：小雅 - 女",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py03_bg.mp3",
          poster: "/static/images/p3.jpg"
        },
        {
          title: "4星配音师：小芳 - 女",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py04_bg.mp3",
          poster: "/static/images/p9.jpg"
        },
        {
          title: "5星配音师：小美 - 女",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py05_bg.mp3",
          poster: "/static/images/p5.jpg"
        },
        {
          title: "5星配音师：小雪 - 女",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py06_bg.mp3",
          poster: "/static/images/p6.jpg"
        },
        {
          title: "5星配音师：大鹏 - 男",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py07_bg.mp3",
          poster: "/static/images/p7.jpg"
        },
        {
          title: "4星配音师：大明 - 男",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py08_bg.mp3",
          poster: "/static/images/p8.jpg"
        },
        {
          title: "5星配音师：大伟 - 男",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py09_bg.mp3",
          poster: "/static/images/p4.jpg"
        },
        {
          title: "3星配音师：小刚 - 男",
          artist: "小新AI",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py10_bg.mp3",
          poster: "/static/images/p10.jpg"
        }
      ]
    };
  },

  created() {},
  methods: {
    play(index) {
      console.log(index);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
