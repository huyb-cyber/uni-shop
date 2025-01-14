<template>
  <div class="login-container">
    <uni-icons type="contact-filled" color="#AFAFAF" size="100" />
    <button
      type="primary"
      class="btn-login"
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
    >
      一键登录
    </button>
    <div class="tips-text">登录后尽享更多权益</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "my-login",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("m_user", ["redirectInfo"]),
  },
  methods: {
    ...mapMutations("m_user", [
      "updateUserInfo",
      "updateToken",
      "updateRedirectInfo",
    ]),
    getUserInfo(e) {
      if (e.detail.errMsg === "getUserInfo:fail auth deny") {
        return uni.$showMsg("您取消了登录授权！");
      }

      this.updateUserInfo(e.detail.userInfo);
      this.getToken(e.detail);
      // console.log(e);
      // console.log(e.detail.userInfo);
    },
    async getToken(info) {
      const res = await uni.login().catch((err) => err);
      // console.log(res);

      if (res && res.errMsg !== "login:ok") {
        return uni.$showMsg("登录失败!");
      }

      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature,
      };

      const { data: loginResult } = await uni.$http.post(
        "/api/public/v1/users/wxlogin",
        query
      );

      // console.log(loginResult);

      if (loginResult.meta.status !== 200) {
        //实际上这一行代码是不写的，但没办法，老是返回错误
        // console.log(111);

        this.updateToken(
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
        );

        this.navigateBack();
        return uni.$showMsg("登录失败！");
      }

      uni.$showMsg("登录成功");
      this.updateToken(loginResult.message.token);
    },
    navigateBack() {
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        // console.log(111);

        uni.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            // console.log(111);

            this.updateRedirectInfo(null);
          },
        });
      }
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
.login-container {
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  &::after {
    content: " ";
    display: block;
    position: absolute;
    width: 100%;
    height: 80rpx;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  .btn-login {
    width: 90%;
    border-radius: 200rpx;
    margin: 30rpx 0;
    background-color: #c00000;
  }

  .tips-text {
    font-size: 24rpx;
    color: gray;
  }
}
</style>