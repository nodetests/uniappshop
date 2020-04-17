<template>
	<view class="app">
		<!--  #ifdef H5 -->
		<view class="header">
			<view class="iconBack">
				<image src="../../static/iconBack.png" mode="" @click="iconBack"></image>
			</view>
		</view>
		<!-- #endif -->
		<view class="tab">
			<scroll-view class="scroll-x" scroll-x="true" scroll-left="120">
				<view class="tabItem" v-for="(item,index) in subList" :key='index' @click="tabItem(item,index)">
					<view :class="[index===indexs?'colors':'' ,'name']">
						{{item.name}}
					</view>

					<view class="line" v-if="index===indexs">

					</view>
				</view>
			</scroll-view>
		</view>

		<view class="goods">
			<view class="goodsItem" v-for="item in goodsList" :key="item.id">
				<view class="img">
					<image :src="item.list_pic_url" mode=""></image>
				</view>
				<view class="name">
					{{item.name}}
				</view>
				<view class="price">
					￥{{item.retail_price}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {},
		data() {
			//这里存放数据
			return {
				cateId: '',
				goodId: '',
				indexs: 0,
				subList: [],
				goodsList: []
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			iconBack() {
				uni.navigateBack()
			},
			tabItem(item, index) {
				this.goodId = item.id
				this.indexs = index
				console.log(item)
				uni.request({
					url: this.$api(`goods/goodsList?categoryId=${this.goodId}`),
					method: 'GET',
					data: {},
					success: res => {
						uni.showLoading({
							title: '加载中',
						});
						this.goodsList = res.data.data
						console.log(this.goodsList)
						uni.hideLoading({
							title: "加载成功"
						})
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		onLoad(option) {
			console.log(option)
			this.cateId = option.cateId
			this.indexs = option.indexs
			this.goodId = option.goodId
		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			console.log(this.cateId)
			uni.request({
				url: this.$api(`category/currentaction?id=${this.cateId}`),
				method: 'GET',
				data: {},
				success: res => {
					uni.showLoading({
						title: '加载中',
					});
					// console.log(res)
					this.subList = res.data.data.currentOne.subList
					// console.log(this.subList)
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.$api(`goods/goodsList?categoryId=${this.goodId}`),
				method: 'GET',
				data: {},
				success: res => {
					uni.showLoading({
						title: '加载中',
					});
					console.log(res)
					this.goodsList = res.data.data
					console.log(this.goodsList)
					uni.hideLoading({
						title: "加载成功"
					})
				},
				fail: () => {
					uni.hideLoading({
						title: "加载失败"
					})
				},
				complete: () => {}
			});
		},
		beforeCreate() {}, //生命周期 - 创建之前
		beforeMount() {}, //生命周期 - 挂载之前
		beforeUpdate() {}, //生命周期 - 更新之前
		updated() {}, //生命周期 - 更新之后
		beforeDestroy() {}, //生命周期 - 销毁之前
		destroyed() {}, //生命周期 - 销毁完成
		activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
	}
</script>
<style lang='scss' scoped>
	.app{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #f8f8f8;
	}
	.header {
		width: 100%;
		margin-top: 50rpx;

		image {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.tab {
		width: 100%;
		margin-top: 10rpx;
	}

	.tab .scroll-x {
		width: 100%;
		display: flex;
		flex: 1;
		white-space: nowrap;
	}

	.tab .scroll-x .tabItem {
		width: 20%;
		height: 50rpx;
		display: inline-block;
		overflow: hidden;
	}

	.tab .scroll-x .tabItem:nth-child(1) {
		margin-left: 0;
	}

	.tab .scroll-x .tabItem .name {
		font-size: 28rpx;
		text-align: center;
		color: #353535;
		// 单行溢出隐藏
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.tab .scroll-x::-webkit-scrollbar {
		display: none;
	}

	.line {
		width: 80%;
		height: 5rpx;
		background: #f46;
		margin-left: 10%;
	}

	.tab .scroll-x .tabItem .colors {
		color: #f46;
	}

	.goods {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.goods .goodsItem {
		width: 48%;
		margin-left: 1%;
	}

	.goods .goodsItem .img {
		width: 100%;
		height: 300rpx;
	}

	.goods .goodsItem .img image {
		width: 80%;
		height: 300rpx;
		margin-left: 10%;
	}

	.goods .goodsItem .name {
		font-size: 28rpx;
		text-align: center;
	}

	.goods .goodsItem .price {
		font-size: 30rpx;
		text-align: center;
		color: red;
	}
</style>
