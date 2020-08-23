<template>
  <div id="teacher-user">
    <div class="title">教材科发放教材表格</div>
    <div class="return" @click="cancelClick">
      <el-button type="primary" round>返回</el-button>
    </div>
    <div class="form">
      <div class="form-item">
        <span>课&nbsp;程&nbsp;号&nbsp;:</span>
        <el-input type="number" v-model="classID" placeholder="请输入课程号"></el-input>
      </div>
      <div class="form-item">
        <span>是否审核:</span>
        <el-input v-model="isCheck" :disabled="true"></el-input>
      </div>
      <div class="form-item">
        <span>发放时间:</span>
        <el-date-picker v-model="pushTime" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <div class="form-item">
        <span>选择教材:</span>
        <el-input v-model="switchBook" placeholder="请输入课程考核方式"></el-input>
      </div>
      <div class="sublime">
        <el-button type="primary" @click="submitClick">发放</el-button>
        <el-button type="danger" @click="cancelClick">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classID: "",
      taskWay: "",
      pushTime: "",
      switchBook: "",
      teachCalc: "",
      isCheck: "未审核",
    };
  },
  methods: {
    submitClick() {
      if (this.isCheck == "未审核") {
        this.$alert("该教材未审核", "发放失败", {
          confirmButtonText: "确定",
          callback: () => {
            this.$message({
              type: "error",
              message: "发放失败",
            });
          },
        });
      } else {
        this.$confirm("您确认发放吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "发放成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消提交",
            });
          });
      }
    },
    cancelClick() {
      this.$emit("cancelClick");
    },
  },
  watch: {
    classID(val) {
      if (val == "1705080106") {
        this.isCheck = "已审核";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#teacher-user {
  width: 60rem;
  height: 40.5rem;
  opacity: 1;
  transition: all 2s liner;
  margin: 2.5rem auto;
  .title {
    font-size: 2rem;
    margin-left: -2rem;
  }
  .return {
    position: absolute;
    top: 7rem;
    left: 2rem;
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