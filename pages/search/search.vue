<template>
	<view class="app">
		<view class="header">
			<view class="">

			</view>
		</view>
		<view class="tab">
			<view class="" @click="comprehensive">
				综合
			</view>
			<view class="" @click="price">
				价格
			</view>
			<view class="" @click="category">
				分类
			</view>
		</view>
		<view class="">
			<view class="brandList">
				<view class="brandListItem" v-for="(item,index) in searchList" :key="index">
					<view class="img">
						<image :src="item.list_pic_url" mode=""></image>
					</view>
					<view class="name">
						{{item.name}}
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
			//这里存放数据
			return {
				keyword: '',
				searchList: []
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			comprehensive() {},
			price() {},
			category() {}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		onLoad(option) {
			this.keyword = option.keyword
		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			uni.request({
				url: this.$api(`search/helperaction?keyword=${this.keyword}`),
				method: 'GET',
				data: {},
				success: res => {
					console.log(res)
					this.searchList = res.data.keywords
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

	.header {
		width: 100%;
		height: 300rpx;
	}

	.tab {
		display: flex;
		justify-content: space-around;

		view {
			font-size: 28rpx;
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
