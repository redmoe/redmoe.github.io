var narwhals = 0;

AFRAME.registerComponent('reg', {
  init: function () {
    var targetEl = this.el;  
    targetEl.setAttribute('scale','1.5f 1.5f 1.5f')
    console.log(targetEl);


  }
});

// AFRAME.registerComponent('modelr', {
//   init: function () {
//     var els = this.el;  
//     var sceneEl = document.querySelector('a-scene');
//     console.log("CHECK 1");
// 	els.addEventListener('mouseenter', function () {
// 			narwhals++;
// 			var narwhal = sceneEl.querySelector('#modely');
// 			narwhal.sceneEl.removeChild(narwhal);
// 			sceneEl.querySelector('#UItext').setAttribute('value',"Narwhal Count:" + narwhals);
// 			// console.log(narwhals);
// 	});
//   }
// });

// var canvas = document.getElementById('mycanvas');

// var ctx = canvas.getContext('2d');

// canvas.height = 500;
// canvas.width = 700;
// var x = 100;
// function loop() {
// 	x++;
// 	ctx.strokeRect(x,100,50,x);
// requestAnimationFrame(loop);
// console.log(x)

// }
// loop();