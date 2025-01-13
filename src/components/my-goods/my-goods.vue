<template>
  <div class="goods-item">
    <div class="goods-item-left">
      <radio
        :checked="goods.goods_state"
        color="#c00000"
        v-if="showRadio"
        @click="radioClickHandler"
      />
      <image class="goods-pic" :src="goods.goods_small_logo || defaultPic">
      </image>
    </div>
    <div class="goods-item-right">
      <div class="goods-name">{{ goods.goods_name }}</div>
      <div class="goods-info-box">
        <div class="goods-price">￥{{ goods.goods_price | toFixed }}</div>
        <uni-number-box
          :min="1"
          :value="goods.goods_count"
          v-if="showNum"
          @change="numChangeHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { uniNumberBox } from "@dcloudio/uni-ui";
export default {
  name: "my-goods",
  // components: { uniNumberBox },
  props: {
    goods: {
      type: Object,
      default: {},
    },
    showRadio: {
      type: Boolean,
      default: false,
    },
    showNum: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultPic:
        "https://c-ssl.dtstatic.com/uploads/blog/202407/30/q4S8L8J5SxoXxZL.thumb.1000_0.jpg",
    };
  },
  computed: {},
  methods: {
    radioClickHandler() {
      // 每次点击radio组件时，传递当前goods_state的取反，父组件的处理函数接收到数据后，commit仓库中的更新goods_state的函数，并把数据传过去，仓库更新cart数组后并把它存到浏览器的本地存储，由于radio组件的checked选项由goods_state动态绑定，因而每点击一次radio，goods_state就取反，也就改变了radio的checked选项
      this.$emit("radio-change", {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state,
      });
    },
    numChangeHandler(val) {
      // console.log(val);

      this.$emit("num-change", {
        goods_id: this.goods.goods_id,
        // 保证val永远是number类型数据
        goods_count: +val,
      });
    },
  },
  watch: {},
  filters: {
    toFixed(num) {
      return Number(num).toFixed(2);
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
.goods-item {
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 20rpx 10rpx;
  border-bottom: 2rpx solid #f0f0f0;

  .goods-item-left {
    margin-right: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goods-pic {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    .goods-name {
      font-size: 26rpx;
    }

    .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-price {
        font-size: 32rpx;
        color: #c00000;
      }
    }
  }
}
</style>