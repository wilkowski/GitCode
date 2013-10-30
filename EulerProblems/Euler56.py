def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result
    
max_sum = 0

for a in range(1,100):
    for b in range(1, 100):
        sum = 0
        for i in to_list(a**b):
            sum +=i
        if(sum > max_sum):
            max_sum = sum
            print "S(", a, "^", b, ") =", max_sum
print max_sum