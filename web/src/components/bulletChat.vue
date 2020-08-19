<template>
  <div class="bullet-chat">
    <div class="screen">
			<div class="landscape"></div>
			<div class="filter"></div>
			<canvas id="canvas"></canvas>
			<div class="send">
				<!-- <div class="input clearfix"> -->
				<!-- <input type="text" class="text"> -->
				<div class="btn"></div>
				<!-- </div> -->
			</div>
			<div class="s_show">

				<div class="magictime twisterInUp">GISer?GISer?GISer?GISer?</div>
				<div class="magictime twisterInUp">同是GISer?</div>
				<div class="magictime twisterInUp">楼主也GISer?</div>
				<div class="magictime twisterInUp">GISer这么多吗?不容易啊</div>

				<div class="magictime twisterInUp">前端也算程序员？</div>
				<div class="magictime twisterInUp">扶我起来，这串代码还没封装</div>
				<div class="magictime twisterInUp">3点了，总算下班了，呵呵呵````</div>

				<div class="magictime twisterInUp">这个时候不应该666吗</div>
				<div class="magictime twisterInUp">现在前端挺杂的</div>
				<div class="magictime twisterInUp">我是一只会刷666的咸鱼````</div>

				<div class="magictime twisterInUp">66666666666666666666666666666666</div>
				<div class="magictime twisterInUp">o(≧v≦)o~~好棒</div>
				<div class="magictime twisterInUp">99999999999999999999999999999999````</div>

				<div class="magictime twisterInUp">我看了1小时代码！！</div>
				<div class="magictime twisterInUp">再看一遍</div>
				<div class="magictime twisterInUp">编程很难吗````</div>

				<div class="magictime twisterInUp">是个有故事的人23333</div>
				<div class="magictime twisterInUp">扶我起来，这串代码还没封装</div>
				<div class="magictime twisterInUp">需求确定了吗，跟你领导过了吗？````</div>

				<div class="magictime twisterInUp">怼产品：用户有这个需求？用户从哪儿来？相关数据在哪里？</div>
				<div class="magictime twisterInUp">怼不是目的，沟通才是。</div>
				<div class="magictime twisterInUp">怼不是目的，沟通才是。````</div>

				<div class="magictime twisterInUp">时间观念：做事有计划，工作分主次，ES，“艾森豪威尔法则”（四象限法则）</div>
				<div class="magictime twisterInUp">保持敬畏：“君子之心，常怀敬畏”</div>
				<div class="magictime twisterInUp">软件架构的目标，是为了让构建与维护系统的所需人力资源最小化````</div>
			</div>
		</div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
	name: 'bulletChat',
  data() {
    return {
        canvas: null,
		ctx: null,
		WIDTH: null,
		HEIGHT: null,
		mouseMoving: false,
		mouseMoveChecker: null,
		mouseX: null,
		mouseY: null,
		stars: [],
		this: 80,
		dots: [],
		dotsMinDist: 2,
		maxDistFromCursor: 50,
		// dan
		aShowList: null,
		oShow: null,
		oSend: null,
		oBtn: null,
		oText: null,
		time: 0,
		time1: 0
    };
	},
	mounted() {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.aShowList = document.querySelectorAll('.s_show div');
		this.oShow = document.querySelector('.s_show');
		this.oSend = document.querySelector('.send');
		// this.oBtn = document.querySelector('.btn');
		// this.oText = document.querySelector('.text');
		// console.log('79')
		this.init();
	},
	methods: {
		init() {
			// var ctx = this.ctx;
			var _this = this;
			function Star(id, x, y){
				this.id = id;
				this.x = x;
				this.y = y;
				this.r = Math.floor(Math.random()*2)+1;
				var alpha = (Math.floor(Math.random()*10)+1)/10/2;
				this.color = "rgba(255,255,255,"+alpha+")";
			}
			function Dot(id, x, y, r) {
				this.id = id;
				this.x = x;
				this.y = y;
				this.r = Math.floor(Math.random()*5)+1;
				this.maxLinks = 2;
				this.speed = .5;
				this.a = .5;
				this.aReduction = .005;
				this.color = "rgba(255,255,255,"+this.a+")";
				this.linkColor = "rgba(255,255,255,"+this.a/4+")";

				this.dir = Math.floor(Math.random()*140)+200;
			}
			Star.prototype.draw = function() {
				_this.ctx.fillStyle = this.color;
				_this.ctx.shadowBlur = this.r * 2;
				_this.ctx.beginPath();
				_this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
				_this.ctx.closePath();
				_this.ctx.fill();
			}

			Star.prototype.move = function() {
				this.y -= .15;
				if (this.y <= -10) this.y = HEIGHT + 10;
				this.draw();
			}

			Star.prototype.die = function() {
					_this.stars[this.id] = null;
					delete _this.stars[this.id];
			}

			Dot.prototype.draw = function() {
				_this.ctx.fillStyle = this.color;
				_this.ctx.shadowBlur = this.r * 2;
				_this.ctx.beginPath();
				_this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
				_this.ctx.closePath();
				_this.ctx.fill();
			}

			Dot.prototype.link = function() {
				if (this.id == 0) return;
				var previousDot1 = this.getPreviousDot(this.id, 1);
				var previousDot2 = this.getPreviousDot(this.id, 2);
				var previousDot3 = this.getPreviousDot(this.id, 3);
				if (!previousDot1) return;
				_this.ctx.strokeStyle = this.linkColor;
				_this.ctx.moveTo(previousDot1.x, previousDot1.y);
				_this.ctx.beginPath();
				_this.ctx.lineTo(this.x, this.y);
				if (previousDot2 != false) _this.ctx.lineTo(previousDot2.x, previousDot2.y);
				if (previousDot3 != false) _this.ctx.lineTo(previousDot3.x, previousDot3.y);
				_this.ctx.stroke();
				_this.ctx.closePath();
			}
			Dot.prototype.move = function() {
				this.a -= this.aReduction;
				if (this.a <= 0) {
					this.die();
					return
				}
				this.color = "rgba(255,255,255,"+this.a+")";
				this.linkColor = "rgba(255,255,255,"+this.a/4+")";
				this.x = this.x + Math.cos(this.degToRad(this.dir))*this.speed,
				this.y = this.y + Math.sin(this.degToRad(this.dir))*this.speed;

				this.draw();
				this.link();
			}

			Dot.prototype.die = function() {
					_this.dots[this.id] = null;
					delete _this.dots[this.id];
			}
			this.setCanvasSize();

			_this.ctx.strokeStyle = "white";
			_this.ctx.shadowColor = "white";
			for (var i = 0; i < this.initStarsPopulation; i++) {
				stars[i] = new Star(i, Math.floor(Math.random()*WIDTH), Math.floor(Math.random()*HEIGHT));
				//stars[i].draw();
			}
			_this.ctx.shadowBlur = 0;
			this.animate();

			// window.onmousemove = function(e){
			// 	_this.mouseMoving = true;
			// 	_this.mouseX = e.clientX;
			// 	_this.mouseY = e.clientY;
			// 	clearInterval(_this.mouseMoveChecker);
			// 	_this.mouseMoveChecker = setTimeout(function() {
			// 		_this.mouseMoving = false;
			// 	}, 100);
			// }
			
			//dan

			// this.oBtn.onclick = function(){//鼠标点击事件
				//oBtn.style.backgroundColor = randomColor();//按钮背景颜色变换
				// _this.time1 = new Date();
				// _this.oBtn.style.color = _this.randomColor();//按钮字体颜色变换
				// if(_this.time1 - _this.time > 3000){//2次发送的时间必须大于2秒
				// 	var oDiv = document.createElement('div');//创建div
				// 	oDiv.innerHTML = _this.oText.value;//添加弹幕内容
				// 	oDiv.className = 'magictime twisterInUp';//弹幕特效
				// 	_this.oShow.appendChild(oDiv);//添加一个子节点 
				// 	console.log('206')
				// 	_this.initDan(oDiv);//初始化
				// 	_this.oText.value = '';
				// 	_this.time = _this.time1;
				// }else{
				// 	alert("请稍后再发~");

				// }
			// }

			for(var i = 0;i < _this.aShowList.length;i++){
				_this.initDan(_this.aShowList[i]);//执行初始化函数
			}
		},
		getPreviousDot(id, stepback) {
			if (id == 0 || id - stepback < 0) return false;
			if (typeof this.dots[id - stepback] != "undefined") return this.dots[id - stepback];
			else return false;//getPreviousDot(id - stepback);
		},
		setCanvasSize() {
			this.WIDTH = document.documentElement.clientWidth,
			this.HEIGHT = document.documentElement.clientHeight;                      

			canvas.setAttribute("width", this.WIDTH);
			canvas.setAttribute("height", this.HEIGHT);
		},
		animate() {
			this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

			for (var i in this.stars) {
				this.stars[i].move();
			}
			for (var i in this.dots) {
				this.dots[i].move();
			}
			this.drawIfMouseMoving();
			window.requestAnimationFrame(this.animate);
		},
		drawIfMouseMoving(){
			if (!this.mouseMoving) return;

			if (this.dots.length == 0) {
				this.dots[0] = new Dot(0, this.mouseX, this.mouseY);
				this.dots[0].draw();
				return;
			}

			var previousDot = this.getPreviousDot(this.dots.length, 1);
			var prevX = previousDot.x; 
			var prevY = previousDot.y; 

			var diffX = Math.abs(prevX - mouseX);
			var diffY = Math.abs(prevY - mouseY);

			if (diffX < this.dotsMinDist || diffY < this.dotsMinDist) return;

			var xVariation = Math.random() > .5 ? -1 : 1;
			xVariation = xVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
			var yVariation = Math.random() > .5 ? -1 : 1;
			yVariation = yVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
			this.dots[this.dots.length] = new Dot(this.dots.length, mouseX+xVariation, mouseY+yVariation);
			this.dots[this.dots.length-1].draw();
			this.dots[this.dots.length-1].link();
		},
		degToRad(deg) {
			return deg * (Math.PI / 180);
		},
		//dan
		initDan(obj){//接受弹幕对象
		//确定top值的随机区间
			var screenHeight = document.documentElement.clientHeight;//获取屏幕可视高度
			var maxTop = screenHeight - this.oSend.offsetHeight - obj.offsetHeight;//高度差范围
			obj.style.top = maxTop * Math.random() + 'px';    
		//控制left值
			var screenWidth = document.documentElement.clientWidth;//获取可视宽度
			var maxLeft = screenWidth - obj.offsetWidth/* - Math.random() * 800 */;//随机宽度差
			obj.style.left = maxLeft + 'px';
		//弹幕的随机颜色
			obj.style.color = this.randomColor();
			/*setInterval(function(){
				move(obj,maxLeft);
			},1000);*///普通定时器
			// console.log('initdan')
			this.move(Math.random()*5+1,obj,maxLeft);
		},
		move(k,obj,maxLeft){
			var speed = k;//控制速度的变量
			maxLeft -= speed;//往左移动
			var _this = this
			if(maxLeft > -obj.offsetWidth){
				obj.style.left = maxLeft + 'px';
				window.requestAnimationFrame(function(){
					_this.move(k,obj,maxLeft);
				});//H5新增的动画函数
			}else{
				// console.log('297')
				_this.initDan(obj);//重新初始化 营造循环弹幕效果
				/*  oShow.removeChild(obj);//DOM删除子节点 */
			}
		},
		randomColor(){
			return '#' + Math.random().toString(16).slice(-6);//一行简化版截取后六位
			/*var str = '#';
			for(var i = 0;i < 6;i++){
				str += Math.floor(Math.random() * 16).toString(16);
			}
			return str;*///普通逻辑版
		}
	}
};
</script>

<style scoped>
.bullet-chat {
	margin:0;
	overflow:hidden;
	background-image: url(http://liurxmgoss.oss-cn-beijing.aliyuncs.com/earth2.png);
	width: 100%;
 	height: 100vh;
	position: relative;
	top: 0px;
	background-position: center;
  	background-size: cover;
  	overflow: hidden;
}
.screen{
	overflow: hidden;
	height: 100%;
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.send{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 80px;
	line-height: 80px;
	background-color: rgba(10,10,10,0.6);
	text-align: center;
}
.input{
	position: absolute;
	left: 50%;
	top: 50%;
	margin: -20px -350px;
	font-size: 0;
}
.text{
	float: left;
	width: 600px;
	height: 40px;
	border: none;
	border-radius: 8px 0 0 8px;
}
.s_show div{
	position: absolute;
	font-size: 18px;
	font-weight: bold;
}
.btn{
	float: left;
	width: 100px;
	background-color:black;
	line-height: 40px;
	font-size: 18px;
	color: #fff;
	cursor: pointer;
	border-radius: 0 8px 8px 0;
}
.filter {
	width:100%;
	height:100%;
	position:absolute;
	top:0;
	left:0;
	/* background:#fe5757; */
	/* animation:colorChange 30s ease-in-out infinite; */
	animation-fill-mode:both;
	mix-blend-mode:overlay;
}
@keyframes colorChange {
	0%,100% {
		opacity:0;
	}
	50% {
		opacity:.9;
	}
}
.landscape {
	position:absolute;
	bottom:0px;
	left:0;
	width:100%;
	height:100%;
	/* background-image:url('../assets/images/xkbg.png'); */
	/* background-size:1000px 250px; */
	/* background-repeat:repeat-x; */
	/* background-position:center bottom; */
}
</style>
