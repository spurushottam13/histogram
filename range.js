export const Range =  (function () {
    return {
        range: {},
        init: function (variance = 100, lenght = 10) {
            this.range = {}
            for (let i = 0; i < lenght; i++) {
                this.range[`${i * variance}-${(i * variance) + variance}`] = 0
            }
            this.range[`${((lenght - 1) * variance) + variance}-Infinity`] = 0
        },
        updateCount: function (value) {
            for (let item in this.range) {
                const [l, h] = item.split("-").map(i => (parseFloat(i)))
                if (value >= l && value < h) {
                    this.range[item] = this.range[item] + 1
                    break
                }
            }
        },
        get: function(){return this.range}
    }
})()