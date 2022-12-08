<template>
	<view>
		<my-search @click.native="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-view-item',index===active?'active':'']" @click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区 -->
			<scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级分类的标题 -->
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 三级分类 -->
					<view class="cate-lv3-list">
						<!-- 三级分类的每一项 -->
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<!-- 三级分类的图片 -->
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<!-- 三级分类的文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//当前设备屏幕可用高度
				wh:0,
				//分类列表的数据
				cateList:[],
				active:0,
				//二级分类的列表
				cateLevel2:[],
				scrollTop:0,
			};
		},
		onLoad() {
			//获取设备信息
			let sysInfo = uni.getSystemInfoSync()
			//设备屏幕的可用高度
			this.wh = sysInfo.windowHeight-50
			
			this.getCateList()
		},
		methods:{
			//获取分类列表的数据
			async getCateList(){
				let {data} = await uni.$http.get('/api/public/v1/categories')
				//如果请求失败
				if(data.meta.status != 200) return uni.$showMsg()
				//请求成功
				this.cateList = data.message
				//为二级分类赋值
				this.cateLevel2 = data.message[0].children
			},
			activeChanged(index){
				this.active = index
				//重新为二级分类赋值
				this.cateLevel2 = this.cateList[index].children
				
				this.scrollTop = this.scrollTop === 0 ? 1: 0
			},
			//跳转到商品列表页面
			gotoGoodsList(item3){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item3.cat_id
				})
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
 .scroll-view-container{
	 display: flex;
	 .left-scroll-view{
		 width: 120px;
		 .left-scroll-view-item{
			 background-color: #f7f7f7;
			 line-height: 60px;
			 text-align: center;
			 font-size: 12px;
			 &.active{
				 background-color: #ffffff;
				 position: relative;
				 &::before{
					 content: ' ';
					 display: block;
					 width: 3px;
					 height: 30px;
					 background-color: #c00000;
					 position: absolute;
					 top: 50%;
					 left: 0;
					 transform: translateY(-50%);
				 }
			 }
		 }
	 }
 }
 .cate-lv2-title{
	 font-size: 12px;
	 font-weight: bold;
	 text-align: center;
	 padding: 15px 0;
 }
 .cate-lv3-list{
	 display: flex;
	 flex-wrap: wrap;
	 .cate-lv3-item{
		 width: 33.33%;
		 display: flex;
		 flex-direction: column;
		 justify-content: center;
		 align-items: center;
		 margin-bottom: 10px;
		 image{
			 width: 60px;
			 height: 60px;
		 }
		 text{
			 font-size: 12px
		 }
	 }
 }
</style>
