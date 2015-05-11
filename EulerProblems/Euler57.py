def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result

numerator = 1
denominator = 2

bigger_nom_count = 0

for i in range(0,1000):
    num = numerator + denominator
    num_digits = len(to_list(num))
    denom_digits = len(to_list(denominator))
    #print num, "/", denominator
    if(num_digits > denom_digits):
        bigger_nom_count +=1
        
    new_denominator = numerator+2*denominator
    numerator = denominator
    denominator = new_denominator
    
print bigger_nom_count
        