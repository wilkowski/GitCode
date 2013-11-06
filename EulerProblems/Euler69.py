#if p|n then pn/phi(pn) = n/phi(n)

#for prime p p/phi(p) = 1+1/(1-p)

#if not p|n then pn/phi(pn) = n/phi(n)* p/phi(p)

#largest n/phi(n) must be a product of unique primes

PRIME_RANGE = 1000000 #memory is largest constraint here

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
            

#make a list of just primes            
prime_count = 0            
for b in isPrimeList:
    if b:
        prime_count+=1
        
prime_list = [0]*prime_count

index = 0
for i in range(0, PRIME_RANGE):
    if(isPrimeList[i]):
        prime_list[index] = i
        index +=1
        
print "prime checker made"

prod = 1

for i in prime_list:
    if prod*i > 1000000:
        print prod
        break
    else:
        prod = prod*i
        
#sanity check: result should be between 500000 and 1000000 otherwise twice the result has same value
    