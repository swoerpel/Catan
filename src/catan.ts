import { Board } from './board'
import { RuleGenerator } from './rule_generator';

export class Catan {
    graphic: any;
    board: any;
    rules: any;
    constructor(graphic){
        this.graphic =graphic
    }

    Initialize(){
        this.rules = new RuleGenerator('default');
        this.board = new Board(this.graphic, this.rules)
        this.board.Initialize()
    }
}
