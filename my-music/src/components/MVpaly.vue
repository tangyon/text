<template>
	
	<div>
		<v-touch v-on:swiperight="onSwipeRight">
			<div class="mv">
			<video :src=data.url controls width="100%"  ref="video">
			您的浏览器不支持 video 标签。
			</video>
			<div class="message">
				<h4>
					{{data.name}}
					{{data.singer}}
				</h4>
				<p>{{data.playCount}}次播放</p>
				<p>{{data.publishTime}}发布</p>
			</div>
		</div>
		<div class="music">
			<p class="title-p">
				相关音乐
			</p>
			<div class="music-box" @click="goDescribe">
				<div class="img" :style="{background:`url(${musicData.pic})0 / auto 100%`}"></div>
				<div class="particular">
					<p>{{musicData.name}}</p>
					<p>{{musicData.singer}}</p>
				</div>    
			</div>
		</div>
			
		</v-touch>
	</div>
</template>

<script>
	import axios from 'axios'
	
	export default{
		name:"MVpaly",
		data(){
			return {
				id:this.$route.query.id,
				data:'',
				musicData:"",
				
			}
		},
		methods:{
			goDescribe(){
				let audio=document.querySelector("audio")
				audio.src=this.musicData.url
				let data=[this.musicData]
				this.$store.commit("setKeywordData",data)
				this.$store.commit("setIndex",0)
				this.$store.dispatch("lyric")
				this.$router.push({path:"describe"})
			},
			onSwipeRight(){
				this.$router.push({path:"/mv"})
			}
		},
		created(){
//			let axiosDate=new Date()
			let id=this.id
   		axios.get(`api/music/netease/mv?key=579621905&id=${id}`).then( res=>{
   			let data=res.data.data
			this.data=data
//				let finishDate=new Date()
//				let time=(finishDate-axiosDate)
//				setTimeout(()=>{
//
//				},time)
   			axios.get(`api/music/netease/search?key=579621905&s=${this.data.singer}&type=song&limit=1&offset=0`).then( res=>{
   			let data=res.data.data[0]
			this.musicData=data	
   		})
   		})
   		
		},
		mounted(){
			let video=this.$refs.video
			console.log("video",video.paused)
			setInterval(()=>{
				if(video.paused==false){
					let audio=document.querySelector("audio")
						if(audio.paused==false){
							audio.pause()
					}
				}
			},100)
		}
	}
	
</script>

<style lang="less" >
	
	.mv{
		border-bottom:1px solid #ccc ;
	}

	.message{
		padding: 0 0 0.27027rem 0.27027rem;
		color: #666;
		
		p{
			margin: 0;
		}
	}
	.music{
		.title-p{
			font-size: 0.432432rem;
			font-weight: 700;
		}
		.music-box{
			width: 100%;
			height: 1.351351rem;
			padding: 0 0.27027rem;
			overflow: hidden;
			border: 1px solid #ddd;
			border-radius: 0.54054rem;
			
			.img{
				height: 100%;
				width: 1.351351rem;
			}
			div{
				float: left;
			}
			.particular{
				margin-left:0.54054rem ;
			}
		}
	}
	
	
</style>


