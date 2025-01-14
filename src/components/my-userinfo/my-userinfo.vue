<template>
  <div class="my-userinfo-container">
    <div class="top-box">
      <image :src="userinfo.avatarUrl" mode="scaleToFill" class="avatar" />
      <div class="nickname">{{ userinfo.nickName }}</div>
    </div>

    <div class="panel-list">
      <div class="panel">
        <div class="panel-body">
          <div class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </div>
          <div class="panel-item">
            <span>14</span>
            <span>收藏的商品</span>
          </div>
          <div class="panel-item">
            <span>18</span>
            <span>关注的商品</span>
          </div>
          <div class="panel-item">
            <span>84</span>
            <span>足迹</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">我的订单</div>
        <div class="panel-body">
          <div class="panel-item">
            <image
              src="/static/my-icons/icon1.png"
              mode="scaleToFill"
              class="icon"
            />
            <span>待付款</span>
          </div>
          <div class="panel-item">
            <image
              src="/static/my-icons/icon2.png"
              mode="scaleToFill"
              class="icon"
            />
            <span>待收货</span>
          </div>
          <div class="panel-item">
            <image
              src="/static/my-icons/icon3.png"
              mode="scaleToFill"
              class="icon"
            />
            <span>退款/退货</span>
          </div>
          <div class="panel-item">
            <image
              src="/static/my-icons/icon4.png"
              mode="scaleToFill"
              class="icon"
            />
            <span>全部订单</span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-list-item">
          <span>收货地址</span>
          <uni-icons type="arrowright" color="" size="15" />
        </div>
        <div class="panel-list-item">
          <span>联系客服</span>
          <uni-icons type="arrowright" color="" size="15" />
        </div>
        <div class="panel-list-item" @click="logout">
          <span>退出登录</span>
          <uni-icons type="arrowright" color="" size="15" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "my-userinfo",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("m_user", ["userinfo"]),
  },
  methods: {
    ...mapMutations("m_user", [
      "updateUserInfo",
      "updateToken",
      "updateAddress",
    ]),
    async logout() {
      console.log(this);

      await uni.showModal({
        title: "提示",
        content: "确认退出登录吗？",
        success: (res) => {
          if (res && res.confirm) {
            console.log(this);

            this.updateUserInfo({});
            this.updateToken("");
            this.updateAddress({});
          }
        },
      });
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
.my-userinfo-container {
  height: 100%;
  background-color: #f4f4f4;

  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      display: block;
      width: 180rpx;
      height: 180rpx;
      border-radius: 90rpx;
      border: 4rpx solid white;
      box-shadow: 0 2rpx 10rp black;
    }

    .nickname {
      color: white;
      font-weight: bold;
      font-size: 32rpx;
      margin-top: 20rpx;
    }
  }

  .panel-list {
    padding: 0 20rpx;
    position: relative;
    top: -20rpx;

    .panel {
      background-color: white;
      border-radius: 6rpx;
      margin-bottom: 16rpx;

      .panel-title {
        line-height: 90rpx;
        padding-left: 20rpx;
        font-size: 30rpx;
        border-bottom: 2rpx solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          font-size: 26rpx;
          padding: 20rpx 0;

          .icon {
            width: 70rpx;
            height: 70rpx;
          }
        }
      }

      .panel-list-item {
        height: 90rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30rpx;
        padding: 0 20rpx;
      }
    }
  }
}
</style>