<script>
	export default {
		onLaunch: function() {
			let openId ='jihangqiuniappshop123456'
			uni.setStorageSync('openId',openId)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
