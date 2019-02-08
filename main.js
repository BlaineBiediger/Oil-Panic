
///Graphics
//The bucket
//0 drops of oil
var bucket = new Image();
bucket.src = "Bucket0.png";
//1 drop of oil
var bucket1 = new Image();
bucket1.src = "Bucket1.png";
//2 drops of oil
var bucket2 = new Image();
bucket2.src = "Bucket2.png";
//3 drops of oil
var bucket3 = new Image();
bucket3.src = "Bucket3.png";

var bucketL = new Image();
bucketL.src = "BucketL.png";

//Oil drops
var oil = new Image();
oil.src = "Oil.png";

//The images that will display when the bucket is spilling oil
var bucketTiltLeft = new Image();
bucketTiltLeft.src = "BucketTiltLeft.png";

var bucketTiltRight = new Image();
bucketTiltRight.src = "BucketTiltRight.png";

//The images drawn when drops have been missed
var miss0 = new Image();
miss0.src = "Miss0.png";

var miss1 = new Image();
miss1.src = "Miss1.png";

var miss2 = new Image();
miss2.src = "Miss2.png";

var miss3 = new Image();
miss3.src = "Miss3.png";

//The canvas that will be drawn on
var canvas = document.getElementById("Alfonso");
var render = canvas.getContext("2d");

///Positioning and Other Variables
var bucketPosX = (canvas.width / 2) - 70;
var bucketPosY = (canvas.height - 130);

//Number of drops the bucket currently contains
var bucketDrops = 0;

var a = 0;
var d = 0;

var initialPos = [0, 1, 2];
var position = 16;

var score = 0;
var misses = 0;

///Functions
function positionToRowCol(position) {
	var row = Math.floor(position / 3);
	var col = Math.floor(position % 3) + 1;
	return { 
		row: row, 
		col: col
	};
}

var oilCoor = positionToRowCol(initialPos[Math.floor(Math.random()*initialPos.length)]);

document.addEventListener("keydown", function(event) {
	if (d != 4){
		if (event.code == "KeyA" && a < 3) {
			if (bucketPosX != 20 && d != 3) {
				bucketPosX = bucketPosX - 130;
			}
			a++;
			d--;
		}
		if (event.code == "KeyD" && d < 3) {
			if (bucketPosX != 540 && a != 3) {
			bucketPosX = bucketPosX + 130
			}
			a--;
			d++;
		}
	}
});


///Game loop
setInterval(function (){
	//To redraw the bucket every frame
	render.clearRect(0, bucketPosY - 10, canvas.width, canvas.height);
	render.clearRect(0,0, 141, 19.5);
	render.webkitImageSmoothingEnabled = false;
	render.mozImageSmoothingEnabled = false;
	render.imageSmoothingEnabled = false;
	
	//Display the score on the screen
	document.getElementById("score").innerHTML = "Score: " + score;
	//Display miss counter and GAME OVER
	if (misses == 0){
		render.drawImage(miss0, 0, 10, 141, 19.5);
	}
	else if (misses == 1){
		render.drawImage(miss1, 0, 10, 141, 19.5);
	}
	else if (misses == 2){
		render.drawImage(miss2, 0, 10, 141, 19.5);
	}
	else {
		render.drawImage(miss3, 0, 10, 141, 19.5);
		oilCoor = 0;
		d = 4;
		if (bucketPosY > 200 && bucketDrops != 4){
			bucketPosY -= 10;
		}
		else {
			bucketDrops = 4;
			bucketPosY +=20;
		}
		document.getElementById("GM").innerHTML = "GAME OVER (Please Reload)"
	}
	//Display bucket
	if (a != 3 && d != 3){
		if (bucketDrops == 0){
			render.drawImage(bucket, bucketPosX, bucketPosY, 140, 119);
		}
		else if (bucketDrops == 1){
			render.drawImage(bucket1, bucketPosX, bucketPosY, 140, 119);
		}
		else if (bucketDrops == 2){
			render.drawImage(bucket2, bucketPosX, bucketPosY, 140, 119);
		} 
		else if (bucketDrops == 3){
			render.drawImage(bucket3, bucketPosX, bucketPosY, 140, 119);
		}
		else {
			render.drawImage(bucketL, bucketPosX, bucketPosY, 140, 119);
		}
	}
	if (a == 3){
		render.drawImage(bucketTiltLeft, bucketPosX, bucketPosY-10, 140, 140);
		score += (100 * bucketDrops * ((bucketDrops * 3) / 2));
		bucketDrops = 0;
	}
	if (d == 3){
		render.drawImage(bucketTiltRight, bucketPosX, bucketPosY-10, 140, 140);
		score += (100 * bucketDrops * ((bucketDrops * 3) / 2));
		bucketDrops = 0;
	}
}, 17);

//Oil loop
setInterval(function (){
	render.clearRect(141, 0, canvas.width, canvas.height - 130);
	if (oilCoor.row < 440){
		render.drawImage(oil, oilCoor.col * 155, oilCoor.row, 80, 110);
	}

	oilCoor.row = oilCoor.row + 110;
	if (oilCoor.row > 500) {
			if (bucketDrops > 2){
				misses = misses + 1;
				bucketDrops = 0;
				oilCoor = positionToRowCol(initialPos[Math.floor(Math.random()*initialPos.length)]);
			}
			else if (oilCoor.col == 1 && bucketPosX == 150 || oilCoor.col == 2 && bucketPosX == 280 || oilCoor.col == 3 && bucketPosX == 410) {
				bucketDrops++;
				score += 10;
				oilCoor = positionToRowCol(initialPos[Math.floor(Math.random()*initialPos.length)]);
			}
			else {
				misses++;
				oilCoor = positionToRowCol(initialPos[Math.floor(Math.random()*initialPos.length)]);
			}
	}
}, 600);

