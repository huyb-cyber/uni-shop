<template>
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <swiper indicator-dots autoplay circular interval="3000" duration="1000">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" mode="scaleToFill" @click="preview(i)" />
      </swiper-item>
    </swiper>

    <div class="goods-info-box">
      <div class="price">￥{{ goods_info.goods_price }}</div>
      <div class="goods-info-body">
        <div class="goods-name">
          {{ goods_info.goods_name }}
        </div>
        <div class="favi">
          <uni-icons type="star" color="gray" size="18" />
          <text>收藏</text>
        </div>
      </div>
      <div class="yf">快递：免运费</div>
    </div>

    <rich-text :nodes="goods_info.goods_introduce"></rich-text>

    <div class="goods-nav">
      <!-- 这里的click并不是原生DOM事件，而是自定义事件，要在uni-goods-nav组件里进行触发，点击图标会触发他们的点击事件，调用对应的回调，回调里面触发这个自定义事件 -->
      <uni-goods-nav
        :options="options"
        :buttonGroup="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
        :fill="true"
      />
    </div>
  </view>
</template>

<script>
import Vue from "vue";
import { uniGoodsNav } from "@dcloudio/uni-ui";
export default Vue.extend({
  components: {
    uniGoodsNav,
  },
  data() {
    return {
      goods_info: {},
      options: [
        {
          icon: "shop",
          text: "店铺",
        },
        {
          icon: "cart",
          text: "购物车",
          info: 2,
        },
      ],
      buttonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "#ff0000",
          color: "#fff",
        },
        {
          text: "立即购买",
          backgroundColor: "#ffa200",
          color: "#fff",
        },
      ],
    };
  },
  computed: {},
  methods: {
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get("/api/public/v1/goods/detail", {
        goods_id,
      });

      if (res.meta.status !== 200) {
        return uni.$showMsg();
      }

      res.message.goods_introduce = res.message.goods_introduce
        .replace(/<img/g, '<img style="display: block;"')
        .replace(/webp/g, "jpg");

      this.goods_info = res.message;
    },
    preview(i) {
      uni.previewImage({
        current: i,
        urls: this.goods_info.pics.map((x) => x.pics_big),
      });
    },
    onClick(e) {
      // console.log(e);
      if (e.content.text === "购物车") {
        uni.switchTab({
          url: "/pages/cart/cart",
        });
      }
    },
    // buttonClick(e) {
    //   console.log(e);
    //   this.options[2].info++;
    // },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    const goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
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
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.goods-info-box {
  padding: 20rpx;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 36rpx;
    margin: 20rpx 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
      padding-right: 20rpx;
    }

    .favi {
      width: 240rpx;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  .yf {
    margin: 20rpx 0;
    font-size: 24rpx;
    color: gray;
  }
}

.goods-detail-container {
  padding-bottom: 100rpx;
}

.goods-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>