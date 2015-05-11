best_count = 0
best_p = 0

for p in range(120, 1001):
    tri_count = 0
    tri_list = []
    for a in range(1,p/3): #start with smallest, goes up to 1/3 p, there are better bounds but whatever
        for b in range(a,p/2):
            if(a*a + b*b == (p-a-b)* (p-a-b)):
                tri_count+=1
                tri_list += [[a,b,p-a-b]]

    if(tri_count > best_count):
        best_p = p
        best_count = tri_count
        print tri_list
        
        
print best_count, best_p