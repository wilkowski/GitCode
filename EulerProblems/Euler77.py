PRIME_RANGE = 10000 #memory is largest constraint here
TABLE_SIZE = 301

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




Val_Table = [0]*TABLE_SIZE
for i in range(0,TABLE_SIZE):
    Val_Table[i] = [0]*TABLE_SIZE
    
    

    
#Val_Table[a][b]
#how many ways can the number a be written using only positive numbers less than or equal to b


#if b>a+1: Val_Table[a][b] = Val_Table[a][a]
#else: Val_Table[a][b] = sum from i=1 to b-1 of Val_Table[a-i][i]


for a in range(0,TABLE_SIZE):
    for b in range(0,TABLE_SIZE):
        if(a == 0):
            Val_Table[a][b] = 1
        if(a == 1):
            Val_Table[a][b] = 0
        elif(a == 2):
            if(b >= 2):
                Val_Table[a][b] = 1
        elif(a == 3):
            if(b >= 3):
                Val_Table[a][b] = 1
        else:
            if(b > a):
                Val_Table[a][b] = Val_Table[a][a]
            else:
                sum = 0
                for i in range(2, b+1):
                    if(isPrimeList[i]):
                        sum += Val_Table[a-i][i] #ways to make a where i is largest prime used
                if(b == a and isPrimeList[a]):
                    sum+=1
                Val_Table[a][b] = sum

print "5 ways", Val_Table[5][4], "self", Val_Table[5][5]
print "ways to make 10", Val_Table[10][9], "with self", Val_Table[10][10]       
for i in range(2, TABLE_SIZE):
    if Val_Table[i][i-1] > 5000:
        print i, "has", Val_Table[i][i-1], "ways"
        break
    