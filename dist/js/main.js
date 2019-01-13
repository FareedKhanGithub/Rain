
/*you should try to increase spped every 200 points       */











var game = (function(){
  var canvas = document.getElementById('canvas');     //canvas call from html allows us space
  var ctx = canvas.getContext('2d');     //plane           ?????????????????how did you know you need this?


/*
The HTML5 <canvas> tag is used to draw graphics, on the fly, via scripting (usually JavaScript).
However, the <canvas> element has no drawing abilities of its own (it is only a container for graphics) -
 you must use a script to actually draw the graphics.

The getContext() method returns an object that provides methods and properties for drawing on the canvas.
This reference will cover the properties and methods of the getContext("2d") object,
 which can be used to draw text, lines, boxes, circles, and more - on the canvas.


*/








  var player = {
    x:0,
    y:475,
    h: 25,                                       //varible storage //with various traits
    w: 25,                            //Jason really uses Json alot
    fill: '#fff',                 //I am sure youll be able to access all these mini attributes just like
    dir: 'right',                      //an object
    speed: 5
  }

  var spawn = {
    x: 50,
    y: 0,
    h: 10,                                //same as above in explaination
    w: 10,
    fill: '#3399ff',        //#ff0
    speed: 5
  }

  var spawns = {}                      //empty array   //array is filled with json objects

  var spawner = null;

  var animation  = null;                         //nullls

  var gameOver = false;               //boolean

  var score = 0;










  function launchSpawns(){                        //will launch spawns ever .4 secounds
    spawner = setInterval(()=>{
      //Use psuedo-random strings to name the new spawns
      var text = "";
      var possible = "abcdefghijklmnopqrstuvwxyz";     //what was the point with the annoyingly named variable

      for (var i = 0; i < 100; i++){         //I am thinking this how the program determines lengths location
        text += possible.charAt(Math.floor(Math.random() * possible.length));       //math.random will show a random number from the range of 0 to 1 decimal

      }

      spawns[text] = {
        x:Math.floor(Math.random()*canvas.width),                                          //Math.floor rounds downward
        y:spawn.y,                                          //Math.random
        h:spawn.h,                                 //json and then spawn.y
        w:spawn.w,
        fill:spawn.fill,                                     //from the global variable above
        speed:10,
      }

    },300);            //this is setting the interval to every 400 milliseconds    .4 seconds
                             //for example, Zyris uses this 3 sec = 3000milliseconds
  }









  function moveSpawns(){

      /*Object.keys() is used for returning enumerable properties of a simple array.
Object.keys() is used for returning enumerable properties of an array like object.
Object.keys() is used for returning enumerable properties of an array like object with random key ordering.
*/



    if(Object.keys(spawns).length>0){             //if object length more than 0
      for(let spawn in spawns){                           //

        if(spawns[spawn].y<=canvas.height){


          ctx.fillStyle = spawns[spawn].fill;


          ctx.save();

          ctx.clearRect(
            spawns[spawn].x,                                              //the spawn come from the sky and drop down like rectangles only if not cleared
            spawns[spawn].y-spawns[spawn].speed,                  //they drop at the spawn speed
            spawns[spawn].w,                                //this will only clear nothing its fine
            spawns[spawn].h+2
          );

          ctx.fillRect(
            spawns[spawn].x,                                               //will fill the falling rectangles
            spawns[spawn].y = (spawns[spawn].y+spawns[spawn].speed),
            spawns[spawn].w,
            spawns[spawn].h
          );

          //ctx.restore();                                          //this line does nothing

          if (
            player.x < spawns[spawn].x + spawns[spawn].w &&
            spawns[spawn].x > player.x && spawns[spawn].x < (player.x + player.w) &&
            player.y < spawns[spawn].y + spawns[spawn].h &&
            player.y + player.h > spawns[spawn].y
          ){
            gameOver = true;                           //game is over
            cancelAnimationFrame(animation);                       //animation is a null global variable and null signifies false in this case
            clearInterval(spawner);                                    //spawner is a null therefore a false boolean
          }

        }else{
          score = score + 10;
          document.getElementById('score').innerHTML = score;        //this is how the score keeps on increasing

          while(score % 100 == 0){
              //spawns[speed].y == score + 100;                                                 //it seems that changing th speed midgaming is breaking it
              //continue;
              break;
          }
          delete spawns[spawn];                                           //deleting spawns
        }
      }
    }
  }








  function movePlayer(){
    ctx.fillStyle=player.fill;

    if(player.dir === 'right'){

      ctx.clearRect(
        player.x-player.speed,
        player.y-1,                                          //clears the white space
        player.w+2,
        player.h+2
      );

      ctx.fillRect(                                               //this fills in the white spots
        player.x = (player.x + player.speed),                               //sppeds to the right
        player.y,
        player.w,
        player.h
      );

      if((player.x + player.w) >= canvas.width){
        player.dir = 'left';                                //right boundary
      }

    }else{

      ctx.clearRect(
        player.x+player.speed,
        player.y-1,
        player.w+2,
        player.h+2
      );

      ctx.fillRect(
        player.x = (player.x - player.speed),                                 //speeds to left notice how it is negative
        player.y,
        player.w,
        player.h
      );

      if(player.x <= 0){                     //if x is less than 0 turn right
        player.dir = 'right';                      //boundaries
      }
    }
  }



  function animate(){
    movePlayer();                       //calls methods as well
    moveSpawns();
    if(gameOver===false){                                      //run when the game is on allows frames to pass
      animation = window.requestAnimationFrame(animate.bind(animation));
    }
  }






















  return {                                             //I didnt realize all of this was contained inside one function

    changeDirection: function(){
      if(player.dir === 'left'){
        player.dir = 'right';
      }else if(player.dir === 'right'){                        //opposite direction
        player.dir = 'left';
      }
    },

    init: function(){                                             //how can you access the init function once it is called?
      canvas.height = 600;                                  //size of the canvas is controlled here
      canvas.width = 800;

      launchSpawns();
      animate();                        //frame passes
    }
  }
})();





game.init();    //i wonder if this is the one that calls the part in the return section

window.addEventListener('keyup', function(){                              //this is another ability apprently if you press up and down
  game.changeDirection();
});
