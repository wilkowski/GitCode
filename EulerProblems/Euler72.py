PRIME_RANGE = 1000001 #memory is largest constraint here
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

phi_list = [n for n in range(0,PRIME_RANGE)]
for p in prime_list:
    val = p
    while(val <PRIME_RANGE):
        phi_list[val] = phi_list[val]/p*(p-1)
        val +=p
        
print "phi list made"

count = 0
for i in range(2,PRIME_RANGE):
    count += phi_list[i]
    
print count