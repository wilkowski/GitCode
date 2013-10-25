prime_range = 1000000

isPrimeList = [True]*prime_range

isPrimeList[0] = False
isPrimeList[1] = False

for p in range(4,prime_range,2):
    isPrimeList[p] = False

for x in range(3,int(prime_range**.5+1)):
    if(isPrimeList[x]):
        val = x*x
        x2 = 2*x
        while(val <prime_range):
            isPrimeList[val] = False
            val += x2
            

            
            
counter_candidate = [not i for i in isPrimeList] #not prime

for i in range(0, prime_range, 2):
    counter_candidate[i] = False #not even
    
over = False
    
for c in range(3,prime_range):
    if(over):
        break
    if(counter_candidate[c]):
        for n in range(1,prime_range): #never going to use full range
            dif = c - (2 * n * n)
            if(dif <0):
                print "WINNER!", c
                #program took surprisingly long to get here
                over = True
                break
            if(isPrimeList[dif]):
                break
            n+=1
            
            
print "all done"
            