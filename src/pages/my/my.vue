<template>
  <div class="container">
    <div class="header">
      <div><i class="icon iconfont icon-luyin"></i></div>
    </div>
    <div class="menu-list">
      <div class="item item0">
        <div class="d1"><i class="icon iconfont icon-qiamizhifu"></i></div>
        <div class="d2">添加卡密</div>
        <div class="d3"><i class="icon iconfont icon-jiantou"></i></div>
      </div>
      <div class="item item1">
        <div class="d1"><i class="icon iconfont icon-shiyongbangzhu"></i></div>
        <div class="d2">使用帮助</div>
        <div class="d3"><i class="icon iconfont icon-jiantou"></i></div>
      </div>
      <div class="item item2">
        <div class="d1"><i class="icon iconfont icon-lianxikefu"></i></div>
        <div class="d2">联系客服</div>
        <div class="d3"><i class="icon iconfont icon-jiantou"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {}
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
    }
    .d2 {
      flex: 1;
      font-size: 16px;
    }
    .d3 {
      text-align: right;
      width: 20px;
      ._i{
        font-size: 14px;
      }
    }
    &.item0 {
      .d1 ._i {
        font-size: 15px;
      }
    }
    &.item1 {
    }
    &.item2 {
       .d1 ._i {
        font-size: 16px;
      }
    }
  }
}
</style>
