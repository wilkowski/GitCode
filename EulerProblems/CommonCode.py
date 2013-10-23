#common code

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