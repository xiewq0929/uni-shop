<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品的名字 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="freight">快递：免运费</view>
		</view>
		<!-- 富文本内容 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		<!-- 商品导航组件区域 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//商品详情对象
				goods_info:{},
				//左侧按钮组的配置
				options:[
					{
						icon:'shop',
						text:'店铺'
					},
					{
						icon:'cart',
						text:'购物车',
						info: 2
					}
				],
				//右侧按钮组的配置
				buttonGroup:[
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					 {
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
			
		},
		methods:{
			async getGoodsDetail(id){
				const {data} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id:id})
				if(data.meta.status !== 200) return uni.$showMsg()
				//使用字符串的replace()的替换方法，为img标签添加行内样式，从而解决图片底部空白间隙的问题。并把webp转为jpg格式。
				data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block" ').replace(/webp/g,'jpg')
				this.goods_info = data.message
			},
			//查看轮播图的图片方法
			preview(index){
				//调用uni.previewImage方法预览图片
				uni.previewImage({
					current:index,
					urls:this.goods_info.pics.map((item) => {
						return item.pics_big
					})
				})
			},
			//左侧按钮的点击事件处理函数
			onClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			//右侧按钮的点击事件处理函数
			buttonClick(e){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	swiper{
		height: 750rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.goods-info-box{
		padding: 10px;
		padding-right: 0;
		.price{
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}
		.goods-info-body{
			display: flex;
			justify-content: space-between;
			.goods-name{
				font-size: 15px;
				margin-right: 10px;
			}
			.favi{
				width: 120px;
				font-size: 13px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}
		.freight{
			font-size: 13px;
			color: gray;
			margin: 10px 0;
		}
	}
	.goods-nav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.goods-detail-container{
		padding-bottom: 50px;
	}
</style>
