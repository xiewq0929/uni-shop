export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: {
    //  读取本地的收货地址数据，初始化 address 对象
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
	// 登录成功之后的 token 字符串
	token:'',
	// 用户的基本信息
	userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
  },

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
		state.address = address
		//本地存储address
		uni.setStorageSync('address', JSON.stringify(state.address))
    },
	 // 更新用户的基本信息
	updateUserInfo(state, userinfo) {
	    state.userinfo = userinfo
		uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
	},
  },

  // 数据包装器
  getters: {
	  // 收货详细地址
	  addstr(state) {
	      if (!state.address.provinceName) return ''
	  
	      // 拼接 省，市，区，详细地址 的字符串并返回给用户
	      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
	  }
  },
}