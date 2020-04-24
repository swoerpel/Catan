import * as p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import {Catan} from './catan'
import {params} from './params'
var sketch = function (p: p5) {
  var pause = false;
  var catan;
  var canvas;

  p.setup = function () {
    canvas = p.createCanvas(params.canvas.width, params.canvas.height);
    canvas.background('black')
    catan = new Catan(p.createGraphics(params.canvas.width, params.canvas.height))
    catan.Initialize();
  }

  p.draw = function () {
     if(!pause){
        catan.board.drawBoard()
        p.image(catan.graphic, 0, 0)
    }
  }

  p.keyPressed = function (event: KeyboardEvent):void{
    console.log(event)
    switch(event.key){
      case "ArrowRight": params.board.width++; break;
      case "ArrowLeft": params.board.width--; break;
      case "ArrowUp": params.board.height++; break;
      case "ArrowDown": params.board.height--; break;
    }
    p.setup();
  }
}

new p5(sketch)
