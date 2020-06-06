<template>
  <div id="teacher-login">
    <transition-group name="alert">
      <div class="alert" ref="alert" :key="code">
        <el-alert title="登录成功" type="success" center show-icon></el-alert>
      </div>
    </transition-group>
    <div class="teacher-login-title">天津城建大学VPN登录</div>
    <div class="teacher-login-left">
      <div class="left-title">教师登录窗口</div>
      <div class="left-br"></div>
      <div class="left-content">
        <p>
          为了方便您在外网访问学校内网资源，学校开通了新版VPN，无需安装客户端和插件，
          支持电脑和手机直接使用，为了获得更好的体验建议使用Chrome、Firefox、IE11、Edge、Safari等浏览器。
        </p>
        <p>账号为教师和学生的校园网认证用户名和密码。</p>
        <p>初始密码为111111</p>
        <p class="left-student-login">
          此处为教师登录窗口，学生登录请访问<span @click="studentLoginClick">http://webvpn1.tcu.edu.cn</span>
        </p>
      </div>
    </div>
    <div class="teacher-login-right">
      <div class="right-title">账号登录</div>
      <div class="right-br"></div>
      <div class="right-input">
        <div class="el-input input1">
          <el-input
            placeholder="教师用户"
            prefix-icon="el-icon-user"
            class="input"
            v-model="teacherNum"
          ></el-input>
        </div>
        <div class="el-input input2">
          <el-form @submit.native.prevent>
            <el-input
              placeholder="密码"
              prefix-icon="el-icon-unlock"
              class="input"
              v-model="teacherPassWord"
              show-password
              @keyup.enter.native="handleSubmit"
            ></el-input>
          </el-form>
        </div>
        <div class="el-input input3" ref="input3">
          <el-input
            placeholder="验证码"
            prefix-icon="el-icon-unlock"
            class="input"
            v-model="Qrcode"
            @keyup.enter.native="handleSubmit"
          ></el-input>
        </div>
        <div class="right-code" ref="code">
          <img src="../../assets/img/teacherLogin-code.png" alt />
        </div>
        <div class="input-checkbox" ref="checkbox">
          <span class="noNum" ref="noNum">请输入账号!</span>
          <span class="noNull" ref="noNull">密码不能为空！</span>
          <span class="noCode" ref="noCode">请输入验证码！</span>
          <span class="falseNum" ref="falseNum">用户名密码错误</span>
          <input type="checkbox" />
          下次自动登录
        </div>
        <div class="input-button" @click="handleSubmit" ref="login">登录</div>
      </div>
    </div>
    <div class="footer-word">Copyright © 2019 天津城建大学</div>
    <div class="empty">{{num}}{{code}}{{passWord}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      teacherNum: "",
      teacherPassWord: "",
      Qrcode: "",
      num: "",
      passWord: "",
      code: ""
    };
  },
  mounted(){

  },
  methods: {
    studentLoginClick() {
      this.$router.push({ url: "/login/student", name: "studentlogin" });
    },
    handleCodeStyle() {
      this.makeBlock("input3");
      this.makeBlock("code");
      this.$refs.checkbox.style.top = 276 + "px";
      this.$refs.login.style.top = 306 + "px";
    },
    goNextLogin() {
      this.$router.push({ url: "/login/next", name: "nextlogin" });
    },
    handleSubmit() {
      this.num = this.teacherNum;
      this.passWord = this.teacherPassWord;
      this.code = this.Qrcode;
      this.handleCodeStyle();
      if (
        this.num == 1705080106 &&
        this.passWord == this.PassWord &&
        this.code == 9595
      ) {
        this.handleNull();
        this.makeNone("falseNum");
        this.makeBlock("alert");
        setTimeout(() => {
          this.goNextLogin();
        }, 1000);
      } else {
        this.makeBlock("falseNum");
      }
      this.handleNull();
    },
    handleNull() {
      if (!this.isNull(this.num) && this.isNull(this.passWord)) {
        this.makeNone("noNum");
      } else if (
        !this.isNull(this.num) &&
        !this.isNull(this.passWord) &&
        this.isNull(this.code)
      ) {
        this.makeNone("falseNum");
        this.makeNone("noNum");
        this.makeNone("noNull");
        this.makeBlock("noCode");
      } else {
        this.makeNone("noCode");
        this.makeNone("noNum");
        this.makeNone("noNull");
      }
    }
  },
  computed:{
    ...mapState(["PassWord"])
  }
};
</script>

<style lang="scss">
#teacher-login {
  position: absolute;
  background: url("../../assets/img/teacherLogin-bgc.jpg") no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  z-index: -10;
  overflow: hidden;
  .alert {
    display: none;
    .el-alert--success {
      width: 240px;
      height: 36px;
      background: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      top: 24px;
      margin: 0 630px;
    }
  }
  .alert-enter-active {
    transition: all ease 5s;
  }
  .alert-leave-active {
    transition: all ease 2s;
  }
  .alert-enter {
    transform: translateY(-100px);
  }
  .alert-leave-to {
    opacity: 0;
  }
  .teacher-login-title {
    font-size: 33px;
    color: #ffffff;
    position: relative;
    top: 72px;
    left: 226px;
  }
  .teacher-login-left {
    width: 705px;
    height: 420px;
    background: rgba($color: #000000, $alpha: 0.68);
    position: relative;
    top: -10px;
    left: 228px;
    display: inline-block;
    border-radius: 5px;
    .left-title {
      width: 126px;
      color: #ffffff;
      font-size: 21px;
      font-weight: bolder;
      padding-top: 42px;
      margin: 0 auto;
    }
    .left-br {
      width: 600px;
      height: 1.5px;
      background-color: #ffffff;
      margin: 15px auto;
    }
    .left-content {
      width: 598px;
      text-align: left;
      text-indent: 32px;
      font-size: 16px;
      line-height: 2;
      color: #ffffff;
      margin: 15px auto;
      .left-student-login {
        color: rgb(255, 255, 0);
        font-size: 19px;
        span {
          text-decoration: underline;
        }
        span:hover {
          cursor: pointer;
        }
      }
    }
  }
  .teacher-login-right {
    width: 350px;
    height: 420px;
    background: rgba($color: #000000, $alpha: 0.68);
    display: inline-block;
    position: relative;
    top: 123px;
    right: 287px;
    left: 249px;
    border-radius: 5px;
    .right-title {
      color: #ffffff;
      font-size: 21px;
      font-weight: bolder;
      position: absolute;
      margin: 41px 129px;
    }
    .right-br {
      width: 300px;
      height: 2px;
      background-color: #ffffff;
      position: absolute;
      margin: 0 25px;
      margin-top: 85px;
    }
    .input1 {
      position: absolute;
      top: 100px;
      input::-webkit-input-placeholder {
        color: #ffffff;
      }
      .input {
        margin: 5px 24px;
      }
      .el-input__inner {
        background-color: rgba($color: #000000, $alpha: 0);
        text-indent: 2px;
        border-radius: 14px;
        border: 1px solid white;
        color: #ffffff;
        height: 42px;
        font-size: 14px;
        width: 85%;
      }
    }
    .input2 {
      position: absolute;
      top: 165px;
      input::-webkit-input-placeholder {
        color: #ffffff;
      }
      .input {
        margin: 5px 24px;
      }
      .el-input__inner {
        background-color: rgba($color: #000000, $alpha: 0);
        text-indent: 2px;
        border-radius: 14px;
        border: 1px solid white;
        color: #ffffff;
        height: 42px;
        font-size: 14px;
        width: 85%;
      }
    }
    .input3 {
      position: absolute;
      top: 230px;
      display: none;
      input::-webkit-input-placeholder {
        color: #ffffff;
      }
      .input {
        margin: 0 24px;
        margin-left: 24px;
      }
      .el-input__inner {
        background-color: rgba($color: #000000, $alpha: 0);
        text-indent: 2px;
        border-radius: 14px;
        border: 1px solid white;
        color: #ffffff;
        height: 42px;
        font-size: 14px;
        width: 50%;
      }
    }
    .right-code {
      position: absolute;
      top: 230px;
      right: 32px;
      display: none;
      img {
        width: 100px;
        height: 40px;
        background-color: #fff;
        border-radius: 10px;
      }
    }
    .input-checkbox {
      position: absolute;
      top: 220px;
      right: 30px;
      color: #ffffff;
      font-size: 14px;
      .noNull {
        color: #ff4505;
        padding-right: 95px;
        display: none;
      }
      .noNum {
        color: #ff4505;
        padding-right: 120px;
        display: none;
      }
      .noCode {
        color: #ff4505;
        padding-right: 95px;
        display: none;
      }
      .falseNum {
        color: #ff4505;
        padding-right: 95px;
        display: none;
      }
      input {
        vertical-align: middle;
      }
    }
    .input-button:hover {
      cursor: pointer;
    }
    .input-button {
      position: absolute;
      top: 251px;
      width: 85%;
      height: 50px;
      background-color: #ffffff;
      border-radius: 18px;
      text-align: center;
      font-size: 14px;
      font-weight: bolder;
      line-height: 50px;
      margin: 0 24px;
    }
  }
  .footer-word {
    color: #ffffff;
    font-size: 14px;
    position: absolute;
    bottom: 24px;
    width: 100%;
    text-align: center;
  }
  .empty {
    display: none;
  }
}
</style>