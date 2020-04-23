
class Catan {
    constructor(){
        this.graphic = createGraphics(params.canvas.width, params.canvas.height)
    }

    Initialize(){
        this.graphic.strokeWeight(0)
        this.board = new Board(this.graphic)
        this.board.Initialize()
    }
}
