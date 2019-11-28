<template>
  <div class="container">
    <div>
      <p>
        <i class="icon iconfont icon-luyin"></i>
      </p>
      <p class="title">AI智能配音</p>
      <p>真人发声 · AI合成 · 文字转语音</p>
      <p>带有情感和语调 · 接近真人配音效果</p>
      <button @click="toDubbingPage">开始制作配音</button>
    </div>
  </div>
</template>

<script>
export default {
  onShareAppMessage() {},
  data() {
    return {};
  },
  methods: {
    toDubbingPage() {
      wx.navigateTo({ url: "../dubbing/main" });
    }
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
