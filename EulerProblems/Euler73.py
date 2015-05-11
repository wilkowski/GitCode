RANGE = 12001

new_count = 0

def gcd(a,b):
    if a%b == 0:
        return b
    else:
        return gcd(b,a%b)
        
for i in range(5,RANGE):
    #x/i = 1/3 for x rounded up to nearest int
    x = (i+2)/3
    while 2*x < i:
        if gcd(x,i) == 1:
            new_count+=1
        x+=1
        
print new_count
    
    