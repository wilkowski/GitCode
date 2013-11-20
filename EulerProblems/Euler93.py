
RANGE_LIMIT = 10


def get_values(num_list, num_made):
    if len(num_list) == 1:
        val = num_list[0]
        int_val = int(val + .5)
        if abs(float(int_val) - val) < .000001:
            if int_val > 0 and int_val < len(num_made):
                num_made[int_val] = True
            return
    else:
        for x in range(1,len(num_list)):
            for y in range(0,x):
                x_val = num_list[x]
                y_val = num_list[y]
                leftover_list = [0]*(len(num_list)-2)
                leftover_index = 0
                for i in range(0,len(num_list)):
                    if i != x and i !=y:
                        leftover_list[leftover_index] = num_list[i]
                        leftover_index +=1
                        
                new_val_list = [x_val+y_val, x_val*y_val, x_val-y_val, y_val-x_val]
                if(y_val != 0):
                    new_val_list = new_val_list +[float(x_val)/float(y_val)]
                if(x_val != 0):
                    new_val_list = new_val_list +[float(y_val)/float(x_val)]
                    
                for new_val in new_val_list:
                    get_values(leftover_list + [new_val], num_made)
                    
longest_sequential = 0
best_list = []

#adding some arbitrary limits based on past results should help speed calculations
for i in range(1,RANGE_LIMIT):
    for j in range(3,i):
        for k in range(2,j):
            for l in range(1,k):
                num_list = [l,k,j,i]
                size_limit = i*8
                num_made = [False]*size_limit
                get_values(num_list,num_made)
                sequential = 0
                for q in range(1,len(num_made)):
                    made = num_made[q]
                    if made:
                        sequential +=1
                    else:
                        if(sequential > longest_sequential):
                            longest_sequential = sequential
                            best_list = num_list
                            print longest_sequential, "with list", best_list
                        break
                        
print longest_sequential
print best_list
                