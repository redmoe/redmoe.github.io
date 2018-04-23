AFRAME.registerComponent('bus', {
  init: function () {
    var targetEl = this.el;  
    //targetEl.setAttribute('color', 'blue');
    targetEl.setAttribute('scale','1 1 100')
    console.log(targetEl);
 //    targetEl.addEventListener('click', function () {
 //    	targetEl.setAttribute('dynamic-body',"mass:100");
	// });

  }
});