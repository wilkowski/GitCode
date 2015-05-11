goal_ratio = 3.0/7.0

#we want 3/7-n/d to be minimum
#lets assume 3/7-n/d = 1/7d or 2/7d
#with denominators around 1000000, 2 numerator will be about twice as large difference
#then 3d - 7n = 1

# 3d = 1 mod 7
# d = 5 mod 7

for i in range(1000000-6,1000000+1):
    if i%7 == 5:
        d = i
        
#then 3d - 7n = 1
print (3*d -1)%7 == 0
n = (3*d -1)/7

def gcd(a,b):
    if a%b == 0:
        return b
    else:
        return gcd(b,a%b)    
    
div = gcd(n,d)
numerator = n/div
denominator = d/div

print numerator, "/", denominator, "==", n, "/", d
print "3/7=", goal_ratio, "vs", numerator, "/", denominator, "=", float(numerator)/float(denominator)