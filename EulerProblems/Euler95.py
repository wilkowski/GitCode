

#n=p1^a1*p2^a2*... has sum of divisors = (p1^(a1+1) - 1)/(p1-1)*(p2^(a2+1) - 1)/(p2-1)*... - n


#ps-s= p^a+1

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
        
print "prime list made"

div_sums = [1]*PRIME_RANGE

for p in prime_list:
    val = p
    while(val < PRIME_RANGE):
        count = 1
        num = val/p
        while(num%p == 0):
            num = num/p
            count+=1
        div_sums[val] = div_sums[val]* (p**(count+1) - 1)/(p-1)   
        val = val +p
        
print "div sums made"

for i in range(0,PRIME_RANGE):
    div_sums[i] = div_sums[i]-i
    
print [div_sums[x] for x in range(0,13)]

did_check = [False]*PRIME_RANGE
best_length = 0
for i in range(1,PRIME_RANGE):
    if(not did_check[i]):
        list_so_far = []
        val = i
        while(val < PRIME_RANGE and not did_check[val]):
            did_check[val] = True
            list_so_far = list_so_far + [val]
            val = div_sums[val]
            
        if(val < PRIME_RANGE):
            for x in range(0,len(list_so_far)):
                if(val == list_so_far[x]):
                    length_found = len(list_so_far)-x
                    if(length_found > best_length):
                        best_length = length_found
                        print "length", best_length
                        cycle = [list_so_far[y] for y in range(x,len(list_so_far))]
                        print "chain found", cycle
                        start_val = cycle[0]
                        for z in cycle:
                            if z < start_val:
                                start_val = z
                        print "chain starts at", start_val
            
