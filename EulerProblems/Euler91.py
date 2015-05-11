SIZE_LIMIT = 50
edge_triangles = 0

edge_triangles = SIZE_LIMIT*SIZE_LIMIT*3 #number of triangles with right angle on an edge

in_count = 0

def gcd(a,b):
    if a%b == 0:
        return b
    else:
        return gcd(b,a%b) 

for x in range(1,SIZE_LIMIT+1):
    for y in range(1,SIZE_LIMIT+1):
        xy_gcd = gcd(x,y)
        min_vec = [y/xy_gcd , -x/xy_gcd]
        vec_x = x+min_vec[0]
        vec_y = y+min_vec[1]
        while(vec_x >= 0 and vec_x <= SIZE_LIMIT and vec_y >= 0 and vec_y <= SIZE_LIMIT): 
            in_count +=1
            vec_x += min_vec[0]
            vec_y += min_vec[1]
        vec_x = x-min_vec[0]
        vec_y = y-min_vec[1]
        while(vec_x >= 0 and vec_x <= SIZE_LIMIT and vec_y >= 0 and vec_y <= SIZE_LIMIT): 
            in_count +=1
            vec_x -= min_vec[0]
            vec_y -= min_vec[1]

print edge_triangles, in_count, "total of", edge_triangles+in_count