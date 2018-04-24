AFRAME.registerComponent('reg', {
  init: function () {
    var targetEl = this.el;  
    //targetEl.setAttribute('color', 'blue');
    targetEl.setAttribute('scale','1.5f 1.5f 1.5f')
    console.log(targetEl);
 //    targetEl.addEventListener('click', function () {
 //    	targetEl.setAttribute('dynamic-body',"mass:100");
	// });

  }
});