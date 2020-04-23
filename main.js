var pause = false;
var catan;
function setup() {
    canvas = createCanvas(params.canvas.width, params.canvas.height);
    canvas.background('black')
    catan = new Catan()
    catan.Initialize();
}
  
function draw() {
    if(!pause){
        catan.board.drawBoard()
        image(catan.graphic, 0, 0)
    }
}

function keyPressed(keyPressed){
    console.log(keyPressed)
    if(keyPressed.key === 'Space')
      pause = !pause
    if(keyPressed.key === 'ArrowRight')
      params.board.width += 1;
    if(keyPressed.key === 'ArrowLeft')
      params.board.width -= 1;
    if(keyPressed.key === 'ArrowUp')
      params.board.height += 1;
    if(keyPressed.key === 'ArrowDown')
      params.board.height -= 1;
    setup();
}