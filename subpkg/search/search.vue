<template>
	<view>
		<view class="search-box">
			<uni-search-bar :radius="100" @input="input" cancelButton="none" :focus="true"></uni-search-bar>
		</view>
		<!-- 搜索列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view @click="gotoDetail(item)" class="sugg-item" v-for="(item,index) in searchResults" :key="index">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 搜索的标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="19" @click="clean"></uni-icons>
			</view>
			<!-- 搜索的列表区域 -->
			<view class="history-list">
				<uni-tag @click="gotoGoodsList(item)" :inverted="true" :text="item" v-for="(item,index) in histories" :key="index"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//延时器的id
				timer:null,
				//搜索的关键词
				kw:'',
				//搜索结果列表
				searchResults:[],
				//搜索历史记录
				historyList:[],
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods:{
			//input输入事件的处理函数
			input(e){
				//防抖
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchList()
				},500)
			},
			async getSearchList(){
				if(this.kw.trim() === ''){
					this.searchResults = []
					return
				}
				const {data} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				if(data.meta.status !== 200) return uni.$showMsg()
				this.searchResults = data.message
				
				//调用保存历史记录的方法
				this.saveSearchHistory()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
			//保存搜索历史的方法并去重并本地存储
			saveSearchHistory(){
				let set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				//本地存储
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			//清除历史记录
			clean(){
				this.historyList = []
				uni.removeStorageSync('kw');
			},
			//点击跳转商品列表页面
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+item
				})
			}
		},
		computed:{
			//反转数组的方法
			histories(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
 .search-box{
	 background-color: #c00000;
	 position: sticky;
	 top: 0;
	 z-index: 999;
 }
 .sugg-list{
	 margin: 0 5px;
	 .sugg-item{
	 	 display: flex;
	 	 justify-content: space-between;
	 	 align-items: center;
		 font-size: 13px;
		 padding: 13px 0;
		 border-bottom: 1px solid #e9e7e3;
	 	 .goods-name{
	 	 	 overflow: hidden;
	 	 	 text-overflow: ellipsis;
	 	 	 white-space: nowrap;
	 	 }
	 }
 }
.history-box{
	padding: 0 5px;
	.history-title{
		height: 40px;
		font-size: 13px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px #efefef solid;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			display: inline-block;
			margin-top: 5px;
			margin-right: 10px;
			font-size: 15px
		}
	}
}

</style>
