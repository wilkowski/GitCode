def is_valid_cube(using):
    check_0 = (using[0] or (using[1] and using[4] and (using[9] or using[6])))
    if not check_0:
        return False
    check_1 = (using[1] or (using[0] and (using[9] or using[6]) and using[8]))
    if not check_1:
        return False
    check_2 = (using[2] or using[5])
    if not check_2:
        return False
    check_3 = (using[3] or (using[9] or using[6]))
    if not check_3:
        return False
    check_4 = (using[4] or (using[9] or using[6]))
    if not check_4:
        return False
    return True
    
def has_pair(cube1, cube2, pair):
    cube1_copy = [x for x in cube1]
    cube2_copy = [x for x in cube2]
    var1 = pair[0]
    var2 = pair[1]
    
    if cube1_copy[6] or cube1_copy[9]:
        cube1_copy[9] = True
        cube1_copy[6] = True
    if cube2_copy[6] or cube2_copy[9]:
        cube2_copy[9] = True
        cube2_copy[6] = True
    
    if((cube1_copy[var1] and cube2_copy[var2]) or (cube1_copy[var2] and cube2_copy[var1])):
        return True
    else:
        return False
        
pair_list = [[0,1],[0,4],[0,9],[1,6],[2,5], [3,6], [4,9], [6,4], [8,1]]
    
def is_valid_pair(cube1, cube2):
    global pair_list
    for p in pair_list:
        if not(has_pair(cube1, cube2, p)):
            return False
    return True
        
def to_list(num):
    result = []
    val = num
    while(val >0):
        result = [val%10] + result
        val = val/10
    if num < 100000:
        result = [0] + result
    return result
    
count = 0    
    
for i in range(12345, 456789):
    list_i = to_list(i)
    testable = True
    for x in range(0,5):
        if list_i[x] >= list_i[x+1]:
            testable = False
            break
    if testable:
        used_list = [False] * 10
        for n in list_i:
            if used_list[n]:
                print "bad error, doubling up", i
            used_list[n] = True
        if is_valid_cube(used_list):
            count +=1
        
print "number of possible cubes", count

all_possible_cubes = [False]*count

index = 0
#its fast I can do it twice
for i in range(12345, 456789):
    list_i = to_list(i)
    testable = True
    for x in range(0,5):
        if list_i[x] >= list_i[x+1]:
            testable = False
            break
    if testable:
        used_list = [False] * 10
        for n in list_i:
            if used_list[n]:
                print "bad error, doubling up", i
            used_list[n] = True
        if is_valid_cube(used_list):
            all_possible_cubes[index] = [z for z in used_list]
            index +=1

print "possible cubes made"            
run_sum = 0            
            
for i in range(0,len(all_possible_cubes)):
    cube_i = all_possible_cubes[i]
    for j in range(0,i+1):
        cube_j = all_possible_cubes[j]
        if is_valid_pair(cube_i, cube_j):
            run_sum +=1
            
print "final result", run_sum