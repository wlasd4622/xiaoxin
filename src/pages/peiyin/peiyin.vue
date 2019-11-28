<template>
  <div class="container">
    <div class="content">
      <div v-if="tabIndex===0 && pysList.length" class="tab1">
        <div class="item" v-for="(item,index) in pysList" :key="item" @click="play(item,index);">
          <div class="left">
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
              <div class="use" v-if="item.use">{{item.use||0}}人使用</div>
            </div>
          </div>
          <div class="right">
            <div class="music" v-if="item.playStatus">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
              <span class="line line4"></span>
              <span class="line line5"></span>
            </div>
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
      tabIndex: 0,
      audioStatus: false,
      pysList: []
    };
  },
  async onLoad(options) {
    let that = this;
    await this.peiYinShiList();
    this.$player.onEnded(res => {
      console.log(`onEnded`);
      // 监听背景音频自然播放结束事件
      that.audioStatus = false;
      let list = that.pysList;
      list[that.currPlayIndex].playStatus = false;
      this.$set(this.pysList, list);
    });
    this.$player.onStop(res => {
      console.log(`onStop`);
      // 监听背景音频自然播放结束事件
      that.audioStatus = false;
      let list = that.pysList;
      list[that.currPlayIndex].playStatus = false;
      this.$set(this.pysList, list);
    });
  },
  onHide() {
    this.$player.stop();
  },
  onUnload() {
    this.$player.stop();
  },
  methods: {
    play(obj, index) {
      let that = this;
      this.$player.stop();
      if (obj.mp3) {
        setTimeout(_ => {
          this.$player.src = obj.mp3;
          this.$player.title = obj.name;
          this.$player.play();
          that.audioStatus = true;
          let list = this.pysList;
          list = list.map((item, i) => {
            if (i === index) {
              item.playStatus = !item.playStatus;
            } else {
              item.playStatus = false;
            }
            return item;
          });
          this.$set(this.pysList, list);
          this.currPlayIndex = index;
        }, 100);
      }
    },
    async peiYinShiList() {
      let that = this;
      let { data } = await api.peiYinShiList();
      let pysList = [];
      data.map(item => {
        let level = "";
        let { no, name, mp3, use } = item;
        let [_level, _name] = name.split("：");
        level = parseInt(_level);
        name = _name.trim();
        let selected = false;
        if (no == that.dubbingNo) {
          selected = true;
        }
        pysList.push({
          playStatus: false,
          use,
          level,
          no,
          name,
          mp3,
          selected
        });
      });
      this.pysList = pysList;
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
      width: 50px;
      position: relative;
      padding-bottom: 14px;
    }
  }
}

.music {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0px;
}

.line {
  position: absolute;
  width: 4px;
  min-height: 5px;
  transition: 0.5s;
  animation: equalize 6s 0s infinite;
  animation-timing-function: linear;
  vertical-align: middle;
  bottom: 0 !important;
  box-shadow: inset 0px 0px 16px -2px rgba(0, 0, 0, 0.15);
}

.line1 {
  left: 30%;
  bottom: 0px;
  animation-delay: -1.9s;
  background-color: #3cb204;
}

.line2 {
  left: 40%;
  height: 40px;
  bottom: -15px;
  animation-delay: -2.9s;
  background-color: #3cb204;
}

.line3 {
  left: 50%;
  height: 10px;
  bottom: -1.5px;
  animation-delay: -3.9s;
  background-color: #3cb204;
}

.line4 {
  left: 60%;
  height: 45px;
  bottom: -16px;
  animation-delay: -4.9s;
  background-color: #3cb204;
}

.line5 {
  left: 70%;
  height: 40px;
  bottom: -12px;
  animation-delay: -5.9s;
  background-color: #3cb204;
}

@keyframes wordsLoop {
  0% {
    transform: translateX(200px);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes equalize {
  0% {
    height: 28px;
  }

  4% {
    height: 22px;
  }

  8% {
    height: 20px;
  }

  12% {
    height: 10px;
  }

  16% {
    height: 0px;
  }

  20% {
    height: 10px;
  }

  24% {
    height: 20px;
  }

  28% {
    height: 5px;
  }

  32% {
    height: 20px;
  }

  36% {
    height: 28px;
  }

  40% {
    height: 5px;
  }

  44% {
    height: 20px;
  }

  48% {
    height: 28px;
  }

  52% {
    height: 10px;
  }

  56% {
    height: 5px;
  }

  60% {
    height: 10px;
  }

  64% {
    height: 28px;
  }

  68% {
    height: 10px;
  }

  72% {
    height: 28px;
  }

  76% {
    height: 5px;
  }

  80% {
    height: 28px;
  }

  84% {
    height: 18px;
  }

  88% {
    height: 28px;
  }

  92% {
    height: 5px;
  }

  96% {
    height: 28px;
  }

  100% {
    height: 28px;
  }
}
</style>
