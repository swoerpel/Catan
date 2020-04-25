import * as chroma from 'chroma.ts';
import { Tile, Vertex } from './tile.model';
import {params} from './params';
import { Ruleset } from './ruleset.model';

export class Board {
    graphic: any;
    padding_x: number;
    padding_y: number;
    actual_canvas_width: number;
    tile_width: number;
    hex_radius: number;
    tile_height: number;
    vertical_offset: number;
    color_machine: any;
    rules: Ruleset;
    board: Tile[];
    vertices: any[];
    constructor(graphic, rules){
        this.graphic = graphic;
        this.rules = rules;
        this.padding_x = params.canvas.width * 0.05
        this.padding_y = params.canvas.height * 0.05
        this.actual_canvas_width = params.canvas.width - 2 * this.padding_x;
        this.tile_width = this.actual_canvas_width / (params.board.width + 0.5)
        this.hex_radius = Math.sqrt(3) / 2 * (this.tile_width / 1.5)
        this.tile_height = 2 * this.hex_radius
        this.vertical_offset = this.hex_radius / 2
        this.graphic.translate(this.tile_width / 2 + this.padding_x, this.hex_radius + this.padding_y)
        this.color_machine = chroma.scale(params.board.color_palette)
    }

    public Initialize(){
        this.generate_board();
        this.apply_hex_vertices_to_tiles();
        this.generate_all_vertices();
        this.apply_tile_resources();
        this.apply_tile_roll_values();
        this.apply_tile_probability();
    }

    private generate_board(){
        this.board = []
        let index = 0;
        for(let i = 0; i < params.board.width; i++){
            for(let j = 0; j < params.board.height; j++){
                this.board.push(this.generate_tile(index++,i,j))
            }
        }
    }

    private generate_tile(index,i,j): Tile{
        let tile: Tile = {
            id: index, 
            x:i, 
            y:j,
            resource: '',
            color_index: 0,
            origin: {
                x: i * this.tile_width + ((j % 2 != 0) ? this.tile_width / 2 : 0),
                y: j * this.tile_height - (j) * this.hex_radius / 2,
            },
            vertices: [],
            neighbors: [],
            roll_value: 0,
            probability: 0,
            draw_vertices: null,
            draw_tile: null,
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

    private apply_hex_vertices_to_tiles(){
        let adj_tile_dist = Math.ceil(this.get_distance(this.board[0].origin, this.board[1].origin)) + 1
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
        }
    }

    private generate_all_vertices(){
        this.vertices = this.board.reduce((accumulator, tile) => [...accumulator,...tile.vertices], [])
            .map(v => JSON.stringify(v))
        this.vertices = Array.from(new Set(this.vertices)).map((v) => JSON.parse(v))
        console.log('unique vertices',this.vertices)
    }


    private apply_tile_resources(){
        let resources = [];
        for(let i = 0; i < this.board.length; i++){
            resources.push(this.rules.resources[i % this.rules.resources.length])
        }
        this.shuffle(resources)
        this.board.forEach((tile, index) => {
            tile.resource = resources[index];
            tile.color_index = this.rules.resources.indexOf(resources[index])
        })
        console.log(this.board)
    }

    private apply_tile_roll_values(){
        console.log(this.board.length, this.rules)
        this.board.forEach((tile) => {

        })  
    }

    private apply_tile_probability(){

    }

    generate_hex_vertices(origin, n=6): Vertex[]{ 
        let vertices = [];
        for(let i = 1; i <= n; i++){
            vertices.push( {
                x: this.round(origin.x + this.hex_radius * Math.cos((i * 2 * Math.PI + Math.PI) / n)),
                y: this.round(origin.y + this.hex_radius * Math.sin((i * 2 * Math.PI + Math.PI) / n))
            });
        }
        return vertices
    }

    drawBoard() {
        this.board.forEach((tile,index) => {
            this.graphic.stroke(this.color_machine(index / this.board.length).hex())
            this.graphic.fill(this.rules.colors[tile.color_index])
            tile.draw_tile();
            this.graphic.stroke('white')
            this.graphic.strokeWeight(40)
            tile.draw_vertices();
            this.graphic.strokeWeight(0)
        })
    }

    private round(N: number,acc = 100): number{
        return Math.round(N * acc) / acc
    }
    
    private get_distance(p1: Vertex,p2: Vertex): number{
        return this.round(Math.sqrt(Math.pow((p2.x-p1.x),2) + Math.pow((p2.y-p1.y),2)))
    }
    
    private shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}