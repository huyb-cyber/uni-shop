<template>
  <div class="goods-item">
    <div class="goods-item-left">
      <image class="goods-pic" :src="goods.goods_small_logo || defaultPic">
      </image>
    </div>
    <div class="goods-item-right">
      <div class="goods-name">{{ goods.goods_name }}</div>
      <div class="goods-info-box">
        <div class="goods-price">￥{{ goods.goods_price | toFixed }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-goods",
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      defaultPic:
        "https://c-ssl.dtstatic.com/uploads/blog/202407/30/q4S8L8J5SxoXxZL.thumb.1000_0.jpg",
    };
  },
  computed: {},
  methods: {},
  watch: {},
  filters: {
    toFixed(num) {
      return Number(num).toFixed(2);
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.goods-item {
  display: flex;
  padding: 20rpx 10rpx;
  border-bottom: 2rpx solid #f0f0f0;

  .goods-item-left {
    margin-right: 10rpx;

    .goods-pic {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    .goods-name {
      font-size: 26rpx;
    }

    .goods-price {
      font-size: 32rpx;
      color: #c00000;
      text-align: right;
    }
  }
}
</style>