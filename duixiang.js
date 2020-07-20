function wheel(wins, opts, runs) {
    // 初始化参数
    this.init(wins, opts, runs);
    // 获取窗口
    this.getWindow();
    // 获取盒子
    this.createBox();
    // 获取轮播列表
    this.createList();
    // 创建按钮
    this.createBtn();
    // 自动运行
    this.autoRun();
    // 点击播放
    this.onclickRun();
}
wheel.prototype = {
    init(wins, opts, runs) {
        this.opts = opts;
        this.runs = runs;
        // 参数的初始化

        //初始化times
        var times = this.runs.time || 2;
        // 初始化 运动方式
        // console.log(wins)
        var wins = document.querySelector(wins);
        if (!(wins && wins.nodeType == 1)) {
            console.error("窗口没有获取到")
        }
        this.wins = wins;
        // 图片的地址添加一个
        opts.imgs.push(opts.imgs[0]);
        // 链接的地址添加一个
        opts.links.push(opts.links[0]);
        // 颜色增加一个
        opts.imgColor.push(opts.imgColor[0]);
        // console.log(opts.imgs)

        this.imgLength = opts.imgs.length;
        console.log(this.imgLength)
        if (this.imgLength == 0) {
            console.error("没有传入相应的轮播内容");
            return;
        }
        this.imgSize = opts.imgSize;
        if (!(this.imgSize instanceof Array)) {
            console.error("请传入合法的尺寸");
        }

        if (this.imgSize.Length == 0) {
            this.imgSize[0] = document.documentELement.CLientWidth;
            this.imgSize[1] = 400
        }
        if (this.imgSize.some(function(val) {
                return val == 0;
            })) {
            for (var i = 0; i < 2; i++) {
                if (this.imgSize[i] == 0) {
                    this.imgSize[i] = 500
                }

            }
        }
        // console.log(imgSize)
        this.btnColor = opts.btnColor || "green";
        this.btnActive = opts.btnActive || "red";
        this.btnPos = opts.btnPosition || ["center", "20"]



    },

    getWindow() {
        this.wins.style.cssText = "width:100%;height:" + imgSize[1] + " px ; overfLow: hidden; position: relative;";



    },
    createBox() {

        // 添加容器
        this.box = document.createElement("div")
        this.box.style.cssText = "width:" + imgLength * 100 + "%;height:100%;border:1px solid red;"
        this.wins.appendChild(box);


    },
    createList() {
        for (var i = 0; i < this.imgLength; i++) {
            this.divList = document.createElement("div");
            this.divList.style.cssText = `float:left;width:${100/imgLength}%;height:100%;background:${opts.imgColor[i]}`;

            this.link = document.createElement("a");
            this.link.href = opts.links[i];
            // console.log(imgSize);
            this.link.style.cssText = "width:" + imgSize[0] + " px ; height:" + imgSize[1] + "px ;display: block ;margin: auto ; background:url(" + opts.imgs[i] + ") no-repeat 0 0"
            this.divList.appendChild(link);
            this.box.appendChild(divList);
        }


    },
    createBtn() {

        // 创建按钮
        this.btnBox = document.createElement("div")
            // btnBox.style.cssText = "width:200px;height:200px;position:relative;bottom:" + opts.btnPosition[1] + "px;left:0;right:0;background:#000"

        // btnBox.style.cssText = " width:300px;text-align: center;height: 20px;position: absolute;left: 0;right: 0;margin: auto;bottom:" + btnPos[1] + "px;"
        this.btnBox.style.cssText = `width:300px;text-align: center;height: 20px;position: absolute;left: 0;right: 0;margin: auto;bottom:${btnPos[1]}px;`
        var btns = []
        for (var i = 0; i < imgLength - 1; i++) {
            if (i == 0) {
                var bgColor = btnActive
            } else {
                var bgColor = btnColor
            }
            this.btn = document.createElement("div")
                // btn.style.cssText = "width:20px;height:20px;background:" + bgColor + ";"
            this.btn.style.cssText = ` display: inline-block;
width: 60px;
height: 2px;
float:left;
background: ${bgColor};
cursor: pointer;
margin-right: 8px;
border-radius: 0;`
            this.btnBox.appendChild(btn)
            btns.push(btn)
        }
        this.btns = btns;

        this.wins.appendChild(btnBox);



        console.log(btns)



    },
    autoRun() {

        // 轮播

        // 获得下面按钮
        //  var sps = document.querySelectorAll(".swiper-pagination-bullet")
        //  console.log(sps)
        // 图片数组获取
        //  var imgs = document.querySelectorAll(".img-lb-1")
        // 图片的父亲获取
        //  var img= document.querySelector(".img-lb")


        // var win = document.getElementsByClassName("banner-lb")[0]
        this.long = parseInt(getComputedStyle(this.wins, null).width)

        console.log(long)
        var num = 0;

        function move() {
            num++;
            if (num > this.imgLength - 2) {

                animate(this.box, {
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
            for (var j = 0; j < this.opts.imgs.length - 1; j++) {

                this.btns[j].style.background = opts.btnColor;
            }
            this.btns[num].style.background = opts.btnActive;

        }
        this.time1 = this.times * 1000;
        var t = setInterval(move, this.time1);
        // 按钮轮播
        for (let i = 0; i < this.opts.imgs.length - 1; i++) {
            this.btns[i].onclick = function() {

                num = i;
                animate(box, {
                        "margin-left": -num * long
                    },
                    500)
                for (var j = 0; j < this.opts.imgs.length - 1; j++) {


                    this.btns[j].style.background = opts.btnColor;
                }
                this.btns[num].style.background = opts.btnActive;


            }
        }
        // for (let i = 0; i < imgs.length; i++) {
        this.wins.onmouseover = function() {
            clearInterval(t)

        }
        this.wins.onmouseout = function() {
                t = setInterval(move, this.time1);

            }
            // }



    },
    onclickRun() {

    }
}