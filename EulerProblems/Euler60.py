PRIME_RANGE = 120000000
TRY_TO = 2200


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

print "prime checker made"            
            
prime_count = 0            
for b in isPrimeList:
    if b:
        prime_count+=1
        
prime_list = [0]*prime_count

index = 0
i = 0
while( i < PRIME_RANGE):
    if(isPrimeList[i]):
        prime_list[index] = i
        index +=1
    i += 1

print "prime list made"   

def is_prime(n):
    if(n == 2 or n == 3):
        return True
    if(n%6 != 1 and n%6 != 5):
        return False
    if(n < PRIME_RANGE):
        return isPrimeList[n]
    elif(n < PRIME_RANGE **2):
        for p in prime_list:
            if p*p > n:
                return True
            if(n%p == 0):
                return False
        return True
    else:
        print "error: far too big"
               


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
    

can_concat_primes = [False]*len(prime_list)

#print len(prime_list)


print "TRY_TO", TRY_TO, "is", prime_list[TRY_TO - 1]

def can_concat(list1, list2):
    return is_prime(to_num(list1 + list2)) and is_prime(to_num(list2 + list1))
    
#for each i a table of indices of numbers that can concatenate to make primes
pair_list = [[] for i in range(0,TRY_TO)]

for i in range(0, TRY_TO):
    potential_pairs = [False] * TRY_TO
    p = prime_list[i]
    p_list = to_list(p)
    index = 0
    for j in range(i+1, TRY_TO):
        q = prime_list[j]
        q_list = to_list(q)
        if can_concat(p_list, q_list):
            potential_pairs[index] = j
            index += 1
    pair_list[i] = [potential_pairs[x] for x in range(0,index)]      

print "pairs made"

#print prime_list[1], [prime_list[x] for x in pair_list[1]]

#print pair_list


#p_thing means that prime_list[p_thing] returns corresponding prime
#c_thing means pair_list[p_thing][c_thing] returns another p_index
#               list of indexes,    starting point for testing
def next_concatable(prime_index_list, candidate_index_list):
    prime_pair_tables = [pair_list[p_a] for p_a in prime_index_list]
    for z in range(0, len(candidate_index_list)):
        if(candidate_index_list[z] >= len(prime_pair_tables[z])):
            return False #inital candidate base too large; no match found
            
    while(True):
        all_equal = True
        base_table = prime_pair_tables[0]
        p_check_val = base_table[candidate_index_list[0]]
        p_index_min = base_table[candidate_index_list[0]] 
        index_min_index = 0
        for y in range(1, len(candidate_index_list)):
            table = prime_pair_tables[y]
            c_dex = candidate_index_list[y]
            p_index_comp = table[c_dex]
            if p_index_comp != p_check_val:
                all_equal = False
            if p_index_comp < p_index_min:
                p_index_min = p_index_comp
                index_min_index = y
        if(not all_equal):
            candidate_index_list[index_min_index] +=1
            if(candidate_index_list[index_min_index] == len(prime_pair_tables[index_min_index])):
                return False #index too large; no match found
        else:
            return candidate_index_list
        

for p_1 in range(0, TRY_TO):
    i1Pairs = pair_list[p_1]
    for x in range(0,len(i1Pairs)):
        p_2 = i1Pairs[x]
        can_list2 = next_concatable([p_1,p_2],[x+1,0])
        while(can_list2):
            p_3 = i1Pairs[can_list2[0]]
            #print prime_list[p_1], prime_list[p_2], prime_list[p_3]
            can_list3 = next_concatable([p_1,p_2,p_3],can_list2+[0])
            while(can_list3):
                p_4 = i1Pairs[can_list3[0]]
                cat_list4 = next_concatable([p_1,p_2,p_3,p_4],can_list3+[0])
                print prime_list[p_1], prime_list[p_2],prime_list[p_3],prime_list[p_4]
                if(cat_list4):
                    p_5 = i1Pairs[cat_list4[0]]
                    print "!!!!", prime_list[p_1], prime_list[p_2],prime_list[p_3],prime_list[p_4],prime_list[p_5]
                    print "!!!!", "with sum"
                    print "!!!!", prime_list[p_1] + prime_list[p_2] + prime_list[p_3] + prime_list[p_4] + prime_list[p_5]
                can_list3 = next_concatable([p_1,p_2,p_3],[(can_list3[i])+1 for i in range(0,3)])
            can_list2 = next_concatable([p_1,p_2],[(can_list2[i])+1 for i in range(0,2)])
                
#old version of code, too slow to get results, still useful for sanity checks              
for i1 in range(0, TRY_TO):
    break
    p1 = prime_list[i1]
    l1 = to_list(p1)
    for i2 in pair_list[i1]:
        p2 = prime_list[i2]
        l2 = to_list(p2)
        index1 = i2+1
        index2 = i2
        concat12 = can_concat(l1,l2)
        if concat12:
            for i3 in pair_list[i2]:
                p3 = prime_list[i3]
                l3 = to_list(p3)
                concat13 = can_concat(l1,l3)
                concat23 = can_concat(l2,l3)
                if(concat13 and concat23):
                    for i4 in range(i3+1,TRY_TO):
                        p4 = prime_list[i4]
                        l4 = to_list(p4)
                        concat14 = can_concat(l1,l4)
                        concat24 = can_concat(l2,l4)
                        concat34 = can_concat(l3,l4)
                        if(concat14 and concat24 and concat34):
                            print p1,p2,p3,p4
                            for i5 in range(i4+1,TRY_TO):
                                p5 = prime_list[i5]
                                l5 = to_list(p5)
                                concat15 = can_concat(l1,l5)
                                concat25 = can_concat(l2,l5)
                                concat35 = can_concat(l3,l5)
                                concat45 = can_concat(l4,l5)
                                if(concat15 and concat25 and concat35 and concat45):
                                    print p1,p2,p3,p4,p5
                                    print "with sum", p1+p2+p3+p4+p5
                                    
                                    
print "done"