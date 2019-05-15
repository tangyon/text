<template>

	<div class="describe" :style="{background:`url(${pic})50% / auto 100%`}" @click="hide">
		<div class="retreat">
			<span class="glyphicon glyphicon-arrow-left span" @click="go"></span>
		</div>
					<div class="title">
						<h4>{{keywordData[index].name}}</h4>
						<p>{{keywordData[index].singer}}</p>
					</div>
		<div class="lrc">
			<p class="lrc-p" v-for="(item,index) in lrc" :key="index" ref="p">
				{{item}}
			</p>
		</div>

		<div class="buttom">
			<van-slider v-model="value" @change="onChange" bar-height="5px" />
			<div class="control">
				<van-row>
					<van-col span="2" offset="1">
						<div id="pattern" class="glyphicon glyphicon-random " @click.stop="select" ref='pattern'>
							<div v-show="CantPlay" class="pattern-box" >
								<div class="pattern-select "v-for="(item,index) in ddd" @click.stop="icon(index)" >
									<span :class="item.cla" ></span>
									<span class="right">{{item.text}}</span>
								</div>
								
							</div>
						</div>
					</van-col>
					<van-col span="10" offset="4">
						<span class="glyphicon glyphicon-backward" @click="Previous"></span>
						<span class="glyphicon glyphicon-pause" @click="play" ref="play"></span>
						<span class="glyphicon glyphicon-forward" @click="following"></span>
					</van-col>
					<van-col span="2" offset="2">
						<div class="glyphicon glyphicon-heart" @click.stop="love" ref="loveIcon"></div>
					</van-col>
					<van-col span="2" offset="1">
						<div class="glyphicon glyphicon-list" @click.stop="list"></div>
					</van-col>
				</van-row>
			</div>

		</div>

		<van-popup v-model="show" position="bottom" :overlay="false" class="lists">
			<ul>
				<li class="list-box" v-for="(item , index) in keywordData"
					:key="index" @click="listIndex(index)">
					<h4>{{item.name}}</h4>
					<p>{{item.singer}}</p>
				</li>
			</ul>
		</van-popup>
		<van-loading type="spinner" color="white"  v-show="loading"/>
		<van-popup v-model="loves" class='love'>
			<h4>收藏歌单</h4>
			<ul>
				<li class="loveList" v-for="(item,index) in myMusic" :key="index" 
				@click="enshrine(index)">
						<div class="loveList-left"></div>
						<div class="loveList-right">
							<p>{{item.title}}</p>
						    <p>{{item.data.length}}</p>
						</div>
				</li>	
			</ul>
			
			
		</van-popup>
	</div>

</template>

<script>
	import { mapGetters } from 'vuex'
	import { Slider, Popup, Row, Col, Toast,Loading } from "vant"

	export default {
		name: "Describe",
		components: {
			[Slider.name]: Slider,
			[Row.name]: Row,
			[Col.name]: Col,
			[Popup.name]: Popup,
			[Toast.name]: Toast,
			[Loading.name]: Loading,
		},
		data() {
			return {
				value: 0,
				show: false,
				CantPlay:false,
				err:false,
				top:0,
				indexs:0,
				myMusic:'',
				loves:false,
				ddd:[
				{text:"随机播放",cla:"glyphicon glyphicon-random left"},
				{text:"列表循环",cla:"glyphicon glyphicon-resize-vertical left"},
				{text:"单曲循环",cla:"glyphicon glyphicon-resize-horizontal left"},
				]
			}
		},
			
		watch:{
			value(){
					let audio=document.querySelector("audio")
					let input=document.querySelector(".van-slider")
					let that=this
					input.onclick=function(){
						audio.currentTime=that.value/(100/audio.duration)
					}
			}
		},
		
		computed: {
			...mapGetters({
				keywordData: "getKeywordData",
				lrc: 'getLrc',
				url: "geturl",
				index:"getIndex",
				time:"getTimes",
			}),
			pic() {
				return this.$store.getters.getpic
			},
			loading(){
				return this.$store.getters.getLoading
			}
		},
		methods: {
			hide(){
					if(this.CantPlay==true){
						this.CantPlay=false
					}
					if(this.show==true){
						this.show=false
					}
				
			},
//			播放暂停
			play(){
					let audio=document.querySelector("audio")
					let play=this.$refs.play
					console.log(audio.paused)
				if(audio.paused==false){
					audio.pause() 
					play.setAttribute("class","glyphicon glyphicon-play")
				}else if(audio.paused==true){
					audio.play() 
					play.setAttribute("class","glyphicon glyphicon-pause")
					
				}
			},
			
			go() {
				this.$router.go(-1)
			},
			onChange(value) {
//				
			},
			//显示歌曲列表
			list() {
				this.show = true
			},
			//当前
			listIndex(index){
				this.$store.commit("setIndex",index)
				this.$store.dispatch("lyric")
				this.alterUrl()
				this.show = false
			},
			//上一首
			Previous(){
				if(this.$refs.pattern.getAttribute("class")=="glyphicon glyphicon-random "||
   					this.$refs.pattern.getAttribute("class")==this.ddd[0].cla){
   						this.shuffle()
   						console.log("随机播放")
   					}else {
   						console.log("列表循环")
   						let index=this.index
						index--
						this.getData(index)
   					}
				
			},
			//下一首
			following (){
					if(this.$refs.pattern.getAttribute("class")=="glyphicon glyphicon-random "||
   					this.$refs.pattern.getAttribute("class")==this.ddd[0].cla){
   						this.shuffle()
   						console.log("随机播放")
   					}else {
   						console.log("列表循环")
   						let index=this.index
						index++
						this.getData(index)
   					}
				
			},
			getData(index){
				this.alterUrl()
				this.$store.commit("setIndex",index)
				this.$store.dispatch("lyric")
			},
			//随机播放
				shuffle(){
					let max=this.keywordData.length-1
					let index=Math.floor(Math.random() * (max - 0)) + 0 
					console.log(index)
					this.getData(index)
				},
			alterUrl(){
//				console.log("歌曲链接",this.$store.getters.geturl)
				let audio=document.querySelector("audio")
				audio.src=this.url
				let time=audio.duration
				let p=this.$refs.p
				for (let ke in p ){
						p[ke].style.color ="#fff"
					}
				
			},
			//选择播放模式
			select(){
				this.CantPlay=!this.CantPlay
			},
			icon(index){
				this.CantPlay=false
				this.$refs.pattern.setAttribute('class',this.ddd[index].cla)
			},
				//定时器函数
			
				fun(){
					let audio=document.querySelector("audio")
					let p =this.$refs.p
					
				//当前播放时间
   					let that=this
//					console.log("当前播放时间",audio.currentTime)
//					console.log("总时间",audio.duration)
					let ratio=100/audio.duration
					that.value = ratio*audio.currentTime
					
					for(let i= 0 ; i<this.time.length ; i++){
							if(p[this.indexs]){
								p[this.indexs].style.color="#fff"
							}
						if(audio.currentTime>this.time[i]&&audio.currentTime<this.time[i+1]){
							let difference=this.time[i+1]-this.time[i]
//							console.log(difference)
							this.indexs=i
							this.top=-33*i+100
							if(p[i]){
								p[i+1].style.color="pink"
							}
						}
					}
					
					for (let ke in p ){
						p[ke].style.top =this.top+"px"
					}
				},
				
//			自定义
			custom(){
				let audio=document.querySelector("audio")
   				let that=this

				audio.ontimeupdate=this.fun
   				audio.onended=function(){
   					console.log("播放完毕")
// 					console.log(that.$refs.pattern.getAttribute("class")=="glyphicon glyphicon-random left")
   					if(that.$refs.pattern.getAttribute("class")=="glyphicon glyphicon-random "||
   					that.$refs.pattern.getAttribute("class")==that.ddd[0].cla){
   						that.shuffle()
   						console.log("随机播放")
   					}else if(that.$refs.pattern.getAttribute("class")==that.ddd[1].cla){
   						console.log("列表循环")
   						that.following ()
   					}else{
   						console.log("单曲循环")
						   that.getData(that.index)
   					}
   					
   					
   					
   				}
			},
			
			//加载出错
			a(){
				let audio=document.querySelector("audio")
				let play=this.$refs.play
				audio.onerror=function(){
					console.log("不能播放")
					Toast('播放出错');
					play.setAttribute("class","glyphicon glyphicon-play")
				}
				
			},
			//收藏到歌单
			love(){
				let a=JSON.parse(localStorage.register).phone
				let b=JSON.parse(localStorage.userinfo)
				let index
				for(let i=0 ; i< b.length; i++){
					if(b[i].phone==a){
						index=i
						break
					}
				}
					this.myMusic=b[index].CreateMusic
					this.loves=true
				
			},
			//收藏到歌单
			enshrine(index){
				let a=JSON.parse(localStorage.register).phone
				let b=JSON.parse(localStorage.userinfo)
				this.myMusic[index].data.unshift(this.keywordData[this.index])
				this.loves=false
				for(let i=0 ; i< b.length; i++){
					if(b[i].phone==a){
						console.log(this.keywordData[this.index].id)
						let arr=b[i].CreateMusic[index].data
						for(let i =0 ; i<arr.length ; i++){
							console.log(arr[i].id)
							if(arr[i].id==this.keywordData[this.index].id)
							return
						}
						b[i].CreateMusic=this.myMusic
						localStorage.setItem("userinfo",JSON.stringify(b))
						break
					}
				}
				
			}
			
		},
		mounted(){
			this.a()
			this.custom()

			
		},
		beforeDestroy(){
			console.log("离开页面")
		}

	}
</script>

<style lang="less">
	@import url("../css/loading.css");
	
	.describe {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.retreat {
		width: 100%;
		font-size: 20px;
	}
	
	.glyphicon-arrow-left:before {
		display: block;
		background-color: rgba(0, 0, 0, .5);
		color: white;
	}
	
	.buttom {
		width: 100%;
		height: 1.351351rem;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: aqua;
		padding: 0.27027rem;
		.van-slider__button {
			width: 0.405405rem;
			height: 0.405405rem;
			background-color: #e48ae1;
		}
		.van-slider__bar {
			background-image: linear-gradient(to left, #1989fa, #f0f);
		}
		.control {
			font-size: 0.54054rem;
			margin-top: 0.135135rem;
			height: 0.702702rem;
			span {
				display: inline-block;
				width: 1.081081rem;
			}
			.van-row {
				text-align: center;
				height: 0.702702rem;
				line-height: 0.702702rem;
			}
		}
	}
	
	.lists {
		width: 100%;
		height: 40%;
		background-color: #ccc;
		opacity: .9;
		.list-box {
			width: 100%;
			border-bottom: 0.027027rem solid #ddd;
			padding: 0.135135rem 0.27027rem;
			h4,
			p {
				margin: 0;
				padding: 0;
				width: 70%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			p {
				font-size: 0.378378rem;
			}
		}
	}
	
	.lrc{
		width: 90%;
		height: 50%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		overflow: hidden;
		background-color: rgba(0,0,0,.5);
		border-radius: 0.54054rem;
		
		
		p{	
			margin: 0;
			color: white;
			text-align: center;
			height: 0.81081rem;
			font-size: 0.378378rem;
			line-height: 0.81081rem;
			position: relative;
			top: 2.702702rem;

		}
	}
	
	#pattern{
		position: relative;
		
		.pattern-box{
			position: absolute;
			width: 150px;
			background-color: rgba(0,0,0,.5);
			bottom: 0.648648rem;
			left: -5px;
			border-radius: 0.27027rem;
			color: white;
			
			.pattern-select{
				display: inline-block;
				width: 130px;
				border-bottom: 1px solid #ccc;
				padding: 0.135135rem;
				letter-spacing:3px;
				font-size: 0.432432rem;
			}
			.left{
				float: left;
				width: 0.405405rem;

			}
			.right{
				float: left;
				width: 100px;
			}
		}
	}
	
	.title{
		width: 60%;
		height: 1.621621rem;
		position: fixed;
		top: 1.891891rem;
		background-image: linear-gradient(to left, #ff0,#f0f);
		opacity: .8;
		left: 20%;
		text-align: center;
		padding: 0.324324rem 0;
		color: #000000;
		border-radius:0.54054rem ;
		
		p,h4{
			margin: 0;
			padding: 0;
		}
		h4{
			font-weight: 900;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		p{
			font-size: 0.378378rem;
		}
	}
	.van-loading__spinner{
		width: 30%;
		height: 30%;
		margin:35% 35%;
	}
	
	.love{
		width: 80%;
		padding: 0.27027rem 0.54054rem;
		max-height: 50%;
		
		h4{
		margin: 0;
		padding: 0;}
	}
	.loveList{
		margin: 0.135135rem 0;
		overflow: hidden;
		
		div{
			float: left;
			
			p{
				margin: 0;
				padding: 0;
			}
			p:nth-of-type(1){
				margin: 0.135135rem 0 0.135135rem 0;
				font-size: 0.378378rem;
			}
		}
		.loveList-left{
			width: 1.351351rem;
			height: 1.351351rem;
			background-color: red;
		}
		.loveList-right{
			width: 70%;
			height: 1.351351rem;
			margin-left: 0.54054rem;
		}
	}
</style>