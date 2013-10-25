import re

file = open('words.txt','r')

pattern = re.compile('[\\w]+') #matches alpha numeric words

word_list = re.findall(pattern, file.read())

triangle_count = 0

for word in word_list:
    word_val = 0
    for j in range(0,len(word)):
        word_val += (ord(word[j]) - 64)
        #print word[j], "worth", (ord(word[j]) - 64)
            
    tri_val = 0
    n = 0
    while(tri_val < word_val):
        tri_val = (n*(n+1))/2
        n +=1
        if(tri_val == word_val):
            triangle_count +=1
            #print word
            break
            
            
print "count", triangle_count