
max = 201

count = 0

for a in range(0,max,100):
    for b in range(0,max-a,50):
        for c in range(0,max - (a+b), 20):
            for d in range(0,max - (a+b+c), 10):
                for e in range(0,max - (a+b+c+d), 5):
                    for f in range(0,max - (a+b+c+d+e), 2):
                        count +=1
                    
print count+1 #+1 for 2 pound coin