<template>
  <div id="teacher-user">
    <div class="title">主任审核表格</div>
    <div class="return" @click="cancelClick">
      <el-button type="primary" round>返回</el-button>
    </div>
    <div class="form">
      <div class="form-item">
        <span>选择教师:</span>
        <el-dropdown @command="handleCommandTeacher">
          <el-button type="primary">
            {{dropTeacher}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="张三">张三</el-dropdown-item>
            <el-dropdown-item command="李四">李四</el-dropdown-item>
            <el-dropdown-item command="王五">王五</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span v-if="isCheck">{{dropTeacher + '未审核'}}</span>
        <el-dropdown @command="handleCommandClass" v-if="isCheck">
          <el-button type="primary">
            {{dropClass}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="信息分析与决策">信息分析与决策</el-dropdown-item>
            <el-dropdown-item command="信息经济学">信息经济学</el-dropdown-item>
            <el-dropdown-item command="信息系统分析与设计">信息系统分析与设计</el-dropdown-item>
            <el-dropdown-item command="信息开发技术">信息开发技术</el-dropdown-item>
            <el-dropdown-item command="管理信息系统">管理信息系统</el-dropdown-item>
            <el-dropdown-item command="信息管理专业英语">信息管理专业英语</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button class="check-button" type="primary" @click="cancelClick">审核</el-button>
      </div>
      <div class="form-item">
        <span>审核时间:</span>
        <el-date-picker v-model="checkTime" type="date" placeholder="选择日期"></el-date-picker>
      </div>

      <div class="form-item">
        <span>选择课程:</span>
        <el-input v-model="switchClass" placeholder="请输入课程号"></el-input>
      </div>
      <div class="form-item">
        <span>选择教材:</span>
        <el-input v-model="switchBook" placeholder="请选择教材"></el-input>
      </div>
      <div class="form-item teach-calc">
        <span>教研室活动计划表:</span>
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
      <div class="form-item">
        <span>是否提交至教务院长：</span>
        <el-radio v-model="radio" label="1">是</el-radio>
        <el-radio v-model="radio" label="2">否</el-radio>
      </div>
      <div class="sublime">
        <el-button type="primary" @click="submitClick">保存</el-button>
        <el-button type="danger" @click="cancelClick">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkTime: "",
      switchBook: "",
      switchClass: "",
      dropTeacher: "请选择待审核教师",
      dropClass: "请选择待审核课程",
      isCheck: false,
      radio: 0,
    };
  },
  methods: {
    submitClick() {
      this.$confirm("您确认保存吗", "提示", {
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
    cancelClick() {
      this.$emit("cancelClick");
    },
    handleCommandTeacher(command) {
      this.dropTeacher = command;
      this.isCheck = true;
    },
    handleCommandClass(command) {
      this.dropClass = command;
    },
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
  .title {
    font-size: 2rem;
    margin-left: -2rem;
  }
  .return {
    position: absolute;
    top: 7.4rem;
    left: 2rem;
  }
  .form {
    padding: 0.75rem 1.5rem;
    .check-button {
      width: 6.25rem;
      height: 2.525rem;
      margin: auto 8.5rem;
    }
    .el-dropdown {
      margin: 0 1.5rem;
    }
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
  }
  .sublime {
    width: 60rem;
    margin-left: 18rem;
    .el-button {
      margin: 0 2.4rem;
    }
  }
  .el-radio, .el-radio__input {
    line-height: 6rem;
  }
}
</style>


