<template>
  <view>
    <view class="search-box">
      <my-search @click="toSearch"> </my-search>
    </view>
    <swiper indicator-dots autoplay circular :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator
          class="swiper-item"
          :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"
        >
          <image :src="item.image_src" mode="scaleToFill" />
        </navigator>
      </swiper-item>
    </swiper>

    <view class="nav-list">
      <view
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
        @click="navClickHandler(item)"
      >
        <image :src="item.image_src" class="nav-img" mode="scaleToFill" />
      </view>
    </view>

    <view class="floor-list">
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <image
          :src="item.floor_title.image_src"
          mode="scaleToFill"
          class="floor-title"
        />

        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image
              :src="item.product_list[0].image_src"
              mode="widthFix"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
            />
          </navigator>
          <view class="right-img-box">
            <navigator
              class="right-img-item"
              v-for="(item2, index2) in item.product_list"
              :key="index2"
              v-if="index2 !== 0"
              :url="item2.url"
            >
              <image
                :src="item2.image_src"
                mode="widthFix"
                :style="{ width: item2.image_width + 'rpx' }"
              />
            </navigator>
          </view>
        </view>
      </view>
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
      swiperList: [],
      navList: [],
      floorList: [],
    };
  },
  computed: {},
  methods: {
    async getSwiperList() {
      const { data: res } = await uni.$http.get(
        "/api/public/v1/home/swiperdata"
      );

      // console.log(res);

      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }

      this.swiperList = res.message;
    },
    async getNavList() {
      const { data: res } = await uni.$http.get("/api/public/v1/home/catitems");

      // console.log(res);

      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }

      this.navList = res.message;
    },
    async getFloorList() {
      const { data: res } = await uni.$http.get(
        "/api/public/v1/home/floordata"
      );

      // console.log(res);

      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }

      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url =
            "/subpkg/goods_list/index?" + prod.navigator_url.split("?")[1];
        });
      });

      this.floorList = res.message;
    },
    navClickHandler(item) {
      if (item.name === "分类") {
        uni.switchTab({
          url: "/pages/cate/cate",
        });
      }
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
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
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

<style scoped lang="scss">
swiper {
  height: 350rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>