TRY_TO = 20000
hash_size = TRY_TO*4
hash_key_table = [False]*hash_size
hash_value_table = [False]*hash_size
hash_key_counter = [0]*hash_size

def key_for_list(list):
    key = 0
    for i in range(0,len(list)):
        key = (key + list[i] * (97**(i))) % hash_size
    return key
    
def add_to_hash(list):
    
    sorted_list = sorted(list)
    key = key_for_list(sorted_list)
    index = key
    while(hash_value_table[index]):
        match = True
        comp_list = sorted(hash_value_table[index])
        if(len(sorted_list) !=  len(comp_list)):
            match = False
        if match:
            for i in range(0,len(sorted_list)):
                if(sorted_list[i] != comp_list[i]):
                    match = False
                    break
        if match:
            hash_key_counter[index] += 1
            if hash_key_counter[index] >= 5:
                print "thing found at ", to_num(hash_value_table[index]), "with", hash_key_counter[index]
                return True
            return False

        index = (index + 1)%hash_size
        
    hash_value_table[index] = list
    hash_key_counter[index] += 1
    return False
    

def is_cube(x):
    max_error = .0000001
    f_x = float(x)
    tri_root = x**(1.0/3.0)
    int_root = int(tri_root+max_error)
    if abs(tri_root - float(int_root)) < 2*max_error:
        if int_root*int_root*int_root == x:
            return True
    return False
    
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
    
    
for i in range(0, TRY_TO):
    cube = i*i*i
    cube_list = to_list(cube)
    add_to_hash(cube_list)