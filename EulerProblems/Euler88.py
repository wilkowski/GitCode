#product sum numbers:
#2 * x * 1 * 1 .... = 2 + x + 1 + 1 + 1

RANGE_LIMIT = 12001

min_product_sum = [False]*RANGE_LIMIT

for i in range(2,RANGE_LIMIT):
    min_product_sum[i] = 2*i
    
base_list =[2,2]


def list_prod(list):
    prod = 1
    for l in list:
        prod = prod * l 
    return prod
    
def list_sum(list):
    sum = 0
    for s in list:
        sum += s
    return sum



def do_list_thing(num_list, index):
    
    improved = False
    while(True):
        product = list_prod(num_list) #real number
        sum = list_sum(num_list) #sum without the 1's
        k_val = len(num_list) + (product - sum) #list len + number of 1s added
        if k_val >= RANGE_LIMIT:
            break
        if(min_product_sum[k_val] > product):
            min_product_sum[k_val] = product
            improved = True
        if index > 0:
            success = do_list_thing([x for x in num_list], index - 1)
            if success:
                improved = True
        
        for i in range(0,index+1):
            num_list[i] += 1
    return improved
    
improved = True
test_list = [2]*2
test_index = 1
while(improved):
    improved = do_list_thing(test_list,test_index)
    test_index +=1
    test_list = [2]*(test_index+1)
    print "did improve", improved, "size", test_index
print [min_product_sum[i] for i in range(2,13)]

largest = 0
result_list = [False] * (RANGE_LIMIT*2)
for x in min_product_sum:
    result_list[x] = True
    
summy = 0
for i in range(0,(RANGE_LIMIT*2)):
    if result_list[i]:
        summy +=i
        
print "total min prod sum is", summy