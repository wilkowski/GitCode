Val_Table = [0]*101
for i in range(0,101):
    Val_Table[i] = [0]*101
    
    

    
#Val_Table[a][b]
#how many ways can the number a be written using only positive numbers less than or equal to b


#if b>a+1: Val_Table[a][b] = Val_Table[a][a]
#else: Val_Table[a][b] = sum from i=1 to b-1 of Val_Table[a-i][i]


for a in range(0,101):
    for b in range(0,101):
        if(a <= 1 or b <= 1):
            Val_Table[a][b] = 1
        else:
            if(b > a):
                Val_Table[a][b] = Val_Table[a][a]
            else:
                sum = 0
                for i in range(1, b+1):
                    sum += Val_Table[a-i][i] #ways to make a where i is largest value used
                Val_Table[a][b] = sum


print "ways to make 5", Val_Table[5][4], "with self", Val_Table[5][5]       
print "ways to make 100", Val_Table[100][99], "with self", Val_Table[100][100]          
    