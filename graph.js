export const Graph = (function () {
    return {
        usePercentage: false,
        // Draw single bar over the canvas
        drawBar: function ({ startX, label = "500-1000", endY }) {
            this.ctx.save();
            this.ctx.fillStyle = "#78909c";
            this.ctx.font = "bold 16px Arial";
            this.ctx.fillText(label, startX - (5 * label.length), this.max + this.topPadding);
            this.ctx.fillText(endY, startX - 5 * String(endY).length, this.max - (endY - this.topPadding + 30));
            this.ctx.lineWidth = this.barWidth
            this.ctx.strokeStyle = this.barColor;
            this.ctx.beginPath();
            this.ctx.moveTo(startX, this.max + this.topPadding - 20);
            this.ctx.lineTo(startX, this.max - (endY - this.topPadding + 20));
            this.ctx.stroke();
            this.ctx.restore();
        },
        // Reset the Canvas
        reset: function(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        // Inject the Canvas into the DOm
        init: function ({ hostEL }) {
            this.canvas = document.createElement('canvas')
            this.canvas.id = "graph-area"
            hostEL.append(this.canvas)
            this.ctx = this.canvas.getContext("2d")
        },
        // Render the data with label
        render: function ({ data,label, margin, topPadding = 50, width, color }) {
            this.max = Math.max(...data)
            if (this.max > 500) {
                this.usePercentage = true
                this.max = 500
            }
            this.topPadding = topPadding
            this.barWidth = width
            this.barColor = color
            this.canvas.height = this.max + this.topPadding
            this.canvas.width = (width + margin) * data.length + this.topPadding
            data.forEach((value, index) => {
                this.drawBar({
                    startX: (width + margin) * index + margin + width,
                    label: label[index],
                    endY: this.usePercentage ? value / Math.max(...data) * 500 : value
                })
            });
        }
    }
})()