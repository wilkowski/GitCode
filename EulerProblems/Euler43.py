

def copy(list):
    return [list[x] for x in range(0,len(list))]

int_list = []
int_used = [False]*10
                                            
run_sum = 0
                                            
to_be_checked = [False, False, False, 2,3,5,7,11,13,17]
def loop_thing(int_list, int_used, check_point):
    global run_sum
    l = len(int_list)
    for x in range(0,10):
        if(not int_used[x]):
            div_check = to_be_checked[check_point]
            if ((not div_check) or ((100*int_list[l-2] + 10 * int_list[l-1] + x) % div_check == 0)):
                new_int_list = copy(int_list) + [x]
                new_int_used = copy(int_used)
                new_int_used[x] = True
                if(check_point < len(to_be_checked)-1):
                    loop_thing(new_int_list, new_int_used, check_point + 1)
                else:
                    num = 0
                    for n in range(0, len(new_int_list)):
                        num = num *10
                        num += new_int_list[n]
                    run_sum += num
                    print num #actually only 6 numbers that work
                    
loop_thing(int_list, int_used, 0)           
    
print "sum", run_sum    
    