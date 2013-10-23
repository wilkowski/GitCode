sum_total = 0

for x in range(2,354294): #9^5 *6 easy to see hard maximum
    n = x
    power_sum = 0
    while(n>0):
        power_sum += (n%10)**5
        n = n/10
    if(power_sum == x):
        print x
        sum_total += x
        
        
        
print "sum total", sum_total