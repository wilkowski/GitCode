
from random import randint

def f_true(n):
    return True
    
def f_false(n):
    return False
    
def f_not(n,a):
    return not a

def f_and(n,a,b):
    return a and b
    
def f_or(n,a,b):
    return a or b
    
def f_then(n,a,b):
    if a:
        return b
    else:
        return False

base_function_array = [f_true,f_false,f_not,f_and,f_or,f_then]
func_names = ['true','false','not','and','or','if then']

arg_count = [0,0,1,2,2,2];

if not (len(base_function_array) == len(arg_count)):
    print "error wrong length arrays"
    raise Exception('bad length')

usage_count = [];

function_results = []
function_recursion_depth = []
func_array = []
func_name_array = []
cur_index = 0

#function has 1 non-zero integer argument n that is evaluated lazily.  
def make_lazy(func, depth, *args):
    global function_results, cur_index, function_recursion_depth
    #function_recursion_depth += [depth]
    function_results += [[]]
    index = cur_index
    print "adding func at index", index
    def ret_func(n):
        if n < 0:
            return "NULL";
        global function_results
        eval_so_far = function_results[index]
        if(len(eval_so_far) <= n):
            #calculate the missing results from end of eval_so_far to n
            print "evaling more stuff of function", index, "range(", len(eval_so_far), ",", n+1, ")"
            add_tbl = [func(i, *args) for i in range(len(eval_so_far),n+1)]
            print "added to eval", add_tbl
            function_results[index] += add_tbl
        return eval_so_far[n]
    cur_index += 1
    return ret_func
    
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

max_depth = 5

def addFunc(base_pattern, func, depth, *args):
    global func_array
    result = make_lazy(func, depth, *args)
    print "added at index", len(func_array)
    func_array += [result]
    for i in range(depth,len(base_pattern)):
        if result(i) != base_pattern[i]:
            return False
     
    print "FOUND MATCH!!!!!!!!!!!!!"
    return result #found matching function
    pass

def error(n):
    raise Exception('do not call me')
    
working_array = []

def findPattern(pattern_array):
    global working_array, func_name_array
    working_array = pattern_array
    result_function = error
    def prev(n):
        global working_array
        if n == len(working_array)+1:
            working_array += [result_function(n-1)]
        return working_array[n-1]
    addFunc(working_array, prev, 1)
    func_name_array += ["prev"]
    base_array_length = len(base_function_array) # = len
    for i in range(0,max_depth):
        func_to_add_index = randint(0, base_array_length-1)
        def addScoping(): #necessary so that func_args dont get overridded by next loop iteration
            
            print 'adding', func_names[func_to_add_index]
            func_to_add = base_function_array[func_to_add_index]
            func_args = []
            func_name_added = []
            for j in range(0,arg_count[func_to_add_index]):
                arg_to_add = randint(0,len(func_array)-1)
                print "giving it arg", arg_to_add
                func_used = func_array[arg_to_add]
                func_args += [func_used]
                func_name_added += [func_name_array[arg_to_add]]
            
            def newFunc(n):
                print "function number", i+1
                print "func_args:", func_args
                print "arg_names:", func_name_added
                args = tuple([f(n) for f in func_args])
                return func_to_add(n, *args)
            return newFunc
            
        scoped_function = addScoping()
                
        res = addFunc(working_array, scoped_function, 1) #TODO: fix depth later
        func_name_array += [func_names[func_to_add_index]]
        if res:
            result_function = res
            return result_function
            
            
    #addFunc(
    #each function is calculated on the fly
    #


    print "failed to find pattern"
    return False
    
    
starter_pattern = [(x%2 == 0) for x in range(0,10)]

res = findPattern(starter_pattern)

print "done, now getting more stuff"
if res:
    print res

    res_array = [res(n) for n in range(10,20)] 

    print "extra results:", res_array

testing = False
if(testing):
    def sum(n):
        return n+5
        
    lazy_sum = make_lazy(sum,0)

    print lazy_sum(5)

    print lazy_sum(5)
    print lazy_sum(5)

    def sum2(n):
        return n+lazy_sum(n)
        
    lazy_sum2 = make_lazy(sum2,0)

    print lazy_sum2(7)
    print lazy_sum2(9)