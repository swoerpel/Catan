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
        catan_params.grid_width+=1
    if(keyPressed.key === 'ArrowLeft')
        catan_params.grid_width-=1
    if(keyPressed.key === 'ArrowUp')
        catan_params.grid_height+=1
    if(keyPressed.key === 'ArrowDown')
        catan_params.grid_height-=1
    setup();
}