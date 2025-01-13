<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" />
    </view>

    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view
        class="sugg-item"
        v-for="(item, i) in searchResults"
        :key="item.goods_id"
        @click="toDetail(item.goods_id)"
      >
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" color="" size="16" />
      </view>
    </view>

    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" color="" size="20" @click="cleanHistory" />
      </view>
      <view class="history-list">
        <uni-tag
          :text="item"
          v-for="(item, i) in historys"
          :key="i"
          inverted="true"
          @click="toGoodsList(item)"
          customStyle="display: block; margin-top: 10px; margin-right: 10px;height: 30rpx; font-size: 30rpx; line-height: 30rpx; border-radius: 8rpx"
        />
      </view>
    </view>
  </view>
</template>

<script>
// import { uniSearchBar } from "@dcloudio/uni-ui";
export default {
  // components: { uniSearchBar },
  data() {
    return {
      timer: null,
      kw: "",
      searchResults: [],
      historyList: [],
    };
  },
  computed: {
    historys() {
      return [...this.historyList].reverse();
    },
  },
  methods: {
    async getSearchList() {
      if (this.kw === "") {
        this.searchResults = [];
        return;
      }

      const { data: res } = await uni.$http.get(
        "/api/public/v1/goods/qsearch",
        { query: this.kw }
      );

      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }

      this.searchResults = res.message;
      this.saveSearchHistory();
    },
    saveSearchHistory() {
      // this.historyList.push(this.kw);
      const set = new Set(this.historyList);
      set.delete(this.kw);
      set.add(this.kw);
      this.historyList = Array.from(set);
      uni.setStorageSync("kw", JSON.stringify(this.historyList));
      // console.log(JSON.stringify(this.historyList));
    },
    input(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.kw = e;
        this.getSearchList();
        // console.log(this.kw);
      }, 500);
    },
    toDetail(id) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + id,
      });
    },
    cleanHistory() {
      this.historyList = [];
      uni.setStorageSync("kw", []);
    },
    toGoodsList(item) {
      uni.navigateTo({ url: "/subpkg/goods_list/index?query=" + item });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync("kw") || "[]");
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
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>




<style lang="scss" scoped>
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 10rpx;
  .sugg-item {
    font-size: 24rpx;
    padding: 26rpx 0;
    border-bottom: 2rpx solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 6rpx;
    }
  }
}

.history-box {
  padding: 0 10rpx;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    font-size: 30rpx;
    border-bottom: 2rpx solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    // 因为scoped的缘故，所以不对
    // .uni-tag {
    //   display: block;
    //   margin-top: 10rpx;
    //   margin-right: 10rpx;
    // }
  }
}
</style>