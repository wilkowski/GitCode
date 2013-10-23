prime_range = 1000000

isPrimeList = [True for p in range(0,prime_range)]

PrimeList = []

for x in range(2,prime_range):
    if(isPrimeList[x]):
        PrimeList = PrimeList +[x]
        val = x+x
        while(val <prime_range):
            isPrimeList[val] = False
            val += x

print "prime list made"

bestLength = 0
coefficientProduce = 0

for b_index in range(0,1000):
    b = PrimeList[b_index] #b must be a prime since n=0 must work
    if(b >= 1000):
        break
    for a in range(-999,1000):
        for n in range(0,b):
            val = n*n + n*a + b 
            if(val < 0 or not isPrimeList[val]):
                if(n > bestLength):
                    bestLength = n
                    coefficientProduce = a*b
                    print "a:", a, "b:", b, "n:", n, "ab:", a*b
                break    

print "best", bestLength, "product", coefficientProduce