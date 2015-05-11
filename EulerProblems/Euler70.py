PRIME_RANGE = 10000000 #memory is largest constraint here
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


#I realized halfway through the execution that this is a silly way to calculate phi(n)
#it would be much easier to calculate all of them at once
def phi(n):
    start = n
    for p in prime_list:
        if n%p == 0:
            start = (start/p)*(p-1)
            while(n%p == 0):
                n = n/p
        if(isPrimeList[n]):
            start = (start/n)*(n-1)
            break
        if n == 1:
            break
    return start
    
def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result
    
min_ratio = 100000000.0
best_n = 0
    
for n in range(2,PRIME_RANGE):
    digits_used = [0]*10
    phi_n = phi(n)
    n_list = to_list(n)
    phi_list = to_list(phi_n)
    for d in n_list:
        digits_used[d] +=1
    for dd in phi_list:
        digits_used[dd] -=1
    permutation = True
    for x in digits_used:
        if x!= 0:
            permutation = False
            break
    if permutation:
        
        ratio = float(n)/float(phi_n)
        if ratio < min_ratio:
            print "is phi permutation", n, phi_n
            print "new best ratio", ratio
            best_n = n
            min_ratio = ratio
            
print n, "with ratio", min_ratio
            