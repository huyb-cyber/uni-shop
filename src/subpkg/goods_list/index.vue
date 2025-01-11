<template>
  <div class="goods-list">
    <view v-for="(goods, i) in goodsList" :key="i" @click="toDetail(goods)">
      <my-goods :goods="goods" />
    </view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      queryObj: {
        query: "",
        cId: "",
        pageNum: 1,
        pageSize: 10,
      },
      goodsList: [],
      total: 0,
      isLoading: false,
    };
  },
  computed: {},
  methods: {
    toDetail(good) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + good.goods_id,
      });
    },
    async getGoodsList(cb) {
      this.isLoading = true;

      const { data: res } = await uni.$http.get(
        "/api/public/v1/goods/search",
        this.queryObj
      );

      this.isLoading = false;

      cb && cb();
      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }

      this.goodsList = [...this.goodsList, ...res.message.goods];
      this.total = res.message.total;
    },
  },
  watch: {},
  onReachBottom() {
    if (this.queryObj.pageNum * this.queryObj.pageSize >= this.total) {
      return uni.$$showMsg("数据加载完毕");
    }
    if (this.isLoading) {
      return;
    }

    this.queryObj.pageNum++;
    this.getGoodsList();
  },

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.queryObj.query = options.query || "";
    this.queryObj.cId = options.cid || "";
    this.getGoodsList();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    this.queryObj.pageNum = 1;
    this.total = 0;
    this.isLoading = false;
    this.goodsList = [];
    this.getGoodsList(() => uni.stopPullDownRefresh());
  },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss" scoped>
</style>