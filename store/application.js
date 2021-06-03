// https://nuxtjs.org/docs/2.x/directory-structure/store

export const state = () => ({
    isDarkTheme: true,
    drawer: { miniVariant: false }
})

export const mutations = {
    SET_DRAK_THEME(state, payload) {
        state.isDarkTheme = payload;
    },

    SET_DRAWER_MINI_VARIANT(state, payload) {
        state.drawer.miniVariant = payload;
    }
}