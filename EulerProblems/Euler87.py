PRIME_RANGE = 500000 #memory is largest constraint here

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


#a hash table implementation
HASH_SIZE = 8000000
hash_value_table = [False]*HASH_SIZE

def hash(value):
    return value%HASH_SIZE
    
def add_to_hash(value):
    index = hash(value)
    while(hash_value_table[index]):
        if(hash_value_table[index] == value):
            return True
        index = (index + 1)%HASH_SIZE
    hash_value_table[index] = value
    return False 
    
CHECK_LIMIT = 50000000

for p1 in prime_list:
    partial_1 = p1*p1
    if(partial_1 >= CHECK_LIMIT):
        break
    for p2 in prime_list:
        partial_2 = partial_1 + (p2*p2*p2)
        if(partial_2 >= CHECK_LIMIT):
            break
        for p3 in prime_list:
            partial_3 = partial_2 + (p3*p3*p3*p3)
            if(partial_3 >= CHECK_LIMIT):
                break
            else:
                add_to_hash(partial_3)
                #print partial_3
                
count = 0
for val in hash_value_table:
    if(val):
        count +=1
        
print "total count is", count
