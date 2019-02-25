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






// function draw() {
// 	console.log('draw');
// }

// function loop(timestamp) {
//   var progress = timestamp - lastRender

//   main.update(progress)
// //  draw()

//   lastRender = timestamp
//   window.requestAnimationFrame(loop);
// }

// var lastRender = 0;
// window.requestAnimationFrame(loop);




Vue.component('computer', {
	props: {
		name: {
			default:"new Computer"
		},
	},
	data() {
		main.tots.push(this);
		return {
			ip:String(Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0),
			isHacked:false,
			ram:(Math.floor(Math.random()*15)+1)*8,
			mem:(Math.floor(Math.random()*15)+1)*8,
			hackTime:0,
		}
	},
	methods:{
		HackClick() {
		//	this.$emit('hackr-emit',this);
			main.hacking(this);
			this.isHacked=true;
		},
		IgnoreClick() {
			main.ignore(this);
		},
		OverloadClick() {
			main.overload(this);
		}
	},//v-if:[hackTime>100]=HackClick'		
	template:
	`<div v-show:v-if="hackTime<100">
		{{ip}}
		<button @click='HackClick'>
			Begin Hacking!
		</button>
		<button @click='IgnoreClick'>Ignore!</button>
		<progress :value=hackTime max=100></progress>
	</div>`,
	computed: {
		telemetry() {
			return `${this.ip} / ${this.isHacked} / ${this.ram} / ${this.mem}`;
		}
	}	
}) 
		// <progress :value=progress max=100></progress>

var main = new Vue({ 
	el: '#app', 
	data: {
		bots:[],
		nots:[],
		tots:[],
		stat:{
			ram:200,
			mem:200,
			ip:127.001
		},
		upgrades:[
			{
				name:"RAM",				
				id:"ram",
				img:"noun_ram_1760674.png",
				cost:2,
			},
			{
				name:"Memory",
				id:"mem",
				img:"noun_Memory_1254336.png",
				cost:1
			}
		],		
		currentImage:0,
		cash:10,
		searching:false,
	},
	methods:{
		hacking(arg) {
			this.bots.push(arg);
			this.nots.splice( this.nots.indexOf(arg),0);
			console.log(arg.ip);
			this.searching=false;
		},
		Upgrade(newItem, index) {
			this.stat[Object.keys(this.stat)[index]]++;
			this.cash-=newItem.cost;
		},
		UpdateImage(newImg) {
			this.currentImage=newImg;
		},
		Search () {
			this.searching=true;
			// const vueContainer = document.createElement('div')
			// document.getElementById('app').appendChild(vueContainer)
			// vm = ( new ( Vue.extend(main) ) ).$mount(vueContainer)
			//	var arc = new computer()
			//	document.createElement("computer");
			///sdocument.getElementById('app').appendChild(document.createTextNode("Water");)
		 	this.nots.push(0);
		},
		ignore (ele) {
			this.nots.splice( this.nots.indexOf(ele),1);
			console.log("ignored");
			this.searching=false;
		},
		update() {
		//	setTimeout(this.update, this.bots.length*64);
			//console.log('update');
			this.cash+=this.bots.length;
			this.tots.forEach(function(element) {
		   		element.hackTime++;
		   		console.log(element.progress);
		    });
		    console.log(this.nots[0]);

			// for (this.bots.length)
			// this.bots.length+=this.bots.length/64
		}

	},
	computed: {
		title() {
			return 'C&C ' + this.stat.ip;
		},
		image () {
			return this.upgrades[this.currentImage].img;
		},
		totalPower() {
		   let totalRam = 0;
		   let totalMem = 0;

		    this.bots.forEach(function(element) {
		   		totalRam+=element.ram;
		   		totalMem+=element.mem;
		    });
			return `${this.bots.length} / ${totalRam} / ${totalMem}`;
		}
	}	
}) 

setInterval(main.update, 128);