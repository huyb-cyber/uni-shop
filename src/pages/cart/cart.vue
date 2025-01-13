<template>
  <div>
    <div class="cart-container" v-if="cart.length !== 0">
      <my-address></my-address>
      <div class="cart-title">
        <uni-icons type="shop" color="" size="18" />
        <text class="cart-title-text">购物车</text>
      </div>
      <uni-swipe-action>
        <block v-for="(goods, index) in cart" :key="index">
          <uni-swipe-action-item
            :right-options="options"
            @click="swipeActionClickHandler(goods)"
          >
            <my-goods
              :goods="goods"
              :show-radio="true"
              :show-num="true"
              @radio-change="radioChangeHandler"
              @num-change="numChangeHandler"
            ></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>

      <my-settle></my-settle>
    </div>
    <div class="empty-cart" v-else>
      <image
        src="/static/cart_empty@2x.png"
        mode="scaleToFill"
        class="empty-img"
      />
      <text class="tip-text">空空如也~</text>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import badgeMix from "@/mixins/tabbar-badge.js";
import { mapState, mapMutations } from "vuex";
export default Vue.extend({
  data() {
    return {
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#c00000",
          },
        },
      ],
    };
  },
  computed: {
    ...mapState("m_cart", ["cart"]),
  },
  methods: {
    ...mapMutations("m_cart", [
      "updateGoodsState",
      "updateGoodsCount",
      "removeGoodsById",
    ]),
    radioChangeHandler(e) {
      // console.log(e);
      this.updateGoodsState(e);
    },
    numChangeHandler(e) {
      // console.log(e);
      this.updateGoodsCount(e);
    },
    swipeActionClickHandler(goods) {
      // console.log(goods);
      this.removeGoodsById(goods.goods_id);
    },
  },
  watch: {},
  mixins: [badgeMix],
  // 页面周期函数--监听页面加载
  onLoad() {
    // this.setBadge();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    // 得等到所有商品都显示完之后才展示数量
  },
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
.cart-title {
  height: 80rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  padding-left: 10rpx;
  border-bottom: 2rpx solid #efefef;

  .cart-title-text {
    margin-left: 20rpx;
  }
}

.cart-container {
  padding-bottom: 100rpx;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 300rpx;

  .empty-img {
    width: 180rpx;
    height: 180rpx;
  }

  .tip-text {
    font-size: 24rpx;
    color: gray;
    margin-top: 30rpx;
  }
}
</style>