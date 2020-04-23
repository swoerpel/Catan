interface draw_tile_type { (): void }
interface draw_vertices_type { (): void }
export interface Tile {
  id: number;
  x: number;
  y: number;
  resource_id: number;
  vertices: Vertex[];
  neighbors: Tile[];
  origin: Vertex;
  draw_tile: draw_tile_type;
  draw_vertices: draw_vertices_type;
}

export interface Vertex {
  x: number;
  y: number;
}