length_count = [0]*1500001

index = 0
primitive_lengths = [0]*1500001

def gcd(a,b):
    if a%b == 0:
        return b
    else:
        return gcd(b,a%b) 

#looked up formula on wikipedia
for m in range(2,868):
    for n in range(1+(m%2),m,2):
        if gcd(m,n) == 1:
            len = 2*m*m+2*m*n #m^2+n^2, 2mn, m^2-n^2
            if len < 1500001:
                primitive_lengths[index] = len
                index +=1
            else:
                break
                
print "primitives made"

for i in range(0,index):
    primitive = primitive_lengths[i]
    val = primitive
    while val < 1500001:
        length_count[val] +=1
        val += primitive

print "lengths counted"
        
count = 0
for i in range(0,1500001):
    if length_count[i] == 1:
        count += 1
        
print "total count", count
