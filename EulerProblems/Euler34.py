
factorials = [1 for x in range(0,10)]

for n in range(1,10):
    factorials[n] = factorials[n-1]*n
    #print n, factorials[n]
    
    


for i in range(3,2540160): #max of 9! *7 digits
    f_sum = 0
    c = i
    while(c > 0):
        f_sum += factorials[c%10]
        c = c/10
    if(f_sum == i):
        print i
        
        
#only 2 results so i did a manual sum