


def get_convergent(term):
    numerator = 0
    denominator = 1
    while term >= 1:
        adder = 1
        if term%3 == 2:
            adder = 2*(term +1)/3
        new_num = denominator*adder + numerator
        numerator = denominator
        denominator = new_num
        term = term - 1
        
    numerator = numerator + 2*denominator
    return [numerator,denominator]
    
for y in range(0,10):
    print get_convergent(y)    


hundreth = get_convergent(99)

def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result
    
digits = to_list(hundreth[0])

sum = 0
for x in digits:
    sum += x
print "digit sum", sum

