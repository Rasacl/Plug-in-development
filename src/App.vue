<template>
  <div id="app">
    <SignConfig :config="configData" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      configData: {
        config: {
    "name": "超级数据面板-极光",
    "version": "1.0",
    "config": {
        "scaleFactor":10000,
        "场景类型": "地图",
        "boundingBox": [
            1,
            1,
            1
        ],
        "inheritScale": false,
        "localPosition": [
            0,
            0,
            0
        ],
        "layout": [
            0.5,
            1,
            0.5
        ],
        "angles": [
            0,
            0,
            0
        ],
        "keepSize": false,
        "items": [{
                "type": "Panel/HTMLElement",
                "tag": "HTML面板",
                "config": {
                    "inheritOpacity": false,
                    "inheritColor": false,
                    "lockYAxis": false,
                    "useSpriteMaterial": false,
                    "size": 0.2,
                    "alwaysOnTop": false,
                    "layout": [
                        "Center",
                        "Top",
                        "Center"
                    ],
                    "pivotLayout": [
                        "Center",
                        "Bottom",
                        "Center"
                    ],
                    "skipBoundingBox": true,
                    "pivot": [0.5, 1],
                    "onlySelf": false,
                    "layoutOffset": [0,
                        0.9,
                        0
                    ],
                    "rotation": [0,
                        0,
                        0
                    ],
                    "skipBoundingBox": true,
                    "showMapping": {
                        "JG_ThreeS_title_aurora3": {
                            "type": "text",
                            "getMethod": "objectProperty",
                            "propertyPath": {
                                "type": "name",
                                "value": ''
                            },
                        },
                    },
                    "userData": {
                        "indexItem": [],

                    },
                    "html": `<style>
                    * {
                    margin: 0;
                    padding: 0;
                }
                #JG_ThreeS_all_state{
                    overflow: hidden;
                    user-select: none;
                  -webkit-user-drag: none;
                }
        
                #JG_ThreeS_aurora_3 {
                //    min-height: 460px;
                   min-width: 650px;
                   overflow: hidden;
                   display: flex;
                   opacity: 0;
                   transform: translateX(-699px);
                   animation:  swiperTransform 1.1s ease 1;
                   animation-fill-mode: both;
                   background-image: url("./images/allMain.png");
                   background-size: 100% 100%;

                }
        
                #JG_ThreeS_swiper_aurora_3 {
                  width:100%;
                    height: 100%;
        
                }
        
        
                #JG_ThreeS_title_aurora3 {
                    padding-left:60px;
                    padding-right:40px;
                    word-break:keep-all;
                    white-space:nowrap;
                    width: 100%;
                    height: 120px;
                    display: flex;
                    align-items: center;
                    font-size: 50px;
                    font-weight: 400;
                    color: #D6E6E7;
                    opacity:0;
                    animation:  textOPacity 1s 0.5s linear 1;
                    animation-fill-mode: both;
                    background-image: url("./images/allTitle.png");
                    background-size: 100% 100%;
                    box-sizing: border-box;
                   
                }
        
                #JG_ThreeS_main_aurora3 {
                    box-sizing: border-box;
                    width: 100%;
                    /* height: calc(100% - 120px); */
                    // display: flex;
                    // flex-wrap: wrap;
                    padding:0px 51px 0;
                    padding-bottom: 25px;
                }
        
                .JG_ThreeS_all_state {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
        
                .JG_ThreeS_state_left {
                    font-size: 35px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #D6E6E7;
                    margin-right:140px;
                    animation:  textOPacity 1s 0.8s linear 1;
                    animation-fill-mode: both;
                    word-break:keep-all;
                    white-space:nowrap;
                }
        
                .JG_ThreeS_state_right {
                    font-size: 35px;
                    font-family: DIN;
                    font-weight: 500;
                    color: #0DE8D1;
                    animation:  textOPacity 1s 0.8s linear 1;
                    animation-fill-mode: both;
                    word-break:keep-all;
                    white-space:nowrap;
                }
        
                #JG_ThreeS_first_right {
                    display: flex;
                    align-items: center;
                }
        
                #JG_ThreeS_third_right {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
        
                .JG_ThreeS_sec_state {
                    // height: 50px;
                    // background: #29FF89;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 7px;
                    font-size: 25px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #142127;
                    padding: 4px 10px;
                    animation:  textOPacity 1s 0.8s linear 1;
                    animation-fill-mode: both;
                }
                #JG_ThreeS_first_state_aurora,#JG_ThreeS_sec_state_aurora,#JG_ThreeS_third_aurora{
                    box-sizing: border-box;
                    // height: 71px;
                    margin-top: 41px;
                }
                .JG_ThreeS_progress_matrix {
                    width: 100%;
                    height: 10px;
                    background-color: rgba(95, 94, 90, 0.1);
                    position: relative;
                    margin: 20px 0 20px 0;
                    animation:  textOPacity 1s 0.8s linear 1;
                    animation-fill-mode: both;
                }
        
                .JG_ThreeS_progress_value_matrix {
                    width:0%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 99;
                    height: 10px;
                    background-image: linear-gradient(to right, #FF9A2D, #FFE4B7);
                }
                @keyframes swiperTransform {
                    0%{
                        opacity: 0;
                   transform: translateX(-699px);
                    }
                    100%{
                        opacity: 1;
                   transform: translateX(0px);
                    }
                }
                @keyframes textOPacity {
                    0%{
                        opacity: 0;
                    }
                    90%{
                        opacity:1;
                    }
                    100%{
                        opacity: 1;
                    }
                }
    </style>
    <div id="JG_ThreeS_all_state">
    <div id="JG_ThreeS_aurora_3">
        <div id="JG_ThreeS_swiper_aurora_3">
            <div id="JG_ThreeS_title_aurora3"></div>
            <div id="JG_ThreeS_main_aurora3">
                
            </div>
        </div>
    </div>
</div>
  `,
                    "complete": function (ev) {
                        let obj = ev.object
                        let elementItems = obj._userData.indexItem
                        let JG_ThreeS_main_aurora3 = ev.object.element.querySelector("#JG_ThreeS_main_aurora3")
                        let strAll = ""
                        let valueArr = []
                        let stateValueArr = []
                        let valueElement = []
                        let progressElement = []
                        let stateElement = []
                        if (elementItems.length) {
                            for (let i = 0; i < elementItems.length; i++) {
                                if (elementItems[i].uuid) {
                                   
                                       let isShowStatePlay = elementItems[i].isShowState ? '' : 'display:none;'
                                    
                                       let isShowProgressPlay = elementItems[i].isShowProgress ? '' : 'display:none;'

                                    let str = ` <div id="JG_ThreeS_first_state_aurora" class="JG_ThreeS_all_state">
                                        <div id="JG_ThreeS_first_left${elementItems[i].uuid}" class="JG_ThreeS_state_left"></div>
                                        <div id="JG_ThreeS_first_right">
                                            <div id="JG_ThreeS_one_aurora${elementItems[i].uuid}" class="JG_ThreeS_state_right"></div>
                                            <div id="JG_ThreeS_two_aurora${elementItems[i].uuid}" class="JG_ThreeS_state_right"></div>
                                        </div>
                                    </div>
                                    <div id="JG_ThreeS_sec_state_aurora" class="JG_ThreeS_all_state" style=${isShowStatePlay}>
                                        <div id="JG_ThreeS_sec_left${elementItems[i].uuid}" class="JG_ThreeS_state_left"></div>
                                        <div id="JG_ThreeS_sec_right${elementItems[i].uuid}" class="JG_ThreeS_sec_state"></div>
                                    </div>
                                    <div id="JG_ThreeS_third_aurora" style="width: 100%;${isShowProgressPlay}">
                                        <div id="JG_ThreeS_third_top" class="JG_ThreeS_all_state">
                                            <div id="JG_ThreeS_third_left${elementItems[i].uuid}" class="JG_ThreeS_state_left"></div>
                                            <div id="JG_ThreeS_third_right">
                                                <div id="JG_ThreeS_value_matrix${elementItems[i].uuid}" style="display:none;"></div>
                                                <div id="JG_ThreeS_really_matrix${elementItems[i].uuid}" class="JG_ThreeS_state_right"></div>
                                                <div id="JG_ThreeS_units_matrix${elementItems[i].uuid}" class="JG_ThreeS_state_right"></div>
                                            </div>
                                        </div>
                                        <div class="JG_ThreeS_progress_matrix" id="JG_ThreeS_progress_matrix">
                                            <span id="JG_ThreeS_progress_value_matrix${elementItems[i].uuid}" class="JG_ThreeS_progress_value_matrix" style="width: 0%;"></span>
                                        </div>
                                    </div>`
                                    strAll = strAll + str
                                }

                            }
                            JG_ThreeS_main_aurora3.innerHTML = strAll


                            setTimeout(() => {
                                function setState(){                                 
                                    for (let r = 0; r < elementItems.length; r++) {
                                        if (elementItems[r].uuid) {
                                            if(elementItems[r].isShowState){
                                                let stateValue = ev.object.element.querySelector(`#JG_ThreeS_sec_right${elementItems[r].uuid}`)
                                                let fillColor = ev.object._userData.indexItem[r].fillColorConfig
                                                stateElement.push(stateValue)
                                                stateValueArr.push(stateValue.innerHTML)
                                                if(stateValue.innerHTML){
                                                    for(let i = 0;i < fillColor.length; i++){
                                                        if(fillColor[i].value == stateValue.innerHTML){
                                                            stateValue.style.backgroundColor = fillColor[i].color
                                                            break
                                                            
                                                        }else{
                                                            stateValue.style.backgroundColor = 'rgb(255,255,255)'
                                                        }
                                                    }
                                                }else{
                                                    stateValue.style.backgroundColor = ''
                                                }
                                            }
                                          
                                        }
                                    }

                                }
                                function setPro() {
                                    
                                    for (let r = 0; r < elementItems.length; r++) {
                                        if (elementItems[r].uuid) {
                                            if(elementItems[r].isShowProgress){
                                            let value = ev.object.element.querySelector(`#JG_ThreeS_value_matrix${elementItems[r].uuid}`)
                                            let reallyValue = ev.object.element.querySelector(`#JG_ThreeS_really_matrix${elementItems[r].uuid}`)
                                            let progressValue = ev.object.element.querySelector(`#JG_ThreeS_progress_value_matrix${elementItems[r].uuid}`)
                                            let colorPro = ev.object._userData.indexItem[r].progress[0]
                                            let max = colorPro.progressColor.max
                                            let min = colorPro.progressColor.min
                                            valueElement.push(value)
                                            progressElement.push(progressValue)
                                            let flags = Number(value.innerHTML)
                                            valueArr.push(value.innerHTML)
                                            // 判断是否为数字
                                            if (flags) {
                                                value.innerHTML = Number(value.innerHTML).toFixed(colorPro.digit)
                                                let turnInner = value.innerHTML
                                                let valueNumber = Number(value.innerHTML)
                                                let percent = parseInt((value.innerHTML / max) * 100)
    
                                                let steps = colorPro.progressColor.steps
                                                let arrCOlor = []
                                                let stringColor
                                                // 判断是否在进度条的最大值与最小值之间
                                                if (min <= turnInner && turnInner <= max) {
    
                                                    for (let i = 0; i < steps.length; i++) {
    
                                                        if (steps[i].condition == '=') steps[i].condition = '==';
                                                        if (eval(`${turnInner} ${steps[i].condition} ${steps[i].value}`)) {
                                                            reallyValue.innerHTML = 0
                                                            if (typeof steps[i].color == 'string') {
                                                                arrCOlor.push(steps[i].color)
                                                            } else {
                                                                for (let s = 0; s < steps[i].color.values.length; s++) {
                                                                    arrCOlor.push(steps[i].color.values[s])
                                                                }
                                                            }
                                                            stringColor = arrCOlor.join(',')
                                                            setTimeout(() => {
                                                                let timerNumber = setInterval(function () {
                                                                    if(progressValue.style.width){
                                                                        if (parseInt(progressValue.style.width) >= percent && Number(reallyValue.innerHTML) >= valueNumber) {
                                                                            reallyValue.innerHTML = turnInner
                                                                            clearInterval(timerNumber);
                                                                            return;
                                                                        } else {
                                                                            // 计算生长位数
                                                                            if (colorPro.digit == 0) {
                                                                                let getArr = String(((max - min) / 100)).split('.')
                                                                                let num = 0
                                                                                if (getArr.length > 1) {
                                                                                    for (let g = 0; g < getArr[1].length; g++) {
                                                                                        num++
                                                                                    }
                                                                                }
        
                                                                                reallyValue.innerHTML = Number(reallyValue.innerHTML) + (max - min) / 100
                                                                                reallyValue.innerHTML = Number(reallyValue.innerHTML).toFixed(num)
                                                                            } else {
        
                                                                                reallyValue.innerHTML = parseFloat(reallyValue.innerHTML) + (max - min) / 100
                                                                                reallyValue.innerHTML = Number(reallyValue.innerHTML).toFixed(colorPro.digit)
                                                                            }
                                                                            
                                                                            progressValue.style.width = parseInt(progressValue.style.width) + 1 + '%';
        
                                                                        }
                                                                    }
                                                                    
                                                                }, 20)
    
    
                                                            }, 700);
                                                            if (arrCOlor.length == 1) {
                                                                progressValue.style.backgroundImage = `linear-gradient(to right,${stringColor},${stringColor})`
                                                                // document.styleSheets[0].addRule(`#JG_ThreeS_progress_value_matrix${elementItems[r].uuid}`, `background-image:linear-gradient(to right,${stringColor},${stringColor})!important;`)
                                                            } else {
                                                                progressValue.style.backgroundImage = `linear-gradient(to right,${stringColor})`
                                                                // document.styleSheets[0].addRule(`#JG_ThreeS_progress_value_matrix${elementItems[r].uuid}`, `background-image:linear-gradient(to right,${stringColor})!important;`)
                                                            }
    
                                                            break;
                                                        } else {
                                                            reallyValue.innerHTML = Number(turnInner).toFixed(colorPro.digit)
                                                        }
    
    
    
                                                    }
    
    
    
                                                } else {
                                                    reallyValue.innerHTML = Number(turnInner).toFixed(colorPro.digit)
                                                }
                                            } else {
                                                reallyValue.innerHTML = value.innerHTML
                                            }
                                            }
                                        }
                                    }
                                }

                                setTimeout(() => {
                                    setPro()
                                    setState()
                                }, 100);
                                  
                    
                                
                                function reset() {
                                    progressElement.map(item => {
                                        item.style.width = 0 + '%'
                                    })
                                    valueArr = []
                                    stateValueArr = []
                                    valueElement = []
                                    progressElement = []
                                    stateElement = []
                                    setPro()
                                    setState()
                                }
                                obj.on('update', function () {
                                    let eleArr = []
                                    let stateEleArr = []
                                    valueElement.forEach(i => {
                                        eleArr.push(i.innerHTML)
                                    })
                                    stateElement.forEach(r => {
                                        stateEleArr.push(r.innerHTML)
                                    })
                                    if (valueArr.join('') != eleArr.join('')) {
                                        reset()
                                    }
                                    if(stateValueArr.join('') != stateEleArr.join('')){
                                        reset()
                                    }
        
        
                                }, 'updateProgress')
                                
                            }, 10);
                        }
                         

                    }
                }
            },
            {
                "type": "Icon/Model",
                "tag": "3D涟漪模型",
                "name": "3D涟漪模型",
                "config": {
                    "url": "model/mol/",
                    "inheritOpacity": false,
                    "inheritColor": false,
                    "onlySelf": false,
                    "lockYAxis": false,
                    "layoutOffset": [
                        0,
                        0,
                        0
                    ],
                    "layout": [
                        "Center",
                        "Top",
                        "Center"
                    ],
                    "style": {
                        "color": "#67FEFF",
                    },

                    "playAnimation": true,
                    "animationName": "_normal_",
                    "animationLoopType": "once",
                    "pivot": [
                        0.5,
                        1
                    ],
                    "scale": [
                        2,
                        2,
                        2
                    ],
                    "showHeadline": false,
                    "headline": {},
                    "userData": {
                        "size": 1
                    }
                }
            }
        ]
    },
    "configUI": [{
            "caption": "3D设置",
            "type": "block",
            "des": "指标配置"
        },
        {
            "caption": "场景类型",
            "content": "点标记在地图、园区、室内不同层级下的大小和距离进行设置，不同层级下的默认大小是基准值，作为调整参数的参考。",
            "type": "valueDefault",
            "des": "场景类型",
            "defaultValues": {
                "地图": {
                    "scaleFactor":10000
                },
                "园区": {
                    "scaleFactor": 10
                },
                "室内": {
                    "scaleFactor": 3
                }
            },
            "block": {
                "name": "3D设置",
                "line": 1
            }
        },
        {
            "caption": "大小",
            "content": "设置标记整体大小",
            'type': 'number',
            "des": "scaleFactor",
            "block": {
                "name": "3D设置",
                "line": 1
            }

        },
        {
            "caption": "保持大小",
            "content": "当开启保持大小时，以像素为单位，关闭保持大小时，以米为单位。",
            "type": "bool",
            "des": "keepSize",
            "block": {
                "name": "3D设置",
                "line": 1
            },
            "width": 100
        },

        {
            "caption": "基本样式",
            "type": "block",
            "des": "指标配置"
        },
        {
            "caption": "面向摄像机",
            "content": "开启后，无论摄像机角度如何变化，标记的正面始终面向屏幕。",
            "type": "MutexSwitch",
            "des": "items/0/config/useSpriteMaterial",
            "block": {
                "name": "基本样式",
                "line": 1
            },
            "width": 100
        },
        {
            "caption": "锁定Y轴",
            "content": "开启后，无论摄像机角度如何变化，标记的Y轴始终面向屏幕。",
            "type": "MutexSwitch",
            "des": "items/0/config/lockYAxis,items/1/config/lockYAxis",
            "block": {
                "name": "基本样式",
                "line": 1
            }
        },
        {
            "caption": "标题名称",
            "content": "取值路径输入规范：\n孪生体属性：userData/DATA/属性名\n孪生体编号：id\n孪生体名称：name\n监控：MONITOR/_/_/指标/value",
            "type": "stringWithSelect",
            "des": "items/0/config/showMapping/JG_ThreeS_title_aurora3/propertyPath",
            "options": [{
                    "type": "ID", // 选择框值
                    "typeName": "ID", // 选择框显示内容
                    "value": "", // 默认选择选择框时, 后面输入框的值
                    "content": "无需输入", // 输入框提示
                    "disabled": true, // 输入框是否置灰
                    "hidden": false // 输入框是否隐藏
                },
                {
                    "type": "name",
                    "typeName": "名称",
                    "value": "",
                    "content": "无需输入",
                    "disabled": true,
                    "hidden": false
                },
                {
                    "type": "attr",
                    "typeName": "属性",
                    "value": "",
                    "content": "无需输入",
                    "disabled": true,
                    "hidden": false
                },
                {
                    "type": "monitor",
                    "typeName": "监控数据",
                    "value": "MONITOR/_/_/名称/value",
                    "content": "请输入",
                    "disabled": false,
                    "hidden": false
                },
                {
                    "type": "customer",
                    "typeName": "自定义",
                    "value": "",
                    "content": "请输入",
                    "disabled": false,
                    "hidden": false
                },
                {
                    "type": "empty",
                    "typeName": "空",
                    "value": "",
                    "content": "无需输入",
                    "disabled": true,
                    "hidden": false
                }
            ],
            "block": {
                "name": "基本样式",
                "line": 1
            },

        },
        {
            "caption": "指标",
            "type": "indexblock",
            "des": "items/0/config/userData/indexItem",
            "min": 1, // 最小保留1项, 默认值0
            "max": 10, // 最多10项, 默认值999
            "default": {
                "JG_ThreeS_first_left": {
                    "type": "text",
                    "getMethod": "presetValue",
                    "presetValue": "温度",
                },
                "JG_ThreeS_one_aurora": {
                    "type": "text",
                    "getMethod": "objectProperty",
                    "propertyPath": {
                        "type": "monitor",
                        "value": "MONITOR/_/_/温度/value"
                    },
                    "toFixed": {
                        "type": "text",
                        "getMethod": "presetValue",
                        "presetValue": '0',
                    }
                },
                "JG_ThreeS_two_aurora": {
                    "type": "text",
                    "getMethod": "presetValue",
                    "presetValue": "C",
                },
                "JG_ThreeS_sec_left": {
                    "type": "text",
                    "getMethod": "presetValue",
                    "presetValue": "状态",
                },
                "JG_ThreeS_sec_right": {
                    "type": "text",
                    "getMethod": "objectProperty",
                    "propertyPath": {
                        "type": "monitor",
                        "value": "MONITOR/_/_/状态/value"
                    },
                    "stateText": true,
                },
                "JG_ThreeS_third_left": {
                    "type": "text",
                    "getMethod": "presetValue",
                    "presetValue": "储存使用率",
                },
                "JG_ThreeS_value_matrix": {
                    "type": "text",
                    "getMethod": "objectProperty",
                    "propertyPath": {
                        "type": "monitor",
                        "value": "MONITOR/_/_/储存使用率/value"
                    },
                },
                "isShowState": false,
                "isShowProgress": false,
                "JG_ThreeS_units_matrix": {
                    "type": "text",
                    "getMethod": "presetValue",
                    "presetValue": "%",
                },

                "progress": [{
                    // "color": {
                    //     "values": "#5c6532",
                    //     "intervals":0.5
                    //   },
                    "digit": 0,
                    "progressColor": {
                        "min": 0,
                        "max": 100,
                        "gradient": true,
                        "steps": [{
                                "condition": "<",
                                "value": 70,
                                "gradientRamp": true,
                                "color": {
                                    "values": [
                                        "#ffdc2f",
                                        "#fff6c7"
                                    ],
                                    "intervals": [
                                        0,
                                        1
                                    ],
                                    "gradientType": "vertical"
                                }
                            },
                            {
                                "condition": "<",
                                "value": 90,
                                "gradientRamp": true,
                                "color": {
                                    "values": [
                                        "#F59432",
                                        "#FFEB62"
                                    ],
                                    "intervals": [
                                        0,
                                        1
                                    ],
                                    "gradientType": "vertical"
                                }
                            },
                            {
                                "condition": "<",
                                "value": 100,
                                "gradientRamp": true,
                                "color": {
                                    "values": [
                                        "#CD1919",
                                        "#F6465C"
                                    ],
                                    "intervals": [
                                        0,
                                        1
                                    ],
                                    "gradientType": "vertical"
                                }
                            }
                        ]
                    },
                }, ],
                "fillColorConfig": [{
                        "value": "正常",
                        "color": "#2AEB78",
                    },
                    {
                        "value": "维修中",
                        "color": "#FFC332",
                    }
                ]
            },
            "config": [{
                    "caption": "指标 1 名称",
                    "type": "string",
                    "des": "JG_ThreeS_first_left/presetValue",
                },
                {
                    "caption": "单位",
                    "type": "string",
                    "des": "JG_ThreeS_two_aurora/presetValue",
                },
                {
                    "caption": "保留小数点位数",
                    "type": "string",
                    "des": "JG_ThreeS_one_aurora/toFixed/presetValue",
                },
                {
                    "caption": "指标 1 取值路径",
                    "content": "取值路径输入规范：\n孪生体属性：userData/DATA/属性名\n孪生体编号：id\n孪生体名称：name\n监控：MONITOR/_/_/指标/value",
                    "type": "stringWithSelect",
                    "des": "JG_ThreeS_one_aurora/propertyPath",
                    "options": [{
                            "type": "ID", // 选择框值
                            "typeName": "ID", // 选择框显示内容
                            "value": "", // 默认选择选择框时, 后面输入框的值
                            "content": "无需输入", // 输入框提示
                            "disabled": true, // 输入框是否置灰
                            "hidden": false // 输入框是否隐藏
                        },
                        {
                            "type": "name",
                            "typeName": "名称",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        },
                        {
                            "type": "attr",
                            "typeName": "属性",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        },
                        {
                            "type": "monitor",
                            "typeName": "监控数据",
                            "value": "MONITOR/_/_/名称/value",
                            "content": "请输入",
                            "disabled": false,
                            "hidden": false
                        },
                        {
                            "type": "customer",
                            "typeName": "自定义",
                            "value": "",
                            "content": "请输入",
                            "disabled": false,
                            "hidden": false
                        },
                        {
                            "type": "empty",
                            "typeName": "空",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        }
                    ],
                },
                {
                    "caption": "指标 2 名称",
                    "type": "string",
                    "des": "JG_ThreeS_sec_left/presetValue",

                },
                {
                    "caption": "指标 2 取值路径",
                    "type": "stringWithSelect",
                    "des": "JG_ThreeS_sec_right/propertyPath",
                    "options": [{
                            "type": "ID", // 选择框值
                            "typeName": "ID", // 选择框显示内容
                            "value": "", // 默认选择选择框时, 后面输入框的值
                            "content": "无需输入", // 输入框提示
                            "disabled": true, // 输入框是否置灰
                            "hidden": false // 输入框是否隐藏
                        },
                        {
                            "type": "name",
                            "typeName": "名称",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        },
                        {
                            "type": "attr",
                            "typeName": "属性",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        },
                        {
                            "type": "monitor",
                            "typeName": "监控数据",
                            "value": "MONITOR/_/_/名称/value",
                            "content": "请输入",
                            "disabled": false,
                            "hidden": false
                        },
                        {
                            "type": "customer",
                            "typeName": "自定义",
                            "value": "",
                            "content": "请输入",
                            "disabled": false,
                            "hidden": false
                        },
                        {
                            "type": "empty",
                            "typeName": "空",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        }
                    ],
                },
                {
                    "caption": "状态颜色",
                    "type": "colorTableUnique",
                    "des": "fillColorConfig",
                },
                {
                    "caption": "是否显示状态",
                    "type": "bool",
                    "des": "isShowState",
                },
                {
                    "caption": "指标 3 名称",
                    "type": "string",
                    "des": "JG_ThreeS_third_left/presetValue",
                },
                {
                    "caption": "单位",
                    "type": "string",
                    "des": "JG_ThreeS_units_matrix/presetValue",

                },
                {
                    "caption": "保留小数点位数",
                    "type": "string",
                    "des": "progress/0/digit",

                },
                {
                    "caption": "指标 3 取值路径",
                    "type": "stringWithSelect",
                    "des": "JG_ThreeS_value_matrix/propertyPath",
                    "options": [{
                            "type": "ID", // 选择框值
                            "typeName": "ID", // 选择框显示内容
                            "value": "", // 默认选择选择框时, 后面输入框的值
                            "content": "无需输入", // 输入框提示
                            "disabled": true, // 输入框是否置灰
                            "hidden": false // 输入框是否隐藏
                        },
                        {
                            "type": "name",
                            "typeName": "名称",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        },
                        {
                            "type": "attr",
                            "typeName": "属性",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        },
                        {
                            "type": "monitor",
                            "typeName": "监控数据",
                            "value": "MONITOR/_/_/名称/value",
                            "content": "请输入",
                            "disabled": false,
                            "hidden": false
                        },
                        {
                            "type": "customer",
                            "typeName": "自定义",
                            "value": "",
                            "content": "请输入",
                            "disabled": false,
                            "hidden": false
                        },
                        {
                            "type": "empty",
                            "typeName": "空",
                            "value": "",
                            "content": "无需输入",
                            "disabled": true,
                            "hidden": false
                        }
                    ],
                },
                {
                    "caption": "是否显示进度条",
                    "type": "bool",
                    "des": "isShowProgress",
                },
                {
                    "caption": "进度条颜色",
                    "type": "colorTableRange",
                    "des": "progress/0/progressColor",
                },

            ],
        },

    ],
    "configUIpro": [{
            "caption": "继承父级缩放",
            "content": "开启后，标记受孪生体的缩放影响，优先级高于保持大小。",
            "des": "inheritScale",
            "type": "bool"
        },
        {
            "caption": "继承父级透明",
            "content": "开启后，标记受孪生体的透明度影响。",
            "des": "items/0/config/inheritOpacity,items/1/config/inheritOpacity",
            "type": "bool"
        },
        {
            "caption": "物体锚点位置",
            "content": "设置标记在孪生体上的位置(锚点：孪生体的顶点)。",
            "des": "layout",
            "selections": [
                [{
                        "key": 0,
                        "keyname": "左"
                    },
                    {
                        "key": 0.5,
                        "keyname": "中"
                    },
                    {
                        "key": 1,
                        "keyname": "右"
                    }
                ],
                [{
                        "key": 1,
                        "keyname": "上"
                    },
                    {
                        "key": 0.5,
                        "keyname": "中"
                    },
                    {
                        "key": 0,
                        "keyname": "下"
                    }
                ],
                [{
                        "key": 1,
                        "keyname": "前"
                    },
                    {
                        "key": 0.5,
                        "keyname": "中"
                    },
                    {
                        "key": 0,
                        "keyname": "后"
                    }
                ]
            ],
            "type": "multiselection"
        },
        {
            "caption": "偏移位置",
            "content": "设置标记距离孪生体的位置偏移。",
            "des": "localPosition",
            "number": 3,
            "postfix": [
                "米",
                "米",
                "米"
            ],
            "prefix": [
                "左右方向",
                "上下方向",
                "前后方向"
            ],
            "type": "multinumber"
        },
        {
            "caption": "旋转角度",
            "content": "标记基于世界坐标X,Y,Z的旋转设置，开启面向摄像机、锁定Y轴，设置不生效。",
            "type": "multinumber",
            "number": 3,
            "des": "angles",
            "prefix": [
                "绕X轴",
                "绕Y轴",
                "绕Z轴"
            ],
            "postfix": [
                "度",
                "度",
                "度"
            ],
        }
    ]
},
            theme: 'white',
        size:'small'
      },
    };
  },
};
</script>
<style lang="less" scoped>
#app{
  user-select: none;
  -webkit-user-drag: none;
  width: 100vw;
  height: 100vh;
}
</style>>
