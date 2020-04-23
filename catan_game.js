

class CatanGame {
    constructor(params, canvas_width, canvas_height,graphic){
        this.params = params
        this.padding_x = canvas_width * 0.05
        this.padding_y = canvas_height * 0.05
        this.canvas_width = canvas_width - 2 * this.padding_x;
        this.canvas_height = canvas_height - 2 * this.padding_y;
        this.graphic = graphic;
        this.tile_width = this.canvas_width / (params.grid_width + 0.5)
        this.hex_radius = Math.sqrt(3) / 2 * (this.tile_width / 1.5)
        this.tile_height = 2 * this.hex_radius
        this.vertical_offset = this.hex_radius / 2
        console.log('vertical_offset',this.vertical_offset)
        this.graphic.translate(this.tile_width / 2 + this.padding_x, this.hex_radius + this.padding_y)
        this.color_machine = chroma.scale('spectral')
    }

    Initialize(){
        this.generate_board();
        this.apply_hex_vertices_to_tiles();
        this.generate_all_vertices();
    }


    generate_board(){
        this.board = []
        let index = 0;
        for(let i = 0; i < this.params.grid_width; i++){
            for(let j = 0; j < this.params.grid_height; j++){
                this.board.push(this.generate_tile(index++,i,j))
            }
        }
        console.log(this.board)
    }

    apply_hex_vertices_to_tiles(){
        let adj_tile_dist = Math.ceil(this.get_distance(this.board[0].origin, this.board[1].origin)) + 1
        console.log('adj_tile_dist',adj_tile_dist)
        for(let i = 0; i < this.board.length; i++){
            let nearest_tiles = []
            for(let j = 0; j < this.board.length; j++){
                nearest_tiles.push({
                    tile: this.board[j],
                    distance: this.get_distance(this.board[i].origin, this.board[j].origin)
                })
            }
            nearest_tiles = nearest_tiles.sort((ta,tb) => ta.distance - tb.distance)
            nearest_tiles = nearest_tiles.filter((tile) => tile.distance != 0)
            nearest_tiles = nearest_tiles.filter((tile) => tile.distance < adj_tile_dist)
            this.board[i].neighbors = nearest_tiles.slice(0,6)
            // console.log('nearest_tiles', this.board[i].neighbors)
        }
    }

    generate_all_vertices(){
        this.vertices = this.board.reduce((accumulator, tile) => [...accumulator,...tile.vertices], [])
            .map(v => JSON.stringify(v))
        this.vertices = [...new Set(this.vertices)].map((v) => JSON.parse(v))
        console.log(this.vertices)
    }

    generate_tile(index,i,j){
        let tile = {
            id: index, 
            x:i, 
            y:j,
            origin: {
                x: i * this.tile_width + ((j % 2 != 0) ? this.tile_width /2 : 0),
                y: j * this.tile_height - (j) * this.vertical_offset,
            },
            vertices: [],
            neighbors: [],
        }
        tile.vertices = this.generate_hex_vertices(tile.origin)
        tile.draw_vertices = () => tile.vertices.forEach((v)=>this.graphic.point(v.x,v.y))
        tile.draw_tile = () => {
            this.graphic.beginShape();
            tile.vertices.forEach((v)=>this.graphic.vertex(v.x,v.y))
            this.graphic.vertex(tile.vertices[0].x,tile.vertices[0].y)
            this.graphic.endShape();
            let text_size = 100
            this.graphic.textSize(text_size)
            this.graphic.fill('black')
            this.graphic.text(tile.id.toString(),tile.origin.x - text_size / 2, tile.origin.y - text_size / 2,text_size, text_size)
        }
        return tile;
    }

    get_distance(p1,p2){
        return this.round(Math.sqrt(Math.pow((p2.x-p1.x),2) + Math.pow((p2.y-p1.y),2)))
    }




    generate_hex_vertices(origin, n=6){ 
        let vertices = [];
        for(let i = 1; i <= n; i++){
            vertices.push( {
                x: this.round(origin.x + this.hex_radius * Math.cos((i * 2 * Math.PI + Math.PI) / n)),
                y: this.round(origin.y + this.hex_radius * Math.sin((i * 2 * Math.PI + Math.PI) / n))
            });
        }
        return vertices
    }

    drawBoard(){
        this.board.forEach((tile,index) => {
            this.graphic.stroke(this.color_machine(index / this.board.length).hex())
            this.graphic.fill(this.color_machine(index / this.board.length).hex())
            tile.draw_tile();
            this.graphic.stroke('white')
            this.graphic.strokeWeight(40)
            tile.draw_vertices();
            this.graphic.strokeWeight(0)
        })
    }

    round(N,acc = 100){
        return Math.round(N * acc) / acc
    }

    
}