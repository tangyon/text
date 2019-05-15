//实时监听state值的变化(最新状态)

export default{
	
// GettextNmaeArr:state=>state.textNmaeArr
// 	所有用户
   	getLocalStorageData(state){
   		return state.localStorageData
   	},
   	getLastAccount(state){
// 		console.log("getter",state.last)
   		return state.last
   	},
   	//搜索到的数据
   	getKeywordData(state){
   		return state.keywordData
   	},
   	//关键字
   	getKeyword(state){
   		return state.keyword
   	},
   	//音乐歌词
   	getLrc(state){
   		return state.lrc
   	},
   	//音乐时间
   	getTimes(state){
   		return state.times
   	},
   	//音乐图片
   	getpic(state){
// 		console.log(state.pic)
   		return state.pic
   	},
   	//音乐链接
   	geturl(state){
   		return state.url
   	},
   	//当前音乐
   	getIndex(state){
// 		console.log("修改了index",state.index)
   		return state.index
   	},
   	//当前组件
   	getModuleIndex(state){
   		return state.moduleIndex
   	},
   	//歌单
   	getSongList(state){
   		return state.songListData
   	},
   	getLoading(state){
   		return state.loading
   	},
   	getMVList(state){
   		return state.MVList
   	},
   	
}
