fib = [1]

for i in range(1,12):
    fib = fib + [fib[i-1]*i]
    
print fib[4]


permutations = 1000000-1

resultarray = [0,1,2,3,4,5,6,7,8,9]
#                          [6] fib[3]
while(permutations > 0):
    for i in range(0,11):
        if(fib[i] > permutations):
            permutations = permutations-fib[i-1]
            resultIndex = 10 - i
            resultarray[resultIndex] = resultarray[resultIndex] + 1
            done = False
            while(not done):
                done = True
                for j in range(0, resultIndex):
                    if(resultarray[j] == resultarray[resultIndex]):
                        resultarray[resultIndex] = resultarray[resultIndex] + 1
                        done = False
                        
            for k in range(resultIndex+1, 10):
                resultarray[k] = 0
                done = False
                while(not done):
                    done = True
                    for j in range(0, k):
                        if(resultarray[j] == resultarray[k]):
                            resultarray[k] = resultarray[k] + 1
                            done = False
            break                
                            
                            
print resultarray
                