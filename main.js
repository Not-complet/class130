song = "";
leftWristY = "";
leftWristX = "";
rightWristY = "";
rightWristX = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function preload(){
    song = loadSound("music.mp3");
}
function draw(){
    image(video, 0, 0, 600, 500);
    circle(rightWristX, rightWristY, 20);
    if(scoreRightWrist > 0.2){
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = x0.5";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = x1.0";
        song.rate(1);
    }
    else if(rightWristY> 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed =  x1.5";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = x2";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = x2.5";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist > 0.2){
        fill("#FF0000");
        stroke("FF0000");
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume: "+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(0.7);
    song.rate(1);
}
function modelLoaded(){
    console.log("PoseNet Is Initialized");
}
function gotPoses(results){
    if(results.length>0){
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score: "+scoreLeftWrist);
        console.log("Rigth wrist Score: "+scoreRightWrist);
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Left Wrist X: "+leftWristX+" Left Wrist Y: "+leftWristY);
        console.log("Rigt Wrist X: "+rightWristX+" Right Wrist Y:"+rightWristY);
    }
}