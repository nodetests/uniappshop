<template>

	<view class="app">
		<view class="contents">
			　<map style="width:100%;height:180rpx" :latitude="latitude" :longitude="longitude"></map>
		</view>
	</view>
</template>

<script>
	// import qqmapsdk from '../../static/js/qqmap-wx-jssdk.min.js'
	var QQMapWX = require('../../static/js/qqmap-wx-jssdk.min.js')
	var qqmapsdk;
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				longitude: '',
				latitude: '',
				address: '',

			}
		},
		methods: {
			search() {
				console.log(this.longitude)
			},
			openMap() {

			}
		},
		mounted() {
			qqmapsdk = new QQMapWX({
				key: '7X3BZ-INQR3-CGE3B-35IDT-HUKU3-Z4FGG'
			});
			console.log(qqmapsdk)
			// #ifdef MP-WEIXIN
			let that = this
			uni.authorize({
				scope: 'scope.userLocation',
				// scope:'scope.userLocationBackground',
				success() {
					uni.getLocation({
						// 默认为 wgs84 返回 gps 坐标，
						// gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
						type: 'gcj02',
						// geocode: true,
						success: (res) => {
							// console.log(that.latitude)
							console.log('当前位置的经度：' + res.longitude);
							console.log('当前位置的纬度：' + res.latitude);
							that.longitude = res.longitude
							qqmapsdk.reverseGeocoder({
								location: {
									latitude: res.latitude,
									longitude: res.longitude,
								},
								success: (res) => {
									console.log(res)
									console.log(111111)
								},

							})
							uni.openLocation({
								latitude: res.latitude,
								longitude: res.longitude,
								success: (res) => {
									console.log(res)
								},
							});

						},
						fail: (err) => {
							console.log(err)
						}
					})
				}
			})


			// #endif
			// #ifdef H5
			// uni.authorize({
			// 	scope: 'scope.userLocation',
			// 	success() {
			// 		uni.getLocation({
			// 			// 默认为 wgs84 返回 gps 坐标，
			// 			// gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
			// 			type: 'wgs84',
			// 			geocode: true,
			// 			success: (res) => {
			// 				console.log('当前位置的经度：' + res.longitude);
			// 				console.log('当前位置的纬度：' + res.latitude);
			// 			},
			// 			fail: (err) => {
			// 				console.log(err)
			// 			}
			// 		})
			// 	}
			// })
			uni.getLocation({
				// 默认为 wgs84 返回 gps 坐标，
				// gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				},
				fail: (err) => {
					console.log(err)
				}
			})
			uni.openMap()
			// #endif
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

<style scoped lang="scss">
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
</style>
