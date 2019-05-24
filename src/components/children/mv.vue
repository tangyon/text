<template>
	
	<div ref='mvBody'>
		
		<h3>mv精选</h3>
			<van-row>
					<van-col span="11" offset="1" v-for="(item,index) in MVList" 
						:key="index" >
						<div class="pic" :style="{background:`url(${item.pic}) 50% / 100% auto `}"
							 @click="goMVpaly(index)">
							<span class="glyphicon glyphicon-play"></span>{{item.playCount}}
						</div>
						<div class="text">
							<p class="p">{{item.name}}</p>
							<p class="p">{{item.singer}}</p>
						</div>
					</van-col>
				
			</van-row>
			<div v-show="loading">加载中......</div>
			<div class="loaded" v-show="isShow">
				没有数据了哦！
			</div>
	</div>
	
</template>

<script>
		import {Row, Col ,Loading} from "vant"
	export default{
		
		name:"Mv",
		components:{
			[Row.name]:Row,
			[Col.name]:Col,
			[Loading.name]:Loading,
		},
		data(){
			return {
				isShow:false,
			}
		},
		computed:{
			MVList(){
				return this.$store.getters.getMVList
			},
			loading(){
				return this.$store.getters.getLoading
			}
		},
		watch:{
			MVList(){
				window.addEventListener('scroll', this.handle)
				if(this.MVList.length>=100){
					 window.removeEventListener('scroll', this.handle)
					 this.isShow=true
				}
			}
		},
		methods:{
			handle(){
				let home=document.getElementsByClassName("home")[0].clientHeight
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				let  body=document.body.clientHeight
				if(home-(body+scrollTop)<=30){
					this.$store.commit("setMVListAmount")
					this.$store.dispatch("MVlist")
					window.removeEventListener('scroll', this.handle) 
				}
			},
			goMVpaly(index){
				console.log(this.MVList[index])
				this.$router.push({
					path:"mvpaly",
					query:{
						id:this.MVList[index].id
					}
				}) 

			}
		},
		mounted(){
			window.addEventListener('scroll', this.handle)
		},
		destroyed () {
        window.removeEventListener('scroll', this.handle);   //  离开页面清除（移除）滚轮滚动事件
      }
		
	}
	
	
</script>

<style lang="less" >
	.pic{
		width: 4.324324rem;
		height: 2.162162rem;
		text-align: right;
		color: white;
		line-height: 0.81081rem;
		padding-right: 0.27027rem;
	}
	.p{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin:0;
	}
	.text{
		width: 100%;
		padding: 0.135135rem 0 0.27027rem 0;
	}
	.loaded{
		text-align: center;
		padding: 0.54054rem;
	}
	.van-loading.van-loading--circular.van-loading{
	}
</style>