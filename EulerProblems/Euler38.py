   
for i in range(9,9876):
    digitsUsed = 0
    digitsList = [False]*10
    digitsList[0] = True
    goodNumber = True
    xn = i
    while(digitsUsed < 9 and goodNumber):
        xxx = xn
        while(xxx > 0):
            digit = xxx%10
            if(digitsList[digit]):
                goodNumber = False
            else:
                digitsList[digit] = True
                digitsUsed +=1
            xxx = xxx/10
        xn = xn+i
    if(goodNumber):
        print i,2*i,3*i,4*i,5*i
        
        
#small enough result list ~15 that I can go through it manually