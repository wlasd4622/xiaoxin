<template>
  <div class="container">
    <template v-if="!sn">
      <div class="group group1">
        <div class="input">
          <input type="text" v-model="_sn" placeholder="请输入卡密" />
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
            <span>{{data.balance}}</span>
          </div>
          <!-- <div>
            <span>使用次数：</span>
            <span>99</span>
          </div>-->
          <div>
            <span>到期时间：</span>
            <span>{{data.expire}}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import api from "@/common/api";
export default {
  data() {
    return {
      sn: "",
      _sn: "",
      data: {}
    };
  },
  created() {
    this.sn = wx.getStorageSync("sn");
  },
  async mounted() {
    this.sn = wx.getStorageSync("sn");
    if (this.sn) {
      let { data } = await api.getSnInfo(this.sn);
      this.data = data;
    }
  },
  methods: {
    Toast(msg) {
      wx.showToast({
        title: msg,
        icon: "none",
        duration: 2000
      });
    },
    async addSn() {
      console.log(`>>>addSn`);
      if (!this._sn) {
        this.Toast("请填写卡密");
        return false;
      }
      let { data, status, message } = await api.getSnInfo(this._sn);
      if (status === 0) {
        this.Toast("添加成功");
        wx.setStorageSync("sn", this._sn);
        this.sn = this._sn;
        this.data=data;
      } else {
        this.Toast(message);
      }
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
