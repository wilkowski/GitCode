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
            
            
max_length = 0
sum_prime = 0
for p_start in range(2,PRIME_RANGE):
    done = False
    if(isPrimeList[p_start]):
        sum = p_start
        length = 1
        for i in range(p_start+1,PRIME_RANGE):
            if(isPrimeList[i]):
                sum += i
                length +=1
                if(sum >= PRIME_RANGE):
                    if(length < max_length):
                        done = True
                    break
                else:
                    if(isPrimeList[sum]):
                        if(length>max_length):
                            max_length = length
                            sum_prime = sum
                            print sum, "with length", length, "starter of", p_start
                
        
        
        
    if(done):
        break
        
print "best sum:", sum_prime, "with length", max_length