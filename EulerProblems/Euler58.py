PRIME_RANGE = 350000000

isPrimeList = [True]*(PRIME_RANGE/2)

isPrimeList[0] = False

#for p in range(4,PRIME_RANGE,2):
#    isPrimeList[p] = False

#listOfPrimes = [2]*20000000 
#finished problem without this

for x in range(3,int(PRIME_RANGE**.5+1),2):
    if(isPrimeList[(x-1)/2]):
        val = x*x
        x2 = 2*x
        while(val <PRIME_RANGE):
            isPrimeList[(val-1)/2] = False
            val += x2
            
print "prime list made"
            
def is_prime(n):
    if(n == 2 or n == 3):
        return True
    if(n%6 != 1 and n%6 != 5):
        return False
    if(n < PRIME_RANGE):
        return isPrimeList[(n-1)/2]
    elif(n < PRIME_RANGE **2):
        for d in range(5,int(n**.5)+1, 2):
            if(isPrimeList[(d-1)/2] and n%d == 0):
                return False
        return True
    else:
        print "error: far too big"
            
            
corner = 3

count = 1
adder = 2

prime_count =0
total_count = 1

#add up the corners of the spiral
while(corner <= 10*PRIME_RANGE): #last corner at 1002001
    #print corner
    total_count += 1
    if(is_prime(corner)):
        prime_count+=1
    count += 1
    corner += adder
    
    if(count == 4):
        if(prime_count *10 < total_count):
            print "side_length", adder-1
            break
        count = 0
        adder +=2

print "done"        
print "primes", prime_count, "total", total_count