prime_range = 1000000 #hits 11 so I'm good

isPrimeList = [True for p in range(0,prime_range)]

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
            
print "prime list made"            
            
def digits(x):
    digit_count = 0
    xx = x
    while(xx >0):
        digit_count+=1
        xx = xx/10
    return digit_count
    
run_sum = 0
    
for p in range(11,prime_range):
    if(isPrimeList[p]):
        truncatable = True
        pp = p
        while(pp > 0 and truncatable):
            if(not isPrimeList[pp]):
                truncatable = False
            pp = pp/10
        if(truncatable):
            #print "right truncatable", p
            pass
            
        ppp = p
        while(ppp > 0 and truncatable):
            if(not isPrimeList[ppp]):
                truncatable = False
            ten_pow = 10**(digits(ppp)-1)
            ppp = ppp - (ppp/ten_pow)*ten_pow
        if(truncatable):
            print "double truncatable", p
            run_sum += p
            
print "sum total", run_sum