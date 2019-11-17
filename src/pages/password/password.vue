<template>
  <div class="container">
    <template v-if="!sn">
      <div class="group group1">
        <div class="input">
          <input type="text" v-model.lazy="_sn" placeholder="请输入卡密" />
          <button class="add-sn" @click="addSn">添加卡密</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="card">
        <div class="wrap">
          <div>
            <span>卡密：</span>
            <span>{{sn}}</span>
          </div>
          <div>
            <span>剩余点数：</span>
            <span>9999</span>
          </div>
          <div>
            <span>使用次数：</span>
            <span>99</span>
          </div>
          <div>
            <span>到期时间：</span>
            <span>2020-10-29</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sn: "",
      _sn: ""
    };
  },
  created() {
    this.sn = wx.getStorageSync("sn");
  },
  mounted() {},
  methods: {
    Toast(msg) {
      wx.showToast({
        title: msg,
        icon: "none",
        duration: 2000
      });
    },
    addSn() {
      console.log(`>>>addSn`);
      if (!this._sn) {
        this.Toast("请填写卡密");
        return false;
      }
      this.Toast("添加成功");
      wx.setStorageSync("sn", this._sn);
      this.sn = this._sn;
    }
  }
};
</script>
<style lang="scss" scoped>
.group,
.group1 {
  margin-top: 10%;
  input {
    height: 40px;
    display: block;
    width: 90%;
    margin: auto;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
}
.add-sn {
  background: #3cb204;
  width: 90%;
  color: #fff;
  font-size: 36rpx;
  margin: auto;
  height: 92rpx;
  line-height: 92rpx;
  margin-top: 60rpx;
}
.card {
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  .wrap {
    background: #fff;
    padding: 20px;
    border-radius: 20px;
    min-width: 80%;
    & > div {
      line-height: 50px;
      font-size: 16px;
      display: flex;
      & > span:first-child {
        width: 90px;
        color: gray;
      }
    }
  }
}
</style>
