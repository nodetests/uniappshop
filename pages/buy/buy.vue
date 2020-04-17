<template>
	<view class="app">
		<view class="header">

			<view class="name">
				{{name}}
			</view>
			<view class="desc">
				{{desc}}
			</view>
			<view class="allPrice">
				{{sum}}
			</view>
		</view>
		<view class="buy" @click="counts">
			<view class="title">
				请选择规格数量
			</view>
			<view class="">
				>
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
		<view class="prups" v-if="countFlag===1">
			<view class="good">
				<view class="img">
					<image :src="imgUrl" mode=""></image>
				</view>
				<view class="sum">
					价格￥{{sum}}
				</view>
			</view>

			<view class="count" >
				<view class="">
					数量
				</view>
				<view class="">
					<lxcCount :value="count" @handleCount="handleCountClick"></lxcCount>
				</view>
				<view class="countControl" @click="countControl">
					X
				</view>
			</view>
		</view>
		<view class="buynow">
			<button type="default" @click="buynow">	立即购买</button>
		</view>
	</view>
</template>

<script>
	import lxcCount from '../../components/lxc-count/lxc-count.vue'
	export default {
		components: {
			lxcCount
		},
		props: {},
		data() {
			return {
				goodinfo: {},
				sum: 0,
				name: '',
				desc: '',
				imgUrl:'',
				attribute: [],
				price:0,
				countFlag:0,
				
			}
		},
		methods: {
			handleCountClick(val) {
               console.log(val)
			   this.count=val
			   this.sum = val*this.price
			},
			counts(){
				this.countFlag=1
			},
			countControl(){
				this.countFlag=0	
			},
			buynow(){
				uni.request({
					url: this.$api(`order/submitAction`),
					method: 'POST',
					data: {
						allPrise: this.sum,
						goodsId: this.id,
						openId: this.openId
					},
					success: res => {
						console.log(res)
						if(res.statusCode===200){
							uni.showToast({
								title:"购买成功"
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		mounted() {
			// console.log(this.$store.state.goodinfo)
			this.goodinfo = this.$store.state.goodinfo
			// 头部信息
			this.name = this.goodinfo.info.name
			this.desc = this.goodinfo.info.goods_brief
			// 参数列表
			this.attribute = this.goodinfo.attribute
			this.count = this.goodinfo.count
			this.price=this.goodinfo.info.retail_price
			this.imgUrl=this.goodinfo.info.primary_pic_url
			console.log(this.goodinfo)
			let count = this.goodinfo.count
			let price = this.goodinfo.info.retail_price
			this.sum = count * price
		},
		onLoad(option) {
			console.log(option)
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
		background: #f8f8f8;
	}

	.header {
		width: 100%;
		height: 300rpx;
		border-bottom: 4rpx solid #ccc;

		.name {
			font-size: 32rpx;
			font-weight: 600;
			text-align: center;
			padding-top: 30rpx;
		}

		.desc {
			font-size: 26rpx;
			color: #C8C7CC;
			text-align: center;
			margin-top: 30rpx;
		}

		.allPrice {
			color: #f46;
			text-align: center;
			margin-top: 30rpx;
		}
	}

	.buy {
		width: 96%;
		margin-left: 2%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;

		.title {
			font-size: 32rpx;
		}
	}

	.attribute {
		width: 96%;
		margin-left: 2%;
		border-top: 100rpx solid #ccc;

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
	}

	.prups {
		width: 100%;
    position: relative;
		.good {
			display: flex;
			justify-content: flex-start;

			.img {
				width: 40%;
				height: 200rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.sum {
				width: 60%;
				height: 200rpx;
				line-height: 200rpx;
				font-size: 30rpx;
				color: #f46;
			}
		}
		.countControl{
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			font-size: 25rpx;
		}

	}
	.buynow{
	   width: 100%;
	   position: fixed;
	   bottom: 0;
	   button{
		   width: 96%;
		   margin-left: 2%;
		   background: linear-gradient(to right, #ff6034, #ee0a24);
	   }
		}
</style>
