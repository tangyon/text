<template>
	<!--注册-->
	<div class="enters">

		<van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
		<div class="enters-conter">

			<van-cell-group>
				<van-field v-model="phone" placeholder="请输入手机号码" />
				<van-field v-model="users"  placeholder="请输入用户名" />
				<van-field v-model="password" type="password" placeholder="请输入密码" />
				<van-field v-model="pwd" type="password" placeholder="确认密码" />
				<van-field v-model="verification " placeholder="请输入验证码" />
			</van-cell-group>
			<div class="box-btn" @click="goHome('/register')">注册</div>
			<div class="getenters" @click="createCode(4)">获取验证码</div>
		</div>
	</div>

</template>

<script>
	import { NavBar, CellGroup, Field, Dialog } from 'vant'
	import {mapGetters} from 'vuex'
	
	export default {

		name: "Enter",
		components: {
			[NavBar.name]: NavBar,
			[Field.name]: Field,
			[CellGroup.name]: CellGroup,
			[Dialog.name]: Dialog,
		},
		data() {
			return {
				phone: '',
				users: '',
				password: '',
				verification: '',
				pwd: '',
				setverification: '',
				data: []
			}

		},

		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			
			//注册成功跳转登录页面并保存本地存储
			goHome(path) {
					console.log(this.getLocalStorageData)
					for(let key in this.getLocalStorageData){
						if(this.getLocalStorageData[key].phone==this.phone){
							this.opo('该手机号码已被注册','phone')
					return
						}
					}
				if(!(/^1[34578]\d{9}$/.test(this.phone))) {
					//					console.log('手机号码输入有误')
					this.opo('手机号码输入有误','phone')
					return
				}
				if(!(/^[A-Za-z0-9]{4,16}$/ig.test(this.password))) {
					console.log('密码不安全')
					this.opo('密码不安全','password')
					return
				}
				if(this.password != this.pwd) {
					console.log("两次密码不一致")
					this.opo('两次密码不一致','pwd')
					
					return
				}

				if(this.setverification != this.verification) {
//					console.log("验证码错误")
					this.opo('验证码错误,请重新获取验证码','verification')
					
					return
				}

				let data = {
					phone: this.phone,
					users: this.users,
					password: this.password,
					CreateMusic:[{title:'我喜欢的音乐',data:[]}],
					mySong:[]
				}
				this.$store.commit("setLocalStorage",data)
				console.log(this.getLocalStorageData)
				localStorage.setItem("userinfo", JSON.stringify(this.getLocalStorageData))
				
				this.$router.push({
					path
				})
			},
			//随机生成4位验证码
			createCode(length) {

				var code = "";
				var codeLength = parseInt(length); //验证码的长度
				var checkCode = document.getElementById("checkCode");
				////所有候选组成验证码的字符，当然也可以用中文的
				var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
					'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
				//循环组成验证码的字符串
				for(var i = 0; i < codeLength; i++) {
					//获取随机验证码下标
					var charNum = Math.floor(Math.random() * 62);
					//组合成指定字符验证码
					code += codeChars[charNum];

				}
				this.setverification = code
				console.log(this.setverification)
			},
//			提示框
			opo(text, data) {
				Dialog.alert({
					message: text
				}).then(() => {
					// on close
					this[data]=''
				});
			}
		},
		computed:mapGetters([
			'getLocalStorageData'
		])

	}
</script>

<style lang="less" scoped="scoped">
	.mag {
		margin: 0;
		padding: 0;
	}
	
	.enters {
		width: 100%;
		height: 100%;
		background: url(../img/03.jpg)-1.54054rem;
		background-size: auto 100%;
		opacity: 0.9;
		.van-nav-bar {
			background: transparent;
		}
		.van-nav-bar__title {
			font-size: 0.54054rem;
		}
		[class*=van-hairline]::after {
			content: ;
			border: 0;
		}
		
		.van-nav-bar__title,
		.van-icon {
			color: white;
		}
		.van-icon {
			font-size: 0.648648rem;
		}
		.enters-conter {
			width: 80%;
			margin: auto;
			margin-top: 1.351351rem;
			background-color: transparent;
			position: relative;
			.van-cell {
				height: 1.351351rem;
				margin-bottom: 0.54054rem;
			}
			.van-cell-group,
			.van-cell {
				background-color: transparent;
				margin-bottom: 0.27027rem;
			}
		}
	}
	
	.box-btn {
		width: 100%;
		height: 1.081081rem;
		line-height: 1.081081rem;
		text-align: center;
		.mag;
		border-radius: 0.54054rem;
		background-image: linear-gradient(to right, red, blue);
		font-size: 0.432432rem;
		color: white;
	}
	
	.van-field__control {
		color: white;
		font-size: 0.54054rem;
		line-height: 0.81081rem;
	}
	
	.getenters {
		display: inline-block;
		height: 0.81081rem;
		font-size: 0.432432rem;
		position: absolute;
		right: -0.081081rem;
		bottom: 1.621621rem;
		line-height: 0.81081rem;
		padding: 0 0.135135rem;
		box-sizing: border-box;
		border-radius: 0.405405rem;
		background-image: linear-gradient(to left, yellow, palegoldenrod);
		
	}
	.van-nav-bar{
		position: relative;
	}
</style>