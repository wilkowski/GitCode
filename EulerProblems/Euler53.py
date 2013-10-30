
def Choose(n,r):
    prod = 1
    for x in range(r+1,n+1):
        prod = prod*x
    for y in range(1,n-r+1):
        prod = prod/y
    return prod
        
print Choose(23,10)
    
run_count = 0
    
for r in range(0,101):
    above_mil = False
    for n in range(r,101):
        if(above_mil):
            run_count+=1
        else:
            val = Choose(n,r)
            if(val>1000000):
                run_count+=1
                #print n,r
                above_mil = True
                
                
print "count", run_count