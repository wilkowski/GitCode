CHECK_SIZE = 10000000 
PENTAGONAL_COUNT = 2000002 #first 2,000,000 pentagonal numbers

is_pentagonal = [False] *CHECK_SIZE

pentagonal_list = [n*(3*n-1) / 2 for n in range(0,PENTAGONAL_COUNT)] 
pent_n = 1
break_point = 0
for p in pentagonal_list:
    break_point+=1
    if(p >= CHECK_SIZE):
        print "check_filled"
        break
    else:
        is_pentagonal[p] = True

print "break_point", break_point
        
min_dif = CHECK_SIZE



def is_pentagonal_number(p):
    #p = x*(3*x-1) / 2 for some x
    #0 = 3 *x^2 -x - 2p
    #(1+sqrt(1+4*3*2p))/6
    
    val = (1.0+(1.0+24.0*float(p))**.5)/6.0
    #I don't know exactly what kind of rounding errors I might see
    if(abs(val - float(int(val))) < .000001): 
        return True
    else:
        return False
        
def pent_val(p):
    val = (1.0+(1.0+24.0*float(p))**.5)/6.0
    return int(val)
        
#for i in range(0,10):
#    print is_pentagonal_number(pentagonal_list[i])
     
#print "kk", pentagonal_list[pent_val(7042750-5482660)]
        
for j in range(2, len(pentagonal_list)):
    #if pentagonal_list[j] > CHECK_SIZE/2:
    #    print "check size too small"
    #    break
        # p(n) - p(n - 1) = n(3n - 1)/2 - (n - 1)(3n - 4)/2 = 3n - 2
    if(3*j-2+2 > min_dif): #+2 just to be safe from off by 1 errors
        print "done checking, result:", min_dif
        break
    p_j = pentagonal_list[j]
    min_k = 2
    if(min_dif != CHECK_SIZE):
        min_k = pent_val(p_j - min_dif)-1
    for k in range(min_k,j): #k>j
        
        p_k = pentagonal_list[k]
        diff = p_j - p_k
        sum = p_j + p_k
        is_pent_dif = False
        is_pent_sum = False
        if(diff < CHECK_SIZE):
            is_pent_dif = is_pentagonal[diff]
        else:
            is_pent_dif = is_pentagonal_number(diff)
        if(sum < CHECK_SIZE):
            is_pent_sum = is_pentagonal[sum]
        elif(is_pent_dif): #don't need to check sum if diff fails
            is_pent_sum = is_pentagonal_number(sum)
        if(is_pent_dif and is_pent_sum):
            if(p_j-p_k < min_dif):
                print p_j, p_k, "with dif", p_j-p_k
                min_dif = p_j - p_k
        
        
#I took the extra time to make sure I didn't miss anything rather than guessing with the first result
#I made a decent number of optimizations to reduce the checking to to a reasonable amount