var app = new Vue({
	el:'#app',
	data: {
		product:'gloves',
		image:'glove.png',
		link:'https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related?hl=en',
		inventory:9,
		inStock:false,
		details:["good for cooking","made from llama wool","has two coffee stains"],
		variants: [{vant:"xmas",ant:230},{vant:"otherHoliday",ant:220}]
	}
})

var product = 'gloves';

//
app.product = 'shoes';
