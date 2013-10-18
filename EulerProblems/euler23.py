
index= 0
abundant_numbers = []
for i in range(1,28124):
    div_sum = 0
    for d in range(1,i/2+1):
        if(i%d == 0):
            div_sum += d
            
    if (div_sum > i):
        abundant_numbers = abundant_numbers + [i]
        index += 1

print "abundant count", len(abundant_numbers)

print abundant_numbers[0], abundant_numbers[1], abundant_numbers[2]

#numbers_to_check = [x for x in range(0,28124)]
is_abundant_sum = [False for x in range(0,28124)]

for i in range(0,len(abundant_numbers)):
    for j in range(i,len(abundant_numbers)):
        val = abundant_numbers[i] + abundant_numbers[j]
        if(val > 28123):
            break
        else:
            is_abundant_sum[val] = True
            
running_sum = 0
for k in range(0,28124):
    if (not is_abundant_sum[k]):
        running_sum += k
        
        
print "end result:", running_sum
        