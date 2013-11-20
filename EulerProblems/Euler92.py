
def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    return result

count = 0

for i in range(1,10000000):
    val = i
    while(val != 1 and val != 89):
        val_list = to_list(val)
        sum = 0
        for x in val_list:
            sum += x*x
        val = sum
    if val == 89:
        count+=1
        
print count