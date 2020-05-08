<template>

	<div class="lately">

		<div class="carousel">
			<h4>热门歌单</h4>
			<v-touch v-on:swiperight="onSwipeLeft">
				<van-swipe :autoplay="3000" indicator-color="white">
					<van-swipe-item class="carousel-box" v-for="(item,index) in hotData " :key="index">
						<div class="img-box" :style="{background:`url(${item.coverImgUrl}) 50% / 100% auto `}" @click="godetails(item)">
							<h5>{{item.title}}</h5>
						</div>
					</van-swipe-item>

				</van-swipe>
			</v-touch>
		
		</div>
		<v-touch v-on:swiperight="onSwipeRight">
		<van-row class="lately-box">
			<h4>精选歌单</h4>
			<van-col span="11" v-for="(item,index) in BoutiqueData" :key="index" :offset="index%2 ==0 ? 0 :2">

				<div class="img" :style="{background:`url(${item.coverImgUrl}) 50% / auto 100%`}" @click="godetails(item)">
					<p>{{item.tag}}</p>

				</div>
			</van-col>
		</van-row>
		</v-touch>
	</div>

</template>

<script>
	import axios from 'axios'
	import { Row, Col, Swipe, SwipeItem } from 'vant'

	export default {
		name: "Lately",
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
		},
		data() {
			return {
				BoutiqueData: [],
				hotData: []
			}
		},
		created() {
			this.$store.commit('setTouchShow', false)
			// https://api.itooi.cn/music/netease/highQualitySongList?key=579621905&cat=全部&limit=100
			axios.get(`api/music/netease/highQualitySongList?key=579621905&cat=全部&limit=200`).then(res => {
				let data = res.data.data.playlists
				// 			context.commit("setLrc",data)
				// 			console.log(data)
				this.BoutiqueData = data
				// 					console.log(this.BoutiqueData)
			})
			// 		 https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0

			axios.get(`api/music/netease/hotSongList?key=579621905&cat=全部&limit=4&offset=0`).then(res => {
				let data = res.data.data
				this.hotData = data
				// 			console.log('热门',this.hotData)

			})
		},

		methods: {
			godetails(item) {
				this.$store.dispatch("songList", item.id)
				this.$router.push({
					path: "/album"
				})
			},
			onSwipeLeft() {
				this.$store.commit('setTouchShow', false)
			},
			onSwipeRight(){
				this.$store.commit('setTouchShow', true)
			}
		},
		computed: {
			show() {
				return this.$store.getters.getTouchShow
			}
		},
		beforeDestroy(){
			this.$store.commit('setTouchShow', true)
		}

	}
</script>

<style lang="less">
	.carousel {
		/*height: 2.972972rem;*/
		padding: 0.135135rem 0.27027rem;
		.van-swipe {
			width: 100%;
			height: 2.702702rem;
		}
		.img-box {
			width: 100%;
			height: 2.702702rem;
			h5 {
				margin: 0;
				color: white;
				text-align: center;
				padding-top: 0.135135rem;
				background-color: rgba(0, 0, 0, .5);
			}
		}
	}
	
	.lately-box {
		padding: 0.135135rem 0.27027rem;
		.img {
			height: 3.783783rem;
			margin-bottom: 0.27027rem;
			position: relative;
			color: white;
			p {
				position: absolute;
				bottom: 0;
				background-image: linear-gradient(to left, #ccc, #111);
				margin: 0;
				padding: 0;
				width: 100%;
				text-align: center;
				height: 0.81081rem;
				line-height: 0.81081rem;
				font-size: 0.432432rem;
				border-radius: 0.27027rem;
			}
		}
	}
</style>