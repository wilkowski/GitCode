factorial = [1]*10

for i in range(1,10):
    factorial[i] = factorial[i-1] *i
    

def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result
    
def fact_digit_sum(n):
    digit_list = to_list(n)
    sum = 0
    for v in digit_list:
        sum += factorial[v]
    return sum
    
#print 169, fact_digit_sum(169), fact_digit_sum(363601), fact_digit_sum(1454)
#print 871, fact_digit_sum(871)
    
    
loopers = [False]*(factorial[9]*7)
for i in range(1,1000000):
    num = i
    if fact_digit_sum(num) == i:
        loopers[i] = True
        print i

loop_list = [1,2, 145, 169, 871, 872, 1454, 40585, 45361, 45362]
for l in loop_list:
    loopers[l] = True
  
print "first list made"

count = 0
for i in range(1,1000000):
    num = i
    non_repeater = True
    for x in range(0,56): #somehow 56 = 60 i don't know how I got an off by 4 error
        num = fact_digit_sum(num)
        if loopers[num]:
            non_repeater = False
            break
        
    if non_repeater:
        count += 1
        if not loopers[fact_digit_sum(num)]:
            print "Error list too long"
            
            
print "60 count", count
    