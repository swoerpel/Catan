import numpy as np 
import matplotlib.pyplot as plt



rows = 5
cols = 10
index = 0
hex_grid = []
for i in range(rows):
    row = []
    for j in range(cols):
        print(i,j)
        row.append({
            index: index,
            'x': i,
            'y': j,
            'adj_tiles': []
        })
        index += 1
    hex_grid.append(row)
# print('hex grid',hex_grid)

print(hex_grid[0][1])
hex_grid[0][0]['adj_tiles'] = [0]
hex_grid[1][0]['adj_tiles'] = [1]
hex_grid[2][0]['adj_tiles'] = [2]
hex_grid[3][0]['adj_tiles'] = [3]
hex_grid[4][0]['adj_tiles'] = [-1]

hex_grid[0][1]['adj_tiles'] = [0]
hex_grid[1][1]['adj_tiles'] = [0,1]
hex_grid[2][1]['adj_tiles'] = [1,2]
hex_grid[3][1]['adj_tiles'] = [2,3]
hex_grid[4][1]['adj_tiles'] = [3]

hex_grid[0][2]['adj_tiles'] = [0]
hex_grid[1][2]['adj_tiles'] = [0,1,4]
hex_grid[2][2]['adj_tiles'] = [1,2,5]
hex_grid[3][2]['adj_tiles'] = [2,3,6]
hex_grid[4][2]['adj_tiles'] = [3,7]

hex_grid[0][3]['adj_tiles'] = [0,4]
hex_grid[1][3]['adj_tiles'] = [1,4,5]
hex_grid[2][3]['adj_tiles'] = [2,5,6]
hex_grid[3][3]['adj_tiles'] = [3,6,7]
hex_grid[4][3]['adj_tiles'] = [7]

hex_grid[0][4]['adj_tiles'] = [4,8]
hex_grid[1][4]['adj_tiles'] = [4,5,9]
hex_grid[2][4]['adj_tiles'] = [4,6,10]
hex_grid[3][4]['adj_tiles'] = [6,7,11]
hex_grid[4][4]['adj_tiles'] = [7]

hex_grid[0][5]['adj_tiles'] = [8]
hex_grid[1][5]['adj_tiles'] = [4,8,9]
hex_grid[2][5]['adj_tiles'] = [5,9,10]
hex_grid[3][5]['adj_tiles'] = [6,10,11]
hex_grid[4][5]['adj_tiles'] = [7,11]

hex_grid[0][6]['adj_tiles'] = [8]
hex_grid[1][6]['adj_tiles'] = [8,9,12]
hex_grid[2][6]['adj_tiles'] = [9,10,13]
hex_grid[3][6]['adj_tiles'] = [10,11,14]
hex_grid[4][6]['adj_tiles'] = [11,15]

hex_grid[0][7]['adj_tiles'] = [8,12]
hex_grid[1][7]['adj_tiles'] = [9,12,13]
hex_grid[2][7]['adj_tiles'] = [10,13,14]
hex_grid[3][7]['adj_tiles'] = [11,14,15]
hex_grid[4][7]['adj_tiles'] = [15]

hex_grid[0][8]['adj_tiles'] = [12]
hex_grid[1][8]['adj_tiles'] = [12,13]
hex_grid[2][8]['adj_tiles'] = [13,14]
hex_grid[3][8]['adj_tiles'] = [14,15]
hex_grid[4][8]['adj_tiles'] = [15]

hex_grid[0][9]['adj_tiles'] = [-1]
hex_grid[1][9]['adj_tiles'] = [12]
hex_grid[2][9]['adj_tiles'] = [13]
hex_grid[3][9]['adj_tiles'] = [14]
hex_grid[4][9]['adj_tiles'] = [15]

# print('HEXGRID',hex_grid)


for row in hex_grid:
    for col in row:
        print(row,'-CHEX-',col)

fig = plt.figure()


