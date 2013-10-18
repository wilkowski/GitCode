import re

file = open('names.txt','r')

#print file.read()

#namelist = file.read()

#print file.readline()

pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes

nameList = re.findall(pattern, file.read())

sortedList = sorted(nameList)

#print sortedList[938]

#print sorted(nameList) #works to sort names yay

run_sum = 0

for i in range(0,len(sortedList)):
    name = sortedList[i]
    index = i+1
    name_val = 0
    for j in range(0,len(name)):
        name_val += (ord(name[j]) - 64)
    if(name_val == 53):
        print name, index, name_val * index
    name_val = name_val * index
    run_sum += name_val
    
        
print "total at end", run_sum
    

