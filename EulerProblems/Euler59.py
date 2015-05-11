import re

file = open('cipher1.txt','r')
pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes
char_list = re.findall(pattern, file.read())

print [char_list[i] for i in range(0,10)]

numberList = [0] * len(char_list)

for i in range(0,len(char_list)):
    char = char_list[i]
    if len(char) == 1:
        numberList[i] = ord(char[0])-48
    elif len(char) == 2:
        numberList[i] = (ord(char[0])-48)*10 + (ord(char[1])-48)
    else:
        print "error char too big"
        break
        
       
print [numberList[i] for i in range(0,10)]

print len(numberList), "characters"

for a in range(ord('a'),ord('a')+26):
    for b in range(ord('a'),ord('a')+26):
        for c in range(ord('a'),ord('a')+26):
            key = [a,b,c]
            charTable = [''] * len(numberList)
            freq_table = [0] * 128
            for i in range(0,len(numberList)):
                val = numberList[i] ^ key[i%3]
                freq_table[val]+=1
                charTable[i] = chr(val)
            if(freq_table[ord(' ')] > 200): #most common character is usually a space
                text = ''
                sum = 0
                for char in charTable:
                    sum += ord(char)
                    text = text + char
                print text
                print "HAS SUM VALUE:", sum

