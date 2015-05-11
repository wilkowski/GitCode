space_probabilities = [1.0/40.0] * 40


def normalize():
    global space_probabilities
    sum = 0.0 
    for x in space_probabilities:
        sum +=x
    for i in range(0, len(space_probabilities)):
        space_probabilities[i] = space_probabilities[i]/sum
        
DIE = 4

DIE_SQUARE = float(DIE)*float(DIE)

#odds for exactly 2,5,8,11 etc doubles in a row:
#1/die^2* (die-1)/die + 1/die^5* (die-1)/die + ...
#

next_jail_odds = ((float(DIE)-1.0)/float(DIE)) * (1.0/(DIE_SQUARE) + 1.0/(DIE_SQUARE*DIE_SQUARE*float(DIE)))
        
        
for variable in range(0,1000):
    new_board = [0.0]*40
    for i in range(0,40):
        base_val = space_probabilities[i]
        roll_val = base_val/(DIE_SQUARE)
        for rollA in range(1,DIE+1):
            for rollB in range(1,DIE+1):
                special_val = roll_val
                #approximation for rolling 3 doubles in a row (not completely accurate)
                if(rollA == rollB):
                    #rough odds previous rolls were doubles
                    new_board[10] += special_val* next_jail_odds #directly to jail
                    special_val = special_val * (1.0 - next_jail_odds) #usually proceed normally
                total_roll = rollA + rollB
                new_space = (i+total_roll)%40
                if(new_space == 7 or new_space == 22 or new_space == 36): #chance
                    new_board[0] += special_val* 1.0/16.0 #to go
                    new_board[10] += special_val* 1.0/16.0 #to jail
                    new_board[11] += special_val* 1.0/16.0 #to C1
                    new_board[24] += special_val* 1.0/16.0 #to E3
                    new_board[39] += special_val* 1.0/16.0 #to H2
                    new_board[5] += special_val* 1.0/16.0 #to R1
                    next_rail = (new_space+10-((new_space+5)%10))%40
                    new_board[next_rail] += special_val* 2.0/16.0 #to next rail
                    if(new_space == 22):
                        new_board[28]+= special_val *1.0/16.0 #to next utility
                    else:
                        new_board[12]+= special_val *1.0/16.0 #to next utility
                    new_board[new_space] += special_val *6.0/16.0 #no move
                    special_val = special_val *1.0/16.0 #back 3 spaces
                    new_space = (new_space-3)%40#back 3 spaces
                    
                if(new_space == 2 or new_space == 17 or new_space == 33): #community chest
                    new_board[0] += special_val* 1.0/16.0 #to go
                    new_board[10] += special_val* 1.0/16.0 #to jail
                    new_board[new_space] += special_val* 14.0/16.0
                elif(new_space == 30):
                    new_board[10] += special_val #go to jail
                else:
                    new_board[new_space] += special_val
                
    space_probabilities = new_board        
    normalize() #make sure rounding errors don't compound, 
                #(not necessary if calculations are very accurate)

#print space_probabilities
max_val = 0
max_space = 40
for i in range(0,40):
    if space_probabilities[i] > max_val:
        max_space = i
        max_val = space_probabilities[i]
max_val_2 = 0
max_space_2 = 40
for i in range(0,40):
    if(space_probabilities[i] > max_val_2 and i != max_space):
        max_space_2 = i
        max_val_2 = space_probabilities[i]
max_val_3 = 0
max_space_3 = 40
for i in range(0,40):
    if(space_probabilities[i] > max_val_3 and i != max_space and i!= max_space_2):
        max_space_3 = i
        max_val_3 = space_probabilities[i]
print max_space, space_probabilities[max_space]
print max_space_2, space_probabilities[max_space_2]
print max_space_3, space_probabilities[max_space_3]
#print 0, space_probabilities[0]