
$ npm install oauth;
var dataFile = [];
var xmlhttp = new XMLHttpRequest();
var url = "names.json";
var size = 16;
xmlhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          getNames(myArr);

    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function getNames (data) {
    dataFile = data;
    createDesks(6);
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
            //console.log(dist);
            //console.log("FRACK YEAH");
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

function createDesks () {
  var sceneEl = document.querySelector('a-scene');

  var player = document.querySelector('#cameraWrapper');
  player.setAttribute("position",{x: (size*3)/2+1.5, y: 1, z: (size*5)/2-1.25});
  for (var r = 0; r < 2; r++) {
        var roof = sceneEl.querySelector('#roof'+r);
       // console.log(roof);
        roof.setAttribute("position",{x: (size*3)/2, y: (r*3)-1, z: (size*5)/2-3});
        roof.setAttribute("width",size*3);
        roof.setAttribute("height",size*5);
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
        modelEnt.setAttribute('position', {x: (i%size)*3, y: -1, z: Math.floor(i/size)%size*5});
        deskPar.appendChild(modelEnt);
        //modelEnt.appendChild(nameTag);
      //   AFRAME.registerComponent('modely'+i, {
      //     init: function () {
      //       var targetEl = this.el; 
      //   }{x: , y: , z: }
      // });
      var comp = document.createElement('a-entity');
      var rand = Math.random();
      if (rand < .3) {
        comp.setAttribute("gltf-model","#computer1");
      }
      else if (rand < .6) {
        comp.setAttribute("gltf-model","#computer2");
      }
      else {
        comp.setAttribute("gltf-model","#computer3");
      }
      //comp.setAttribute("geometry","box");
            //comp.setAttribute("material","color:red");

      comp.addEventListener('mouseenter', function(e) {
        ico.setAttribute("material","color:#fff54b");
        ico.setAttribute("scale",{x: 0.01, y: 0.01, z:0.01});
      });
      comp.addEventListener('mouseleave', function(e) {
        ico.setAttribute("material","color:#ffae72");
        ico.setAttribute("scale",{x: 0.003, y: 0.003, z:0.003});
      });      
      comp.setAttribute("position",{x: 1.25, y: 0.75, z: -2});
      modelEnt.appendChild(comp);
      console.log(i);

      comp.addEventListener('mousedown', function(e) {
          player.setAttribute("position",{x: comp.parentElement.getAttribute("position").x+1.5, y: 1, z:comp.parentElement.getAttribute("position").z-1});
      });
      }());  
    }
  }
}

// var OAuth = require('oauth')
// `npm install oauth` to satisfy
// website: https://github.com/ciaranj/node-oauth

var KEY = "2afbaa699b1c4f53875433fd971e398d"
var SECRET = "a9ad9cee80614dafa5446e8f9bb51405"

var oauth = new OAuth.OAuth(
  'http://api.thenounproject.com',
  'http://api.thenounproject.com',
  KEY,
  SECRET,
  '1.0',
  null,
  'HMAC-SHA1'
)
oauth.get(
  'http://api.thenounproject.com/icon/6324',
  null,
  null,
  function (e, data, res){
    console.log("SOMETHING");
    if (e) console.error(e)
    console.log(require('util').inspect(data))
  }
)