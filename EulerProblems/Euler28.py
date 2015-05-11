sum = 1

corner = 3

count = 1
adder = 2

#add up the corners of the spiral
while(corner <= 1002001): #last corner at 1002001
    #print corner
    sum += corner
    count += 1
    corner += adder
    
    if(count == 4):
        count = 0
        adder +=2

        
print "diagonal sum:", sum