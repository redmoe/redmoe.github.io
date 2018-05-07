
var dataFile = [];
// loadJSON('names.json', parseJson);


// var jsl = JSON.parse('names.json');
// console.log(jsl);
var xmlhttp = new XMLHttpRequest();
var url = "names.json";


xmlhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
             //   console.log(myArr);
          getNames(myArr);
         // myFunction(myArr);
//     // myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function getNames (data) {
    dataFile = data;
    createDesks(6);

}
// var loader = new THREE.JSONLoader();
// loader.load( 'names.json', function ( geometry, materials ) {
//     var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
//     scene.add( mesh );
// });
// function parseJson (data) {
//   names = data.charcthers;
//   console.log(names);
// }

function coroutine(f) {
    var o = f(); // instantiate the coroutine
    o.next(); // execute until the first yield
    return function(x) {
        o.next(x);
    }
}
function createWalls () {

}
function createDesks (size) {
  var sceneEl = document.querySelector('a-scene');
  var rotEnt = [0, 90, 270, 180];
  var ind = 0;
  // for (var x = 0; x < 2; x++) {
  //   for (var z = 0; z < 2; z++) {
  //     var wallEnt = document.createElement('a-plane');
  //     wallEnt.setAttribute("color","#24340e");
  //     wallEnt.setAttribute("material","flatShading:true");
  //     wallEnt.setAttribute("width",size*6);
  //     wallEnt.setAttribute("height",3);
  //     wallEnt.setAttribute("position",{x: (x*size*5)/2, y: 0, z: (z*size*3)/2});
  //     wallEnt.setAttribute("rotation",{x: 0, y: rotEnt[ind], z: 0 });
  //     wallEnt.setAttribute("id",ind);
  //     sceneEl.appendChild(wallEnt);
  //     ind++;
  //   }
  // }
  //0 0- 0
  //0 1

  //1 0
  //1 1

          var clock = coroutine(function*() {
            console.log("HEEE");
              while (true) {
                  yield;
                  console.log('Tick!');
                  yield;
                  console.log('Tock!');
              }
          });
          clock(); 
    var player = document.querySelector('#cameraWrapper');
    player.setAttribute("position",{x: (size*3)/2-1.5, y: 1, z: (size*5)/2+1.5});

  AFRAME.registerComponent('floor', {
      init: function () {
        var targetEl = this.el; 
        targetEl.setAttribute("position",{x: (size*3)/2-3, y: -1, z: (size*5)/2});
        targetEl.setAttribute("width",size*3);
        targetEl.setAttribute("height",size*5);
      }
  });
  AFRAME.registerComponent('roof', {
      init: function () {
        var targetEl = this.el; 
        targetEl.setAttribute("position",{x: (size*3)/2-3, y: 2, z: (size*5)/2});
        targetEl.setAttribute("width",size*3);
        targetEl.setAttribute("height",size*5);
      }
  });  
  AFRAME.registerComponent('screen', {
      init: function () {
        var sizeTimer = null;

        var targetEl = this.el; 
        targetEl.addEventListener('mouseleave', function(e) {
          clearInterval(sizeTimer);
          console.log('mouse up');
          sizeTimer = null;

          //console.log(sizeTimer);

        }); 
        targetEl.addEventListener('mouseenter', function(e) {
          sizeTimer = setInterval(function(){   
            moveTowards();
           // console.log(sizeTimer);
          }, 1);
          console.log('mouse down');

        });


        function moveTowards () {
          var cam = document.querySelector('#camera');
          var camPos = cam.getAttribute("position");
          var tarPos = targetEl.getAttribute("position");
          var dist = 0.001;
       //   var dist = Math.sqrt( Math.pow(camPos.x-tarPos.x,2)+ Math.pow(camPos.y-tarPos.y,2)+ Math.pow(camPos.z-tarPos.z,2));
          console.log(dist);
         // var dist = ( Math.sqrt( Math.pow(camPos.x-tarPos.x,2)+ Math.pow(camPos.y-tarPos.y,2)+ Math.pow(camPos.z-tarPos.z,2)) - 0) / (1 - 0);
          if (dist < 0 || dist ==0) {
           return;
          }
          camPos.x = camPos.x+(tarPos.x -camPos.x) * dist;
          camPos.y = camPos.y+(tarPos.y -camPos.y) * dist;
          camPos.z = camPos.z+(tarPos.z -camPos.z) * dist;
        //  console.log(Math.sqrt( Math.pow(camPos.x-tarPos.x,2)+ Math.pow(camPos.y-tarPos.y,2)+ Math.pow(camPos.z-tarPos.z,2)));

          cam.setAttribute("position",camPos);
        }
      }
  }); 
  for (var i = 0; i < size * size; i++) {
    var modelEnt = document.createElement('a-entity');
    var nameTag = document.createElement('a-text');
    modelEnt.setAttribute("value",dataFile.Charcthers[i%dataFile.Charcthers.length].name);
    modelEnt.setAttribute("id","modely"+i);
    modelEnt.setAttribute("modely"+i);
    modelEnt.setAttribute("gltf-model","#desk");
    modelEnt.setAttribute("material","flatShading:true");
    modelEnt.setAttribute('position', {x: (i%size)*3, y: -1, z: Math.floor(i/size)%size*5});
    sceneEl.appendChild(modelEnt);
    modelEnt.appendChild(nameTag);
    AFRAME.registerComponent('modely'+i, {
      init: function () {
        var targetEl = this.el; 
        // targetEl.setAttribute("material","flatShading:true;");
    }
  });
}}

