export default {
	//开启命名空间
	namespaced:true,
	
	state:{
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	},
	
	mutations:{
		addToCart(state,value){
			// 根据提交的商品的Id，查询购物车中是否存在这件商品
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.cart.find(item => item.goods_id === value.goods_id)
			if (!findResult) {
				// 如果购物车中没有这件商品，则直接 push
				state.cart.push(value)
			}else{
				// 如果购物车中有这件商品，则只更新数量即可
				findResult.goods_count ++
			}
			// 将购物车中的数据持久化存储到本地
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state,value){
			const findResult = state.cart.find(item => item.goods_id === value.goods_id)
			// 有对应的商品信息对象
			if (findResult) {
				// 更新对应商品的勾选状态
			    findResult.goods_state = value.goods_state
			    // 持久化存储到本地
				uni.setStorageSync('cart',JSON.stringify(state.cart))
			}
		},
		// 更新购物车中商品的数量
		updateGoodsCount(state,value){
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find(item => item.goods_id === value.goods_id)
			
			if(findResult) {
			    // 更新对应商品的数量
				findResult.goods_count = value.goods_count
			    // 持久化存储到本地
				uni.setStorageSync('cart',JSON.stringify(state.cart))
			}
		},
		// 根据 Id 从购物车中删除对应的商品信息
		removeGoodsById(state, value){
			 // 调用数组的 filter 方法进行过滤
			state.cart = state.cart.filter( item => item.goods_id !== value.goods_id)
			
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, value){
			// 循环更新购物车中每件商品的勾选状态
			state.cart.forEach(item => item.goods_state = value)
			// 持久化存储到本地
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		}
	},
	
	getters:{
		//购物车中所有商品的总数量
		total(state){
			// let c = 0
			// state.cart.forEach(item => {
			// 	c += item.goods_count
			// })
			// return c
			return state.cart.reduce((total,item)=> total += item.goods_count,0)
		},
		//购物车中已勾选商品的数量
		checkedCount(state){
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter( item => item.goods_state).reduce((total,item)=>{
				return total += item.goods_count
			},0)
		},
		// 已勾选的商品的总价
		checkedGoodsAmount(state){
			return state.cart.filter(item => item.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price,0).toFixed(2)
		}
	}
}