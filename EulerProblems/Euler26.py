max_length = 0
longest = 0

for i in range(1,1000):
    remainders = [1]
    remainder = 1
    hasMatch = False
    while(not hasMatch):
        remainder = (remainder*10) %i
        if(remainder == 0):
            hasMatch = True
            break
        for r in range (0,len(remainders)):
            if(remainders[r] == remainder):
                length = len(remainders) - r
                if(length >= max_length):
                    print i,length
                    max_length = length
                    longest = i
                hasMatch = True
                break
        if(not hasMatch):
            remainders = remainders + [remainder]
            
            
            
print "longest is", longest, "with length", max_length