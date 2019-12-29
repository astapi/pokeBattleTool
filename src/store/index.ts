export const state = () => ({
  isLoading: false
})

export const mutations = {
  setIsLoading(state: any, isLoading: boolean) {
    state.isLoading = isLoading
  }
}