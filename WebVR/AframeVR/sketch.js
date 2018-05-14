var dataFile = [];
var xmlhttp = new XMLHttpRequest();
var url = "data.json";
var size = 16;
var currentDesk = 0;
var xSize = 3;
var zSize = 4;
var currentLevel = 0;
xmlhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      getNames(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
function findPos (comp) {
  var truePos = {x:comp.parentElement.getAttribute("position").x+ 1.5, y: 0, z: comp.parentElement.getAttribute("position").z-2.5}
  return truePos;
}
function getNames (data) {
    dataFile = data;
    console.log(data.levels[0].size);
    createDesks(data.levels[0]);
    AFRAME.registerComponent('screen', {
      init: function () {
        var sizeTimer = null;
        var targetEl = this.el; 
        targetEl.addEventListener('mouseleave', function(e) {
          if (size < 1) {
            return;
          }          
          clearInterval(sizeTimer);
          console.log('mouse up');
          sizeTimer = null;
        }); 
        targetEl.addEventListener('mouseenter', function(e) {
          if (size < 1) {
            return;
          }
          sizeTimer = setInterval(function(){   
            moveTowards();
          }, 1);
          console.log('mouse down');
        });
        function moveTowards () {
          var cam = document.querySelector('#camera');
          var camPos = cam.getAttribute("position");
          var tarPos = targetEl.getAttribute("position");
          var dist = Math.sqrt( Math.pow(camPos.x-tarPos.x,2)+ Math.pow(camPos.y-tarPos.y,2)+ Math.pow(camPos.z-tarPos.z,2));
        //var dist = ( Math.sqrt( Math.pow(camPos.x-tarPos.x,2)+ Math.pow(camPos.y-tarPos.y,2)+ Math.pow(camPos.z-tarPos.z,2)) - 0) / (1 - 0);
                   // console.log(dist);

          if (dist < .5 || dist ==0) {
            clearInterval(sizeTimer);
            sizeTimer = null;
            size /= 2;
            createDesks();
            var wrap = document.querySelector('#cameraWrapper');
            cam.setAttribute("position",{x: 0, y: 0, z: 0});
             wrap.setAttribute("position",{x: (size*3)/2+1.5, y: 1, z: (size*5)/2-1.25});
                            var screen = document.querySelector('#screen');

            if (size < 1) {
            screen.setAttribute("opacity",0);
            }
            else if (size==1) {
              screen.setAttribute('position',{x: -1.45, y: -1, z: -3.5});
            }
            return;
          }
          else if (sizeTimer) {
            var dist = 0.01;
            camPos.x = camPos.x+(tarPos.x -camPos.x) * dist;
            camPos.y = camPos.y+(tarPos.y -camPos.y) * dist;
            camPos.z = camPos.z+(tarPos.z -camPos.z) * dist;
          //  console.log(Math.sqrt( Math.pow(camPos.x-tarPos.x,2)+ Math.pow(camPos.y-tarPos.y,2)+ Math.pow(camPos.z-tarPos.z,2)));
            cam.setAttribute("position",camPos);
          }

        }
      }
  }); 

}

function createDesks (dat) {
  size = dat.size;
  var sceneEl = document.querySelector('a-scene');

  var player = document.querySelector('#cameraWrapper');
  for (var r = 0; r < 2; r++) {
        var roof = sceneEl.querySelector('#roof'+r);
       // console.log(roof);
        roof.setAttribute("position",{x: (size*xSize)/2, y: (r*xSize)-1, z: (size*zSize)/2-3});
        roof.setAttribute("width",size*xSize);
        roof.setAttribute("height",size*zSize);
  }
  var ind = 0;  
  var deskPar = document.querySelector('#deskPar');
  if (deskPar != null) {
     sceneEl.removeChild(deskPar);
  }
    deskPar = document.createElement('a-entity');
    deskPar.setAttribute("id","deskPar");
    sceneEl.appendChild(deskPar);
  // }
  // else {
  //       sceneEl.removeChild(deskPar.parentElement);
  //       deskPar = document.createElement('a-entity');
  //           deskPar.setAttribute("id","deskPar");




  // }
          var ico =document.querySelector('#cursorIcon');

  if (size >= 1) {
      for (var i = 0; i < size * size; i++) {
      (function (){
        var modelEnt = document.createElement('a-entity');
        //var nameTag = document.createElement('a-text');
        //modelEnt.setAttribute("value",dataFile.Charcthers[i%dataFile.Charcthers.length].name);
        modelEnt.setAttribute("id","modely"+i);
        modelEnt.setAttribute("modely"+i);
        modelEnt.setAttribute("gltf-model","#desk2");
        //modelEnt.setAttribute("collada-model","#desk-dae");
       // modelEnt.setAttribute("scale",{x: 10, y: 10, z: 10});

        //modelEnt.setAttribute("obj-model","obj:#desk-obj; mtl:#desk-mtl");

        modelEnt.setAttribute("material","flatShading:true");
        modelEnt.setAttribute('position', {x: (i%size)*xSize, y: -1, z: Math.floor(i/size)%size*zSize});
        deskPar.appendChild(modelEnt);
        //modelEnt.appendChild(nameTag);
      //   AFRAME.registerComponent('modely'+i, {
      //     init: function () {
      //       var targetEl = this.el; 
      //   }{x: , y: , z: }
      // });
  if (dat.desks[i]!= null) {
    if (dat.desks[i].c != 0) {
      var comp = document.createElement('a-entity');
      comp.setAttribute('id',"com"+i);
      //comp.setAttribute('tel',dat.desks[i].t);
      modelEnt.appendChild(comp);
      comp.setAttribute("position",{x: 1.25, y: 0.75, z: -2});

      comp.setAttribute("gltf-model","#computer"+dat.desks[i].c);
      comp.addEventListener('mouseenter', function(e) {
               var truePos = findPos (comp);

        var xDis = Math.pow(player.getAttribute("position").x-truePos.x,2);
        var zDis = Math.pow(player.getAttribute("position").z-truePos.z,2); 

        if (xDis < 3 || zDis < 5)
          {
            ico.setAttribute("material","color:#fff54b");
            ico.setAttribute("scale",{x: 0.015, y: 0.015, z:0.015});
                              ico.setAttribute("geometry","radius-inner:0.8");

        }
        else {
          ico.setAttribute("material","color:#acba13");
          
                  ico.setAttribute("scale",{x: 0.003, y: 0.003, z:0.003});

                  ico.setAttribute("geometry","radius-inner:0");

        }


      });
      comp.addEventListener('mouseleave', function(e) {
        ico.setAttribute("material","color:#ffae72");
        ico.setAttribute("scale",{x: 0.003, y: 0.003, z:0.003});
                  ico.setAttribute("geometry","radius-inner:0.8");

      });      

     // console.log(i);
     var tel = dat.desks[i].t;
     var idf = i;
      comp.addEventListener('mousedown',function(e) {
       var truePos = findPos (comp);
        if (ico.getAttribute("material").color == '#fff54b') {
           if (currentDesk == idf) {
              var tel = dat.desks.findIndex(function(element,index) {
                return element.c == dat.desks[idf].c && index != idf;
              });
              var telf = document.querySelector('#com'+tel);
              sizeTimer = setInterval(function(){   
                moveTowards();
              }, 1);
             }
             else {
              player.setAttribute("position",{x: truePos.x, y: 1, z:truePos.z+1});
              currentDesk=idf;
            }
          function moveTowards () {
              var camPos = player.getAttribute("position");
              var dist = 0.01;
              camPos.x = camPos.x+(truePos.x -camPos.x) * dist;
              camPos.y = camPos.y+(truePos.y -camPos.y) * dist;
              camPos.z = camPos.z+(truePos.z -camPos.z) * dist;
              player.setAttribute("position",camPos);
              var dis = ( Math.sqrt( Math.pow(camPos.x-truePos.x,2)+ Math.pow(camPos.y-truePos.y,2)+ Math.pow(camPos.z-truePos.z,2)) - 0) / (1 - 0);
              if (dis < .2) {
                clearInterval(sizeTimer);
                  sizeTimer = null;
                  console.log(dat);
                if (dat.desks[idf].end != null) {
                  currentLevel++;
                  createDesks(dataFile.levels[currentLevel]);
                }
                else {
                  player.setAttribute("position",{x: telf.parentElement.getAttribute("position").x+1.5, y: 1, z:telf.parentElement.getAttribute("position").z-1});
                  currentDesk=tel;
                }
           
              }
            } 
         }
        });
        }
        if (dat.desks[i].star != null) {
          console.log(i);
          console.log("FUCK");
          player.setAttribute("position",{x: 1.5+(i%size)*xSize,y: 1,z:Math.floor(i/size)%size*zSize-1.5});
          currentDesk=i;
        }
        }

      }());  
    }
  }
}

// var OAuth = require('oauth')
// `npm install oauth` to satisfy
// website: https://github.com/ciaranj/node-oauth

// var KEY = "2afbaa699b1c4f53875433fd971e398d"
// var SECRET = "a9ad9cee80614dafa5446e8f9bb51405"

// var oauth = new OAuth.OAuth(
//   'http://api.thenounproject.com',
//   'http://api.thenounproject.com',
//   KEY,
//   SECRET,
//   '1.0',
//   null,
//   'HMAC-SHA1'
// )
// oauth.get(
//   'http://api.thenounproject.com/icon/6324',
//   null,
//   null,
//   function (e, data, res){
//     console.log("SOMETHING");
//     if (e) console.error(e)
//     console.log(require('util').inspect(data))
//   }
// )