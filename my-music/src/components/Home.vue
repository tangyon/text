<template>
  <div class="home" ref="home" >
  	<v-touch v-on:swiperight="onSwipeRight" :swipe-options="{direction: 'horizontal'}">
	  		<div class="logo" >
	  		<p>让你流汗的音乐</p>
	<!--  		<span>登录</span>-->
	  	</div>
	   <div class="nvb" ref="nvb">
	   	<div v-for="(item,i) in nvb" @click="skip(i)" :class="[ index==i ? 'con':'']" class="nvb-box">
	   		<router-link :to=routers[i]><div >{{item}}</div></router-link>
	   	</div>
	   </div>
	    <router-view />
  	</v-touch>
  	<van-popup v-model="show" position="left">
  		<div class="portrait">
			 <van-uploader :after-read="onRead" ref="portrait"
			 	:style="{background:`url(${img}) 50% / 100% 100% `}">
  				<!--<van-icon name="user-o" />-->
			 </van-uploader>
		</div>
		<div >{{this.usersData.name}}</div>
		<div  @click="switchAccount" >切换账号</div>
  	</van-popup>
  	
  </div>
  
</template>

<script>

	import {Popup,Uploader ,Icon } from "vant"
export default {
  name: "Home",
  data(){
  	return {
  		nvb:['歌单','搜索','MV','我的'],
  		routers:["/lately","/seek","/mv","/my",],
  		show:false,
  		img:"",
  		usersData:""
  	}
  },
  components:{
  	[Popup.name]:Popup,
  	[Uploader.name]:Uploader,
  	[Icon.name]:Icon,
  },
  
  methods:{
  	skip(index){
  		this.$store.commit("setModuleIndex",index)
  		if(this.nvb[index]=="MV"){
				this.$store.dispatch("MVlist")  			
  		}
  	},
  	handleScroll(){
  		 var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//			console.log(scrollTop)
  			let nvb=this.$refs.nvb
  			if(scrollTop>=113){
  					nvb.setAttribute("class","felx nvb")
  			}else{
  				nvb.setAttribute("class","nvb")
  			}
  	},
  	onSwipeRight(){
  		this.show=true
  	},
  	//上传图片
  	onRead(file) {
      let portrait=this.$refs.portrait.$refs.input
      file=file.content
			this.img= file  
			portrait.innerHTML=""
			let a=JSON.parse(localStorage.register).phone
			let b=JSON.parse(localStorage.userinfo)
			for(let i =0 ; i<b.length ; i++){
					if(a==b[i].phone){
							b[i].img=this.img
							console.log(b[i])
							localStorage.setItem("userinfo",JSON.stringify(b))
					}
			}
			
   },
// 切换账户
   switchAccount(){
   		this.$router.push({path:"/register"})
   }
  },
  created(){
  		this.$store.dispatch("classify")
  		let data=JSON.parse(localStorage.register)
  		let cc=JSON.parse(localStorage.userinfo)
  		if(data.isRegister==true){
  			this.usersData=data
  		}
  		for(let i in cc){
  			if(cc[i].phone==data.phone){
  				this.img=cc[i].img
  			}
  		}
		
  },
  computed:{
  	url(){
  		return this.$store.getters.geturl
  	},
  	index(){
  		return this.$store.state.moduleIndex
  	}
  },
mounted () {
	//监听滚动
  window.addEventListener('scroll', this.handleScroll)
  	
},
  destroyed () {
        window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
      }
};
</script>


<style lang="less">
	.nvb{
		height: 0.81081rem;
		width: 100%;
		background-color: #ddd;
		
		.nvb-box{
			float: left;
			width: 25%;
			text-align: center;
			height: 0.81081rem;
			line-height: 0.81081rem;
			font-size: 0.432432rem;
		}
		.con{
			color: #ece614;
			background-image: linear-gradient(to left,red,#04ff00);
		}
	}
	.logo{
		width: 100%;
		height: 2.702702rem;
		background: url(../img/001.jpg)0 -80px;
		background-size: 100% auto ;
		opacity: .9;
		line-height: 2.702702rem;
		font-size: 0.81081rem;
		color: white;
		text-align: center;
		font-family: "宋体";
	}
	
	.felx{
		position: fixed;
		top: 0;
		z-index: 100;
	}
	.van-popup--left{
		height: 100%;
		width: 60%;
	}	
	.portrait{
		width: 100%;
		height: 2.702702rem;
	}
	.van-uploader{
		width: 1.891891rem;
		height: 1.891891rem;
		border-radius: 50%;
		border: 0.027027rem solid #ddd;
		line-height: 1.351351rem;
		text-align: center;
		margin: 0.405405rem calc((70%-70px)/2);
	}
</style>

