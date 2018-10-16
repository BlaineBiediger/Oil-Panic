///Graphics : O
var bucket = new Image();
bucket.src = "Bucket0.png";

var bucket1 = new Image();
bucket1.src = "Bucket1.png";

var bucket2 = new Image();
bucket2.src = "Bucket2.png";

var bucket3 = new Image();
bucket3.src = "Bucket3.png";

var oil = new Image();
oil.src = "Oil.png";

var bucketTiltLeft = new Image();
bucketTiltLeft.src = "BucketTiltLeft.png";

var bucketTiltRight = new Image();
bucketTiltRight.src = "BucketTiltRight.png";

var miss0 = new Image();
miss0.src = "Miss0.png"

var miss1 = new Image();
miss1.src = "Miss1.png"

var miss2 = new Image();
miss2.src = "Miss2.png"

var miss3 = new Image();
miss3.src = "Miss3.png"

var canvas = document.getElementById("Alfonso");
var render = canvas.getContext("2d");

///Positioning and Other Variables
var bucketPosX = (canvas.width / 2) - 70;
var bucketPosY = (canvas.height - 130);

var bucketDrops = 0;

var a = 0
var d = 0

var initialPos = [0, 1, 2]
var position = 16

var score = 0
var misses = 0

///Functions!
function positionToRowCol(position) {
	var row = Math.floor(position / 3);
	var col = Math.floor(position % 3) + 1;
	return { 
		row: row, 
		col: col
	};
}

var oilCoor = positionToRowCol(initialPos[Math.floor(Math.random()*initialPos.length)]);

function drawScore() {
    canvas.font = "16px Arial";
    canvas.fillStyle = "#0095DD";
    canvas.fillText = ("Score: "+score, 8, 20);
}

document.addEventListener("keydown", function(event) {
	if (event.code == "KeyA" && a < 3) {
		if (bucketPosX != 20 && d != 3) {
			bucketPosX = bucketPosX - 130;
		}
		a = a + 1
		d = d - 1
	}
	if (event.code == "KeyD" && d < 3) {
		if (bucketPosX != 540 && a != 3) {
		bucketPosX = bucketPosX + 130
		}
		a = a - 1
		d = d + 1
	}
});


///Intervals
setInterval(function (){
	render.clearRect(0, bucketPosY-10, canvas.width, canvas.height);
	render.clearRect(0,0, 141, 19.5);
	
	document.getElementById("score").innerHTML = "Score: " + score;
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
	}
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
			bucketDrops = 0;
		}
	}
	if (a == 3){
		render.drawImage(bucketTiltLeft, bucketPosX, bucketPosY-10, 140, 140);
		score = score + (100 * bucketDrops * (bucketDrops / 2));
		bucketDrops = 0;
	}
	if (d == 3){
		render.drawImage(bucketTiltRight, bucketPosX, bucketPosY-10, 140, 140);
		score = score + (100 * bucketDrops * ((bucketDrops * 3) / 2));
		bucketDrops = 0;
	}

}, 17);

setInterval(function (){
	render.clearRect(141,0, canvas.width, canvas.height - 130);
	drawScore();
	if (oilCoor.row < 470){
		render.drawImage(oil, oilCoor.col * 155, oilCoor.row, 80, 110);
	}
	oilCoor.row = oilCoor.row + 117;
	if (oilCoor.row > 500) {
			if (bucketDrops > 2){
				misses = misses + 1;
				bucketDrops = 0;
				oilCoor = positionToRowCol(initialPos[Math.floor(Math.random()*initialPos.length)]);
			}
			else if (oilCoor.col == 1 && bucketPosX == 150 || oilCoor.col == 2 && bucketPosX == 280 || oilCoor.col == 3 && bucketPosX == 410){
			bucketDrops = bucketDrops + 1
			score = score + 10
			oilCoor = positionToRowCol(initialPos[Math.floor(Math.random()*initialPos.length)]);
			}
			else {
				misses = misses + 1;
				oilCoor = positionToRowCol(initialPos[Math.floor(Math.random()*initialPos.length)]);
			}
	}
}, 600);

