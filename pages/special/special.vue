<template>
	<view class="app">
		<view class="contents">
			<view class="specialItem" v-for="item in specialList" :key="item.id">
				<view class="img">
					<image :src="item.scene_pic_url" mode=""></image>
				</view>
				<view class="text1">
					{{item.title}}
				</view>
				<view class="text2">
					{{item.subtitle}}
				</view>
				<view class="price">
					{{item.price_info}}
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
				specialList: [],
				page: 1
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {

		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			uni.request({
				url: this.$api(`topic/listaction?page=${this.page}`),
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
					this.specialList = res.data.data
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onReachBottom(e) {
			this.page = this.page + 1
			uni.request({
				url: this.$api(`topic/listaction?page=${this.page}`),
				method: 'GET',
				data: {},
				success: res => {
					let arr = this.specialList
					let arr1 = res.data.data
					arr1.map(item => {
						arr.push(item)
					})
					console.log(arr)
					// arr.push(res.data.data)
					this.specialList = arr
					// console.log(this.specialList)
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
	}

	.contents {
		width: 96%;
		margin-left: 2%;
	}

	.specialItem {
		width: 100%;
		margin-top: 20rpx;

		.img {
			width: 100%;

			image {
				width: 100%;
				height: 400rpx;
			}
		}

		.text1 {
			font-size: 34rpx;
			font-weight: 600;
			text-align: center;
		}

		.text2 {
			font-size: 27rpx;
			text-align: center;
			color: #999999;
		}

		.price {
			color: #f46;
			text-align: center;
		}

	}
</style>
