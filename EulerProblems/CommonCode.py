import time

#common code

start = time.clock()

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

end = time.clock()            
            
print "prime list made, took", end - start, "seconds"


#factorials
factorial_range = 10

factorials = [1 for x in range(0,factorial_range)]

for n in range(1,factorial_range):
    factorials[n] = factorials[n-1]*n
    #print n, factorials[n]
    
    
#fibonacci numbers
fib = [1]

for i in range(1,12):
    fib = fib + [fib[i-1]*i]
    
#print fib[4]


def digits(x):
    digit_count = 0
    xx = x
    while(xx >0):
        digit_count+=1
        xx = xx/10
    return digit_count