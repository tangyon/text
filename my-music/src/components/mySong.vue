<template>
	
	<div class="album">
		<div class="top">
		<van-nav-bar
		  :title="data.songListName"
		  left-arrow
		  @click-left="onClickLeft"
		  ref="nav"
		/>
		</div>
	
	  <div class="description">
		<div class="explain">
			<div class="float"><img class="explain-img" :src=data.data[0].pic alt="" /></div>
			<div class="float float-right">
				<p class="description-p">{{data.title}}</p>
				<p class="description-p">{{name}}</p>
			</div>
			
		
		</div>
		<div class="number-box">
				<div class="span" ref="span">
					<span class="  left">(共{{len}}首)</span>
				</div>
		<ul class="album-box-list">
			
			<li class="album-list" v-for="(item ,index) in data.data" :key="index"
				@click="goplay(index)">
				
				<van-row>
					<van-col span="2">
						<span ref="iconIndex"
							:class="index==defaultIndex?'glyphicon glyphicon-volume-up':'index'"
							@click.stop="toplay(index)">
							{{index==0?'':index+1}}
						</span>				
					</van-col>
					<van-col offset="1" span="18" class="album-text">
						<div class="album-text"> 
							<h5>{{item.name}}</h5>
							<p>{{item.singer}}</p>
							
						</div>						
					</van-col>
					<van-col offset='1' span="2">
						<span class="glyphicon glyphicon-list menu"
							@click.stop="menu(index)"></span>
					</van-col>
				</van-row>
				</li>
			</ul>
		</div>
	</div>
	
		<van-actionsheet v-model="show" >
 			<div class="show-title">
 				<span class="show-title-img"
 					:style="{background:`url(${presentMusic.pic})50% / auto 100%`}">
 					
 				</span>
 				<span class="show-title-name">
 					<h5>歌曲:{{presentMusic.name}}</h5>
 					<p>{{presentMusic.singer}}</p>
 				</span>
 			</div>
			<div class="show-content"  @click="nextPlay">
				<div class="glyphicon glyphicon-fast-forward"></div>
				<div class="text">下一首播放</div>
			</div>
			<div class="show-content">
				<div class="glyphicon glyphicon-trash"></div>
				<div class="text" @click.stop="deleteMusic(index)">删除该歌曲</div>
				
			</div>
			<div class="show-content" @click="singer">
				<div class="glyphicon glyphicon-user"></div>
				<div class="text">歌手:{{data.data[indexI].singer}}</div>
				
			</div>
		</van-actionsheet>
	</div>
	
</template>

<script>
		import {NavBar ,Row, Col,Actionsheet,Loading} from "vant"
	export default{
		name:"Album",
		components:{
			[NavBar.name]:NavBar ,
			[Row.name]:Row ,
			[Col.name]:Col ,
			[Actionsheet.name]:Actionsheet ,
			[Loading.name]:Loading ,
		},
		data(){
			return {
				len:0,
				index:null,
				defaultIndex:0,
				show:false,
				presentMusic:"",
				indexI:0,
				singerArr:[],
				data:'',
				name:""
			}
		},
		computed:{
				datas(){
					return this.$store.getters.getKeywordData
					
				},
				i(){		
					return this.$store.getters.getIndex
				},
				
			
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
				this.$store.commit("setIndex",0)
			},
			goplay(index){
				this.defaultIndex=index
				let icon=this.$refs.iconIndex
				if(this.index!=null&&this.index!=index){
				icon[this.index].innerHTML=this.index+1
				icon[this.index].setAttribute("class","index")
				}
				icon[this.defaultIndex].innerHTML=''
				icon[this.defaultIndex].setAttribute("class","glyphicon glyphicon-volume-up")
				this.index=index
				
//					
						this.$store.commit("setIndex",index)
						let audio=document.querySelector("audio")
						audio.src=this.url
				
				if(index!=0){
					icon[0].innerHTML=1
				}
					
			},
			toplay(index){
						let icon=this.$refs.iconIndex
				if(icon[index].getAttribute('class')=='glyphicon glyphicon-volume-up'){
								
//						if(this.datas[0].id!=this.data.songs[0].id){
//						this.$store.commit("setKeywordData",this.data.songs)
//					}
//						this.$store.commit("setIndex",index)
						this.$store.dispatch("lyric")
						this.$router.push({path:"/describe"})
//						let audio=document.querySelector("audio")
//						audio.src=this.url
				}
			},
			menu(index){
				this.show=true
				this.indexI=index
				this.presentMusic=this.data.data[index]
			},
			//下一首播放
			nextPlay(){
				this.indexI=this.indexI+1
				this.goplay(this.indexI)

			},
			//歌手
			singer(){
				let singer=this.data.data[this.indexI].singer
				singer=singer.split("/")
				console.log("11111111111",singer)
				this.singerArr=singer
			},
			
			//监听滚动定位
			handle(){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
 				let span=this.$refs.span	 
 				if(this.$refs.p){
 					let height=this.$refs.p.clientHeight+this.$refs.h5.clientHeight
					if(scrollTop<=height){
						 this.$refs.nav.style.backgroundColor=`rgba(84,57,57,${scrollTop/220})`
						 span.setAttribute("class","span")
					}else{
						this.$refs.nav.style.backgroundColor=`rgba(84,57,57,1)`
						span.setAttribute("class","span felxs")
					}
 				}
				
			},
			deleteMusic(){
				this.show=false
				console.log(this.indexI)
				let id=this.data.data[this.indexI].id
				this.data.data.splice((this.index),1)
				let a=JSON.parse(localStorage.register).phone
				let b=JSON.parse(localStorage.userinfo)
				
				for(let i=0 ; i< b.length; i++){
					if(b[i].phone==a){
						console.log(b[i].CreateMusic[this.$route.query.index].data)
						b[i].CreateMusic[this.$route.query.index].data=this.data.data
						console.log(b)
						localStorage.setItem("userinfo",JSON.stringify(b))
					}
				}
				if(this.data.data.length<=0){
					this.$router.go(-1)
				}
			}
		},
		
		created(){
			let a=JSON.parse(localStorage.register).phone
				let b=JSON.parse(localStorage.userinfo)
				this.name=JSON.parse(localStorage.register).name
				for(let i=0 ; i< b.length; i++){
					if(b[i].phone==a){
						this.data=b[i].CreateMusic[this.$route.query.index]
						this.len=this.data.data.length
						return
					}
				}
		},
		 mounted(){
		 	 window.addEventListener('scroll', this.handle)
		 	let icon=this.$refs.iconIndex
            document.documentElement.scrollTop = 0
		 	if(icon){
		 		this.goplay(this.i)
		 	}
		},
		
		destroyed () {
        window.removeEventListener('scroll', this.handle);   //  离开页面清除（移除）滚轮滚动事件
      }
	}
	
</script>

<style lang="less">
	@import url("../css/loading.css");
	
	
	.album{
		width: 100%;
		/*overflow: hidden;*/
		.album-list{
			border-bottom: 0.027027rem solid #ccc;
			padding: 0.405405rem 0.27027rem;
		}
		
		.index{
			width: 100%;
			display: inline-block;
			height: 0.864864rem;
			line-height: 0.864864rem;
			text-align: center;
			font-size: 0.378378rem;
			color: #999;
		}
		
		.album-list:nth-of-type(1) .index{
			color: red;
			font-size: 0.54054rem;
		}
		.album-list:nth-of-type(2) .index{
			color: #2811e8;
			font-size:0.459459rem;
			
		}
		.album-list:nth-of-type(3) .index{
			color: #5f9bd8;
			font-size: 0.432432rem;
		}
		
		.album-text{
			position: relative;
			height: 100%;
			
			h5,p{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 0;
			}
		}
		
	}
	
	.description{
		width: 100%;
		padding: 0.945945rem 0 0 0;
		font-size: 0.378378rem;
		background-image:linear-gradient(to top ,#543939, #543939 ) ;
		color: #CCCCCC;
		
		p,h5{
			padding:0 10%;
		}
		
	}
	
		.number-box{
			background-color: #CCCCCC;
			font-size: 0.324324rem;
			width: 100%;
			border-radius:0.81081rem 0.81081rem 0 0;
			padding: 0.054054rem 0;
			
			.span{
				height: 1.081081rem;
				width:100%;
			border-radius:0.81081rem 0.81081rem 0 0;
				
				
		.right{
			display: inline-block;
			border-radius: 0.405405rem;
			background-color: red;
			color: white;
			margin-left: 200px;	
			height: 0.81081rem;
			line-height: 0.81081rem;
			margin-top: 0.135135rem;
		}
		.left{
			display: inline-block;
			color: #000000;
			margin-left: 20px;
			line-height: 0.81081rem;
			margin-top: 0.135135rem;
				
		}
			}
			
			.number{
					padding: 0 0.054054rem;
					display: inline-block;
					font-size:13px;
					height: 0.54054rem;
					line-height: 0.54054rem;
				}
		}
	.album-box-list{
		width: 100%;
		margin: 0;
		border-radius: 0.54054rem;
		border: 0.027027rem solid #ccc;
		overflow: hidden;
		position: relative;
		background-color: white;
		color: #000000;
		
		
	}
	
	.glyphicon-volume-up{
		width: 100%;
		height: 100%;
		font-size: 0.54054rem;
		color: red;
		text-align: center;
		height: 0.864864rem;
		
	}
	.glyphicon-volume-up:before{
			content: "\E038";
			display: inline-block;
			height: 100%;
			width: 100%;
			line-height: 0.864864rem;
			
		}
		.menu{
			display: inline-block;
			width: 100%;
			height: 0.864864rem;
			
			
		}
		.menu.glyphicon-list:before{
				display: inline-block;
				content: "\E056";
				width: 100%;
				height: 100%;	
				font-size: 0.54054rem;
				text-align: center;
				line-height: 0.864864rem;
			}
			.van-nav-bar{
				position: fixed;
				top: 0;
				width: 100%;
				
				.van-nav-bar__title,.van-icon-arrow-left:before{
					color: #F0F8FF;
				}
				
			}
			.felxs{
				position: fixed;
				top: 1.243243rem;
				z-index: 2;
				left: 0;
				background-color: white;
			}
		.van-actionsheet {
	    color: #323233;
	    max-height: 90%;
	    height: 300px;
	    border-radius: 30px 30px 0 0;
	    padding: 0.27027rem 0.54054rem 0 0.54054rem;
	    
	    .show-title-img{
	    	display: inline-block;
	    	width: 1.891891rem;
	    	height: 1.891891rem;
	    	background-color: #111111;
	    	border-radius: 0.27027rem;
	    }
	    
	}
	.show-title{
		overflow: hidden;
		padding-bottom: 0.27027rem;
		border-bottom: 1px solid #ccc;
		
		span{
			float: left;
		}
		.show-title-name{
			margin-left: 0.54054rem;
			width: 5.405405rem;
			height: 1.891891rem;
			padding: 0.405405rem 0;
			
			p,h5{
				margin: 0;
			}
			h5{
				height: 0.648648rem;
				line-height: 0.648648rem;
			}
			p{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 0.378378rem;
				height: 0.54054rem;
				line-height:0.54054rem;
				color: #666;
			}
		}
	}
	.show-content{
		padding: 0.27027rem 0;
		line-height: 0.81081rem;
		border-bottom: 1px solid #ccc;
		overflow: hidden;
		
		div{
			float: left;
		}
		.text{
			width: 5.405405rem;
			margin-left:0.54054rem ;
			font-size: 0.378378rem;
		}
		.glyphicon{
			height: 0.81081rem;
			line-height: 0.81081rem;
			font-size: 0.54054rem;
		}
	}		
	.explain{
		width: 100%;
		height: 5.405405rem;
		padding-top:0.54054rem ;
		overflow: hidden;
	}
	.explain-img{
		width: 2.702702rem;
		height: 2.702702rem;
		border-radius: 0.54054rem;
		
	}
	.float{
		float: left;
	}
	.float-right{
		width: 60%;
	}
</style>