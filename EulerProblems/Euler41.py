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

prime_list = []
for p in range(2,31426):
    if(isPrimeList[p]):
        prime_list = prime_list+ [p]

def swap_copy(list,a,b):
    new_list = [list[n] for n in range(0,len(list))]
    x = new_list[a]
    new_list[a] = new_list[b]
    new_list[b] = x
    return new_list


#9 or 8 digit pandigitals are all divisible by 3    
    
int_list = [6,5,4,3,2,1]
candidate_list = []


for h in range(0,6):
    list_h = swap_copy(int_list,0,h)
    for i in range(1,6):
        list_i = swap_copy(list_h,1,i)
        for j in range(2,6):
            list_j = swap_copy(list_i,2,j)
            for k in range(3,6):
                list_k = swap_copy(list_j,3,k)
                for l in range(4,6):
                    list_l = swap_copy(list_k,3,l)
                    val = 7000000+100000*list_l[0] + 10000*list_l[1] + 1000*list_l[2] + 100*list_l[3]+ 10*list_l[4]+list_l[5]
                    candidate_list = candidate_list +[val]
                    #print val


            
for c in candidate_list:
    is_prime = True
    for p in prime_list:
        if(c%p == 0):
            is_prime = False
            break
    if(is_prime):
        print "found prime,", c
        break
    
print "end of search"

