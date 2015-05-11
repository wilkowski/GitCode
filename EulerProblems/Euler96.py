
import re

file = open('sudoku.txt','r')
pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes
wordList = re.findall(pattern, file.read())

row_number = 0
sudoku_grid = [[0]*9 for i in range(0,9)]

def valid(index, grid_list):
    value = grid_list[index]
    row = index / 9
    for x in range(0,9):
        loc = row*9 + x
        if(loc != index):
            if(grid_list[loc] == value):
                return False
    column = index%9
    for y in range(0,9):
        loc = y*9 + column
        if(loc != index):
            if(grid_list[loc] == value):
                return False
    mini_row = index/27
    mini_column = (index%9)/3
    for x in range(0,3):
        for y in range(0,3):
            loc = (3*mini_row+y)*9+3*mini_column+x
            if(loc != index):
                if(grid_list[loc] == value):
                    return False
    return True
    
run_sum = 0
    
def solve_current_grid():
    global sudoku_grid, run_sum
    one_list_grid = []
    for row in sudoku_grid:
        one_list_grid = one_list_grid + row
    working_copy = [x for x in one_list_grid]
    cur_index = 0
    while(one_list_grid[cur_index] != 0 and cur_index < 9*9):
        cur_index +=1
    while(cur_index < 9*9):
        working_copy[cur_index] += 1
        if(working_copy[cur_index] == 10):
            working_copy[cur_index] = 0
            cur_index -= 1
            while(cur_index >= 0 and one_list_grid[cur_index] != 0):
                cur_index -= 1
        elif valid(cur_index, working_copy):
            cur_index +=1
            while(cur_index < 9*9 and one_list_grid[cur_index] != 0 ):
                cur_index +=1
    top_right = 100*working_copy[0] + 10*working_copy[1] + working_copy[2]
    run_sum += top_right
    print top_right

for word in wordList:
    if len(word) == 9:
        row = [ord(letter)-48 for letter in word]
        sudoku_grid[row_number] = row
        
        row_number = row_number+1
        if(row_number == 9):
            solve_current_grid()
            row_number = 0

print "total of", run_sum          
            