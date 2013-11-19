TABLE_SIZE = 102

Val_Table = [0]*TABLE_SIZE
for i in range(0,TABLE_SIZE):
    Val_Table[i] = [0]*(i+1)
    
    

    
#Val_Table[a][b]
#how many ways can the number a be written using only positive numbers less than or equal to b


#if b>a+1: Val_Table[a][b] = Val_Table[a][a]
#else: Val_Table[a][b] = sum from i=1 to b-1 of Val_Table[a-i][i]
#sum from i=1 to b-2 of Val_Table[a-i][i] = Val_Table[a][b-1]
#thus sum from i=1 to b-1 of Val_Table[a-i][i] = Val_Table[a][b-1] + Val_Table[a-b][b]

table_a = [0]
table_a1 = [0,0]


p_list = [0]*500000
p_list[0] = 1
a = 1
while(True):
    if a >= len(p_list):
        p_list = p_list+[0]*len(p_list)
        print "resizing to", len(p_list)
    sum = 0
    for k in range(1,a+10):
        g_1 = k*(3*k-1)/2
        g_2 = k*(3*k+1)/2 #k*(-3*-k-1)/2
        use_g_1 = (g_1 <= a)
        use_g_2 = (g_2 <= a)
        summy = 0
        if use_g_1:
            summy += p_list[a-g_1]
        if use_g_2:
            summy += p_list[a-g_2]
        if(k%2 == 0):
            summy = -summy
        sum += summy
        if (not use_g_1) and (not use_g_2):
            break
    p_list[a] = sum
    #if(a == 5):
    #    print "ways to make 5", p_list[5]
    #elif(a== 100):
    #    print "ways to make 100", p_list[100]
    if(p_list[a] %1000000 == 0):
        print "done thingy found at", a, "with val", p_list[a]
        break
    a +=1



for a in range(0,TABLE_SIZE):
    for b in range(0,a+1):
        if(a <= 1 or b <= 1):
            Val_Table[a][b] = 1
        else:
            Val_Table[a][b] = Val_Table[a][b-1] + Val_Table[a-b][min(a-b,b)]

#print "ways to make 5", Val_Table[5][4], "with self", Val_Table[5][5]       
#print "ways to make 100", Val_Table[100][99], "with self", Val_Table[100][100]   

#print [Val_Table[i][i] for i in range(0,20)]
#print "", [Val_Table[i+2][i+2] - Val_Table[i][i] for i in range(0,19)]
        
print "done"
    