<template>
	<view class="app">
		<view class="header">
			<view class="">
				·30天无忧退款
			</view>
			<view class="">
				·48小时快速退款
			</view>
			<view class="">
				·满88元包邮
			</view>
		</view>

		<view class="carData">
			<uni-swipe-action>
				<uni-swipe-action-item :options="options" @click="onClick(index,item)" @change="change" v-for="(item,index) in carData"
				 :key="index">
					<view class="check">
						<!-- 左边的单选按钮 -->
						<view class='checked fl a-c'>
							<label>
								<checkbox :checked="item.checked" @click="changeChecked(index)" />
							</label>
						</view>
					</view>
					<!-- 右边的内容模板 -->

					<view class="content">
						<view class="img">
							<image :src="item.list_pic_url" mode=""></image>
						</view>

						<view class="name">
							<view class="">
								{{item.goods_name}}
							</view>
						
							<view class="">
								{{item.retail_price*item.number}}
							</view>
							
						</view>
						<view class="num">
							X{{item.number}}
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<!-- 结算 -->
		<view class="submit">
			<view class="">
				<label @click="checkall">
					<checkbox :value="allFlag" /><text>全选()</text>
				</label>
			</view>
			<view class="">
				<button type="warn" @click="submit">结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			//这里存放数据
			return {
				openId:'',
				carData: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#B4282D'
					}
				}],
				allFlag:false,
				count:0
			};
		},
		//监听属性 类似于data概念
		computed: {},
		
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			onClick(index,item) {
				
				let goodid=item.id
				console.log(goodid)
				uni.request({
					url: this.$api(`cart/deleteAction?id=${goodid}`),
					method: 'GET',
					data: {},
					success: res => {
						console.log(res)
						uni.request({
							url: this.$api(`cart/cartList?openId=${this.openId}`),
							method: 'GET',
							data: {
								
							},
							success: res => {
								// console.log(res)
								this.carData = res.data.data
								console.log(this.carData)
							},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			changeChecked(index) {
				console.log(index)
			},
			change(open) {
				console.log('当前开启状态：' + open)
			},
			checkall(){
				if(this.allFlag){
					this.allFlag=false
					let arr= this.carData
					arr.map(item=>{
						item.checked=false
					})
				}else{
					this.allFlag=true
					let arr= this.carData
					arr.map(item=>{
						item.checked=true
					})
				}
			},
			submit(){
				
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		onShow() {
			console.log('onshow')
			this.openId=uni.getStorageSync('openId')
			// console.log(opid)
			uni.request({
				url: this.$api(`cart/cartList?openId=${this.openId}`),
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res)
					this.carData = res.data.data
					console.log(this.carData)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			// let opid = uni.getStorageSync('openId')
			this.openId=uni.getStorageSync('openId')
			// console.log(opid)
			uni.request({
				url: this.$api(`cart/cartList?openId=${this.openId}`),
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res)
					this.carData = res.data.data
					console.log(this.carData)
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
		display: flex;
		justify-content: space-around;
		font-size: 28rpx;
		background: #C8C7CC;
		height: 100rpx;
		line-height: 100rpx;
	}

	.carData {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		font-size: 28rpx;
		height: 150rpx;
          .check{
			  margin-top: 60rpx;
		  }
		.content {
			width: 100%;
			height: 150rpx;
			display: flex;
			justify-content: flex-start;

			.img {
				margin-left: 20rpx;

				image {
					width: 150rpx;
					height: 150rpx;
				}
			}
		}

		.name {
			width: 60%;
			height: 150rpx;
		/* 	line-height: 150rpx;
			text-overflow: ellipsis;
			overflow: hidden; */
			/* white-space: nowrap; */
		}

		.num {
			width: 20%;
			height: 150rpx;
			line-height: 150rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
		}

	}
	.submit{
		width: 100%;
		height: 150rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-around;
	}
</style>
