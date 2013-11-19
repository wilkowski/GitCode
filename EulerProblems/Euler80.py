
is_square = [False]*101
for n in range(0,11):
    is_square[n*n] = True
    
def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result
    
run_sum = 0

for i in range(2,101):
    if not is_square[i]:
        numerator = 0
        denominator = 1
        for d in range(0,101):
            numerator = numerator*10
            for x in range(1,11):
                if (numerator+x)*(numerator+x) > i * denominator*denominator:
                    numerator += (x-1)
                    break
            denominator = denominator *10
        num_list = to_list(numerator)
        digit_sum = 0
        for y in range(0,100):
            digit_sum += num_list[y]
        run_sum += digit_sum
 
print run_sum