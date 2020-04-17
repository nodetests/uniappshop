<template>
	<view class="app">
		<!--  #ifdef H5 -->
		<view class="header">
			<view class="iconBack">
				<image src="../../static/iconBack.png" mode="" @click="iconBack"></image>
			</view>
			<view class="name">
				详情页
			</view>
		</view>
		<!-- #endif -->
		<!-- 轮播图 -->
		<view class="banners">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in banners" :key='item.id' class="bannerItem">
					<image :src="item.img_url" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="email">
			<view class="">
				30天无忧退款
			</view>
			<view class="">
				48小时快速退款
			</view>
			<view class="">
				满88元免邮费
			</view>
		</view>
		<view class="info">
			<view class="text1">
				{{info.name}}
			</view>
			<view class="text2">
				{{info.goods_brief}}
			</view>
			<view class="text3">
				￥{{info.retail_price}}
			</view>
		</view>
		<view class="attribute">
			<view class="">
				商品参数
			</view>
			<view class="attributeItem" v-for="item in attribute" :key="item.id">
				<view class="inofs">
					<view class="name">
						{{item.name}}
					</view>
					<view class="value">
						{{item.value}}
					</view>
				</view>
			</view>
		</view>
		<view class="goodesc">
			<view class="">
				商品介绍
			</view>
			<view class="content" v-html="info.goods_desc">

			</view>
		</view>
		<view class="menu">
			<!-- <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav> -->
			<view class="collect">
				<view class="img">
					<image src="../../static/collect.png" mode=""></image>
				</view>
				<view class="text">
					收藏
				</view>
			</view>
			<view class="car">
				<view class="img">
					<image src="../../static/cars.png" mode=""></image>
				</view>
				<view class="text">
					<view class="text1">
						购物车
					</view>
					<view class="icons">
						{{icons}}
					</view>
				</view>
			</view>
			<view class="btn">
				<view class="addcar">
					<button type="default" @click="addcar">加入购物车</button>
				</view>
				<view class="buy">
					<button type="default" @click="buy">立即购买</button>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			uniGoodsNav
		},
		data() {
			//这里存放数据
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				id: '',
				openId: '',
				banners: [],
				info: {},
				attribute: [],
				goodsdesc: '',
				icons:0,
				// 	options: [{
				// 		icon: '../../static/collect.png',
				// 		text: '收藏'
				// 	}, {
				// 		icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
				// 		text: '购物车',
				// 		info: 0
				// 	}],
				// 	buttonGroup: [{
				// 			text: '加入购物车',
				// 			backgroundColor: '#ff0000',
				// 			color: '#fff'
				// 		},
				// 		{
				// 			text: '立即购买',
				// 			backgroundColor: '#ffa200',
				// 			color: '#fff'
				// 		}
				// 	]

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
			buy() {
				let goodinfo ={
					attribute:this.attribute,
					count:this.icons,
					info:this.info,
				}
				this.$store.state.goodinfo=goodinfo
				wx.navigateTo({
					url:`../buy/buy?id=${this.id}`
				})

			},
		addcar(){
			this.icons++,
			// console.log(typeof(this.icons))
			this.$store.state.icons=this.icons
			uni.request({
				url: this.$api('cart/addCart'),
				method: 'POST',
				data: {
					goodsId:this.id,
					number:this.icons,
					openId:this.openId	
				},
				success: res => {
					// console.log(res)
					// console.log(this.openId)
				},
				fail: (err) => {
					console.log(err)
				},
				complete: () => {}
			});
			uni.request({
				url: this.$api(`cart/cartList?openId=${this.openId}`),
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
				},
				fail: () => {},
				complete: () => {}
			});
			// this.icons=this.$store.state.icons
		}

		},
		onLoad(option) {
			this.id = option.id
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			// console.log(this.id)
			// this.icons=this.$store.state.icons
			let opid = uni.getStorageSync('openId')
			this.openId = uni.getStorageSync('openId')
			uni.request({
				url: this.$api(`goods/detailaction?id=${this.id}&openId=${opid}`),
				method: 'GET',
				data: {},
				success: res => {
					wx.showLoading()
					console.log(res)
					wx.hideLoading()
					this.banners = res.data.gallery
					this.info = res.data.info
					this.attribute = res.data.attribute
					let str = res.data.info.goods_desc
				
					console.log(this.info)
					// this.goodsdesc=str.replace(/img/g, "image")
					// console.log(this.goodsdesc)
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
	.app {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #f8f8f8;
	}

	.header {
		width: 100%;
		height: 60rpx;
		margin-top: 50rpx;
		display: flex;
		justify-content: flex-start;

		.iconBack {
			width: 50%;
			height: 60rpx;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.name {
			width: 50%;
			height: 60rpx;
			line-height: 60rpx;
		}

	}

	.banners {
		width: 100%;
		height: 600rpx;
		margin-top: 20rpx;

		.swiper {
			width: 100% !important;
			height: 600rpx;

			.bannerItem {
				width: 100% !important;
				height: 600rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.email {
		display: flex;
		justify-content: space-around;
		height: 80rpx;
		background: #EEEEEE;

		view {
			font-size: 28rpx;
			line-height: 80rpx;
		}
	}

	.info {
		width: 100%;
		height: 200rpx;
		border-bottom: 4rpx solid #ccc;

		.text1 {
			width: 100%;
			font-size: 34rpx;
			font-weight: 600;
			text-align: center;
			margin-top: 20rpx;
		}

		.text2 {
			width: 100%;
			font-size: 26rpx;
			text-align: center;
			margin-top: 10rpx;
		}

		.text3 {
			width: 100%;
			text-align: center;
			color: #f46;
			margin-top: 30rpx;
		}
	}

	.attributeItem {
		width: 100%;
		background: #ccc;
		margin-top: 20rpx;

		.inofs {
			display: flex;
			justify-content: flex-start;

			.name {
				width: 30%;
				font-size: 32rpx;
			}

			.value {
				width: 70%;
				font-size: 26rpx;
				margin-left: 30rpx;
			}
		}
	}

	.goodesc {
		width: 500rpx;
		margin-top: 20rpx;

		.content {
			width: 100%;

			p {
				width: 100rpx !important;

				image {
					width: 100rpx;
				}
			}
		}
	}

	.menu {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: content-box;
		height: 50px;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #fff;
		justify-content: flex-start;
		height: 100rpx;

		.collect {
			width: 15%;

			.img {
				image {
					width: 50%;
					height: 50rpx;
					margin-left: 25%;
				}
			}

			.text {
				width: 70%;
				margin-left: 15%;
				font-size: 25rpx;
				color: #8a8a8a;
				text-align: center;
			}
		}

		.car {
			width: 15%;
            position: relative;
			.img {
				image {
					width: 50%;
					height: 50rpx;
					margin-left: 25%;
				}
			}

			.text {
				width: 70%;
				margin-left: 15%;
				font-size: 25rpx;
				color: #8a8a8a;
				text-align: center;
				.icons{
					position: absolute;
					top: 0;
					right: 10%;
					color: red;
					font-weight: 600;
				}
			}
		}

		.btn {
			display: flex;
			justify-content: flex-start;
			width: 70%;

			.addcar {
				width: 50%;

				button {
					color: #FFFFFF;
					border-radius: 50rpx 0 0 50rpx;
					background: linear-gradient(to right, #ffd01e, #ff8917)
				}

			}

			.buy {
				width: 50%;

				button {
					color: #FFFFFF;
					border-radius: 0 50rpx 50rpx 0;
					background: linear-gradient(to right, #ff6034, #ee0a24);
				}

			}
		}
	}
</style>
