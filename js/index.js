//Game constants and variables
let direction = {x: 0, y: 0};
const foodsound = new Audio('music/food.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3')
const musicsound = new Audio('music/music.mp3')
let speed = 4;
let prevtime=0;
let score = 0;
let snakearr = [
    {x:5,y:5}
];
food = {x:6,y:7};


//for swipe events


(function() {
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 500 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 10 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 45) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();














$(document).on("pagecreate","#pageone",function(){
    $("#board").on("swipeup",function(){
        direction.x = 0;
        direction.y = -1;
        movesound.play();
        musicsound.play();
    });                       
  });
  
  $(document).on("pagecreate","#pageone",function(){
    $("#board").on("swipedown",function(){
        direction.x =0;
        direction.y = 1;
        movesound.play();
        musicsound.play();
    });                       
  });
  
  $(document).on("pagecreate","#pageone",function(){
    $("#board").on("swipeleft",function(){
        direction.x = -1;
          direction.y = 0;
          movesound.play();
        musicsound.play();
    });                       
  });
  
  $(document).on("pagecreate","#pageone",function(){
    $("#board").on("swiperight",function(){
        direction.x = 1;
        direction.y = 0;
        movesound.play();
        musicsound.play();
    });                       
  });




//swpine events end here








//Game Functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-prevtime)/1000<(1/speed))
    {
        return;
    }
    // console.log(ctime);
    prevtime = ctime;
    gameEngine();
}








function iscollide(snake)
{
    //if you are bump with yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }  
    return false;
}

function gameEngine()
{
    if(iscollide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        direction = {x:0,y:0};
        alert("Game Over!. Try again.")
        snakearr = [{x:5,y:5}];
        // snakearr = [{x: 13, y: 15}];
        musicsound.play();
        score = 0;
    }

    //if you have eaten food then

    if(snakearr[0].y === food.y && snakearr[0].x ===food.x)
    {
        foodsound.play();
        score +=1;

scoreBox.innerHTML = "Score: "+ score;
    snakearr.unshift({x:snakearr[0].x+direction.x,y:snakearr[0].y+direction.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

    }

    

    //moving the snake

    for(var i=snakearr.length -2;i>=0;i--)
    {
        snakearr[i+1] = {...snakearr[i]};
    }
    snakearr[0].x += direction.x;
    snakearr[0].y += direction.y;

    board.innerHTML = "";
    snakearr.forEach((e,index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;

        if(index===0)
        {
            snakeelement.classList.add('head');
        }
        else
        {
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    });
    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food')
    board.appendChild(foodelement);
}



//main logic starts here
// musicsound.play();
window.requestAnimationFrame(main);


function startgame()
{
    window.addEventListener('keydown', e =>{
        direction = {x:0,y:1}
        movesound.play();
        musicsound.play();
        switch(e.key){
            case "ArrowUp":
                // console.log("ArrowUp");
                direction.x = 0;
                direction.y = -1;
                break;
                
            case "ArrowDown":
                // console.log("ArrowDown");
                direction.x = 0;
                direction.y = 1;
                break;
    
            case "ArrowLeft":
                // console.log("ArrowLeft");
                direction.x = -1;
                direction.y = 0;
                break;
    
            case "ArrowRight":
                // console.log("ArrowRight");
                direction.x = 1;
                direction.y = 0;
                break;
    
            default:
                
                break;
    
        }
    });


}
function cdu() 
{
    direction.x = 0;
    direction.y = -1;
     movesound.play();
        musicsound.play();
}

function cdd() 
{
    direction.x = 0;
    direction.y = 1;
     movesound.play();
        musicsound.play();
}

function cdr() 
{
    direction.x = 1;
    direction.y = 0;
     movesound.play();
        musicsound.play();
}

function cdl() 
{
    direction.x = -1;
    direction.y = 0;
     movesound.play();
        musicsound.play();
}

