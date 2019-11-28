<template>
  <div class="container">
    <div class="row">
      <label for>卡密</label>
      <div class="right">
        <input type="text" v-model="sn" placeholder="请输入卡密" />
      </div>
    </div>
    <div class="row" v-if="data.type">
      <label for>类型</label>
      <div class="right">{{data.type}}</div>
    </div>
    <div class="row" v-if="data.balance&&data.type!='次卡'&&data.type!='月卡'&&data.type!='年卡'">
      <label for>剩余点数</label>
      <div class="right">{{data.balance}}</div>
    </div>
    <div class="row" v-if="data.expire">
      <label for>到期时间</label>
      <div class="right">
        <span>{{data.expire}}</span>
      </div>
    </div>
    <div class="btns">
      <button @click="addSn">验证</button>
    </div>
  </div>
</template>

<script>
import api from "@/common/api";
export default {
  data() {
    return {
      sn: "",
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
      if (!this.sn) {
        this.Toast("请填写卡密");
        return false;
      }
      let { data, status, message } = await api.getSnInfo(this.sn);
      if (status === 0) {
        this.Toast("验证成功");
        wx.setStorageSync("sn", this.sn);
        this.data = data;
      } else {
        this.Toast(message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: 20px;
}
.row {
  line-height: 40px;
  height: 40px;
  display: flex;
  padding: 0 20px;
  font-size: 16px;
  label {
    width: 80px;
    color: #333;
  }
  .right {
    flex: 1;
    input {
      margin-top: 5px;
      padding: 0 10px;
      border-radius: 3px;
      height: 30px;
      border: 1px solid #e0e0e0;
    }
  }
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
</style>
