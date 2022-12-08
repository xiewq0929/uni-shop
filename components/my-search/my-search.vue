<template>
	<view class="my-search-contain" :style="{'background-color': bgcolor}">
		<view class="my-search-box" :style="{'border-radius': radius+'px'}">
			<!-- 首页uni-ui提供的图标组件 -->
			<uni-icons type="search" size="18"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props:{
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
	}
</script>

<style lang="scss" scoped>
	.my-search-contain{
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		.my-search-box{
			height: 36px;
			background-color: #ffffff;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.placeholder{
				font-size: 15px;
				margin-left:4px;
			}
		}
	}
</style>