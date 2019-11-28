<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    wx.onAppRoute(data => {
      // 当前页面
      let view = getCurrentPages()[getCurrentPages().length - 1];
      let _data = null;
      if (view) {
        _data = view.data;
        if (data.qcappnoshare) {
          return;
        } else {
          view.onShareAppMessage = function() {
            return {
              title: "真人发声、AI合成、文字转语音，接近真人配音效果",
              imageUrl: "../../static/images/share.png",
              path: view.route.includes("peiyin")
                ? `/${view.route}`
                : "/pages/index/main"
            };
          };
        }
      }
    });
  }
};
</script>

<style>
@import "../static/css/iconfont.css";
@import "../static/css/common.css";

view,
.textarea,
._textarea,
._button {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}

page,
.container {
  height: 100%;
  width: 100%;
}
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
