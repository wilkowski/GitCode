PRIME_RANGE = 1000000

isPrimeList = [True]*PRIME_RANGE

isPrimeList[0] = False
isPrimeList[1] = False

for p in range(4,PRIME_RANGE,2):
    isPrimeList[p] = False

for x in range(3,int(PRIME_RANGE**.5+1)):
    if(isPrimeList[x]):
        val = x*x
        x2 = 2*x
        while(val <PRIME_RANGE):
            isPrimeList[val] = False
            val += x2
            
            
divisor_count = [0]*PRIME_RANGE

for i in range(0,PRIME_RANGE):
    if(isPrimeList[i]):
        for ii in range(i,PRIME_RANGE,i):
            divisor_count[ii] +=1
            
for k in range(0,PRIME_RANGE-4):
    if(divisor_count[k] >=3 and divisor_count[k+1] >=3 and divisor_count[k+2] >=3):
        print "found 3 3 thing at", k
        break
            
for j in range(0,PRIME_RANGE-4):
    if(divisor_count[j] >=4 and divisor_count[j+1] >=4 and divisor_count[j+2] >=4 and divisor_count[j+3] >=4):
        print "found 4 4 thing at", j
        break
        
        
print "done"