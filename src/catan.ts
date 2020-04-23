import { Board } from './board'
import {params} from './params';

export class Catan {
    graphic: any;
    board: any;
    constructor(graphic){
        this.graphic =graphic
    }

    Initialize(){
        this.graphic.strokeWeight(0)
        this.board = new Board(this.graphic)
        this.board.Initialize()
    }
}
