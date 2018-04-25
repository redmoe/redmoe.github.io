AFRAME.registerComponent('bus', {
  init: function () {
    var targetEl = this.el;  
    //targetEl.setAttribute('color', 'blue');
    //targetEl.setAttribute('scale','1.5f 1.5f 1.5f')
   // console.log(targetEl);
 //    targetEl.addEventListener('click', function () {
 //    	targetEl.setAttribute('dynamic-body',"mass:100");
	// });

  }
});
var num =-1;
var zOffset = 0;
for (var i = 0; i < 16; i++) {
	  //  console.log("Hey all");
    //console.log(i);

  AFRAME.registerComponent('bus'+i, {
 //    targetEl.setAttribute("material","flatShading:true;");
      //    targetEl.material.shading.;
    //console.log( targetEl.material.shading);
  init: function () {
            var targetEl = this.el; 
 targetEl.setAttribute("material","flatShading:true;");
  	num++;
    if (num > 3) {
    	num = 0;
    	zOffset += 5;

    } 
    //targetEl.setAttribute('color', 'blue');
    targetEl.object3D.position.set(num*3,-1,zOffset);
        //targetEl.object3D.scale.set(1,1,1);

     console.log(num);
 //    targetEl.addEventListener('click', function () {
 //    	targetEl.setAttribute('dynamic-body',"mass:100");
	// });

  }
});
}