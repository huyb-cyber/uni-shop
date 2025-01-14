import { computed, watch } from "vue";
import { mapGetters } from "vuex";

export default {

    computed: {

        ...mapGetters("m_cart", ["total"]),

    },

    onShow() {

        this.setBadge();

    },

    watch: {

        total() {

            const currentPage = getCurrentPages().pop();
            const currentPagePath = currentPage ? currentPage.route : '';
            const tabBarPages = ['pages/home/home', 'pages/cate/cate', 'pages/cart/cart', 'pages/my/my'];  
            if (tabBarPages.includes(currentPagePath)){

                this.setBadge();

            }
        }
    },

    methods: {

        setBadge() {
            uni.setTabBarBadge({
                index: 2,
                text: this.total + "",
            });
        },
    }
}

// // mixins.js 或 vuex 监听相关逻辑
// export default {
//     watch: {
//       total(newTotal) {
//         // 判断当前页面是否是 TabBar 页面
//         const currentPage = getCurrentPages().pop();
//         const currentPagePath = currentPage ? currentPage.route : '';
//         const tabBarPages = ['pages/home/home', 'pages/category/category'];  // TabBar 页面路径列表
  
//         if (tabBarPages.includes(currentPagePath)) {
//           uni.setTabBarBadge({
//             index: 0,  // 假设你设置的是第一个 TabBar 项
//             text: newTotal.toString(), // 显示 total 的数值
//           });
//         }
//       },
//     },
//   };
  