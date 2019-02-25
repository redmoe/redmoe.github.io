// var app = new Vue({
// 	el:'#app',
// 	data: {
// 		name:'My Computer',
// 		stat:{
// 			ram:200,
// 			mem:200,
// 			ip:'10.23.4'
// 		},
// 		images:[
// 			{
// 				id:"memory",
// 				img:"noun_Memory_1254336.png"
// 			},
// 			{
// 				id:"ram",
// 				img:"noun_ram_1760674.png"
// 			}
// 		],
// 		shop:[
// 			{
// 				name:"RAM",
// 				cost:2,
// 			},
// 			{
// 				name:"Memory",
// 				cost:1,
// 			}			
// 		],
// 		viruses:[],
// 		currentImage:0,
// 		cash:10,


// 		// product:'gloves',
// 		// image:'glove.png',
// 		// link:'https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related?hl=en',
// 		// inventory:9,
// 		// inStock:false,
// 		// details:["good for cooking","made from llama wool","has two coffee stains"],
// 		// variants: [{vant:"xmas",ant:230},{vant:"otherHoliday",ant:220}]
// 	},
// 	methods:{
// 		Upgrade(newItem, index) {
// 			this.stat[Object.keys(this.stat)[index]]++;
// 			this.cash-=newItem.cost;
// 		},
// 		Hack() {
// 			console.log("hack");
// 		},
// 		UpdateImage(newImg) {
// 			this.currentImage=newImg;
// 		}
// 	},
// 	computed: {
// 		title() {
// 			return this.name + ' ' + this.stat.ip;
// 		},
// 		image () {
// 			return this.images[this.currentImage].img;
// 		}
// 	}
// })






Vue.component('computer', {
	props: {
		name: {
			default:"new Computer"
		},
	},
	data() {
		return {
			ip:String(Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0),
			isHacked:false
		}
	},
	methods:{
		HackClick() {
			this.$emit('hackr-emit',this);
			main.hacking(this);
			console.log("Hack step 1");
			this.isHacked=true;
			
		},
		RandomMethod() {
			console.log("blarg");
		}
	},
	template:
	`<div :hidden="isHacked">
		{{ip}}
		<button @click='HackClick'>
			Begin Hacking!
		</button>
	</div>`


}) 

var main = new Vue({ 
	el: '#app', 
	data: {
		bots:[],
		nots:[],
		//name:'My Computer',
		stat:{
			ram:200,
			mem:200,
			ip:127.001
		},
		images:[
			{
				id:"memory",
				img:"noun_Memory_1254336.png"
			},
			{
				id:"ram",
				img:"noun_ram_1760674.png"
			}
		],
		shop:[
			{
				name:"RAM",
				cost:2,
			},
			{
				name:"Memory",
				cost:1,
			}			
		],
		currentImage:0,
		cash:10,

	},
	methods:{
		hacking(arg) {
			this.bots.push(arg);
			this.nots.splice( this.nots.indexOf(arg),1);
			console.log(arg.ip);
		},
		Upgrade(newItem, index) {
			this.stat[Object.keys(this.stat)[index]]++;
			this.cash-=newItem.cost;
		},
		UpdateImage(newImg) {
			this.currentImage=newImg;
		},
		Search () {
			// const vueContainer = document.createElement('div')
			// document.getElementById('app').appendChild(vueContainer)
			// vm = ( new ( Vue.extend(main) ) ).$mount(vueContainer)

		//	var arc = new computer()
		//	document.createElement("computer");
		///sdocument.getElementById('app').appendChild(document.createTextNode("Water");)
		 	this.nots.push(0);
		}	
	},
	computed: {
		title() {
			return this.name + ' ' + this.stat.ip;
		},
		image () {
			return this.images[this.currentImage].img;
		}
	}	
})

