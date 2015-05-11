from math import log

import re
file = open('base_exp.txt','r')
pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes
word_list = re.findall(pattern, file.read())

print word_list[0],word_list[1]

def to_num(list):
    sum = 0
    for i in list:
        sum = sum*10
        sum +=i
    return sum

num_list = [to_num([ord(l)-48 for l in word]) for word in word_list]

print num_list[0],num_list[1]

largest_val = 0
index = 0

for i in range(0,len(num_list), 2):
    num1 = num_list[i]
    num2 = num_list[i+1]
    val = log(num1) * float(num2)
    if(val > largest_val):
        largest_val = val
        index = i/2
        print "large num at",index, "with", num1, "^", num2
        
print "line number", index+1       