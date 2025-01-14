export default {

    namespaced: true,

    state: () => ({

        address: JSON.parse(uni.getStorageSync('address') || '{}'),
        token: uni.getStorageSync('token') || '',
        userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
        redirectInfo: null
    }),

    mutations: {

        updateRedirectInfo(state, info) {

            state.redirectInfo = info;
        },
        updateAddress(state, address) {

            // console.log(address);

            state.address = address;
            this.commit('m_user/saveAddressToStorage')
        },
        saveAddressToStorage(state) {

            uni.setStorageSync('address', JSON.stringify(state.address))
        },
        updateUserInfo(state, userinfo) {

            // console.log(userinfo);

            state.userinfo = userinfo;

            this.commit('m_user/saveUserInfoToStorage')
        },
        saveUserInfoToStorage(state) {

            uni.setStorageSync('userinfo', JSON.stringify(state.userinfo));
        },
        updateToken(state, token) {

            // console.log(token);

            state.token = token;
            this.commit('m_user/saveTokenToStorage');
        },
        saveTokenToStorage(state) {

            uni.setStorageSync('token', state.token)
        }
    },

    getters: {
        addstr(state) {
            if (!state.address.provinceName) {
                return "";
            }

            return (
                state.address.provinceName +
                state.address.cityName +
                state.address.countyName +
                state.address.detailInfo
            );
        },

    }
}