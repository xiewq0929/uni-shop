<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">
			<!-- 左侧图片 -->
			<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<!-- 商品名字 -->
			<view class="goods-name">{{item.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				defaultPic:'https;//img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		//过滤器
		filters:{
			//把商品价格保留两位小数点
			tofixed(value){
				return Number(value).toFixed(2)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item{
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.goods-item-left{
			margin-right: 5px;
			.goods-pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-name{
				font-size: 15px;
			}
			.goods-info-box{
				.goods-price{
					font-size: 17px;
					color: #c00000;
				}
			}
		}
	}
</style>