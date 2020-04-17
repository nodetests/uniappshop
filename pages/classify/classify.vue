<template>
	<view class="app">
		<view class="header">
			<view class="search">
				<image src="../../static/search.png" mode=""></image>
				<input type="text" value="" placeholder="请输入搜索内容" @confirm="search" />
			</view>
		</view>
		<view class="msg">
			<view class="aside">
				<view class="asideItem" v-for="(item,index) in categoryList" :key="index" @click="lineControl(item,index)">
					<view class="line" v-show="index===index1">

					</view>
					<view class="name">
						{{item.name}}
					</view>

				</view>
			</view>
			<view class="content">
				<!-- 头部介绍 -->
				<view class="goods">
					<view class="desc">
						<view class="img">
							<image :src="goodDesc.wap_banner_url" mode=""></image>
						</view>
						<view class="name">
							{{goodDesc.front_name}}
						</view>
					</view>
				</view>
				<!-- 详细内容 -->
				<view class="">
					<view class="brandList">
						<view class="brandListItem" v-for="(item,index) in subList" :key="index" @click="goTogoodlist(item,index)">
							<view class="img">
								<image :src="item.banner_url" mode=""></image>
							</view>
							<view class="name">
								{{item.name}}
							</view>
						</view>
					</view>
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
			return {
				categoryList: [],
				index1: 0,
				index2:0,
				goodDesc: [],
				id:'',
				subList:[]
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			search(e){
				let keyword=e.detail.value
				uni.navigateTo({
					url:`../search/search?keyword=${keyword}`
				})
			},
			lineControl(item, index) {
				this.index1 = index
				this.id =item.id
				console.log(item)
				uni.request({
					url: this.$api('category/indexaction'),
					method: 'GET',
					data: {},
					success: res => {
						this.goodDesc = res.data.categoryList[this.index1]
						// console.log(this.goodDesc)
					},
					fail: () => {},
					complete: () => {}
				});
				uni.request({
					url: this.$api(`category/currentaction?id=${this.id}`),
					method: 'GET',
					data: {},
					success: res => {
						// console.log(res)
						this.subList =res.data.data.currentOne.subList
						console.log(this.subList)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goTogoodlist(item,index){
				let indexs =index
				let cateId =this.id
				let goodId =item.id
					
				wx.navigateTo({
					url:`../goodlist/goodlist?cateId=${cateId}&index=${indexs}&goodId=${goodId}`
				})
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			uni.request({
				url: this.$api('category/indexaction'),
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res)
					this.categoryList = res.data.categoryList
					this.goodDesc = res.data.categoryList[this.index1]
					console.log(this.goodDesc)
					this.id = res.data.categoryList[this.index1].id
					console.log(this.id)
					// console.log(this.goodDesc)
					uni.request({
						url: this.$api(`category/currentaction?id=${this.id}`),
						method: 'GET',
						data: {},
						success: res => {
							// console.log(res)
							this.subList =res.data.data.currentOne.subList
							console.log(this.subList)
						},
						fail: () => {},
						complete: () => {}
					});
				},
				fail: () => {},
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
	/* @import url(); 引入公共css类 */
	.app {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.header {
		width: 96%;
		margin-left: 2%;
		height: 80rpx;
		display: flex;
		justify-content: flex-start;
		margin-top: 20rpx;

		.search {
			width: 90%;
			height: 60rpx;
			border: 1px solid #ccc;
			border-radius: 30rpx;
			display: flex;
			justify-content: flex-start;
			margin-top: 10rpx;
			background: #f0eded;
			margin-left: 12%;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-top: 10rpx;
			}

			input {
				width: 70%;
				height: 40rpx;
				margin-top: 10rpx;
			}
		}

	}

	.msg {
		margin-top: 20rpx;
		display: flex;
		justify-content: flex;
		justify-content: flex-start;
	}

	.msg .aside {
		width: 20%;

		.asideItem {
			width: 100%;
			height: 100rpx;
			font-size: 28rpx;
			line-height: 100rpx;
			text-align: center;
			display: flex;
			justify-content: flex-start;

			.line {
				width: 6rpx;
				height: 50rpx;
				background: #f46;
				margin-top: 25rpx;
			}

			.name {
					margin-left: 20rpx;
			}
		}
	}

	.msg .content {
		width: 80%;
	}

	.content .goods {
		width: 100%;
		.desc {
			width: 100%;
			height: 250rpx;
			position: relative;
			.img{
				width: 100%;
				height: 250rpx;
      
				image {
					width: 96%;
					height: 250rpx;
					margin-left: 2%;
				}
			}
			.name{
				width: 100%;
				height: 250rpx;
				font-size: 32rpx;
				position: absolute;
				left: 0;
				top: 0;
				color: #F8F8F8;
				font-weight: 600;
				line-height: 250rpx;
				text-align: center;
			}
		}
	}
	.brandList {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-top: 20rpx;
	
			.brandListItem {
				width: 33%;
				.img {
					width: 100%;
					height: 150rpx;
					image {
						width: 70%;
						margin-left: 15%;
						height: 120rpx;
					}
				}
	
				.name {
					width: 70%;
					margin-left: 15%;
					text-align: center;
					color: #808080;
					font-size: 30rpx;
				}
			}
		}
	
	
</style>
