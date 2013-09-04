





#function_array = [True,False,not,and,or,ifthen];

arg_count = [0,0,1,2,2];

usage_count = [];

function_results = []
cur_index = 0

#function has 1 non-zero integer argument n that is evaluated lazily.  
def make_lazy(func, *args):
    global function_results, cur_index
    function_results += [[]]
    index = cur_index
    def ret_func(n):
        global function_results
        eval_so_far = function_results[index]
        if(len(eval_so_far) <= n):
            for i in range(len(eval_so_far),n+1):
                print "eval", i
                function_results[index] += [func(n, *args)]
        return eval_so_far[n]
    cur_index += 1
    return ret_func
    
    
def sum(n):
    return n+5
    
lazy_sum = make_lazy(sum)

print lazy_sum(5)

#print lazy_sum(9)

def sum2(n, lazy_sum, t):
    return n+lazy_sum(n)+t
    
lazy_sum2 = make_lazy(sum2, lazy_sum, 8)

print lazy_sum2(7)
print lazy_sum2(9)

#def f_not(index,a,n):
#    eval_so_far = function_results[index];
#    if(len(eval_so_far) <= n):
#        for i in range(len(eval_so_far)+1,n+1):
#            eval_so_far[i] = not a(n)
#        return eval_so_far[n]

#each n will have some list of values associated with it including n;
#a function on those values adds to the list.  
#There is a unique function that returns a value from the previous list

#starting with boolean lists.  

#max_depth = 

def addFunc(base_pattern, func, *args):

    pass


def findPattern(pattern_array):
    #each function is calculated on the fly
    #

    func = "a"

    return func
    
    
starter_pattern = [(x%2 == 0) for x in range(0,10)]

res = findPattern(starter_pattern)

#print res(10), res(11), res(12), res(13)