<template>
  <div class="my-settle-container">
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isFullCheck" />
      <text>全选</text>
    </label>
    <div class="amount-box">
      合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </div>
    <div class="btn-settle">结算({{ checkedCount }})</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "my-settle",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsAmount"]),
    isFullCheck() {
      return this.checkedCount === this.total;
    },
  },
  methods: {
    ...mapMutations("m_cart", ["updateAllGoodsState"]),
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck);
    },
  },
  watch: {},

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
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10rpx;
  font-size: 28rpx;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 100rpx;
    min-width: 200rpx;
    background-color: #c00000;
    color: white;
    line-height: 100rpx;
    text-align: center;
    padding: 0 20rpx;
  }
}
</style>