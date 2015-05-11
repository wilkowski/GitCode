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

c_prime_count = 0

for x in PrimeList:
    digits = 0
    xx = x
    while(xx >0):
        digits+=1
        xx = xx/10
    rot_prime = True
    for d in range(1,digits):
        rot = 10 **d
        rot_d = 10 **(digits-d)
        if(not isPrimeList[x/rot + (x%rot)*rot_d]): #check if rotated number is in prime list
            rot_prime = False
    if(rot_prime):
        print x
        c_prime_count +=1
        
print "count", c_prime_count