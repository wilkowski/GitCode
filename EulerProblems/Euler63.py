def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result

pow_count = 0
for i in range(1,10):
    power = 1
    digits = 1
    while(power < digits + 2):
        val = i**power
        digits = len(to_list(val))
        if digits == power:
            pow_count +=1
            print i, "^", power
        power += 1
            
    
print "total count", pow_count
        