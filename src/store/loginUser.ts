export const state = () => ({
  userUid: '',
})

export const mutations = {
  setUserUid(state: any, userUid: string) {
    state.userUid = userUid;
  }
}