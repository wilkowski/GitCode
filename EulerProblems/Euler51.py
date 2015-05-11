PRIME_RANGE = 1000000

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
            
def to_num(list):
    sum = 0
    for i in list:
        sum = sum*10
        sum +=i
    return sum
        
def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result

for p in range(56003,PRIME_RANGE):
    if(isPrimeList[p]):
        p_list = to_list(p)
        digit_used = [0]*10
        for d in p_list:
            digit_used[d] += 1
        for r in range(0,3): #only try replacing 0s,1 or 2s
            #if its not a multiple of 3 copies at least one number of the 8 would be a multiple of 3
            if(digit_used[r] >=3 and digit_used[r]%3 == 0):
                list_copy = [x for x in p_list]
                fail_count = 0
                for x in range(0,10):
                    for index in range(0,len(p_list)):
                        if(p_list[index] == r):
                            list_copy[index] = x
                    if(x == 0 and p_list[0] == r):
                        fail_count +=1
                    elif (not isPrimeList[to_num(list_copy)]):
                        fail_count +=1
                    if fail_count > 2:
                        break
                if(fail_count <= 2):
                    print "success with prime:", p
                    
            
#first result was incorrect since turning leading digits to 0 doesn't count
#fixed up code and got correct result

