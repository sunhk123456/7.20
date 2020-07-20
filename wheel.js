/*
无缝轮播图
wins   String  元素的选择器 要放入轮播图的容器//选择器
opts json  实现轮播图的各种选项
imgs 数组 哟啊包含轮播图 图片的数组
links 数组 图片链接的地址
imgCorlor 数组(array) 图片的颜色 ，用于全屏显示的颜色拼接
imgSize 数组 第一个参数 代表宽  第二个参数代表高
btnCorlor:  String 按钮的颜色
btnActive:  String  获得焦点的按钮颜色
btnPosition: 数组  第一个参数为x轴方向的位置，第二个参数为y轴的位置
*/
function wheel(wins, opts, times) {
    // 参数的初始化

    //初始化times
    var times = times.time || 2;
    // 初始化 运动方式
    // console.log(wins)
    var wins = document.querySelector(wins);
    if (!(wins && wins.nodeType == 1)) {
        console.error("窗口没有获取到")
    }
    // 图片的地址添加一个
    opts.imgs.push(opts.imgs[0]);
    // 链接的地址添加一个
    opts.links.push(opts.links[0]);
    // 颜色增加一个
    opts.imgColor.push(opts.imgColor[0]);
    // console.log(opts.imgs)

    var imgLength = opts.imgs.length;
    console.log(imgLength)
    if (imgLength == 0) {
        console.error("没有传入相应的轮播内容");
        return;
    }
    var imgSize = opts.imgSize;
    if (!(imgSize instanceof Array)) {
        console.error("请传入合法的尺寸");
    }

    if (imgSize.Length == 0) {
        imgSize[0] = document.documentELement.CLientWidth;
        imgSize[1] = 400
    }
    if (imgSize.some(function(val) {
            return val == 0;
        })) {
        for (var i = 0; i < 2; i++) {
            if (imgSize[i] == 0) {
                imgSize[i] = 500
            }

        }
    }
    // console.log(imgSize)
    var btnColor = opts.btnColor || "green";
    var btnActive = opts.btnActive || "red";
    var btnPos = opts.btnPosition || ["center", "20"]



    // 创建html结构和样式
    // win样式
    // wins.style.cssText = "height:" + imgSize[1] + "px";
    wins.style.cssText = "width:100%;height:" + imgSize[1] + " px ; overfLow: hidden; position: relative;";

    // 添加容器
    var box = document.createElement("div")
    box.style.cssText = "width:" + imgLength * 100 + "%;height:100%;border:1px solid red;"
    wins.appendChild(box);




    //创建每一个轮播图
    // var divList = document.createElement("div");
    // divList.style.cssText = `float:left;width:${100/imgLength}%;height:100%;border:1px solid blue;background:${opts.imgColor[0]}`;

    // var link = document.createElement("a");
    // link.href = opts.links[0];
    // console.log(imgSize);
    // link.style.cssText = "width:" + imgSize[0] + " px ; height:" + imgSize[1] + "px ;display: block ;margin: auto ; background:url(" + opts.imgs[0] + ") no-repeat 0 0"
    // divList.appendChild(link);
    // box.appendChild(divList);
    // 创建每一个轮播图
    for (var i = 0; i < imgLength; i++) {
        var divList = document.createElement("div");
        divList.style.cssText = `float:left;width:${100/imgLength}%;height:100%;background:${opts.imgColor[i]}`;

        var link = document.createElement("a");
        link.href = opts.links[i];
        // console.log(imgSize);
        link.style.cssText = "width:" + imgSize[0] + " px ; height:" + imgSize[1] + "px ;display: block ;margin: auto ; background:url(" + opts.imgs[i] + ") no-repeat 0 0"
        divList.appendChild(link);
        box.appendChild(divList);
    }

    // 创建按钮
    var btnBox = document.createElement("div")
        // btnBox.style.cssText = "width:200px;height:200px;position:relative;bottom:" + opts.btnPosition[1] + "px;left:0;right:0;background:#000"

    // btnBox.style.cssText = " width:300px;text-align: center;height: 20px;position: absolute;left: 0;right: 0;margin: auto;bottom:" + btnPos[1] + "px;"
    btnBox.style.cssText = `width:300px;text-align: center;height: 20px;position: absolute;left: 0;right: 0;margin: auto;bottom:${btnPos[1]}px;`
    var btns = []
    for (var i = 0; i < imgLength - 1; i++) {
        if (i == 0) {
            var bgColor = btnActive
        } else {
            var bgColor = btnColor
        }
        var btn = document.createElement("div")
            // btn.style.cssText = "width:20px;height:20px;background:" + bgColor + ";"
        btn.style.cssText = ` display: inline-block;
    width: 60px;
    height: 2px;
    float:left;
    background: ${bgColor};
    cursor: pointer;
    margin-right: 8px;
    border-radius: 0;`
        btnBox.appendChild(btn)
        btns.push(btn)
    }

    wins.appendChild(btnBox);



    console.log(btns)



    // 轮播

    // 获得下面按钮
    //  var sps = document.querySelectorAll(".swiper-pagination-bullet")
    //  console.log(sps)
    // 图片数组获取
    //  var imgs = document.querySelectorAll(".img-lb-1")
    // 图片的父亲获取
    //  var img= document.querySelector(".img-lb")


    // var win = document.getElementsByClassName("banner-lb")[0]
    var long = parseInt(getComputedStyle(wins, null).width)

    console.log(long)
    var num = 0;

    function move() {
        num++;
        if (num > imgLength - 2) {

            animate(box, {
                "marginLeft": -long * num
            }, 500, Tween.Linear, function() {

                box.style.marginLeft = 0
            })
            num = 0;
        } else {
            animate(box, {
                "marginLeft": -long * num
            }, 500)

        }
        // 改变按钮颜色
        for (var j = 0; j < opts.imgs.length - 1; j++) {

            btns[j].style.background = opts.btnColor;
        }
        btns[num].style.background = opts.btnActive;

    }
    var time1 = times * 1000;
    var t = setInterval(move, time1);
    // 按钮轮播
    for (let i = 0; i < opts.imgs.length - 1; i++) {
        btns[i].onclick = function() {

            num = i;
            animate(box, {
                    "margin-left": -num * long
                },
                500)
            for (var j = 0; j < opts.imgs.length - 1; j++) {


                btns[j].style.background = opts.btnColor;
            }
            btns[num].style.background = opts.btnActive;


        }
    }
    // for (let i = 0; i < imgs.length; i++) {
    wins.onmouseover = function() {
        clearInterval(t)

    }
    wins.onmouseout = function() {
            t = setInterval(move, time1);

        }
        // }

}