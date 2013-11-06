RING_SIZE = 5
START_VAL = 9

def copy_list(l):
    return l+[]
    

digits_used = [False]*(RING_SIZE*2+1)
digits_used[0] = True
ring_spaces = [False]*(RING_SIZE*2) #first 5 for outer ring, next 5 for inner ring
ring_spaces[0] = START_VAL #fairly sure it has to start with 9

digits_used[START_VAL] = True


best_result = 0

def check_result(ring):
    global best_result
    val_list = []
    lowest_external = 0
    low_val = ring[0]
    for i in range(0,RING_SIZE):
        if ring[i] < low_val:
            lowest_external = i
            low_val = ring[i] 
            
    for j in range(lowest_external,lowest_external+RING_SIZE):
        val_list = val_list + [ring[j%RING_SIZE],ring[j%RING_SIZE+RING_SIZE],ring[(j+1)%RING_SIZE+RING_SIZE]]
        
    sum = 0
    for i in val_list:
        sum = sum*10
        if i == 10:
            sum = sum*10
        sum +=i
    if(sum > best_result):
        print ring
        print sum
        best_result = sum

def fill_next(ring, digits, sum, index):
    for i in range(1,RING_SIZE*2+1):
        if(not digits[i]):
            inner_res = sum - i - ring[index+RING_SIZE]
            if(inner_res >0 and inner_res < RING_SIZE*2+1 and inner_res != i):
                if(index == (RING_SIZE-1)):
                    if(inner_res == ring[RING_SIZE]):
                        ring_copy = copy_list(ring)
                        ring_copy[index] = i
                        check_result(ring_copy)
                else:
                    if(inner_res != 10 and not digits[inner_res]):
                        digits_copy = copy_list(digits)
                        ring_copy = copy_list(ring)
                        digits_copy[i] = True
                        digits_copy[inner_res] = True
                        ring_copy[index] = i
                        ring_copy[index+RING_SIZE+1] = inner_res
                        fill_next(ring_copy, digits_copy, sum, index+1)


for x in range(1,RING_SIZE*2+1):
    if(x!= START_VAL):
        ring_spaces[RING_SIZE] = x
        for i in range(1,RING_SIZE*2+1):
            if(i != x and i!= 10 and i!= START_VAL):
                ring_spaces[RING_SIZE+1] = i
                digits_copy = copy_list(digits_used)
                digits_copy[x] = True
                digits_copy[i] = True
                fill_next(ring_spaces, digits_copy, START_VAL+x+i, 1)
        
    
print best_result