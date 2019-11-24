<template>
  <div class="container">
    <div class="header">
      <span class="left">输入配音词</span>
      <span @click="snManage">卡密管理</span>
    </div>
    <form action>
      <div class="input-content pr">
        <textarea name="text" v-model.lazy="text" cols="30" rows="10"></textarea>
        <div
          class="input-numer"
          :class="text.length>maxChars?'error':''"
        >{{text.length}}/{{maxChars}}</div>
      </div>
    </form>
    <div class="group">
      <p>选择配音师</p>
      <div @click="settingHandle(0)">
        <span class="_picker" v-if="setting.dubbing">{{setting.dubbing.name}}</span>
        <i class="icon iconfont icon-jiantou"></i>
      </div>
    </div>
    <div class="group">
      <p>选择语速</p>
      <div @click="settingHandle(2)">
        <span class="_picker" v-if="setting.speed">{{setting.speed.value}}</span>
        <i class="icon iconfont icon-jiantou"></i>
      </div>
    </div>
    <div class="group">
      <p>选择背景音乐</p>
      <div @click="settingHandle(1)">
        <span v-if="!setting.bg">选择背景音乐</span>
        <span v-else class="_picker">{{setting.bg.name}}</span>
        <i class="icon iconfont icon-jiantou"></i>
      </div>
    </div>
    <div class="btns">
      <input
        type="text"
        style="position: fixed;bottom: -999px;left: -999px;"
        id="audioSrcInput"
        v-model.lazy="audioSrc"
      />
      <button
        @click="downLoadAudio"
        v-if="taskId&&audioSrc"
        class="icon-btn download audio-exist"
        data-clipboard-target="#audioSrcInput"
      >
        <i class="icon iconfont icon-xiazai"></i>
        <p>下载</p>
      </button>
      <button @click="downLoadAudio" v-if="!(taskId&&audioSrc)" class="icon-btn download">
        <i class="icon iconfont icon-xiazai"></i>
        <p>下载</p>
      </button>
      <button @click="audioPlay" class="audition icon-btn">
        <i class="icon iconfont icon-shiting"></i>
        <p>试听</p>
      </button>
      <button class="created" @click="submit" :disabled="!!loading" :class="loading?'loading':''">
        <div class="spinner" v-if="loading">
          <mt-spinner type="fading-circle" :size="20" color="#fff"></mt-spinner>
        </div>
        <div class="c">生成配音</div>
      </button>
    </div>
    <awesome-picker
      v-if="pickerData&&pickerData.length"
      :anchor="pickerAnchor"
      ref="picker"
      :data="pickerData"
      @cancel="handlePickerCancel"
      @confirm="handlePickerConfirm"
    ></awesome-picker>
    <div class="loader-content" v-if="audioStatus">
      <div class="loader">
        <i @click="audioAuspend" class="icon iconfont icon-2guanbi"></i>
        <span class="sound"></span>
        <span class="sound"></span>
        <span class="sound"></span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/common/api";
// http://mint-ui.github.io/docs/#/zh-cn2/checklist
import axios from "axios";
import qs from "qs";
export default {
  name: "dubbing",
  data() {
    return {
      sn: "",
      bmList: [],
      bmListStatus: -1,
      date: "", //不填写默认今天日期，填写后是默认日期
      host: "http://tts.api001.com",
      audio: null,
      audioSrc: "",
      tiemr: null,
      audioStatus: false,
      maxChars: 300,
      text: "",
      taskAddObj: {},
      taskId: "",
      version: 200,
      loading: false,
      pickerType: 0,
      voiceIndex: 0,
      doubleSpeedIndex: 5,
      pickerData: [],
      pickerAnchor: [],
      setting: {
        dubbing: {
          level: 5,
          no: 0,
          name: "小艾 - 女",
          mp3:
            "http://files101.oss-cn-beijing.aliyuncs.com/peiyin_demo/py01_bg.mp3",
          selected: true
        },
        speed: { index: 5, value: "0", selected: true }
      }
    };
  },
  created() {},
  mounted() {},
  onShow() {
    this.getSetting();
  },

  methods: {
    snManage() {
      wx.navigateTo({ url: "../password/main" });
    },
    getSetting() {
      console.log(666);
      let dubbing = wx.getStorageSync("dubbing") || "";
      let speed = wx.getStorageSync("speed") || "";
      let bg = wx.getStorageSync("bg") || "";
      if (dubbing) {
        this.setting.dubbing = JSON.parse(dubbing);
      }
      if (speed) {
        this.setting.speed = JSON.parse(speed);
      }
      if (bg) {
        this.setting.bg = JSON.parse(bg);
      }
    },
    settingHandle(index) {
      wx.navigateTo({ url: `../setting/main?index=${index}` });
    },
    doubleSpeedPickerChange: function(e) {
      let index = parseInt(e.mp.detail.value);
      this.doubleSpeedIndex = index || 0;
    },
    voicePickerChange: function(e) {
      let index = parseInt(e.mp.detail.value);
      this.voiceIndex = index || 0;
    },
    audioAuspend() {
      this.audio.pause();
      this.audioStatus = false;
    },
    async sleep(ms = 300) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    },
    async bgMusicList() {
      let { data, status } = await api.listBgMusic();
      this.bmListStatus = status;
      this.bmList = data;
    },
    async getTask(id) {
      let audioSrc = "";
      do {
        try {
          let { data } = await api.taskStatus(id);
          console.log(data);
          if (data && data.data.status == 0) {
            // 配音完成
            audioSrc = data.data.download_url;
            break;
          }
          await this.sleep(2000);
        } catch (err) {
          this.Toast(err.message);
          break;
        }
      } while (!audioSrc);
      this.loading = false;
      this.audioSrc = audioSrc;
      wx.showModal({
        title: "配音成功",
        content: `本次配音消耗：${this.taskAddObj.point},卡密剩余点数：${
          this.taskAddObj.balance
        },卡密有效期：${this.taskAddObj.expire}`
      });
    },
    downLoadAudio() {
      this.Toast("开发中...");
      return false;
      let that = this;
      if (!that.audioSrc) {
        if (that.taskId) {
          Toast("配音生成中，请稍后");
        } else {
          Toast("请先生成配音");
        }
        return false;
      }
    },
    audioPlay() {
      this.Toast("开发中...");
      return false;
      let that = this;
      if (!that.audioSrc) {
        if (that.taskId) {
          Toast("配音生成中，请稍后");
        } else {
          Toast("请先生成配音");
        }
        return false;
      }
      that.audioStatus = true;
      that.audio.src = this.audioSrc;
      let playPromise;
      playPromise = that.audio.play();
      if (playPromise) {
        let second = that.audio.duration;
        playPromise
          .then(() => {
            // 音频加载成功
            // 音频的播放需要耗时
            that.tiemr = setInterval(() => {
              second--;
              if (second <= 0) {
                that.audio.pause();
                that.audioStatus = false;
                clearInterval(that.tiemr);
              }
            }, 1000);
          })
          .catch(e => {
            // 音频加载失败
            console.error(e);
          });
      }
    },
    Toast(msg) {
      wx.showToast({
        title: msg,
        icon: "none",
        duration: 2000
      });
    },
    submit() {
      console.log(`>>>submit`);
      let that = this;
      if (this.loading) {
        return false;
      }
      let sn = wx.getStorageSync("sn");
      this.sn = sn;
      if (!this.text) {
        this.Toast("请输入配音内容");
        return false;
      } else if (!this.sn) {
        this.Toast("请输入卡号");
        return false;
      }
      wx.showModal({
        content: `字符数:${that.text.length}，确认需要配音吗？`,
        success(res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            that.loading = true;
            wx.showLoading({
              title: "配音中..."
            });
            // 记录卡号
            that.taskId = "";
            that.audioSrc = "";
            that.taskAddObj = {};
            api
              .taskAdd({
                version: that.version,
                sn: that.sn,
                voice: that.setting.dubbing.no,
                speech_rate: that.setting.speed.value,
                text: that.text,
                bg_music_no: that.setting.bg.no
              })
              .then(res => {
                if (res.status === 0) {
                  let taskId = res.data.task_id;
                  that.taskId = taskId;
                  that.getTask(that.taskId);
                  that.taskAddObj = res.data;
                } else {
                  that.Toast(res);
                  that.loading = false;
                }
              })
              .catch(err => {
                that.Toast("配音失败");
                that.loading = false;
              });
          }
        }
      });
      return false;
    },
    show(type) {
      this.pickerType = type;
      if (this.pickerType === 0) {
        // this.pickerData = this.voiceList;
        this.pickerAnchor = [this.voiceIndex];
      } else {
        // this.pickerData = this.doubleSpeedList;
        this.pickerAnchor = [this.doubleSpeedIndex];
      }
      this.$nextTick(() => {
        this.$refs.picker.show();
      });
    },
    handlePickerCancel() {},
    handlePickerConfirm(e) {
      if (this.pickerType === 0) {
        this.voiceIndex = e[0].index;
      } else {
        this.doubleSpeedIndex = e[0].index;
      }
    }
  },
  computed: {}
};
</script>
<style>
.pr {
  position: relative;
}
.mint-spinner-fading-circle {
  width: 100% !important;
  height: 100% !important;
}
</style>

<style lang="scss" scoped>
button {
  padding: 0;
  margin: 0;
}
button:after {
  border: none;
}
.container {
  height: 100%;
  background: #efefef;
  border-top: 1px solid #eee;
  font-size: 14px;
  width: 100%;
  .header {
    width: 100%;
    display: flex;
    background: #efefef;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-size: 14px;
    align-items: center;
    .left {
      flex: 1;
      color: #909090;
    }
    span.right {
      color: #2d75ee;
    }
    i {
      color: #bababa;
      margin-left: 3px;
      font-size: 12px;
      vertical-align: middle;
    }
  }
  .input-content {
    background: #fff;
    width: 100%;
    // background: red;
    height: 200px;
    position: relative;
    height: 220px;
    textarea {
      outline: none;
      padding: 5px;
      border: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 220px;
      font-size: 14px;
    }
    .input-numer {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 12px;
      padding: 10px;
      color: #909090;
      &.error {
        color: red;
        font-weight: bold;
      }
    }
  }
  .group {
    color: #909090;
    p {
      padding: 0 10px;
      line-height: 40px;
      height: 40px;
    }
    div {
      line-height: 40px;
      height: 40px;
      background: #fff;
      padding: 0 10px;
      color: #000;
      display: flex;
      border-top: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;
      span,
      ._picker {
        flex: 1;
      }
      i {
        color: #bababa;
        margin-left: 3px;
        font-size: 12px;
        vertical-align: middle;
      }
      input {
        position: absolute;
        height: 38px;
        width: 100%;
        outline: none;
        width: 90%;
        border: none;
      }
    }
  }
  .btns {
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #eaeaea;
    height: 60px;
    width: 100%;
    padding-top: 10px;
    width: 375px;
    padding: 0 10px;
    display: flex;
    box-sizing: border-box;
    .download,
    .audition {
      width: 50px;
      background: none;
      border: none;
      color: #aaa;
      height: 100%;
      font-size: 13px;
    }
    .icon-btn {
      line-height: 24px;
    }
    .iconfont {
      padding: 5px 0;
      font-size: 16px;
      display: inline-block;
      height: 24px;
    }
    button.created {
      flex: 1;
      background: #5abb2e;
      border: none;
      width: 350px;
      height: 40px;
      border-radius: 3px;
      font-size: 16px;
      color: #fff;
      margin: auto;
      display: grid;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 15px;
      .spinner {
        width: 20px;
        height: 20px;
        overflow: hidden;
        margin-right: 10px;
        display: inline-block;
        > div {
          width: 100%;
          height: 100%;
        }
      }
      .c {
        display: inline-block;
      }
      &.loading {
        background: #bbb;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.loader-content {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.loader {
  width: 200px;
  height: 80px;
  position: relative;
}
.loader:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  width: 10px;
  box-shadow: 0 0 0 6px #fff;
  border-radius: 1px;
  transform: skewY(45deg);
}
.sound {
  width: 200px;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.sound:before,
.sound:after {
  font-family: FontAwesome;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.sound:nth-child(1):before {
  content: "\f00d";
  color: #d13f92;
  animation: s1 2s linear infinite;
}
.sound:nth-child(1):after {
  content: "\f1b2";
  color: #f3c361;
  animation: s2 2s linear infinite 0.3s;
}
.sound:nth-child(2):before {
  content: "\f001";
  color: #bbdd15;
  animation: s3 2s linear infinite 0.6s;
}
.sound:nth-child(2):after {
  content: "\f10c";
  color: #97d5f5;
  animation: s4 2s linear infinite 0.9s;
}
.sound:nth-child(3):before {
  content: "\f1b2";
  color: #ffe300;
  animation: s5 2s linear infinite 1.2s;
}
.sound:nth-child(3):after {
  content: "\f10c";
  color: #3d4a9a;
  animation: s6 2s linear infinite 1.5s;
}
@keyframes s1 {
  0% {
    transform: translate(0, 10px) rotate(30deg);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translate(200px, 60px) rotate(-45deg);
    opacity: 1;
  }
}
@keyframes s2 {
  0% {
    transform: translate(0, 60px) rotate(-45deg);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translate(200px, 10px) rotate(90deg);
    opacity: 1;
  }
}
@keyframes s3 {
  0% {
    transform: translate(0, 5px) rotate(15deg);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translate(200px, 60px) rotate(60deg);
    opacity: 1;
  }
}
@keyframes s4 {
  0% {
    transform: translate(0, 15px);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translate(200px, 55px);
    opacity: 1;
  }
}
@keyframes s5 {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translate(200px, 30px) rotate(45deg);
    opacity: 1;
  }
}
@keyframes s6 {
  0% {
    transform: translate(0, 60px);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: translate(200px, 0);
    opacity: 1;
  }
}
.icon-2guanbi {
  position: absolute;
  top: -37px;
  right: -30px;
  font-size: 23px;
}
</style>
