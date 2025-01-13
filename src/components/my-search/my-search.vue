<template>
  <view class="my-search-container" :style="{ 'background-color': bgcolor }">
    <view
      class="my-search-box"
      :style="{ 'border-radius': radius + 'px' }"
      @click="searchBoxHandler"
    >
      <uni-icons type="search" color="" size="17" />
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
// import { uniIcons } from "@dcloudio/uni-ui";
export default {
  name: "my-search",
  // components: { uniIcons },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    searchBoxHandler() {
      this.$emit("click");
    },
  },
  watch: {},
  props: {
    bgcolor: {
      type: String,
      default: "#C00000",
    },
    radius: {
      type: Number,
      default: 15,
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
.my-search-container {
  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
}
.my-search-box {
  height: 72rpx;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 30rpx;
    margin-left: 10rpx;
  }
}
</style>