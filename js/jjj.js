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
        this.bgcolor = "rgb(" + Math.floor(Math.random() * 20) + "," + Math.floor(Math.random() * 288) + "," + Math.floor(Math.random() * 280) + ")"
        this.x = Math.floor(Math.random() * map.xnum);
        this.y = Math.floor(Math.random() * map.ynum);
        this.flag = document.createElement('div');
        this.flag.style.width = this.width + 'px ';
        this.flag.style.height = this.height + 'px';
        this.flag.style.backgroundColor = this.bgcolor;
        // is.flag.style.borderRadius = ‘58 % '；
        this.flag.style.position = 'absolute';
        this.flag.style.left = this.x * this.width + 'px';
        this.flag.style.top = this.y * this.height + 'px';
        map.canvas.appendChild(this.flag);


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