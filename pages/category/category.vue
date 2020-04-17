<template>
	<view class="box">
		<!--  #ifdef H5 -->
		<view class="header">
			<view class="iconBack">
				<image src="../../static/iconBack.png" mode="" @click="iconBack"></image>
			</view>
		</view>
		<!-- #endif -->
		<view class="tab">
			<scroll-view class="scroll-x" scroll-x="true" scroll-left="120">
				<view class="tabItem" v-for="(item,index) in category" :key='index' @click="tabItem(item,index)">
					<view :class="[index===indexs?'colors':'' ,'name']">
						{{item.name}}
					</view>
					
					<view class="line" v-if="index===indexs">
                      
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="contents">
			<view class="text">
				<view class="text1">
					{{names}}
				</view>
				<view class="text2">
					回家，放松身心
				</view>
			</view>
			<view class="goods">
				<view class="goodsItem" v-for="item in goods" :key="item.id">
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
	</view>
</template>

<script>
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {},
		data() {
			//这里存放数据
			return {
				// 默认选中
				indexs: null,
				category: [],
				goods: [],
				names: ''
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
				this.indexs = index
				this.goods = this.category[index].goodsList
				this.names = this.category[index].name
				console.log(this.goods)
			}
		},
		onLoad(option) {
			// console.log(option.indexs)
			this.indexs = option.indexs
			console.log(this.indexs)
			// console.log('我是onload')
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			
			// console.log('我是mouted')
			uni.request({
				url: this.$api('index/index'),
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
					this.category = res.data.newCategoryList
					this.goods = res.data.newCategoryList[this.indexs].goodsList
					this.names = res.data.newCategoryList[this.indexs].name
					// console.log(this.names)
				},
				fail: (err) => {
					console.log(err)
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
	.box {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
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

	.text {
		width: 100%;
        background: #f8f8f8;
		.text1 {
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
			height: 50rpx;
		}

		.text2 {
			font-size: 29rpx;
			text-align: center;
			color: #C0C0C0;
			height: 50rpx;
		}
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

	/* .goods .goodsItem:nth-child(){
		background:red;
	} */
</style>
