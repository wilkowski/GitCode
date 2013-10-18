
run_sum = 0

for i in range(1,10000):
    div_sum = 0
    for d in range(1,i/2+1):
        if(i%d == 0):
            div_sum +=d
            
    if (div_sum != i):
        div_sum2 = 0
        for q in range(1,div_sum/2+1):
            if(div_sum%q == 0):
                div_sum2 +=q
        if(div_sum2 == i):
            print "amicable :", i, div_sum
            run_sum += (i+div_sum)
        
        
print "end sum", run_sum/2