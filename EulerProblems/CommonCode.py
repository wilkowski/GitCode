import time

#common code

start = time.clock()

PRIME_RANGE = 1000000 #memory is largest constraint here

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

def is_prime(n):
    if(n == 2 or n == 3):
        return True
    if(n%6 != 1 and n%6 != 5):
        return False
    if(n < PRIME_RANGE):
        return isPrimeList[n]
    elif(n < PRIME_RANGE **2):
        for p in prime_list:
            if p*p > n
                return True
            if(n%p == 0):
                return False
        return True
    else:
        print "error: far too big"     

end = time.clock()            
            
print "prime list made, took", end - start, "seconds"

#power with mod
def pow_mod_prod(var, power, mod, prod):
    if(power == 0):
        return prod
    if(power %2 == 1):
        return pow_mod_prod(var, power-1, mod, (prod*var) %mod)
    else:
        return pow_mod_prod(var*var %mod, power/2, mod, prod)

def pow_mod(var, power, mod):
    return pow_mod_prod(var, power, mod, 1)



#factorials
factorial_range = 10

factorials = [1 for x in range(0,factorial_range)]

for n in range(1,factorial_range):
    factorials[n] = factorials[n-1]*n
    #print n, factorials[n]
    
    
#fibonacci numbers
fib = [1]

for i in range(1,12):
    fib = fib + [fib[i-1]*i]
    
#print fib[4]


def digits(x):
    digit_count = 0
    xx = x
    while(xx >0):
        digit_count+=1
        xx = xx/10
    return digit_count
    
    
    
#convert back and forth between number and list of its digits
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
    
def reverse_list(list):
    list_len = len(list)
    return [list[list_len-1-i] for i in range(0,list_len)]

#gcd
def gcd(a,b):
    if a%b == 0:
        return b
    else:
        return gcd(b,a%b)    
    
#import a file and get the words out of it as a lsit    
    
import re

file = open('names.txt','r')
pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes
nameList = re.findall(pattern, file.read())