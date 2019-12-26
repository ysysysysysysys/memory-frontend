export default {
    saveUserInfo({commit},user){
        commit('saveUserInfo',user)
    },
    changeTabState({commit},tabState){
        commit('changeTabState',tabState)
    },
    saveToken(context,ruleForm){
        console.log(ruleForm);
        localStorage.setItem('account', ruleForm.account)
        localStorage.setItem('password', ruleForm.password)
        localStorage.setItem('token',ruleForm.token)
    },
    saveMemoryType({commit},type){
        commit('saveType',type)
    }
}