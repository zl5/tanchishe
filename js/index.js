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

        this.width = map.atom;
        this.height = map.atom;
        //设置蛇的一个默认方向
        this.direction = 'right';
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
            //让蛇动起来
        this.run = function() {
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;

            }
            //根据方向处理蛇头    默认为  right
            switch (this.direction) {
                case 'left':
                    this.body[0].x -= 1;
                    break;
                case 'right':
                    this.body[0].x += 1;
                    break;
                case 'up':
                    this.body[0].y -= 1;
                    break;
                case 'down':
                    this.body[0].y += 1;
                    break;

            }

            //蛇吃掉食物   让蛇和食物重合时
            if (this.body[0].x == food.x && this.body[0].y == food.y) {
                this.body.push({ x: null, y: null, flag: null });
                //把食物移除掉
                map.canvas.removeChild(food.flag);
                //重新生成一个食物
                food = new Food(map);
            }

            // this.body[0].y += 1;
            for (var i = 0; i < this.body.length; i++) {
                if (this.body[i].flag != null) {
                    map.canvas.removeChild(this.body[i].flag);

                }

            }
            this.display();
        }

    }


    var map = new map(20, 30, 30);
    map.create();
    var food = new Food(map);

    var snack = new Snack(map);
    snack.display();


    //给蛇加上键盘事件 
    window.onkeydown = function(e) {
        var event = e || window.event;

        console.log(event.keyCode); //打印键盘事件  上：38  下：40 左：37 右：39
        switch (event.keyCode) {
            case 38:
                if (snack.direction != 'down') {
                    snack.direction = 'up';
                }

                break;
            case 40:
                if (snack.direction != 'up') {
                    snack.direction = 'down';
                }

                break;
            case 37:
                if (snack.direction != 'right') {
                    snack.direction = 'left';
                }

                break;
            case 39:
                if (snack.direction != 'left') {
                    snack.direction = 'right';
                }

                break;


        }
    }



    var timer;
    var begin = document.getElementById('begin');
    var pause = document.getElementById('pause');
    begin.addEventListener('click', function() {
        clearInterval(timer)
        timer = setInterval(function() {
            console.log('sss');
            snack.run();
        }, 300)
    })
    pause.addEventListener('click', function() {
        clearInterval(timer);

    })
}