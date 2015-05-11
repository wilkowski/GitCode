def to_num(list):
    sum = 0
    for i in list:
        sum = sum*10
        sum +=i
    return sum
        
def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result
    
#guessing now that the answer will be 142857 because (1/7,2/7,3/7...) all have same 6 digits

for x in range(1,142858):
    digit_list = to_list(x)
    digit_count = [0]*10
    for d in digit_list:
        digit_count[d]+=1
    for n in range(2,7):
        digit_count_copy = [k for k in digit_count]
        new_num_list = to_list(n*x)
        failure = False
        for dd in new_num_list:
            digit_count_copy[dd] -=1
            if(digit_count_copy[dd] < 0):
                failure = True
        if(failure):
            break
        if(n == 6):
            print "success with", x
        

