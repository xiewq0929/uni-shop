<template>
	<view>
		<view class="search-box">
			<my-search @click.native="gotoSearch"></my-search>
		</view>
		<!-- 轮播图的区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		
		<!-- 楼层区域 -->
		<!-- 楼层的容器 -->
		<view class="floor-list">
			<!-- 每一个楼层的item项 -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层的标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层的图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧4个小图片的盒子 -->
					<view class="rightt-img-box">
						<navigator :url="item2.url" class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2!==0">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mix from '@/mixins/mixins.js'
	export default {
		mixins:[mix],
		data() {
			return {
				//这是轮播图的数据列表
				swiperList:[],
				//分类导航的数据列表
				navList:[],
				//楼层的数据
				floorList:[]
			};
		},
		onLoad() {
			//调用获取轮播图数据
			this.getSwiperList()
			//调用获取分类导航数据
			this.getNavList()
			//调用获取楼层的数据
			this.getFloorList()
		},
		methods:{
			//获取轮播图数据的方法
			async getSwiperList(){
				let {data} = await uni.$http.get('/api/public/v1/home/swiperdata')
				//如果请求失败
				if(data.meta.status !== 200) return uni.$showMsg()
				//请求成功
				this.swiperList = data.message
			},
			//获取分类导航数据的方法
			async getNavList(){
				let {data} = await uni.$http.get('/api/public/v1/home/catitems')
				if(data.meta.status !== 200) return uni.$showMsg()
				this.navList = data.message
			},
			//点击分类导航的每一项的方法
			navClickHandler(item){
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			//获取首页楼层数据的方法
			async getFloorList(){
				let {data} = await uni.$http.get('/api/public/v1/home/floordata')
				if(data.meta.status !== 200) return uni.$showMsg()
				//对数据进行处理添加url属性
				data.message.forEach(item => {
					item.product_list.forEach(item2 => {
						item2.url = '/subpkg/goods_list/goods_list?'+item2.navigator_url.split('?')[1]
					})
				})
				this.floorList = data.message
			},
			//跳转到搜索页面
			gotoSearch(){
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	swiper{
		height: 300rpx;
		.swiper-item,image{
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		.nav-img{
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
		.rightt-img-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}

	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
