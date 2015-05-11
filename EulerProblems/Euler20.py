digit_sum = 0

factorial = 1

for x in range(1,100):
    factorial = factorial*x
    
while (factorial > 0):
    digit_sum += factorial%10
    factorial = factorial/10
    
print "digit sum:", digit_sum