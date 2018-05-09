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
                    console.log(dist);

          if (dist < .5 || dist ==0) {
            clearInterval(sizeTimer);
            sizeTimer = null;
            console.log(dist);
            console.log("FRACK YEAH");
            size /= 2;
            createDesks();
            var wrap = document.querySelector('#cameraWrapper');
            cam.setAttribute("position",{x: 0, y: 0, z: 0});
            wrap.setAttribute("position",{x: (size*3)/2-1.5, y: 1, z: (size*5)/2+1.5});
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
  player.setAttribute("position",{x: (size*3)/2-1.5, y: 1, z: (size*5)/2+1.5});
  for (var r = 0; r < 2; r++) {
        var roof = sceneEl.querySelector('#roof'+r);
        console.log(roof);
        roof.setAttribute("position",{x: (size*3)/2-3, y: (r*3)-1, z: (size*5)/2});
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
  if (size >= 1) {
      for (var i = 0; i < size * size; i++) {
        var modelEnt = document.createElement('a-entity');
        var nameTag = document.createElement('a-text');
        modelEnt.setAttribute("value",dataFile.Charcthers[i%dataFile.Charcthers.length].name);
        modelEnt.setAttribute("id","modely"+i);
        modelEnt.setAttribute("modely"+i);
        modelEnt.setAttribute("gltf-model","#desk");
        modelEnt.setAttribute("material","flatShading:true");
        modelEnt.setAttribute('position', {x: (i%size)*3, y: -1, z: Math.floor(i/size)%size*5});
        deskPar.appendChild(modelEnt);
        modelEnt.appendChild(nameTag);
      //   AFRAME.registerComponent('modely'+i, {
      //     init: function () {
      //       var targetEl = this.el; 
      //   }
      // });
    }
  }
}
