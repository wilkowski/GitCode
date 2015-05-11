import re

file = open('matrix.txt','r')
pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes
mat_list = re.findall(pattern, file.read())

for i in range(0,len(mat_list)):
    mat_list[i] = int(mat_list[i])

def get_elem(x,y):
    return mat_list[x+80*y]
    
print get_elem(0,0), get_elem(1,0), get_elem(0,1)

min_matrix = [[False]*80 for i in range(0,80)]
min_matrix[79][79] = get_elem(79,79)

for x in range(78,-1,-1):
    min_matrix[x][79] = min_matrix[x+1][79] + get_elem(x,79)
    
for y in range(78,-1,-1):
    min_matrix[79][y] = min_matrix[79][y+1] + get_elem(79,y) #could be combined with above loop
    
for x in range(78,-1,-1):
    for y in range(78,-1,-1):
        min_val = min(min_matrix[x+1][y], min_matrix[x][y+1])
        min_matrix[x][y] = get_elem(x,y) + min_val
        
print min_matrix[0][0]

#I don't know why I did this problem backwards, it doesn't actually make a difference