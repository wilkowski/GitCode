PRIME_RANGE = 10000

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
            
            
for i in range(1000,PRIME_RANGE):
    if(isPrimeList[i]):
        for j in range(1,4500):
            if(i+2*j < PRIME_RANGE):
                if(isPrimeList[i+j] and isPrimeList[i+2*j]):
                    int_used_a = [0]*10
                    int_used_b = [0]*10
                    xx = i
                    while(xx>0):
                        int_used_a[xx%10] +=1
                        int_used_b[xx%10] +=1
                        xx = xx/10
                    xa = i+j
                    xb = i+2*j
                    success = True
                    while(xa >0):
                        int_used_a[xa%10] -= 1
                        int_used_b[xb%10] -= 1
                        if(int_used_a[xa%10] <0 or int_used_b[xb%10] < 0):
                            success = False
                            break
                        xa = xa/10
                        xb = xb/10

                    if(success):
                        print "working numbers:", i,i+j,i+2*j, "summer of", j
            else:
                break