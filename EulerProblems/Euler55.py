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
    
def is_palindrome(num):
    num_list = to_list(num)
    is_pal = True
    list_len = len(num_list)
    for i in range(0,list_len/2):
        if(num_list[i] != num_list[list_len-1-i]):
            is_pal = False
            break
    return is_pal
    
def reverse_list(list):
    list_len = len(list)
    return [list[list_len-1-i] for i in range(0,list_len)]
        
l_count = 0
    
for i in range(0,10000):
    pal_test = i
    lychrel = True
    for j in range(0,51):
        reverse_num = to_num(reverse_list(to_list(pal_test)))
        pal_test = pal_test + reverse_num
        if(is_palindrome(pal_test)):
            lychrel = False
            break
    if lychrel:
        #print i
        l_count += 1
    
print "lychrel count", l_count