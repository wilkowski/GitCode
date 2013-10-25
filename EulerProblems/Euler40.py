

run_prod = 1
digits = 1
c = 0
for i in range(1,1000000):
    if(i==10 or i == 100 or i == 1000 or i == 10000 or i == 100000):
        digits +=1
    for x in range(0,digits):
        c +=1
        #print ((i/10**(digits-x-1))%10) #for testing
        if(c==1 or c==10 or c == 100 or c == 1000 or c == 10000 or c == 100000 or c == 1000000):
            val = ((i/10**(digits-x-1))%10)
            print "mul by", val
            run_prod = run_prod*val
        if(c == 1000000):
            break
            
print run_prod