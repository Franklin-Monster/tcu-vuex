<template>
  <div id="select-users">
    <Header></Header>
    <TeacherUser v-if="isTeacher" @cancelClick="cancelClick"></TeacherUser>
    <DirectorUser v-if="isDirector" @cancelClick="cancelClick"></DirectorUser>
    <PresidentUser v-if="isPresident" @cancelClick="cancelClick"></PresidentUser>
    <TextbookUser v-if="isTextbook" @cancelClick="cancelClick"></TextbookUser>
    <div
      class="message"
      :class="{'message-in':isMessageIn,'disapper': isDisapper}"
      v-if="noSelected"
    >请选择您的身份</div>
    <div class="select-box-content" :class="{'disapper': isDisapper}" v-if="noSelected">
      <div class="select-box" @click="teacherClick">
        <div>
          <img src="@/assets/img/termStart/p1.png" alt />
        </div>
        <span>专业教师</span>
      </div>
      <div class="select-box" @click="directorClick">
        <img src="@/assets/img/termStart/p2.png" alt />
        <span>专业主任</span>
      </div>
      <div class="select-box" @click="secretaryClick">
        <img src="@/assets/img/termStart/p3.png" alt />
        <span>教学秘书</span>
      </div>
      <div class="select-box" @click="presidentClick">
        <img src="@/assets/img/termStart/p4.png" alt />
        <span>教务院长</span>
      </div>
      <div class="select-box" @click="textbookClick">
        <img src="@/assets/img/termStart/p5.png" alt />
        <span>教材科人员</span>
      </div>
    </div>
    <div class="footer">天津城建大学 2021</div>
  </div>
</template>

<script>
import Header from "./ChildComponents/header";
import TeacherUser from "./ChildComponents/teacherUser";
import DirectorUser from "./ChildComponents/directorUser";
import PresidentUser from "./ChildComponents/presidentUser";
import TextbookUser from "./ChildComponents/textbookUser";
export default {
  data() {
    return {
      isMessageIn: false,
      isDisapper: false,
      noSelected: true,
      isTeacher: false,
      isDirector: false,
      isPresident: false,
      isTextbook: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isMessageIn = true;
    }, 200);
  },
  methods: {
    teacherClick() {
      this.isDisapper = true;
      setTimeout(() => {
        this.noSelected = false;
        this.isTeacher = true;
      }, 600);
    },
    directorClick() {
      this.isDisapper = true;
      setTimeout(() => {
        this.noSelected = false;
        this.isDirector = true;
      }, 600);
    },
    presidentClick() {
      this.isDisapper = true;
      setTimeout(() => {
        this.noSelected = false;
        this.isPresident = true;
      }, 600);
    },
    textbookClick() {
      this.isDisapper = true;
      setTimeout(() => {
        this.noSelected = false;
        this.isTextbook = true;
      }, 600);
    },
    secretaryClick() {
      this.$message('暂未开放');
    },
    cancelClick() {
      this.isTeacher = false;
      this.isDirector = false;
      this.noSelected = true;
      this.isDisapper = false;
      this.isPresident = false;
      this.isTextbook = false;
    },
  },
  components: {
    Header,
    TeacherUser,
    DirectorUser,
    PresidentUser,
    TextbookUser,
  },
};
</script>

<style lang="scss" >
#select-users {
  margin: 0;
  padding: 0;
  background-image: linear-gradient(#c1d9f3, #fff);
  height: 100%;
  overflow: hidden;
  .message {
    font-size: 3.125rem;
    color: #fff;
    background-color: #2dd1d3;
    width: 32.5rem;
    height: 6.5rem;
    text-align: center;
    line-height: 6.5rem;
    border: #2dd1d3 0.0625rem solid;
    border-radius: 1rem;
    margin-top: 6rem;
    margin-left: -35rem;
  }
  .message-in {
    transform: translateX(4rem);
    transition: all 1s ease;
    margin-left: 0;
  }
  .select-box-content {
    width: 100%;
    margin: 6.5rem 0;
    display: flex;
    justify-content: center;
  }
  .select-box {
    width: 13.375rem;
    text-align: center;
    margin: 1.5rem 2rem;
    font-size: 1.25rem;
    transition: all 2s linear;
  }
  .select-box :hover {
    transform: translateY(-1.5rem);
    cursor: pointer;
  }
  .footer {
    font-size: 1.125rem;
    text-align: center;
    display: fixed;
    bottom: 0;

  }
  .disapper {
    opacity: 0;
    transform: scale3d(-3,-3,3) rotate3d(3,3,3,360deg);
    transition: all 1s ease;
  }
  .none {
    display: none;
  }
}
</style>