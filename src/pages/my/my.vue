<template>
  <div class="my-container">
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </div>
</template>

<script>
import Vue from "vue";
import badgeMix from "@/mixins/tabbar-badge.js";
import { mapState } from "vuex";
export default Vue.extend({
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("m_user", ["token"]),
  },
  methods: {},
  watch: {},
  mixins: [badgeMix],

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
});
</script>

<style lang="scss"scoped>
.my-container {
  height: 100%;
}
</style>