export default {
    saveUserInfo: (state,userInfo) =>{
        localStorage.setItem('account', userInfo.account)
        localStorage.setItem('password', userInfo.password)
    },
    changeTabState(state,tabState){
        state.tabState = tabState
    },
    saveType(state,type){
        state.memoryType= type
    },
    contentType(state,type){
        state.contentType = type
    }
}