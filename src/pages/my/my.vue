<template>
  <div class="container">
    <div class="header">
      <div>
        <i class="icon iconfont icon-luyin"></i>
      </div>
    </div>
    <div class="menu-list">
      <div class="item item0" @click="to('password')">
        <div class="d1">
          <i class="icon iconfont icon-user-folder"></i>
        </div>
        <div class="d2">卡密管理</div>
        <div class="d3">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div>
      <!-- <div class="item item1" @click="to()">
        <div class="d1">
          <i class="icon iconfont icon-shiyongbangzhu"></i>
        </div>
        <div class="d2">使用帮助</div>
        <div class="d3">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div> -->
      <div class="item item2" @click="to('customer')" v-if="kefuStatus==0 && wechart">
        <div class="d1">
          <i class="icon iconfont icon-kefu1"></i>
        </div>
        <div class="d2">联系客服</div>
        <div class="d3">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/common/api";
export default {
  data() {
    return {
      customerInfo:'',
      wechart: "",
      kefuStatus: -1
    };
  },
  onShow() {
    this.getKeFu();
  },
  methods: {
    async getKeFu() {
      let sn = wx.getStorageSync("sn") || 0;
      let { data, status } = await api.getKeFu(sn);
      this.kefuStatus = status;
      if (this.kefuStatus === 0) {
        this.customerInfo=data;
        this.wechart = data.split("：").pop();
      }
    },
    Toast(msg) {
      wx.showToast({
        title: msg,
        icon: "none",
        duration: 2000
      });
    },
    to(name) {
      if (!name) {
        this.Toast("开发中");
        return false;
      }
      if (name === "customer") {
        this.customer();
      } else {
        wx.navigateTo({ url: `../${name}/main` });
      }
    },
    Toast(msg) {
      wx.showToast({
        title: msg,
        icon: "none",
        duration: 2000
      });
    },
    customer() {
      let that = this;
      wx.setClipboardData({
        data: this.wechart,
        success(res) {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: that.customerInfo
          });
        },
        fail(err) {
          that.Toast(err.errMsg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  background: #ededed;
}

.header {
  border-bottom: 1px solid #ddd;
  background: #fff;
  height: 150px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  > div {
    width: 90px;
    height: 90px;
    text-align: center;
    line-height: 90px;
    background: #ddd;
    border-radius: 100%;
    i {
      color: #3cb204;
      font-size: 60px;
    }
  }
}

.menu-list {
  border-top: 1px solid #ddd;
  margin-top: 10px;
  .item {
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    padding: 0 10px;
    display: flex;
    .d1 {
      text-align: center;
      width: 30px;
      margin-right: 5px;

      ._i {
        color: #555;
      }
    }
    .d2 {
      flex: 1;
      font-size: 16px;
      color: #333;
    }
    .d3 {
      text-align: right;
      width: 20px;
      ._i {
        color: gray;
        font-size: 14px;
      }
    }
    &.item0 {
      .d1 ._i {
        font-size: 20px;
      }
    }
    &.item1 {
    }
    &.item2 {
      .d1 ._i {
        font-size: 18px;
      }
    }
  }
}
</style>
