// https://nuxtjs.org/docs/2.x/directory-structure/store

export const state = () => ({
    user: { id: "", username: "", role: [], avatar: "", permissions: [] },
})

export const mutations = {
    SET_USER(state, payload) {
        state.user = payload;
    },
}