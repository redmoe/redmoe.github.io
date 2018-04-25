AFRAME.registerComponent('bus', {
  init: function () {
    var targetEl = this.el;  
    //targetEl.setAttribute('color', 'blue');
    //targetEl.setAttribute('scale','1.5f 1.5f 1.5f')
    console.log(targetEl);
 //    targetEl.addEventListener('click', function () {
 //    	targetEl.setAttribute('dynamic-body',"mass:100");
	// });

  }
});
var num =-1;
var zOffset = 0;
for (var i = 0; i < 15; i++) {
	  //  console.log("Hey all");
    //console.log(i);

  AFRAME.registerComponent('bus'+i, {
  init: function () {
  	num++;
    var targetEl = this.el; 
    if (num > 4) {
    	num = 0;
    	zOffset += 4;

    } 
    //targetEl.setAttribute('color', 'blue');
    targetEl.object3D.position.set(num*2.3,-2,zOffset);
        //targetEl.object3D.scale.set(1,1,1);

     console.log(num);
 //    targetEl.addEventListener('click', function () {
 //    	targetEl.setAttribute('dynamic-body',"mass:100");
	// });

  }
});
}