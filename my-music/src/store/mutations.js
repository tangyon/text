export default {

	// GettextNmaeArr:state=>state.textNmaeArr
	//	获取本地用户
	setLocalStorageData(state, data) {
		state.localStorageData = data != "" ? JSON.parse(data) : []
	},
	// 	添加用户
	setLocalStorage(state, data) {
		// 	console.log(state.localStorageData)
		state.localStorageData.push(data)
	},
	// 	上一次登录账户
	setLastAccount(state, data) {
		state.last = data
		// 		console.log(state.last)
	},
	//搜索到的数据
	setKeywordData(state, data) {
		state.keywordData = data
	},
	//关键字
	setKeyword(state, name) {
		state.keyword = name
		// 		console.log(state.keyword)
	},
	// 	当前
	setIndex(state, index) {
		state.index = index
		state.pic = state.keywordData[index].pic
		state.url = state.keywordData[index].url
		state.id = state.keywordData[index].id

	},
	// 	音乐歌词
	setLrc(state, data) {
		//		state.lrc=data
		let lrc = data
		let time = lrc.match(/\[\d{2,}:\d{2,}\.\d{2,}\]/ig, '-')

		lrc = lrc.replace(/\[\d{2,}:\d{2,}\.\d{2,}\]/ig, '-')
		lrc = lrc.replace(/-{5,}/ig, '-')
		
		for(let i = 0; i < time.length; i++) {

			time[i] = time[i].replace(/\[/, '')
			time[i] = time[i].replace(/\]/, '')
			time[i] = time[i].split(':')

			time[i] = (parseFloat(time[i][0])) * 60 +
				Number(parseFloat(time[i][1]))
		}
		//		console.log(state.lrc)		
		//		console.log(time)
			state.lrc = lrc.split('-')
			state.times=time
	},

	// 	音乐图片
	setpic(state) {
		state.pic = state.keywordData[state.index].pic
		//		console.log("图片",state.pic)
	},
		//音乐id
	setid(state) {
		state.id = state.keywordData[state.index].id
	},
	//播放进度
	setVal(state, val) {
		state.val = val
		// 		console.log(state.keyword)
	},
	//当前组件
	setModuleIndex(state,index){
		state.moduleIndex=index
	},
    setSongList(state,data){
    	state.songListData=data
    	console.log(data)
    },
    hideLoading(state,i){
    	state.loading=i
    },
    setMVList(state,data){
    	state.MVList=data
    },
    setMVListAmount(state){
    	state.MVListAmount+=10
    }
}