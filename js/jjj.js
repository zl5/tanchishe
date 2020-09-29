window.onload = function() {
    var main = document.getElementById('main');
    var showcanvas = true;

    // 创建构造地图的方法
    function map(atom, xnum, ynum) {
        this.atom = atom;
        this.xnum = xnum;
        this.ynum = ynum

        this.canvas = null;
        // 创建画布的方法
        this.create = function() {
            // 在画布里面创建一个div
            this.canvas = document.createElement('div');
            this.canvas.style.cssText = "position:relative;top:40px;border:1px solid red;background-color:#FAFAFA;";
            this.canvas.style.height = this.atom * this.ynum + 'px';
            this.canvas.style.width = this.atom * this.xnum + 'px';

            // 追加到主体区域中
            main.appendChild(this.canvas);

            if (showcanvas) {
                // 创建单元格原子
                for (var y = 0; y < ynum; y++) {
                    for (var x = 0; x < xnum; x++) {
                        var a = document.createElement('div');
                        a.style.cssText = "border:1px solid yellow";
                        a.style.width = this.atom + 'px';
                        a.style.height = this.atom + 'px';
                        a.style.backgroundColor = "green";
                        this.canvas.appendChild(a);
                        a.style.position = 'absolute';
                        a.style.left = x * this.atom + 'px';
                        a.style.top = y * this.atom + 'px';
                    }
                }



            }
        }
    }

    // 创建食物的构造方法
    // 需要用到map中的原子

    function Food(map) {

        this.width = map.atom;
        this.height = map.atom;
        // 生成的食物是随机色
        this.bgcolor = "rgb(" + Math.floor(Math.random() * 20) + "," + Math.floor(Math.random() * 288) + "," + Math.floor(Math.random() * 288) + ")"
            // 食物出现的位置   随机
        this.x = Math.floor(Math.random() * map.xnum)
        this.y = Math.floor(Math.random() * map.ynum)
        this.flag = document.createElement('div');
        this.flag.style.width = this.width + 'px';
        this.flag.style.height = this.height + 'px';

        this.flag.style.backgroundColor = this.bgcolor;
        this.flag.style.position = 'absolute';
        this.flag.style.left = this.x * this.width + 'px';
        this.flag.style.top = this.y * this.height + 'px';
        // 把创建的flag添加到画布中
        map.canvas.appendChild(this.flag);


    }
    //创建蛇的方法
    function Snack(map) {
        //设置蛇的高宽
        this.height = map.atom;
        this.width = map.atom;
        //设置蛇的一个默认方向
        this.direction = 'right'
        this.body = [
            { x: 2, y: 0 }, //蛇头，第一节
            { x: 1, y: 0 }, //蛇脖子，第二节
            { x: 0, y: 0 } //蛇尾，第三节
        ];
        //显示蛇
        this.display = function() {
            for (var i = 0; i < this.body.length; i++) {
                if (this.body[i].x != null) { //当吃到食物时，x==null,不能创建  不然会在0,0处新建一个
                    var she = document.createElement('div');
                    this.body[i].flag = she;

                    //设置蛇的样式
                    she.style.width = this.width + 'px';
                    she.style.height = this.height + 'px';

                    she.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 20) + "," + Math.floor(Math.random() * 288) + "," + Math.floor(Math.random() * 288) + ")";


                    //设置蛇的位置
                    she.style.position = 'absolute';
                    she.style.left = this.body[i].x * this.width + 'px';
                    she.style.top = this.body[i].y * this.height + 'px';
                    //把蛇追加到地图中
                    map.canvas.appendChild(she);

                }


            }
        }

    }


    var map = new map(20, 30, 30);
    map.create();
    var food = new Food(map);


    var timer;
    var begin = document.getElementById('begin');
    var pause = document.getElementById('pause');
    begin.addEventListener('click', function() {
        clearInterval(timer)
        timer = setInterval(function() {
            console.log('sss');
        }, 300)
    })
    pause.addEventListener('click', function() {
        clearInterval(timer);

    })
}