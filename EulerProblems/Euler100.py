
#a/b * (a-1)/(b-1) = 1/2
#a*(a-1) = 2* b (b-1)

ratio = 2.0**(-.5)
total_disks = 10**0+1
while(total_disks < 10**0+100000):
    blue_disks = int(total_disks*ratio+1)
    #(blue_disks / total_disks) * (blue_disks-1/total_disks-1) == 2
    error = 2* blue_disks * (blue_disks - 1) - total_disks *(total_disks-1)
    #print error
    if(error == 0):
        print blue_disks, "/", total_disks
        #break
    total_disks += 1
    
#The raito of successive pairs appears to approach some limit
#I don't know what the limit is nor why but it seems a good way to find working numbers
pair_a = [3,4]
pair_b = [15,21]
while(True):
    ratio_num = float(pair_b[0])/float(pair_a[0])
    ratio_denom = float(pair_b[1])/float(pair_a[1])
    start_num = int(pair_b[0]*ratio_num)
    start_denom = int(pair_b[1]*ratio_denom)
    while(2*start_num*(start_num-1) != start_denom*(start_denom-1)):
        if(2*start_num*(start_num-1) < (start_denom*(start_denom-1))):
            start_num += 1
        else:
            start_denom += 1
        #print "+1"
    pair_a = pair_b
    pair_b = [start_num,start_denom]
    print start_num, "/", start_denom
    if start_denom > 10**12:
        break
