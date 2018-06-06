var dataFile = [];
var xmlhttp = new XMLHttpRequest();
var url = "data.json";
var size = 16;
var currentDesk = 0;
var xSize = 3;
var zSize = 4;
var currentLevel = 0;
var currentlyTranisitioning = false;
//var catObject = sceneEl.querySelector('#roof0');
// console.log(document.querySelector('#roof0'));
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
  createDesks(data.levels[currentLevel]);
}
function createDesks (dat) {
  size = dat.size;
  var sceneEl = document.querySelector('a-scene');
  var player = document.querySelector('#cameraWrapper');
  for (var r = 0; r < 2; r++) {
    var roof = sceneEl.querySelector('#roof'+r);
    roof.setAttribute("position",{x: (size*xSize)/2, y: (r*xSize)-1, z: (size*zSize)/2-3});
    roof.setAttribute("width",size*xSize);
    roof.setAttribute("height",size*zSize);
  }
  var deskPar = document.querySelector('#deskPar');
  if (deskPar != null) {
    sceneEl.removeChild(deskPar);
  }
  deskPar = document.createElement('a-entity');
  deskPar.setAttribute("id","deskPar");
  sceneEl.appendChild(deskPar);
  var ico =document.querySelector('#cursorIcon');
  if (size >= 1) {
    for (var i = 0; i < size * size; i++) {
    (function (){
      var modelEnt = document.createElement('a-entity');
      modelEnt.setAttribute("id","modely"+i);
      modelEnt.setAttribute("modely"+i);
      modelEnt.setAttribute("gltf-model","#desk2");
      modelEnt.setAttribute("material","flatShading:true");
      modelEnt.setAttribute('position', {x: (i%size)*xSize, y: -1, z: Math.floor(i/size)%size*zSize});
      deskPar.appendChild(modelEnt);
      if (dat.desks[i]!= null) {
        if (dat.desks[i].c != null) {
          var comp = document.createElement('a-entity');      
          modelEnt.appendChild(comp);
          if (dat.desks[i].c != 0) {
            comp.setAttribute("gltf-model","#computer"+dat.desks[i].c);
            comp.setAttribute("position",{x: 1.25, y: 0.75, z: -2});
          }
          else {
            comp.setAttribute("material","src:#image");
            comp.setAttribute("geometry","primitive: plane;");
            comp.setAttribute("rotation",{x: -90,y:0,z:0})
            comp.setAttribute("position",{x: 1.5,y:.76,z:-2.3})
          }
          comp.setAttribute('id',"com"+i);
          comp.addEventListener('mouseenter', function(e) {
            var truePos = findPos (comp);
            var xDis = Math.abs(player.getAttribute("position").x-truePos.x,2);
            var zDis = Math.abs(player.getAttribute("position").z-truePos.z,2); 
            if ((xDis <= 3 && zDis <= 2) || (xDis <= 2 && zDis <= 6)) {
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
          var tel = dat.desks[i].t;
          var idf = i;
          comp.addEventListener('mousedown',function(e) {
            var truePos = findPos (comp);
            if (ico.getAttribute("material").color == '#fff54b' && currentlyTranisitioning == false) {
              if (currentDesk == idf) {
                var tel = dat.desks.findIndex(function(element,index) {
                  return element.c == dat.desks[idf].c && index != idf;
                });
                var telf = document.querySelector('#com'+tel);
                currentlyTranisitioning=true;
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
                  if (dat.desks[idf].end != null) {
                    currentLevel++;
                    createDesks(dataFile.levels[currentLevel]);
                  }
                  else {
                    player.setAttribute("position",{x: telf.parentElement.getAttribute("position").x+1.5, y: 1, z:telf.parentElement.getAttribute("position").z-1});
                    currentDesk=tel;
                  }
                currentlyTranisitioning=false;
                }
              } 
            }
            });
          }
          if (dat.desks[i].star != null) {
            player.setAttribute("position",{x: 1.5+(i%size)*xSize,y: 1,z:Math.floor(i/size)%size*zSize-1.5});
            currentDesk=i;
          }
        }
      }());  
    }
  }
  else {
    var roof0 = document.querySelector('#roof0');
    roof0.setAttribute("width",3);
    roof0.setAttribute("height",3);
    roof0.setAttribute("position",{x:0,y:-1,z:0});
    var roof1 = document.querySelector('#roof1');
    roof1.setAttribute("width",3);
    roof1.setAttribute("height",3);
    roof1.setAttribute("position",{x:0,y:2,z:0});
    var intro = document.querySelector('#introStuff');
    intro.setAttribute("position",{x:0,y:1,z:-1.5});
    player.setAttribute("position",{x:0,y:1,z:0});
  }
}