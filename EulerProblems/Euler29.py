PowerList = [False for p in range(0,101)]

for x in range(2,11):
    for n in range(2,8):
        power = x**n #x^n
        if(power >100):
            break
        else:
            if(not PowerList[power]): #only do the smallest value of x for power
                print n,power
                PowerList[power] = n 
                
distinct_terms = 0            

#distinct powers of 2:
#2^2 through 2^6^100
for a in range(2,101):
    if(not PowerList[a]): #a is not a power
        distinct_terms += 99 #b = [2,100]
    elif(PowerList[a] == 2): #a = x^2
        distinct_terms += 50#b = [51,100]
    elif(PowerList[a] == 3): #a = x^3
        count3 = 0
        for b in range(34,101): #3b >100
            if ((3*b > 200) or (3*b)%2 != 0):
                print b*3
                count3 += 1
        print "count3", count3
        distinct_terms += count3 #b = odd in [37,66] + [67,100]
    elif(PowerList[a] == 4): #a = x^4
        count4 = 0
        #I only need to do each loop once but the numbers are small/rare enough that I don't care
        for b in range(26,101): #4b >100
            if ((4*b > 200) or (4*b)%2 != 0) and ((4*b > 300) or (4*b)%3 != 0): 
                print b*4
                count4 += 1
        print "count4", count4
        distinct_terms += count4 #b = [76,100]
    elif(PowerList[a] == 5): #a = x^5
        count5 = 0
        for b in range(21,101): #5b >100
            if ((5*b > 200) or (5*b)%2 != 0) and ((5*b > 300) or (5*b)%3 != 0) and ((5*b > 400) or (5*b)%4 != 0):
                count5 += 1
                print b*5
        print "count5", count5
        distinct_terms += count5 #b = [76,100]
    elif(PowerList[a] == 6): #a = x^6
        count6 = 0
        for b in range(17,101): #6b >100
            #yes a for loop would be much better but brute force is easier in this case
            if ((6*b > 200) or (6*b)%2 != 0) and ((6*b > 300) or (6*b)%3 != 0) and ((6*b > 400) or (6*b)%4 != 0) and ((6*b > 500) or (6*b)%5 != 0):
                print b*6
                count6 += 1
        print "count6", count6
        distinct_terms += count6 #b = [76,100]
    elif(PowerList[a] == 7): #a = x^7
        print "dont get here please"
        #distinct_terms += ??? #b = [15,100]
    elif(PowerList[a] == 8): #a = x^8
        print "dont get here either"
        #distinct_terms += ??? #b = [51,100]
    else:
        print "don't get here ever"
        
        #on second thought doing the smallest valid power would have worked
        
print "terms:", distinct_terms