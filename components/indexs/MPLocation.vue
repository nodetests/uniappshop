<template>
	<view class="apps">
		<view class="locations" @click="location" >
			{{address}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				address: '',
				longitude: '',
				latitude: '',
			}
		},
		methods: {
			location() {
               let that =this
				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.address=res.name	
					}
				});
			}
		},
		mounted() {
			var QQMapWX = require('../../static/js/qqmap-wx-jssdk.min.js')
			var qqmapsdk;
			let that = this
			qqmapsdk = new QQMapWX({
				key: '7X3BZ-INQR3-CGE3B-35IDT-HUKU3-Z4FGG'
			});
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
							that.latitude = res.latitude
							qqmapsdk.reverseGeocoder({
								location: {
									latitude: res.latitude,
									longitude: res.longitude,
								},
								success: (res) => {
									console.log(res)
									that.address = res.result.address
									console.log(111111)
								},
			
							})
			
						},
						fail: (err) => {
							console.log(err)
						}
					})
				}
			})
			
		},
		onShow() {
			
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
.locations{
	width: 100%;
	height: 50rpx;
	font-size: 25rpx;
	line-height: 50rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
</style>
