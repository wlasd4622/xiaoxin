<template>
  <div class="container">
    <div class="tab-content">
      <template v-for="(item,index) in tabs">
        <div
          :class="[tabIndex==index?'active':'','tab']"
          v-show="item.value!='背景音' || (item.value==='背景音' && bmListStatus==0)"
          @click="activeTab(index)"
          :key="item"
        >
          <span>{{item.value}}</span>
        </div>
      </template>
    </div>
    <div class="content">
      <div v-if="tabIndex===0 && pysList.length" class="tab1">
        <div class="item" v-for="(item,index) in pysList" :key="item">
          <div class="left" @click="play(item)">
            <div class>
              <div class="row row1">
                <div>{{item.name}}</div>
                <div class="star-warp">
                  <i
                    class="iconfont icon-star bright"
                    v-for="(sitem,sIndex) in item.level"
                    :key="sIndex"
                  ></i>
                  <i
                    class="iconfont icon-star dark"
                    v-for="(sitem,sIndex) in 5-item.level"
                    :key="sIndex"
                  ></i>
                </div>
              </div>
              <div class="use">{{useCount[index]}}人使用</div>
            </div>
          </div>
          <div class="right" @click="selectedDubbing(index)">
            <i v-if="item.selected" class="iconfont icon-radio2"></i>
            <i v-else class="iconfont icon-radio1"></i>
          </div>
        </div>
      </div>
      
      <div v-if="tabIndex===1 && bmList.length" class="tab2">
        <div class="item" v-for="(item,index) in bmList" :key="index">
          <div class="left" @click="play(item)">{{item.name}}</div>
          <div class="right" @click="selectedBg(index)">
            <i v-if="item.selected" class="iconfont icon-radio2"></i>
            <i v-else class="iconfont icon-radio1"></i>
          </div>
        </div>
      </div>
      <div v-if="tabIndex===2" class="tab3">
        <div class="warp">
          <div v-for="(item,index) in speedList" @click="selectedSpeed(index)" :key="item">
            <div v-if="item.selected" class="circular active" :class="item.selected?'active':''"></div>
            <div v-else class="circular" :class="item.selected?'active':''"></div>
            <div>{{item.value}}</div>
          </div>
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
      bmListStatus: -1,
      tabIndex: 0,
      tabs: [
        {
          value: "配音师",
          index: 0
        },
        {
          value: "背景音",
          index: 1
        },
        {
          value: "语速语调",
          index: 2
        }
      ],
      // 语速
      speedList: [
        // {
        //   index: 0,
        //   value: "-500"
        // },
        // {
        //   index: 1,
        //   value: "-400"
        // },
        {
          index: 2,
          value: "-300",
          selected: false
        },
        {
          index: 3,
          value: "-200",
          selected: false
        },
        {
          index: 4,
          value: "-100",
          selected: false
        },
        {
          index: 5,
          value: "0",
          selected: false
        },
        {
          index: 6,
          value: "100",
          selected: false
        },
        {
          index: 7,
          value: "200",
          selected: false
        },
        {
          index: 8,
          value: "300",
          selected: false
        }
        // {
        //   index: 9,
        //   value: "400"
        // },
        // {
        //   index: 10,
        //   value: "500"
        // }
      ],
      pysList: [], // 配音师
      useCount: [
        18932,
        14314,
        15645,
        15625,
        17566,
        13452,
        13245,
        11344,
        12455,
        15463,
        14563,
        3456,
        2345,
        3245,
        87569,
        3245,
        2134,
        5643,
        6758,
        8796,
        2134
      ],
      bmList: [], // 背景音
      audioStatus: false
    };
  },

  async created() {},
  async mounted() {
    let that = this;
    await this.peiYinShiList();
    await this.bgMusicList();
    this.$player.onEnded(res => {
      console.log(`onEnded`);
      // 监听背景音频自然播放结束事件
      that.audioStatus = false;
    });
    this.$player.onStop(res => {
      console.log(`onStop`);
      // 监听背景音频自然播放结束事件
      that.audioStatus = false;
    });
  },
  onLoad(options) {
    this.tabIndex = parseInt(options.index || 0);
    // TODO
    // this.tabIndex = 1;
  },
  onHide() {
    this.$player.stop();
  },
  onUnload() {
    this.$player.stop();
  },
  methods: {
    play(obj) {
      let that = this;
      this.$player.stop();
      console.log(JSON.stringify(obj));
      this.$player.src = obj.mp3;
      this.$player.title = obj.name;
      this.$player.play();
      that.audioStatus = true;
    },
    activeTab(index = 0) {
      this.tabIndex = index;
    },
    // 背景音乐
    selectedBg(index) {
      let item = this.bmList.find(item => item.selected === true);
      if (item) {
        item.selected = false;
      }
      item = this.bmList[index];
      item.selected = true;
      this.$set(this.bmList, index, item);
      wx.setStorageSync("bg", JSON.stringify(item));
    },
    selectedSpeed(index) {
      console.log(666);
      let item = this.speedList.find(item => item.selected === true);
      if (item) {
        item.selected = false;
      }
      item = this.speedList[index];
      item.selected = true;
      this.$set(this.speedList, index, item);
      wx.setStorageSync("speed", JSON.stringify(item));
    },
    selectedDubbing(index) {
      let item = this.pysList.find(item => item.selected === true);
      if (item) {
        item.selected = false;
      }
      item = this.pysList[index];
      item.selected = true;
      this.$set(this.pysList, index, item);
      wx.setStorageSync("dubbing", JSON.stringify(item));
    },
    async peiYinShiList() {
      let { data } = await api.peiYinShiList();
      let pysList = [];
      data.map(item => {
        let level = "";
        let { no, name, mp3 } = item;
        let [_level, _name] = name.split("：");
        level = parseInt(_level);
        name = _name.trim();
        pysList.push({
          level,
          no,
          name,
          mp3
        });
      });
      this.pysList = pysList;
    },
    async bgMusicList() {
      let { data, status } = await api.listBgMusic();
      this.bmList = data;
      this.bmListStatus = status;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  color: #666;
  display: flex;
  flex-flow: column;
}
.tab-content {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  .tab {
    flex: 1;
    font-size: 16px;
    text-align: center;
    position: relative;
    &.active {
      color: #3cb204;
      &:after {
        content: "";
        position: absolute;
        width: 90%;
        height: 3px;
        background: #3cb204;
        bottom: 0;
        left: 5%;
      }
    }
  }
}
.content {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
}
.tab1 {
  .item {
    display: flex;
    line-height: 60px;
    height: 60px;
    margin: 0 20px;
    border-bottom: 1px solid #f5f5f5;
    .left {
      vertical-align: middle;
      font-size: 16px;
      display: flex;
      flex: 1;
      line-height: 1.3;
      align-items: center; /* 垂直居中 */
      color: #444;
      padding-top: 4px;
      .use {
        font-size: 14px;
        color: #888;
      }
      > div {
        width: 100%;
      }
      .row.row1 {
        height: 20px;
        line-height: 20px;
        width: 100%;
        display: flex;
        .star-warp {
          flex: 1;
          display: flex;
          margin-left: 5px;
          .bright {
            color: #fdd60a;
          }
          .dark {
            color: #f0f0f0;
          }
        }
      }
    }
    .right {
      text-align: center;
      width: 60px;
      position: relative;
      right: -20px;
      .icon-radio2 {
        color: #3cb204;
        font-size: 22px;
      }
      .icon-radio1 {
        color: #4b4f57;
      }
    }
  }
}
.tab2 {
  .item {
    display: flex;
    line-height: 60px;
    height: 60px;
    margin: 0 20px;
    border-bottom: 1px solid #f5f5f5;
    .left {
      flex: 1;
    }
    .right {
      text-align: center;
      width: 60px;
      position: relative;
      right: -20px;
      .icon-radio2 {
        color: #3cb204;
        font-size: 22px;
      }
      .icon-radio1 {
        color: #4b4f57;
      }
    }
  }
}
.tab3 {
  .warp {
    margin: auto;
    display: flex;
    width: 90%;
    font-size: 16px;
    padding: 30px 0;
    > div {
      position: relative;

      flex: 1;
      text-align: center;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        top: 6px;
        background: #ddd;
      }
      &:first-child {
        &:before {
          left: 50%;
        }
      }
      &:last-child {
        &:before {
          left: auto;
          right: 50%;
        }
      }
      .circular {
        position: relative;
        z-index: 10;
        margin: auto;
        margin-bottom: 6px;
        width: 12px;
        height: 12px;
        border: 1px solid #ddd;
        border-radius: 100%;
        background: #fff;
        &.active {
          background: #3cb204;
          border-color: #3c9e0e;
        }
      }
    }
  }
}
</style>
