<template>
	<view>
		<view class="msg">
			<scroll-view class="scroll-x" scroll-x="true" scroll-left="120">
				<view class="hotItem" v-for="item in newgoods" :key='item.id' @click="goTodetail(item)">
					<view class="img">
						<image :src="item.list_pic_url" mode=""></image>
					</view>
					<view class="name">
						{{item.name}}
					</view>
					<view class="sprice">
						{{item.retail_price}}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {
			newgoods: {
				type: Array
			}
		},
		data() {
			return {}
		},
		methods: {
			iconBack() {
				uni.navigateBack()
			},
			goTodetail(item) {
				// console.log(item)
				let opid= uni.getStorageSync('openId')
				let id = item.id 
				uni.navigateTo({
					url:`../../pages/detail/detail?id=${id}`
				})
				
			},
		},
		mounted() {

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
	.msg {
		width: 100%;
		margin-top: 20px;
	}

	.msg .scroll-x {
		width: 100%;
		display: flex;
		flex: 1;
		white-space: nowrap;
	}

	.msg .scroll-x .hotItem {
		width: 150px;
		height: 260px;
		display: inline-block;
		margin-left: 5px;
		overflow: hidden;
	}

	.msg .scroll-x .hotItem:nth-child(1) {
		margin-left: 0;
	}

	.msg .scroll-x .img {
		width: 150px;
		height: 200px;
	}

	.msg .scroll-x image {
		width: 150px;
		height: 200px;
	}

	.msg .scroll-x .hotItem .name {
		width: 150px;
		font-size: 14px;
		color: #353535;
		// 单行溢出隐藏
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		// 多行溢出隐藏
		// overflow: hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 3;
		// -webkit-box-orient: vertical;
	}

	.msg .scroll-x .hotItem .star {
		width: 150px;
		height: 30px;
		font-size: 14px;
		display: flex;
		justify-content: flex-start;
	}

	.msg .scroll-x .hotItem .star .rate {
		line-height: 30px;
	}

	.msg .scroll-x .hotItem .star .score {
		height: 18px;
		margin-left: 15px;
	}

	::-webkit-scrollbar {
		display: none;
	}

	.sprice {
		color: #f46;
	}
</style>
