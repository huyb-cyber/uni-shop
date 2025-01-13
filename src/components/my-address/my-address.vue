<template>
  <div class="my-address-container">
    <div class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button
        type="primary"
        size="mini"
        class="btnChooseAddress"
        @click="chooseAddress"
      >
        请选择收货地址+
      </button>
    </div>

    <div class="address-info-box" v-else @click="chooseAddress">
      <div class="row1">
        <div class="row1-left">
          <div class="username">
            收货人：<text>{{ address.userName }}</text>
          </div>
        </div>
        <div class="row1-right">
          <div class="phone">
            电话：<text>{{ address.telNumber }}</text>
            <uni-icons type="arrowright" color="" size="16" />
          </div>
        </div>
      </div>
      <div class="row2">
        <div class="row2-left">收货地址：</div>
        <div class="row2-right">{{ addstr }}</div>
      </div>
    </div>

    <image
      src="/static/cart_border@2x.png"
      mode="scaleToFill"
      class="address-border"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "my-address",
  props: {},
  data() {
    return {
      // address: {},
    };
  },
  computed: {
    ...mapState("m_user", ["address"]),
    ...mapGetters("m_user", ["addstr"]),
  },
  methods: {
    ...mapMutations("m_user", ["updateAddress"]),
    async chooseAddress() {
      const res = await uni.chooseAddress().catch((err) => err);
      // console.log(res);

      if (res && res.errMsg === "chooseAddress:ok") {
        // this.address = res;
        this.updateAddress(res);
      }

      // const [err, succ] = await uni.chooseAddress().catch((err) => err);

      // if (err === null && succ.errMsg === "chooseAddress:ok") {
      //   // this.address = succ;
      //   this.updateAddress(succ);
      // }
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
.address-border {
  display: block;
  width: 100%;
  height: 10rpx;
}
.address-choose-box {
  height: 180rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.address-info-box {
  font-size: 24rpx;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rpx;

  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 10rpx;
      }
    }
  }

  .row2 {
    display: flex;
    align-items: center;
    margin-top: 20rpx;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>