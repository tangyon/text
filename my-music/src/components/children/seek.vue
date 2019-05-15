<template>
	
	<div class="seek" >
		<van-search
			  v-model="keyword"
			  placeholder="请输入搜索关键词"
			  show-action
			  shape="round"
			>
			  <div slot="action" @click="onSearch" class="seek-dev">搜索</div>
		</van-search>
		<van-loading color="#ddd" v-show="loading" />
		<ul class="list">
			<li v-for="(item , index) in keywordData" :key="index" class="list-box">
				<h4>{{item.name}}</h4>
				<p>{{item.singer}}</p>
				<span class="glyphicon glyphicon-play" @click="play(index)" ref='icon'></span>
			</li>
		</ul>
	</div>
	
</template>

<script>
	import {Search,Loading } from "vant"
	export default{
		name:"Seek",
		data(){
			return {
				index:-1
			}
		},
		components:{
			[Search.name]:Search,
			[Loading.name]:Loading,
		},
		computed:{
			keyword: {
				//val就是输入框当前的值
				set(val) {
					this.$store.commit('setKeyword',val)
				},
				get() {
					return this.$store.state.keyword;
				}
			},
			keywordData(){
//				console.log(this.$store.getters.getKeywordData)
				return this.$store.getters.getKeywordData;
			},
			url(){
//				console.log("歌曲链接",this.$store.getters.geturl)
  			return this.$store.getters.geturl
  	},
		loading(){
			return this.$store.getters.getLoading
		}
		},
		methods:{
			onSearch(){
				this.$store.dispatch("classify")
			},
//			播放暂停切换
			play(index){
				this.$store.commit("setIndex",index)
				this.$store.dispatch("lyric")
				this.$router.push({path:"/describe"})
				let audio=document.querySelector("audio")
				audio.src=this.url
//				console.log(audio)
				
//				let icon=this.$refs.icon
//				if((this.index>0||this.index==0)&&this.index!=index){
//					icon[this.index].setAttribute('class','glyphicon glyphicon-play')
//				}
//				if(icon[index].getAttribute('class')=='glyphicon glyphicon-pause'){
//					icon[index].setAttribute('class','glyphicon glyphicon-play')
//					
//				}else{
//					this.index=index
//					icon[index].setAttribute('class','glyphicon glyphicon-pause')
//				}
			},
			
		}
	}
	
	 
	
</script>

<style lang="less" >

	@import "../../css/loading.css";
	.seek{
		width: 100%;
		.van-search__content{
			width: 100%;
		}
		.seek-dev{
			font-size: 0.432432rem;
		}
		
		.list{
			width: 100%;
			
			.list-box{
				width: 100%;
				border-bottom: 0.027027rem solid #ddd;
				padding: 0.135135rem 0.27027rem;
				position:relative;
				top:0;
				left:0;
				h4,p{
					margin: 0;
					padding: 0;
					width: 70%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				p{
					font-size: 0.378378rem;
				}
				span{
					position: absolute;
					top: 35%;
					right: 0.54054rem;
					font-size: 0.378378rem;
				}
			}
		}
	}
	
</style>