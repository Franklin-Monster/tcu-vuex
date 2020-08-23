<template>
  <div id="teacher-user">
    <div class="title">教师提交表格</div>
    <div class="return" @click="cancelClick"><el-button type="primary" round>返回</el-button></div>
    <div class="form">
      <div class="form-item">
        <span>课&nbsp;程&nbsp;号&nbsp;:</span>
        <el-input type="number" v-model="classID" placeholder="请输入课程号"></el-input>
      </div>
       <div class="form-item">
        <span>考核方式:</span>
        <el-input v-model="taskWay" placeholder="请输入课程考核方式"></el-input>
      </div>
      <div class="form-item">
        <span>答疑时间:</span>
        <el-date-picker v-model="answerTime" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <div class="form-item">
        <span>指导时间:</span>
        <el-date-picker v-model="directTime" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <div class="form-item">
        <span>选择教材:</span>
        <el-input v-model="switchBook" placeholder="请输入课程考核方式"></el-input>
      </div>
      <div class="form-item teach-calc">
        <span>教学日历:</span>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传.xls文件，且不超过10MB</div>
      <div class="sublime">
        <el-button type="primary" @click="submitClick">提交</el-button>
        <el-button type="danger" @click="cancelClick">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classID:"",
      taskWay: "",
      answerTime: "",
      directTime: "",
      switchBook: "",
      teachCalc: "",
    };
  },
  methods: {
    submitClick() {
      this.$confirm("您确认提交吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消提交",
          });
        });
    },
    cancelClick(){
        this.$emit('cancelClick')
    }
  },
};
</script>

<style lang="scss" scoped>
#teacher-user {
  width: 60rem;
  height: 57.5rem;
  opacity: 1;
  transition: all 2s liner;
  margin: 2.5rem auto;
  .title{
      font-size: 2rem;
      margin-left: -2rem;
  }
  .return{
      position: absolute;
      left: 2rem;
      top: 7rem;
  }
  .form {
    padding: 0.75rem 1.5rem;
    .form-item {
      height: 6.25rem;
      display: flex;
      line-height: 6.25rem;
      .el-input {
        width: 450px;
        margin: 0 1.5rem;
      }
    }
    .teach-calc {
      height: 16.25rem;
      span {
        margin-right: 1.5rem;
      }
    }
    .el-upload__tip {
      height: 1.25rem;
      margin: 0.5rem 6rem;
    }
  }
  .sublime {
    width: 60rem;
    margin-left: 18rem;
    .el-button {
      margin: 0 2.4rem;
    }
  }
}
</style>