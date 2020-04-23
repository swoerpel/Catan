pause = false;

canvas_width = 2400
canvas_height = 2400
catan_params = {
    grid_width: 5,
    grid_height: 5,
}

function setup() {
    canvas = createCanvas(canvas_width, canvas_height);
    canvas.background('black')
    graphic = createGraphics(canvas_width, canvas_height)
    graphic.strokeWeight(0)
    catanGame = new CatanGame(catan_params, canvas_width, canvas_height,graphic)
    catanGame.Initialize()
}
  
function draw() {
    if(!pause){
        catanGame.drawBoard(graphic)
        image(graphic, 0, 0)
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