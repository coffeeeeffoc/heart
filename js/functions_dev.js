// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden, garden2, garden3, $R = 16, drawType = 0, whiteFlg = false;

var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	// var offsetX = $loveHeart.width() / 2 - 100;
	// var offsetX2 = $loveHeart.width() / 2 + 100;
	// var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    //第一个💗
    garden = new Garden(gardenCtx, gardenCanvas);
	
    // renderLoop
    setInterval(function () {
    	drawType = 0;
        garden.render();
    }, Garden.options.growSpeed);


    //garden2:第二个💗
    garden2 = new Garden(gardenCtx, gardenCanvas);
    setInterval(function () {
    	drawType = 1;
        garden2.render();
    }, Garden.options.growSpeed);

 	//garden3:一箭穿心
    garden3 = new Garden(gardenCtx, gardenCanvas);
    setInterval(function () {
        drawType = 2;
        garden3.render();
    }, Garden.options.growSpeed)

    // setTimeout(setInterval(function () {
    //     drawType = 1;
    //     garden3.render();
    // }, Garden.options.growSpeed), 1000);


    setInterval(function () {
    	if($R > 0.5){//每隔一秒实时调节花瓣之间的距离，不断缩小
    		$R *= 0.8;
    	}
    }, 1000);
});


function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 15 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 15 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));//19.5和20是为了调节心形的长宽
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();//heart用来保存之前的花瓣位置，与bloom比较来判断新花瓣是否满足条件
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * $R) {	//花瓣之间的距离
				draw = false;//如果新花瓣与任意一个之前的花瓣距离太小，则跳出去，重新选择新花瓣的位置
				break;
			}
		}
		if (draw) {
			heart.push(bloom);//如果新花瓣满足距离大于1.3倍，则把此花瓣插入heart[]中
			garden.createRandomBloom(bloom[0], bloom[1]);//根据X，Y创建一个新花瓣
		}
		angle += 0.2;
		// if (angle >= 30) {
		// 	clearInterval(animationTimer);//angel从10到30，范围是20，20/3.14=6.3663接近2*PI,正好一圈
		// } else {
		// 	angle += 0.2;
		// }
	}, interval);
}

function getHeartPoint2(angle) {
	var t = angle / Math.PI +2;
	var x = 15 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 15 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));//19.5和20是为了调节心形的长宽
	return new Array(offsetX2 + x, offsetY2 + y);
}
function startHeartAnimation2() {
	var interval2 = 50;
	var angle2 = 10;
	var heart2 = new Array();//heart用来保存之前的花瓣位置，与bloom比较来判断新花瓣是否满足条件
	var animationTimer2 = setInterval(function () {
		var bloom2 = getHeartPoint2(angle2);
		var draw2 = true;
		for (var i = 0; i < heart2.length; i++) {
			var p2 = heart2[i];
			var distance2 = Math.sqrt(Math.pow(p2[0] - bloom2[0], 2) + Math.pow(p2[1] - bloom2[1], 2));
			if (distance2 < Garden.options.bloomRadius.max * $R) {	//花瓣之间的距离
				draw2 = false;//如果新花瓣与任意一个之前的花瓣距离太小，则跳出去，重新选择新花瓣的位置
				break;
			}
		}
		if (draw2) {
			heart2.push(bloom2);//如果新花瓣满足距离大于1.3倍，则把此花瓣插入heart[]中
			garden2.createRandomBloom(bloom2[0], bloom2[1]);//根据X，Y创建一个新花瓣
		}
		if(((((angle2 / Math.PI + 2)% (Math.PI * 2))) < Math.PI * 1.50) && ((((angle2 / Math.PI + 2)% (Math.PI * 2))) > Math.PI * 1.35)){
			whiteFlg = true;
		}else{
			whiteFlg = false;	
		}
		angle2 += 0.2;
	}, interval2);
}

function startLoveArrowAnimation(){
	var arrowAngle = 30;
	var t = arrowAngle / 360 * Math.PI *2;
	var count = 0;
	var arrowAnimationTimer = setInterval(function(){
		var posX = 1100;
		var posY;		
		setInterval(function(){
			if(posX > 150){
				posY = - Math.tan(t) * posX + 600;
				garden3.createRandomBloom(posX, posY);
				posX -= 8;
			}
			// for(var posX = 900; posX > 300; posX -= Garden.options.bloomRadius.max / Math.cos(t)){
			// 	var posY = - Math.tan(t) * posX + 600;
			// 	setTimeout(garden3.createRandomBloom(posX, posY),1000);
			// }
		},100);
		count++;
		if(count > 5){
			clearInterval(arrowAnimationTimer);
		}
	},1000);
	
}




