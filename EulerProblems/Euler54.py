import re

file = open('poker.txt','r')

pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes

cardList = re.findall(pattern, file.read())

#print nameList

print [cardList[i] for i in range(0,11)]

new_card_list = [[0,card[1]] for card in cardList]

for i in range(0, len(cardList)):
    card = cardList[i]
    val = ord(card[0]) - 48
    val_char = card[0]
    if (val_char == 'T'):
        val = 10
    elif(val_char == 'J'):
        val = 11
    elif(val_char == 'Q'):
        val = 12
    elif(val_char == 'K'):
        val = 13
    elif(val_char == 'A'):
        val = 14
    new_card_list[i][0] = val
    #if(i < 10):
        #print new_card_list[i][0], new_card_list[i][1], card
    
player_hands = [[0,0,0,0,0] for i in range(0,(len(cardList)/5))]

#print len(player_1_hands), len(player_2_hands)

cur_hand = player_hands[0]
    
#for card in new_card_list:
hand_num = 0
for i in range(0, len(new_card_list)):
    card = new_card_list[i]
    if(i%5 == 0):
        cur_hand = player_hands[i/5]
    cur_hand[i%5] = [card[0],card[1]]
    
for i in range(0,len(player_hands)):
    player_hands[i] = sorted(player_hands[i])   
    
hand_value_list = [[0,0,0,0,0,0] for i in range(0,len(player_hands))]

for i in range(0,len(player_hands)):
    done = False
    hand = player_hands[i]
    val_table = [0]*15
    unpaired = []
    pairs = 0
    p_val = []
    triples = 0
    t_val = []
    hand_value = hand_value_list[i]
    for card in hand:
        card_val = card[0]
        val_table[card_val] +=1
        if(card_val == 14):
            val_table[1] += 1
    for v in range(2,len(val_table)):
        if(val_table[v] == 1):
            unpaired = unpaired + [v]
        elif val_table[v] == 2:
            pairs +=1
            p_val = p_val +[v]
        elif val_table[v] == 3:
            triples +=1
            t_val = t_val +[v]
        elif val_table[v] == 4:
            hand_value[0] = 7
            hand_value[1] = v
    
    if(triples == 1):
        hand_value[1] = t_val[0]
        if(pairs == 1):
            hand_value[0] = 6
        else:
            hand_value[0] = 3
    else:        
        if(pairs == 2):
            hand_value[0] = 2
            hand_value[1] = sorted(p_val)[1]
            hand_value[2] = sorted(p_val)[0]
            hand_value[3] = unpaired[0]
        elif(pairs == 1):
            hand_value[0] = 1
            hand_value[1] = p_val[0]
            hand_value[2] = sorted(unpaired)[2]
            hand_value[3] = sorted(unpaired)[1]
            hand_value[4] = sorted(unpaired)[0]
        
    for v in range(5,len(val_table)):
        if(val_table[v] == 1 and val_table[v-1] == 1 and val_table[v-2] == 1 
        and val_table[v-3] == 1 and val_table[v-4] == 1):
            hand_value[0] = 4
            hand_value[1] = v
            
    if(hand_value[0] == 0):
        for i in range(0,5):
            hand_value[5-i] = sorted(unpaired)[i] #1 to 5 of val list = sorted vals
            
    same_suit = True
    suit = hand[0][1]
    for card in hand:
        if(card[1] != suit):
            same_suit = False
            
    if(same_suit):
        hand_value[0] += 5
        
for i in range(0,len(player_hands)):
    if hand_value_list[i][0] > 3:
        print player_hands[i], hand_value_list[i]
        
p_1_wins = 0
p_2_wins = 0
for i in range(0,len(player_hands),2):
    p1_hand_val = hand_value_list[i]
    p2_hand_val = hand_value_list[i+1]
    for j in range(0,len(p1_hand_val)):
        if(p1_hand_val[j] > p2_hand_val[j]):
            p_1_wins +=1
            break
        elif(p2_hand_val[j] > p1_hand_val[j]):
            p_2_wins +=1
            break
            
            
print "p1 wins", p_1_wins, "hands"
print "p2 wins", p_2_wins, "hands"