<template>
	<view class="app">
		<view class="content">
			<view class="header">
				<view class="location">
					<!-- #ifdef MP-WEIXIN -->
					<MPLocation ref="location" ></MPLocation>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<H5Location ref="location" />
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<AppLocation ref="location" />
					<!-- #endif -->
				</view>
				<view class="search">
					<image src="../../static/search.png" mode=""></image>
					<input type="text" value="" placeholder="请输入搜索内容" />
				</view>
			</view>
			<!-- 轮播图 -->
			<view class="banners">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="item in banners" :key='item.id' class="bannerItem">
						<image :src="item.image_url" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 通道 -->
			<view class="channel">
				<view class="channelItem" v-for="(item,index) in channel" :key="index" @click="channels(index)">
					<view class="img">
						<image :src="item.icon_url" mode=""></image>
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
			<!-- 品牌商 -->
			<view class="first">
				<view class="title">
					品牌制造商直供
				</view>
				<view class="brandList">
					<view class="brandListItem" v-for="item in brandList" :key="item.id">
						<view class="img">
							<image :src="item.list_pic_url" mode=""></image>
						</view>
						<view class="name">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<!-- 新品 -->
			<view class="newgood">
				<view class="text1">
					新品首发
				</view>
				<view class="text2">
					查看更多
				</view>
				<view class="">
					<newgoods :newgoods='newgoods'></newgoods>
				</view>
			</view>
			<view class="space"></view>
		</view>
	</view>

</template>

<script>
	import brandList from '../../components/brandList/brandList.vue'
	import newgoods from '../../components/brandList/newgoods.vue'
	// #ifdef MP-WEIXIN
	import MPLocation from '../../components/indexs/MPLocation.vue'
	// #endif
	// #ifdef APP-PLUS
	import AppLocation from '../../components/indexs/AppLocation.vue'
	// #endif
	// #ifdef H5
	import H5Location from '../../components/indexs/H5Location.vue'
	// #endif
	export default {
		name: "",
		components: {
				// #ifdef MP-WEIXIN
			MPLocation,
			// #endif
			// #ifdef H5
			H5Location,
			// #endif
			// #ifdef APP-PLUS
			AppLocation,
			// #endif
			brandList,
			newgoods
		},
		props: {},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				banners: [],
				channel: [],
				brandList: [],
				newgoods: [],
			}
		},
		methods: {
			channels(index) {
				// console.log(index)
				let indexs = index
				uni.navigateTo({
					url: `../category/category?indexs=${indexs}`
				})
			},
		
		},
		onNavigationBarButtonTap(e) {
			console.log(11111)
		},
		mounted() {
			
			// console.log(this.$store.state)
			// 获取顶部轮播图
			uni.request({
				url: this.$api('index/index'),
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
					this.banners = res.data.banner
					this.channel = res.data.channel
					this.brandList = res.data.brandList
					this.newgoods = res.data.newGoods
					console.log(this.newgoods)
				},
				fail: (err) => {
					console.log(err)
				},
				complete: () => {}
			});
			// 获取定位

			
  
		},
		onshow(){
		
		},
		onLoad() {

		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}

	}
</script>

<style lang="scss" scoped>
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

		.location {
			width: 20%;
			height: 50rpx;
			margin-top: 15rpx;

			.unLocation {
			
			}
		}

		.search {
			width: 80%;
			height: 50rpx;
			border: 1px solid #ccc;
			border-radius: 30rpx;
			display: flex;
			justify-content: flex-start;
			margin-top: 15rpx;
			background: #f8f8f8;
			;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-top: 10rpx;
			}

			input {
				width: 70%;
				height: 50rpx;
			}
		}

	}

	.banners {
		width: 100%;
		height: 400rpx;

		.swiper {
			width: 100% !important;
			height: 400rpx;

			.bannerItem {
				width: 100% !important;
				height: 400rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.channel {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-top: 20rpx;

		.img {
			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.name {
			font-size: 28rpx;
			text-align: center;
		}
	}

	.first {
		width: 100%;
		margin-top: 20rpx;

		.title {
			text-align: center;
			font-size: 30rpx;
			font-weight: 600;
		}

		.brandList {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-top: 20rpx;

			.brandListItem {
				width: 50%;
				position: relative;

				.img {
					width: 100%;

					image {
						width: 96%;
						height: 300rpx;
						margin-left: 2%;
					}
				}

				.name {
					position: absolute;
					left: 20rpx;
					top: 20rpx;
					color: #808080;
				}
			}
		}

	}

	.newgood {
		width: 100%;
		height: 300rpx;
		background: #F1F7FC;

		.text1 {
			width: 100%;
			height: 150rpx;
			text-align: center;
			line-height: 150rpx;
		}

		.text2 {
			width: 200rpx;
			height: 50rpx;
			font-size: 30rpx;
			line-height: 50rpx;
			border: 1px solid #ccc;
			text-align: center;
			margin: 0 auto;
		}
	}

	.space {
		width: 100%;
		height: 500rpx;
	}
</style>
