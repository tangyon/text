<template>

	<div class="register">

		<div class="a">
			<div class="back">
			<div class="logo">
				<div class="circle l"></div>
				<div class="circle s"></div>
				<div class="circle m"></div>
			</div>
		</div>

		<div id="box" class="register-content">
			<!--   @click-right-icon="$toast('question')" -->
 				<van-cell-group>
					  <van-field
					    v-model="phone"
					  	left-icon="manager"
					    clearable
					    label="用户名"
					    placeholder="请输入用户名"
					  />
					<div class="border"></div>
					  <van-field
					    type="password"
					    label="密码"
					    placeholder="请输入密码"
					    left-icon="lock"
					    v-model="password"
					  />
					  <div class="border"></div>
				</van-cell-group>
			<div class="box-btn" @click="goHome">登录</div>
			<div class="enroll">
				<span @click="goEnter">快速注册</span>
				<span @click="goPassword">忘了密码</span>
				
			</div>
			
			<div class="or">
				<span class="left or-logo"></span>
				<span class="text">or</span>
				<span class="right or-logo"></span>
				
			</div>
		</div>

		</div>
	</div>

</template>

<script>
	
	import { Field ,CellGroup,Dialog} from 'vant';
	import {mapGetters} from 'vuex'
	export default {
		name: "Register",
		components:{
			[Field.name]:Field,
			[CellGroup.name]:CellGroup,
			[Dialog.name]: Dialog,
		},
		data(){
			return {
				password:"",
				phone:"",
				data:''
			}
		},
		computed:mapGetters([
			'getLocalStorageData',
			'getLastAccount'
		]),
		methods:{
			//弹框
			opo(text) {
				Dialog.alert({
					message: text
				}).then(() => {
					// on close
					
				});
			},
			go(path){
				this.$router.push({path})
			},
			goHome(){
				for(let i=0 ; i<this.data.length ; i++){
					
					if(this.data[i].phone==this.phone&&
					this.data[i].password==this.password){
//						console.log(this.phone,this.password)
						let data={
							phone:this.phone,
							password:this.password
						  }
						let register={
							isRegister:true,
							name:this.data[i].users,
							img:"",
							phone:this.phone,
						}
						localStorage.setItem("lastAccount",JSON.stringify(data))
						localStorage.setItem("register",JSON.stringify(register))
						this.$store.commit("setModuleIndex",0)
						this.go('/lately');
						return
					}
				}
				
						this.opo('密码错误')
					
			},
				goEnter(){
					this.go('/enter')
				},
				goPassword(){
					this.$router.push({
						path:"/password",
						phone:this.phone
					})
				}
		},
		  mounted(){
		 	let label=document.getElementsByClassName("van-field__label")
		 	label[0].style.maxWidth="1.5rem"
		 	label[1].style.maxWidth="1.5rem"
		 },
		 created(){
		 	this.$store.dispatch("localStorageData")
		 	this.$store.dispatch("lastAccount")
		 	this.data=this.$store.getters.getLocalStorageData
//		 	console.log(this.data)
//		 	console.log(this.getLastAccount)
		 		this.phone=this.getLastAccount.phone?this.getLastAccount.phone:""
				this.password=this.getLastAccount.password?this.getLastAccount.password:""
//				console.log(this.phone,this.password)
		 }

	}
</script>

<style lang="less">
	
	  .van-field__control::-webkit-input-placeholder{
            color: coral;
            font-size: 0.54054rem;
        }
	.mag {
		margin: 0;
		padding: 0;
	}
	
	.register {
		height: 100%;
		width: 100%;
		.a{
			width: 100%;
			height: 100%;
			background-color:#efe3e3;
		}
		
		.back {
			width: 100%;
			height: 100%;
			background: url(../img/01.jpg)-0.675675rem;
			background-size: auto 100%;
			color: white;
			opacity: .8;
			.logo {
				/*position: relative;*/
				height: 0;
				.circle {
					position: absolute;
					border-radius: 50%;
					left: 0;
					right: 0;
					margin: auto;
				}
				.l {
					width: 4.351351rem;
					height: 4.351351rem;
					background-color: rgba(255, 255, 255, 0.4);
					top: 2.351351rem;
				}
				.s {
					width: 3.351351rem;
					height: 3.351351rem;
					background-color: rgba(255, 255, 255, 0.2);
					top: 2.851351rem;
				}
				.m {
					width: 2.351351rem;
					height: 2.851351rem;
					background: url(../img/04.jpg)0.27027rem;
					background-size: 100% auto;
					top: 3.351351rem;
				}
			}
			
		}
		.register-content {
				width:70%;
				position: absolute;
				top:45%;
				left: 15%;
				
				.box-btn{
					width: 100%;
					height: 1.081081rem;
					line-height: 1.081081rem;
					text-align: center;
					.mag;
					margin-top: 0.54054rem;
					border-radius: 0.54054rem;
					background-image: linear-gradient(to right ,#313239, #3696a1);
					font-size: 0.432432rem;
					color: white;
				}
				.border{
					width: 100%;
					border-bottom: 0.054054rem solid #aaa;
				}
				.enroll{
					margin-top:0.27027rem ;
					width: 100%;
					padding-left: 0.135135rem;
					padding-right: 0.135135rem;
					overflow: hidden;
					color: #000;
					font-size: 0.351351rem;
					font-weight: 700;
					
					span:last-child{
						float: right;
					}
				}
				.or{
					margin-top: 0.54054rem;
					font-size:0.648648rem;
					color: #980067;
					text-align: center;
					height: 0.756756rem;
					line-height: 0.756756rem;
					
					span{
						display: inline-block;
					}
					.or-logo{
						
						width: 40%;
						height:0.216216rem;
						border-top: 0.027027rem solid #980067;
					}
					.text{
						padding-left: 0.297297rem;
						padding-right: 0.297297rem;
					}
					
				}
				
			}
	}
	.van-field__control{
		font-size: 0.54054rem;
	}
	.van-cell,.van-cell-group{
		background-color:transparent;
	}
	
	.van-field__label{
		width: 1.4rem ;
		color: white;
		}

	.van-cell:not(:last-child)::after{
		    content: ' ';
		    border: 0;
	}
	[class*=van-hairline]::after{
		content: ' ';
		    border: 0;
	}
	.van-field__control{
		font-size: 0.648648rem;
		color: white;
	}
	.van-icon-manager:before,.van-icon-lock:before{
		color: white;
	}
</style>