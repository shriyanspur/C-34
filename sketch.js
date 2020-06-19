var square;
var database, position, ball;

function setup(){
    database = firebase.database();
    console.log(database);

    createCanvas(500,500);
    square = createSprite(250,250,10,10);
    square.shapeColor = "red";

    var squarePos = database.ref("ball/position");
    squarePos.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x: position.x + x,
        y: position.y + y
    })
    /*square.x = square.x + x;
    square.y = square.y + y;*/
}

function readPosition(data) {
    position = data.val();
    console.log(position.x);

    square.x = position.x;
    square.y = position.y;
}

function showError() {
    console.log("error");
}