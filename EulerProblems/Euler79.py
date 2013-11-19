import re

file = open('keylog.txt','r')
pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes
patterns = re.findall(pattern, file.read())

has_vals_table = [0]*len(patterns)

for i in range(0,len(patterns)):
    cur_pat = patterns[i]
    vals = [ord(cur_pat[x]) - 48 for x in [0,1,2]]
    has_vals = [False]*10
    for x in vals:
        has_vals[x] = True
    has_vals_table[i] = has_vals 
    patterns[i] = vals
    
print patterns[0], patterns[1], patterns[2]    
    
for p in patterns:
    if(p[0] == p[1] or p[0] == p[2] or p[1] == p[2]):
        print "there is a pair", p
        
        
#no pair

key_code = []

#digits not found in combo marked as True
digits_used = [False] *10

for p in patterns:
    for v in p:
        digits_used[v] = True
        
before_list = [[False]*10 for i in range(0,10)]
#before_list[a][b] is there a pattern such that b occurs before a

for p in patterns:
    for i in range(1,3):
        i_val = p[i]
        for x in range(0,i):
            x_val = p[x]
            before_list[i_val][x_val] = True
            
after_count = [0]*10 #should have called it before_count
#after_count[a] count of numbers that appear before the digit a
#after_count[a] the location in the list of digit a

for i in range(0,10):
    for x in range(0,10):
        if(before_list[i][x]):
            after_count[i] += 1
            
print after_count
    
key_code = [False]*10

for i in range(0,10):
    if digits_used[i]:
        if(key_code[after_count[i]]):
            print "error"
        key_code[after_count[i]] = i
        
print key_code
