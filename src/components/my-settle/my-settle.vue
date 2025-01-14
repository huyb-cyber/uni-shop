<template>
  <div class="my-settle-container">
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isFullCheck" />
      <text>全选</text>
    </label>
    <div class="amount-box">
      合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </div>
    <div class="btn-settle" @click="settlement">结算({{ checkedCount }})</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "my-settle",
  props: {},
  data() {
    return {
      seconds: 3,
      timer: null,
    };
  },
  computed: {
    ...mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsAmount"]),
    ...mapGetters("m_user", ["addstr"]),
    ...mapState("m_user", ["token"]),
    ...mapState("m_cart", ["cart"]),
    isFullCheck() {
      return this.checkedCount === this.total;
    },
  },
  methods: {
    ...mapMutations("m_cart", ["updateAllGoodsState"]),
    ...mapMutations("m_user", ["updateRedirectInfo"]),
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck);
    },
    showTips(n) {
      uni.showToast({
        icon: "none",
        title: "请登录后再结算！" + n + " 秒后自动跳转到登录页",
        mask: true,
        duration: 1500,
      });
    },
    settlement() {
      if (!this.checkedCount) {
        return uni.$showMsg("请选择要结算的商品!");
      }

      if (!this.addstr) {
        return uni.$showMsg("请选择收货地址！");
      }

      // if (!this.token) {
      //   return uni.$showMsg("请先登录！");
      // }
      if (!this.token) {
        return this.delayNavigate();
      }

      this.payOrder();
    },
    async payOrder() {
      const orderInfo = {
        // order_price: this.checkedGoodsAmount,
        order_price: 0.01,
        consignee_addr: this.addstr,
        goods: this.cart
          .filter((x) => x.goods_sate)
          .map((x) => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price,
          })),
      };

      const { data: res } = await uni.$http.post(
        "/api/public/v1/my/orders/create",
        orderInfo
      );

      if (res.meta.status !== 200) {
        return uni.$showMsg("创建订单失败！");
      }

      const orderNumber = res.message.order_number;

      const { data: res2 } = await uni.$http.post(
        "/api/public/v1/my/orders/req_unifiedorder",
        { order_number: orderNumber }
      );

      if (res2.meta.status !== 200) {
        return uni.$showError("预付订单生成失败！");
      }

      const payInfo = res2.message.pay;
      console.log(res2);

      const res3 = await uni.requestPayment(payInfo); //这一步如果支付成功，微信平台会向后台系统发送支付成功的通知，这样后台就知道了，这下用户就可以向后台查询支付结果了

      // console.log(res3);

      if (res3.errMsg) {
        return uni.$showMsg("订单未支付！");
      }

      const { data: res4 } = await uni.$http.post(
        "/api/public/v1/my/orders/chkOrder",
        {
          order_number: orderNumber,
        }
      );

      if (res4.meta.status !== 200) {
        return uni.$showMsg("订单未支付！");
      }

      uni.showToast({
        title: "支付完成",
        icon: "success",
      });
    },
    delayNavigate() {
      this.seconds = 3;
      this.showTips(this.seconds);

      this.timer = setInterval(() => {
        this.seconds--;

        if (this.seconds <= 0) {
          clearInterval(this.timer);
          uni.switchTab({
            url: "/pages/my/my",
            success: () => {
              this.updateRedirectInfo({
                openType: "switchTab",
                from: "/pages/cart/cart",
              });
            },
          });

          return;
        }
        this.showTips(this.seconds);
      }, 1000);
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