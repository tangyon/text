<template>

	<div class="my">
		<h4 class="my-title" @click="isShow">
			<span class="glyphicon glyphicon-chevron-right" ref='icon'></span>
			收藏的歌单 ({{song.length}}) 
		</h4>
		<div class="song" v-show="show">
			<li class="my-list" v-for="(item,index) in song" :key @click="skip(item)">
				<van-swipe-cell :right-width="65">
					<van-cell-group>
						<span class="my-list-icon" :style="{background:`url(${item.songListPic})0 / 100% auto`}"></span>
						<div class="my-list-test">
							<p>{{item.songListName}}</p>
							<p>{{item.songs.length}}首</p>
						</div>
					</van-cell-group>
					<span class="def" slot="right" @click="defSong(index)">删除</span>
				</van-swipe-cell>

			</li>
		</div>
		<h4 class="my-title" @click="ishide">
			<span class="glyphicon glyphicon-chevron-right" ref='icons'></span>
			创建歌单 ({{data.length}})
			<span class="glyphicon glyphicon-plus add" @click.stop="establish"></span>
		</h4>
		<div v-show="hide">
			<li class="my-list" v-for="(item,index ) in data" :key="index" @click="enshrine(index)">

				<van-swipe-cell :right-width="65">
					<van-cell-group>
						<span class="my-list-icon" :style="{background:`url(${item.img })0 / 100% auto`}"></span>
						<div class="my-list-test">
							<p>{{item.title}}</p>
							<p>{{item.data.length}}首</p>
						</div>
					</van-cell-group>
					<span class="def" slot="right" @click="def(index)">删除</span>
				</van-swipe-cell>
			</li>
		</div>
		<van-popup v-model="createds" class="my-popup">
			<h4>新建歌单</h4>
			<input class="ipt" type="text" placeholder="请输入歌单标题" v-model="value" />
			<span class="btn" @click="submit">提交</span>
		</van-popup>

	</div>

</template>

<script>
	import { Popup, SwipeCell, CellGroup } from 'vant';
	export default {

		name: "My",
		data() {
			return {
				show: false,
				hide: false,
				data: "",
				createds: false,
				value: "",
				song: "",
				img: ""
			}
		},
		components: {
			[Popup.name]: Popup,
			[SwipeCell.name]: SwipeCell,
			[CellGroup.name]: CellGroup,
		},
		methods: {
			isShow() {
				this.show = !this.show
				let icon = this.$refs.icon
				icon.style.transition = " transform .5s"
				if(this.show == true) {
					icon.style.transform = "rotate(90deg)"
				}
				if(this.show == false) {
					icon.style.transform = "rotate(0deg)"
				}
			},
			ishide() {
				this.hide = !this.hide
				let icon = this.$refs.icons
				icon.style.transition = " transform .5s"
				if(this.hide == true) {
					icon.style.transform = "rotate(90deg)"
				}
				if(this.hide == false) {
					icon.style.transform = "rotate(0deg)"
				}
			},
			establish() {
				this.createds = true
			},
			submit() {
				if(this.value == "") {
					return
				}
				console.log(new Date().toJSON().replace(/[-T]/g, '/'))
				let obj = {
					title: this.value,
					data: [],
					img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1165946558,2714912153&fm=27&gp=0.jpg'
				}
				this.data.push(obj)
				this.createds = false
				let userinfo = JSON.parse(localStorage.userinfo)
				let i = this.gg()
				userinfo[i].CreateMusic.push(obj)
				localStorage.setItem("userinfo", JSON.stringify(userinfo))

			},
			skip(item) {
				this.$store.commit("setSongList", item)
				this.$router.push({
					path: "/album"
				})
			},
			enshrine(index) {

				if(this.data[index].data.length > 0) {
					this.$router.push({
						path: "/mySong",
						query: {
							index: index
						}
					})
				}

			},
			gg() {
				let userinfo = JSON.parse(localStorage.userinfo)
				let register = JSON.parse(localStorage.register)
				for(let i in userinfo) {
					if(userinfo[i].phone == register.phone) {
						return i
					}
				}
			},

			//			删除创建歌单
			def(index) {
				let i = this.gg()
				let userinfo = JSON.parse(localStorage.userinfo)
				this.data.splice(index, 1)
				userinfo[i].CreateMusic.splice(index, 1)
				localStorage.setItem("userinfo", JSON.stringify(userinfo))
			},
			//删除收藏的歌单
			defSong(index) {
				let i = this.gg()
				let userinfo = JSON.parse(localStorage.userinfo)
				this.song.splice(index, 1)
				userinfo[i].mySong.splice(index, 1)
				localStorage.setItem("userinfo", JSON.stringify(userinfo))
			}
		},
		created() {
			let i = this.gg()
			let userinfo = JSON.parse(localStorage.userinfo)
			console.log(userinfo[i].mySong)
			this.data = userinfo[i].CreateMusic
			this.song = userinfo[i].mySong
			if(this.data[0].img == undefined) {
				this.data[0].img = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1165946558,2714912153&fm=27&gp=0.jpg'
			} else {

				for(let ke in this.data) {
					this.data[ke].img = this.data[i].data.length > 0 ?
					this.data[ke].data[0].pic : this.data[i].img
				}

			}

		}
	}
</script>

<style lang="less">
	.add {
		color: #666;
		float: right;
	}
	
	.my-title {
		padding: 0 0.54054rem 0 0.27027rem;
	}
	
	.my-list {
		list-style: none;
		padding: 0.135135rem 0.27027rem;
		height: 1.621621rem;
		line-height: 0.81081rem;
		font-size: 0.378378rem;
		margin-bottom: 0.405405rem;
	}
	
	.my-popup {
		width: 90%;
		padding: 0.27027rem;
		h4 {
			font-weight: 700;
		}
	}
	
	.ipt {
		background: transparent;
		padding: 0.081081rem 0.135135rem;
		width: 100%;
		border: none;
		border-bottom: 1px solid #333;
		font-size: 0.378378rem;
		margin-top: 0.27027rem;
	}
	
	.btn {
		float: right;
		margin-top: 0.54054rem;
	}
	
	.my-list-icon,
	.my-list-test {
		float: left;
	}
	
	.my-list-icon {
		width: 1.351351rem;
		height: 1.351351rem;
	}
	
	.my-list-test {
		width: 80%;
		height: 1.351351rem;
		margin-left: 0.405405rem;
		p {
			margin: 0;
			overflow: hidden;
			text-overflow: hidden;
			white-space: nowrap;
			height: 0.648648rem;
		}
	}
	
	.def {
		display: inline-block;
		width: 1.351351rem;
		height: 0.675675rem;
		background-color: red;
		text-align: center;
		line-height: 0.675675rem;
		margin-top: 0.324324rem;
		border-radius: 0.27027rem;
	}
</style>