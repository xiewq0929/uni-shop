<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
				<my-goods :item='item'></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				//商品列表
				goodsList:[],
				//商品数量
				total:'',
				//节流阀
				isloading:false,
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			this.getGoodsList()
		},
		methods:{
			//获取商品列表数据的方法
			async getGoodsList(fn){
				//发起请求之前打开节流阀
				this.isloading = true
				const {data} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				//请求完成之后关闭节流阀
				this.isloading = false
				//如果有传入参数则调用
				if(fn) fn()
				
				if(data.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList,...data.message.goods]
				this.total = data.message.total
			},
			//点击跳转商品详情页
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		},
		//页面滚动到底部请求数据
		onReachBottom(){
			//判断节流阀状态，如果是开启状态就不再发起额外请求了
			if(this.isloading) return
			//判断是否还有数据？没有就不请求了
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕！')
			// 让页码自增
			this.queryObj.pagenum ++
			this.getGoodsList()
		},
		//下拉刷新
		onPullDownRefresh(){
			//重置关键数据
			this.queryObj.pagenum=1
			this.total=0
			this.isloading=false
			this.goodsList=[]
			
			//重新发起请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
