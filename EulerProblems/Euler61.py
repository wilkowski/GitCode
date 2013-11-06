


triangles = []
squares = [[] for i in range(0,100)]
pentagons = [[] for i in range(0,100)]
hexagons = [[] for i in range(0,100)]
heptagons = [[] for i in range(0,100)]
octagons = [[] for i in range(0,100)]

triangles = [n*(n+1)/2 for n in range(45,142)]



for n in range(1,10000):
    num = n*n
    if num >= 10000:
        break
    if num >= 1000:
        index = num /100
        squares[index] += [num]
        
for n in range(1,10000):
    num = n*(3*n-1)/2
    if num >= 10000:
        break
    if num >= 1000:
        index = num /100
        pentagons[index] += [num]
        
for n in range(1,10000):
    num = n*(2*n-1)
    if num >= 10000:
        break
    if num >= 1000:
        index = num /100
        hexagons[index] += [num]
        
for n in range(1,10000):
    num = n*(5*n-3)/2
    if num >= 10000:
        break
    if num >= 1000:
        index = num /100
        heptagons[index] += [num]
        
for n in range(1,10000):
    num = n*(3*n-2)
    if num >= 10000:
        break
    if num >= 1000:
        index = num /100
        octagons[index] += [num]
        
table_tables = [squares,pentagons,hexagons,heptagons,octagons]

def Find_next(usedTables, list_so_far):
    index = (list_so_far[len(list_so_far)-1]) %100
    if len(list_so_far) == 6:
        if(list_so_far[5] %100 == list_so_far[0] /100):
            print "Success"
            print list_so_far
            sum = 0
            for val in list_so_far:
                sum+= val
            print "sum is:", sum
        
        return
    for i in range(0,len(table_tables)):
        if (not usedTables[i]):
            new_used = [x for x in usedTables]
            new_used[i] = True
            shape_table = table_tables[i]
            try_list = shape_table[index]
            for shape in try_list:
                Find_next(new_used, list_so_far +[shape])
    
        
for t_num in triangles:
    Find_next([False]*5, [t_num])
    