<template>
  <div id="president-user">
    <div class="title">院长审核表格</div>
    <div class="return" @click="cancelClick">
      <el-button type="primary" round>返回</el-button>
    </div>
    <div class="form">
      <div class="form-item">
        <span>选择主任:</span>
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
      <div>电子签名：</div>
      <section class="signature">
        <div class="signatureBox">
          <div class="canvasBox" ref="canvasHW">
            <canvas
              ref="canvasF"
              @touchstart="touchStart"
              @touchmove="touchMove"
              @touchend="touchEnd"
              @mousedown="mouseDown"
              @mousemove="mouseMove"
              @mouseup="mouseUp"
            ></canvas>
            <div class="btnBox">
              <el-button class="check-button" type="primary" @click="overwrite">重写</el-button>
              <el-button class="check-button" type="primary" @click="commit">提交签名</el-button>
            </div>
          </div>
        </div>
        <div class="form-item">
          <span>确认签名：</span>
          <img class="imgCanvas signed" :src="imgUrl" v-show="imgUrl != ''" />
        </div>
      </section>
      <br><br><br><br>
      <div class="btnBox">
        <el-button class="check-button" type="primary" @click="submitClick">提交</el-button>
        <el-button class="check-button" type="primary" @click="cancelClick">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropTeacher: "请选择待审核主任",
      dropClass: "请选择待审核课程",
      isCheck: false,
      stageInfo: "",
      imgUrl: "",
      client: {},
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      isViewAutograph: this.$route.query.isViews > 0,
      contractSuccess: this.$route.query.contractSuccess,
    };
  },
  mounted() {
    let canvas = this.$refs.canvasF;
    canvas.height = this.$refs.canvasHW.offsetHeight - 500;
    canvas.width = this.$refs.canvasHW.offsetWidth - 50;
    this.canvasTxt = canvas.getContext("2d");
    this.stageInfo = canvas.getBoundingClientRect();
  },
  methods: {
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
          this.cancelClick()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消提交",
          });
        });
    },
    touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clienX,
          y: ev.targetTouches[0].clientY,
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top,
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stageInfo.left,
          y: ev.targetTouches[0].clientY - this.stageInfo.top,
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    //pc
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();

      let obj = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
      this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.points.push(obj);
      this.isDown = true;
    },
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();

      let obj = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
      this.canvasTxt.beginPath();
      this.canvasTxt.moveTo(this.startX, this.startY);
      this.canvasTxt.lineTo(obj.x, obj.y);
      this.canvasTxt.stroke();
      this.canvasTxt.closePath();
      this.points.push(obj);
      this.points.push({ x: -1, y: -1 });
      this.isDown = false;
    },
    //重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
      this.imgUrl = "";
    },
    //提交签名
    commit() {
      this.imgUrl = this.$refs.canvasF.toDataURL();
    },
  },
};
</script>

<style lang="scss" scoped>
#president-user {
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
      margin: 2rem 0;
      .el-input {
        width: 450px;
        margin: 0 1.5rem;
      }
    }
  }
}
.signatureBox {
  width: 100%;
  height: calc(100% - 50px);
  background-color: #eee;
  border: #2fb6f6 solid 0.125rem;
  border-radius: 3.6rem;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  display: flex;
  flex-direction: column;
  margin: 0 5.6rem;
}
.canvasBox {
  box-sizing: border-box;
  flex: 1;
  margin: 1rem auto;
}

.btnBox {
  padding: 10px;
  text-align: center;
}
.btnBox button:first-of-type {
  border-radius: 4px;
  height: 40px;
  width: 80px;
  font-size: 14px;
}
.btnBox button:last-of-type {
  border-radius: 4px;
  height: 40px;
  width: 80px;
  font-size: 14px;
}
.signed {
  background-color: #fff;
  margin: 0 0.5rem;
  border: #fff solid 0.125rem;
  border-radius: 3.6rem;
  height: 10rem;
}
</style>