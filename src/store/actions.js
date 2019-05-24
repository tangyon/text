
  
import axios from 'axios'
  


export default{
	
// GettextNmaeArr:state=>state.textNmaeArr
   	
   	localStorageData(context){
   		let data=localStorage.userinfo?localStorage.userinfo:[]
// 		console.log(data)
   		context.commit("setLocalStorageData",data)
   	},
   	lastAccount(context){
   		let data=localStorage.lastAccount?JSON.parse(localStorage.lastAccount):""
// 		console.log(data)
   		context.commit("setLastAccount",data)
   	},
// 	音乐搜索
   	classify(context){
// 		https://api.itooi.cn/music/netease/songListCategory?key=579621905
// 		console.log(context)
			context.commit('hideLoading',true)
			let axiosDate=new Date()
   		axios.get(`api/music/netease/search?key=579621905&s=${context.state.keyword}&type=song&limit=100&offset=0`).then( res=>{
   			let data=res.data.data
   			context.commit("setKeywordData",data)
// 			console.log(data)
				let finishDate=new Date()
				let time=finishDate-axiosDate
				setTimeout(()=>{
					context.commit('hideLoading',false)
				},time)
   		})
   },
// 	音乐歌词
   	lyric(context){
   		context.commit('hideLoading',true)
			let axiosDate=new Date()
   		let id=context.state.id
// 		https://api.itooi.cn/music/netease/lrc?id=449818741&key=579621905
   		axios.get(`api/music/netease/lrc?id=${id}&key=579621905`).then( res=>{
   			let data=res.data
   			context.commit("setLrc",data)
// 			console.log(data)
				let finishDate=new Date()
				let time=finishDate-axiosDate
				setTimeout(()=>{
					context.commit('hideLoading',false)
				},time)
   		})
   },

// 获取歌单
		songList(context,id){
			context.commit('hideLoading',true)
			let axiosDate=new Date()
			axios.get(`api/music/netease/songList?key=579621905&id=${id}&limit=10&offset=0`).then( res=>{
   			let data=res.data.data
   			context.commit("setSongList",data)
   			console.log("data",data)
   			let finishDate=new Date()
				let time=(finishDate-axiosDate)
				setTimeout(()=>{
					context.commit('hideLoading',false)
				},time)
   		})
		},
//		mv排行榜
   MVlist(context){
   		context.commit('hideLoading',true)
			let axiosDate=new Date()
   		axios.get(`api/music/netease/topMvList?key=579621905&limit=${context.state.MVListAmount}&offset=0`).then( res=>{
   			let data=res.data.data
// 			console.log(data)
   			context.commit("setMVList",data)
				let finishDate=new Date()
				let time=(finishDate-axiosDate)
				setTimeout(()=>{
					context.commit('hideLoading',false)
				},time)
   		})
   }
}
