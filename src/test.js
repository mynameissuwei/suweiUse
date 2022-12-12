function curry(fn) {
    let length = fn.length 
    let args = []

    function calc(...newArgs) {
        args = [
            ...args,
            ...newArgs
        ]
        console.log(args.length,length,'newArgs')

        if(args.length < length) {
            return calc 
        } else {
            return fn.apply(this,args.slice(0,length))
        }
    }

    return calc 
}

function add(a,b,c) {
    return a + b + c
}
let curryAdd = curry(add)
console.log(curryAdd(1)(2)(3));
// console.log(curryAdd(1)(2)(3));