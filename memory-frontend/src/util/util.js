export function debounce(func,wait){
    let time = 0
    return function (...args) {
        if(time){
            clearTimeout(time)
        }
        time = setTimeout(() =>{
            func.apply(this,args)
        },wait)
    }
}