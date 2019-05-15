<template>

	<div class="password">

		<van-nav-bar title="找回密码" left-arrow @click-left="onClickLeft" />
		<van-cell-group>
			<van-field v-model="phone" placeholder="请输入手机号码" />
			<van-field v-model="users" placeholder="请输入用户名" />
		</van-cell-group>
		<div class="password-btn">
			<van-button type="primary" size="large" @click="retrievePassword">找回密码</van-button>
		</div>
		<div class="password-big" v-show="show"></div>
		<div class="password-small" v-show="show">
			<van-field v-model="password" placeholder="请输您的新密码" />
			<van-button size="large" @click="confirm" class='confirm'>确定</van-button>

		</div>

	</div>

</template>

<script>
	import { NavBar, CellGroup, Field, Button } from "vant"
	import { mapGetters } from "vuex"

	export default {

		name: "Password",
		components: {
			[NavBar.name]: NavBar,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button,
		
		},
		data() {
			return {
				phone: "",
				users: "",
				show: false,
				password: ""
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			retrievePassword() {
				//				console.log(this.getLocalStorageData)
				//				
				for(let i = 0; i < this.getLocalStorageData.length; i++) {
					if(this.getLocalStorageData[i].phone == this.phone &&
						this.getLocalStorageData[i].users == this.users) {
						this.show = true
					}
				}

//				console.log(this.show)
			},
			confirm() {
				for(let i = 0; i < this.getLocalStorageData.length; i++) {
					if(this.getLocalStorageData[i].phone == this.phone &&
						this.getLocalStorageData[i].users == this.users) {
						this.getLocalStorageData[i].password = this.password
//						console.log(this.getLocalStorageData)
						localStorage.setItem("userinfo",JSON.stringify(this.getLocalStorageData))
//						console.log(localStorage.userinfo)
						this.$router.push({path:"/register"})	
					}
				}
			}
		},
		computed: mapGetters([
			'getLocalStorageData',

		]),

	}
</script>

<style lang="less" scoped>
	@import url("../css/pass.css");
</style>