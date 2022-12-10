<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 循环渲染购物车的商品信息 -->
		<uni-swipe-action>
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
					<!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
					<my-goods :item="item" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 使用自定义的结算组件 -->
		<my-settle></my-settle>
	</view>

	<!-- 空白购物车 -->
	<view class="empty-cart" v-else>
		<image src="../../static/shopping.png" class="empty-img"></image>
		<text class="empty-text">空空如也~</text>
	</view>
</template>

<script>
	import mix from '@/mixins/mixins.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				options:[
					{
						text:'删除',
						style:{
							backgroundColor:'#c00000'
						}
					}
				]
			};
		},
		mixins:[mix],
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			// 商品的勾选状态发生变化
			radioChangeHandler(e){
				// console.log(e); 	// 输出得到的数据 -> {goods_id: 395, goods_state: false}
				this.updateGoodsState(e)
			},
			numChangeHandler(e){
				this.updateGoodsCount(e)
			},
			swipeItemClickHandler(item){
				this.removeGoodsById(item)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.cart-container{
		padding-bottom: 50px;
	}
	.cart-title{
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
		.cart-title-text{
			font-size: 15px;
			margin-left: 10px;
			
		}
	}
	
	.empty-cart {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 150px;
	
	  .empty-img {
	    width: 100px;
	    height: 100px;
	  }
	
	  .empty-text {
	    font-size: 15px;
	    color: gray;
	    margin-top: 15px;
	  }
	}
</style>
