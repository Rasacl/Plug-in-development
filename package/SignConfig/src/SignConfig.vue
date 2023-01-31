<template>
  <div class="DecoratorConfig" ref="decoratorConfig" v-if="show">
    <div class="DecoratorConfig drawerclass">
      <FormConfig
        :form="form"
        :DecoratorConfig="DecoratorConfig"
        uiContent="configUI"
        :maxblocklines="maxblocklines"
        :originPath="originPath"
        :colorPick="colorPick"
      />
      <div v-if="DecoratorConfig.configUIpro">
        <!-- <Panel name="高级"> -->
        <span class="header">
          <div></div>
          <span class="header-title">高级</span>
        </span>
        <!-- <div class="header">高级</div> -->
        <div slot="content" class="content">
          <FormConfig
            :form="form"
            :DecoratorConfig="DecoratorConfig"
            uiContent="configUIpro"
            :maxblocklines="maxblocklines"
            :alwaysblock="true"
            :originPath="originPath"
            :colorPick="colorPick"
          />
        </div>
        <!-- </Panel> -->
      </div>
      <div class="drawbottom">
        <Button size="large" type="primary" @click="confirmForm">保存</Button>
      </div>
    </div>
  </div>
</template>
<script>
import FormConfig from "../../FormConfig";
import { clone, getField } from "../../../public/utils";
export default {
  name: "SignConfig",
  components: {
    FormConfig,
  },
  props: ["config"],
  data() {
    return {
      form: {},
      DecoratorConfig: {},
      show: false,
      maxblocklines: {},
      originPath: "",
      colorPick: {
        colorMultSetting: {
          isShowHeader: true, // 是否显示头部（包含名称和颜色带展示）
          isHasSolid: true, // 是否需要显示常规拾色器
          gradientOrSubsection: "gradient", // 渐变色的类型是“gradient（渐变）”，“subsection（分段）”，“空字符串（代表不需要渐变色组件）”
          isShowBottomButton: true, // 是否展示底部（确认，取消按钮）
          alpha: true, // 是否展示透明度条
        },
        data: {
          type: "",
          single: {
            value: {
              0.33: "rgba(233,35,240,0.14)",
              0.66: "rgba(235,71,71,0.84)",
            },
            TSvalue: [],
          },
        },
        classification: "single",
      },
      SignChangeEvent: "saveForm",
    };
  },
  mounted() {
    this.initConfig(this.config);
  },
  methods: {
    initConfig(objetConfig) {
      let that = this;
      let configData = objetConfig.config;
      if (objetConfig.SignChangeEvent) {
        that.SignChangeEvent = objetConfig.SignChangeEvent;
      }
      if (objetConfig.theme === "white") {
        require('../../../public/assets/font/iconfont.css')
        require("@uino/kiss-ui/dist/styles/kiss-ui.css");
        require("../../../public/assets/css/white-theme.less");
        if (objetConfig.size === 'small') {
          require('../../../public/assets/css/small-style.less')
        }
      } else if (objetConfig.theme === "dark" || !objetConfig.theme) {
        require('../../../public/assets/font/iconfont.css')
        require("@uino/kiss-ui/dist/styles/kiss-ui-proxima.css");
        require("../../../public/assets/css/dark-theme.less");
        if (objetConfig.size === 'small') {
          require('../../../public/assets/css/small-style.less')
        }
      }
      that.DecoratorConfig = configData;
      that.show = true;
      that.initData(clone(configData));
    },
    initData(configData) {
      const form = clone(this.form);
      configData.configUI.forEach((item) => {
        const curkey = form[item.des];
        // || item.type === 'color'
        if (!curkey && curkey !== false && curkey !== "" && curkey !== 0) {
          if (item.des.indexOf(",") >= 0) {
            const strArr = item.des.split(",");
            if (item.gradientRamp) {
              strArr.forEach((itemStrArr) => {
                let val = getField(configData.config, itemStrArr);
                // 用来存储改变格式的数据
                const objVal = {};
                if (typeof val === "string") {
                  val = this.colorRgb(val);
                } else {
                  val.intervals.forEach((itemVal, index) => {
                    objVal[itemVal] = this.colorRgb(val.values[index]);
                  });
                  val = JSON.parse(JSON.stringify(objVal));
                }
                // 因为只有一个值，所以暂没去重  以及下面直接用的数组的第一个元素
                if (
                  !this.colorPick.data.single.TSvalue.includes(val) &&
                  this.colorPick.data.single.TSvalue.length < 2
                ) {
                  this.colorPick.data.single.TSvalue.push(val);
                }
              });
              this.colorPick.data.single.value =
                this.colorPick.data.single.TSvalue[0]; // eslint-disable-line  prefer-destructuring
              form[item.des] = getField(configData.config, strArr[0]);
            } else {
              form[item.des] = getField(configData.config, strArr[0]);
            }
          } else {
            form[item.des] = getField(configData.config, item.des);
            if (item.gradientRamp) {
              if (form[item.des].constructor === Object) {
                this.colorPick.data.single.value = {};
                form[item.des].intervals.forEach((itemCol, index) => {
                  this.colorPick.data.single.value[itemCol] = this.colorRgb(
                    form[item.des].values[index]
                  );
                });
              } else {
                this.colorPick.data.single.value = this.colorRgb(
                  form[item.des]
                );
              }
            }
          }
        } else if (item.gradientRamp) {
          if (form[item.des].constructor === Object) {
            this.colorPick.data.single.value = {};
            form[item.des].intervals.forEach((itemCol, index) => {
              this.colorPick.data.single.value[itemCol] = this.colorRgb(
                form[item.des].values[index]
              );
            });
          } else {
            this.colorPick.data.single.value = this.colorRgb(form[item.des]);
          }
        }

        if (item.block?.line) {
          if (item.block.name && !this.maxblocklines[item.block.name]) {
            this.maxblocklines[item.block.name] = 1;
          }
          if (item.block.line > this.maxblocklines[item.block.name]) {
            this.maxblocklines[item.block.name] = item.block.line;
          }
        }
      });
      if (configData.configUIpro) {
        configData.configUIpro.forEach((item) => {
          const curkey = form[item.des];
          if (!curkey && curkey !== false && curkey !== "" && curkey !== 0) {
            if (item.des.indexOf(",") >= 0) {
              const str = item.des.split(",")[0];
              form[item.des] = getField(configData.config, str);
            } else {
              form[item.des] = getField(configData.config, item.des);
            }
          }
          if (item.block?.line) {
            if (item.block.name && !this.maxblocklines[item.block.name])
              this.maxblocklines[item.block.name] = 1;
            if (item.block.line > this.maxblocklines[item.block.name]) {
              this.maxblocklines[item.block.name] = item.block.line;
            }
          }
        });
      }
      this.form = form;

      // console.log(this.DecoratorConfig, 'DecoratorConfig');
      // console.log(this.maxblocklines, 'maxblocklines');
      // console.log(this.form, 'form');
      // console.log(this.originPath, 'originPath');
      // console.log(this.colorPick, 'colorPick');
    },
      confirmForm() {
        console.log(this.form);
      const sendForm = new CustomEvent(this.SignChangeEvent, {
        detail: {
          form: this.form,
        },
      });
      document.dispatchEvent(sendForm);
    },

    colorRgb(val) {
      // 16进制颜色值的正则
      const reg =
        /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{4}|[0-9a-fA-f]{8})$/;
      // 把颜色值变成小写
      let color = val.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4 || color.length === 5) {
          let colorNew = "#";
          for (let i = 1; i < color.length; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        const colorChange = [];
        for (let i = 1; i < 7; i += 2) {
          colorChange.push(parseInt(`0x${color.slice(i, i + 2)}`)); // eslint-disable-line   radix
        }
        if (color.length === 7) {
          colorChange.push(1);
        } else if (color.length === 9) {
          colorChange.push(parseInt(`0x${color.slice(7, 9)}`) / 255); // eslint-disable-line   radix
        }
        return `rgba(${colorChange.join(",")})`;
      }
      return color;
    },
  },
};
</script>
<style scoped lang="less">
// @import "~@uino/kiss-ui/src/styles/custom.less";

/deep/ .ivu-tooltip {
  z-index: 1000;
  position: absolute;
  margin-left: 4px;

  .ts-remarl {
    cursor: pointer;
  }
}

// /deep/ .ivu-form-item-error-tip {
//     margin-left: 160px;
// }

.DecoratorConfig-header {
  color: rgb(51, 51, 51);
  font-size: 16px;
  line-height: 18px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-overflow: ellipsis;
  width: 300px;
}

.DecoratorConfig {
  font-size: 12px;
  // color: #333333;
  line-height: 16px;
  width: 478px;
  height: 100%;
  padding: 0 9px;
}

.drawerclass {
  height: 100%;
  overflow: auto;
  // padding-bottom: 53px;
  position: absolute;

  /deep/ .ivu-form-item-content {
    margin-left: 0 !important;
  }
}

.drawbottom {
  width: 100%;
  // position: fixed;
  z-index: 99999;
  // bottom: 0;
  // left: 0;
  // background: #fafafa;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin-bottom: 20px;
}

.header {
  display: flex;
  align-items: center;
  width: auto;
  height: 30px;
  margin: 20px 0;
  justify-content: flex-start;
  position: relative;

  div {
    height: 14px;
    width: 3px;
    background: #ff954b;
    position: absolute;
    left: -8px;
  }

  span {
    font-family: MicrosoftYaHeiSemibold;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

/deep/ .ivu-collapse {
  border: none;
}

/deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  line-height: 30px;
  height: 30px;
  margin-bottom: 5px;
  padding: 0;
}

/deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-content {
  padding: 30px 0 0;
}

// /deep/ .ivu-form-item-content {
//     margin-left:0 !important;
// }
// .titleStyle{
// padding-bottom:20px;
// }
// .labelStyle {
//     display: flex;
//     justify-content: flex-start;
//     padding-bottom: 16px;

//     /deep/.ivu-form-item-label {
//         line-height: 30px;
//         font-size: 12px;
//         padding: 0px;
//         flex: 0 0 160px;
//     }
// }

// /deep/.ivu-drawer-header-inner {
//     //抽屉标题样式修改
//     font-size: 16px;
//     line-height: 18px;
//     font-weight: normal;
// }

// /deep/ .vue-gpickr {
//     border: 1px solid #ccc;
//     box-shadow: none;
// }

// .line-height-21 {
//     line-height: 21px;
// }

// .config-decfromblock {
//     height: 170px;
//     width: 240px;
//     line-height: 20px;
//     font-size: 12px;
//     background-color: #F8F9FA;
//     box-shadow: 0 2px 12px 0 #3333331e;
//     border: 1px solid #E5E5E5;
//     padding: 6px 6px 0;
//     border-radius: 4px;
//     position: relative;
// }

// .config-decblockimg {
//     width: 100%;
//     height: 129px;
//     border-radius: 4px 4px 0 0;
//     object-fit: cover;
// }

// .config-decblockimghover {
//     width: 100%;
//     height: 135px;
//     background: rgba(0, 0, 0, 0.50);
//     position: absolute;
//     top: 0;
//     left: 0;
//     z-index: 2;
//     padding: 6px 6px 0;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     border-radius: 4px 4px 0 0;
// }
</style>
