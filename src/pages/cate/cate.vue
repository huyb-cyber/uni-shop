<template>
  <view>
    <my-search @click="toSearch"></my-search>
    <view class="scroll-view-container">
      <scroll-view
        scroll-y
        class="left-scroll-view"
        :style="{ height: wh + 'px' }"
      >
        <block v-for="(item, i) in cateList" :key="i">
          <view
            :class="['left-scroll-view-item', i === active ? 'active' : '']"
            @click="activeChanged(i)"
          >
            {{ item.cat_name }}
          </view>
        </block>
      </scroll-view>

      <scroll-view
        scroll-y
        class="right-scroll-view"
        :style="{ height: wh + 'px' }"
        :scroll-top="scrollTop"
      >
        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
          <view class="cate-lv2-title">/ {{ item2.cat_name }} /</view>
          <view class="cate-lv3-list">
            <view
              class="cate-lv3-item"
              v-for="(item3, i3) in item2.children"
              :key="i3"
              @click="goToGoodsList(item3)"
            >
              <image :src="item3.cat_icon" mode="scaleToFill" />
              <text>
                {{ item3.cat_name }}
              </text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import badgeMix from "@/mixins/tabbar-badge.js";

export default Vue.extend({
  components: {},
  data() {
    return {
      wh: 0,
      cateList: [],
      active: 0,
      cateLevel2: [],
      scrollTop: 0,
    };
  },
  computed: {},
  methods: {
    async getCateList() {
      const { data: res } = await uni.$http.get("/api/public/v1/categories");

      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }

      this.cateList = res.message;
      this.cateLevel2 = res.message[0].children;
    },
    activeChanged(i) {
      this.active = i;
      this.cateLevel2 = this.cateList[i].children;
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
    },
    goToGoodsList(item) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?cid=" + item.cat_id,
      });
    },
    toSearch() {
      uni.navigateTo({
        url: "/subpkg/search/search",
      });
    },
  },
  watch: {},
  mixins: [badgeMix],

  // 页面周期函数--监听页面加载
  onLoad() {
    const sysInfo = uni.getSystemInfoSync();

    this.wh = sysInfo.windowHeight - 50;
    this.getCateList();
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
});
</script>

<style lang="scss" scoped>
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 240rpx;

    .left-scroll-view-item {
      line-height: 120rpx;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 24rpx;

      &.active {
        background-color: #ffffff;
        position: relative;

        &::before {
          content: "  ";
          display: block;
          width: 6rpx;
          height: 60rpx;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  .cate-lv2-title {
    font-size: 24rpx;
    font-weight: bold;
    text-align: center;
    padding: 30rpx 0;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 120rpx;
        height: 120rpx;
      }

      text {
        font-size: 24rpx;
      }
    }
  }
}
</style>