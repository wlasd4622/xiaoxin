<template>
  <div class="list">
    <div :class="['item','status-'+(item.status?'1':'0')]" @click="play(index)" v-for="(item,index) in historyList" :key="item">
      <div class="s1">{{index+1}}</div>
      <div class="s2">
        <i v-if="!item.status" class="iconfont icon icon-bofang"></i>
        <i v-else class="iconfont icon icon-zanting"></i>
      </div>
      <div class="s3">
        <span class="animate">{{item.title}}</span>

      </div>

      <div class="s4">
        <div v-if="!item.status" >{{item.duration}}</div>
        <div v-else class=" music">
          <span class='line line1'></span>
          <span class='line line2'></span>
          <span class='line line3'></span>
          <span class='line line4'></span>
          <span class='line line5'></span>
        </div>
      </div>
      <!-- <span class="s5">{{item.createData}}</span> -->
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";

export default {
  components: {},

  data() {
    return {
      historyList: [
        {
          title:
            "大幅度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电饭锅",
          src: "",
          duration: "20:00",
          createData: "2019-11-11 11:11",
          status: ""
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title:
            "大幅度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电饭锅",
          src: "",
          duration: "20:00",
          createData: "2019-11-11 11:11",
          status: ""
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title:
            "大幅度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电饭锅",
          src: "",
          duration: "20:00",
          createData: "2019-11-11 11:11",
          status: ""
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title:
            "大幅度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电饭锅",
          src: "",
          duration: "20:00",
          createData: "2019-11-11 11:11",
          status: ""
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title:
            "大幅度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电饭锅",
          src: "",
          duration: "20:00",
          createData: "2019-11-11 11:11",
          status: ""
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title:
            "大幅度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电饭锅",
          src: "",
          duration: "20:00",
          createData: "2019-11-11 11:11",
          status: ""
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title:
            "大幅度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电度水电费 v, ,sdf噶电饭锅",
          src: "",
          duration: "20:00",
          createData: "2019-11-11 11:11",
          status: ""
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        },
        {
          title: "大幅度水电费噶电饭锅",
          src: "",
          duration: "20:00",
          status: "",
          createData: "2019-11-11 11:11"
        }
      ]
    };
  },

  created() {},
  methods: {
    play(index) {
      let historyList = this.historyList;
      for (let i = 0; i < historyList.length; i++) {
        if (index === i) {
          historyList[i].status = !historyList[i].status;
        } else {
          historyList[i].status = false;
        }
      }
      this.$set(this, historyList);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  font-size: 16px;
  .item {
    padding: 0 20px;
    padding-left: 10px;
    display: flex;
    color: #333;
    height: 50px;
    line-height: 50px;
    &:nth-child(odd) {
      background: #efefef;
    }
    .s1 {
      text-align: center;
      width: 20px;
      color: #aaa;
    }
    .s2 {
      width: 30px;
      text-align: center;
      ._i {
        color: #aaa;
        font-size: 22px;
      }
    }
    .s3 {
      flex: 1;
      overflow: hidden;
      padding-right: 5px;
    }
    .s4 {
      position: relative;
      width: 40px;
      text-align: center;
    }
    &.status-1 {
      .s2 ._i {
        color: #3cb204;
      }
      .s3 {
        position: relative;
        color: #3cb204;
        .animate {
          padding-left: 0px;
          display: inline-block;
          white-space: nowrap;
          animation: 10s wordsLoop linear infinite normal;
        }
      }

      .music {
        position: absolute;
        width: 50px;
        height: 40px;
        right: -5px;
        bottom: 14px;
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
      .s4 {
        color: #3cb204;
      }
    }
  }
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

