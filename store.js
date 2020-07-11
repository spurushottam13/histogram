export const Store = (function(){
    return {
        variance: 200,
        length: 10,
        set: function(key, value){return this[key] = value},
        get: function(key){return this[key]}
    }
})()
