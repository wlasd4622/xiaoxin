<template>
  <div class="container">
    <div>
      <p>
        <i class="icon iconfont icon-luyin"></i>
      </p>
      <p class="title">配音神器</p>
      <p>人工智能黑科技</p>
      <p>一键文字转语音</p>
      <p>急速生成广告，促销等配音</p>
      <button @click="toDubbingPage">开始制作配音</button>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
      motto: "Hello miniprograme",
      userInfo: {
        nickName: "mpvue",
        avatarUrl: "" //"http://mpvue.com/assets/logo.png"
      }
    };
  },

  components: {
    card
  },

  methods: {
    toDubbingPage() {
      wx.navigateTo({ url: "../dubbing/main" });
    },
    submitHandle(e) {
      console.log(e);
    },
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  color: #333;
  display: flex;
  width: 100%;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-size: 16px;
  > div {
    padding-bottom: 20%;
  }

  .title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .icon-luyin {
    font-size: 80px;
    color: #3cb204;
    margin-bottom: 20px;
  }
  button {
    background: #3cb204;
    width: 340px;
    color: #fff;
    font-size: 18px;
    margin: auto;
    height: 46px;
    line-height: 46px;
    margin-top: 30px;
  }
}
</style>
