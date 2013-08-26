# You may, but are NOT required to, use object-oriented programming (OOP) in your solution.
# If you choose to use OOP, the methods described below should be class instance methods.

# You may put any variables that you wish to maintain at the module level:

from random import random

my_variable = 0 # Example optional module variable
initial_player_count = 0
player_count = 0

exists_uniformers = True
early_generosity = True


last_reputation = 0.0
cur_reputation = 0.0
current_round = 0.0
a_value_slope = 0.0
a_previous_round_value = 0.0
a_round_value = 0.0
b_value_slope = 0.0
b_previous_round_value = 0.0
b_round_value = 0.0
value_slope = 0.0
total_hunts_so_far = 0.0
max_rep_change = 1.0
tracked_players = []
average_reputation = 0.0
rep_location = 0
search_direction = -1.0
# Other auxiliary functions are allowed, but your script must implement at least the three
# functions below, no matter what approach you choose to use. For the OOP option, don't
# forget to add 'self' as a first argument of every function.

def hunt_choices(round_number, current_food, current_reputation, m,  player_reputations):
    #print "    SCRIPT hunts so far:", total_hunts_so_far, "\n"
    #print "    SCRIPT current reputation:", current_reputation, "\n"
    # The main routine that plays each individual round.
    # The variables passed in to hunt_choices for your use are:
    #     round_number: integer, the number round you are in.
    #     current_food: integer, the amount of food you have.
    #     current_reputation: float (python's representation of real numbers), your current reputation.
    #     m: integer, the threshold cooperation/hunting value for this round.
    #     player_reputations: list of floats, the reputations of all the remaining players in the game.
    #                         The ordinal positions of players in this list will be randomized each round.

    global current_round, last_reputation, cur_reputation, player_count
    global initial_player_count
    global exists_uniformers
    global early_generosity
    global max_rep_change
    global tracked_players
    global average_reputation, rep_location, search_direction 

    current_round = round_number
    last_reputation = cur_reputation
    cur_reputation = current_reputation
    last_player_count = player_count
    player_count = len(player_reputations)
    hunt_decisions = ['h' for x in player_reputations] #base case help everyone
    p_max_rep_change = 1.0 #the most someone's reputation could have changed last round
    #early_generosity is a good idea in theory but the initial data points are too important to be generous for long
    if round_number > 7: 
        early_generosity = False #conflicts with the primary plan to reach ideal reputation quickly
    if total_hunts_so_far > 0:
        p_max_rep_change = 1.000001 * player_count/total_hunts_so_far  #in case of rounding errors
    max_rep_change = 1.000001 * player_count/(total_hunts_so_far+player_count)
    if last_player_count != player_count:
        #position in the sorted list may change if a player died so I need to be more restrictive with tracking
        max_rep_change = max_rep_change + p_max_rep_change 
    if player_count < 2: #don't ever cooperate when there is only 1 other player
        hunt_decisions = ['s' for x in player_reputations] 
        return hunt_decisions
        
        
    if round_number <= 1: #I assume the game starts with round 1
        initial_player_count = player_count
        hunt_decisions = ['h' for x in player_reputations] 
        hunt_decisions[0] = 's'
        hunt_decisions[1] = 's' #randomly screw over two other players
        return hunt_decisions #no data for extra calculations
    elif round_number == 2: #screw everyone
        hunt_decisions = ['s' for x in player_reputations] 
    elif round_number == 3: #changed my mind, help everyone
        hunt_decisions = ['h' for x in player_reputations] 
        #don't return yet, run secondary methods
    else:
        if value_slope >= 0: #MOST IMPORTANT PART OF PROGRAM
            hunt_decisions = ['h' for x in player_reputations]
        else:
            hunt_decisions = ['s' for x in player_reputations]
        
    #Screw over any players that don't seem to care about other's reputations
    #They probably won't help me out anyway
    
    am_trackable = True
    uniformer_count = 0
    if current_food < player_count * 12: #this should never come up, but just in case
        hunt_decisions = ['s' for x in player_reputations] 
    if initial_player_count > player_count:
        exists_uniformers = False #done keeping track of that
        
    reputation_sum = 0.0
    rep_location = 0
    for x in range(0,player_count):
        p_rep = player_reputations[x]
        reputation_sum += p_rep
        if p_rep < current_reputation:
            rep_location += 1 # keeps track of where my reputation falls in the sorted list
        if (am_trackable and (abs(current_reputation - p_rep) < p_max_rep_change)):
            am_trackable = False
        if p_rep < 1/player_count: #they are 'always' a slacker
            hunt_decisions[x] = 's'
        elif p_rep > 1 - 1/player_count: #they are 'always' a hunter
            hunt_decisions[x] = 's'
        if exists_uniformers:
            total_rep = player_reputations[x] * round_number
            diff = total_rep - round(total_rep)
            if abs(diff) < 1/total_hunts_so_far: #to account for rounding errors
                uniformer_count = uniformer_count+1
                hunt_decisions[x] = 's' #if so then screw them
    average_reputation = reputation_sum/player_count
    #this part is for searching for ideal reputation location
    #if no one in the middle 70% is above average i'll be fucked
    if search_direction < 0 and (rep_location < player_count * .15):
        search_direction = 1.0
    if search_direction > 0 and (rep_location > player_count * .85):
        search_direction = -1.0
    if uniformer_count == 0:
        exists_uniformers = False #we're done keeping track of these guys
    
    trackable_players = []
    #am_trackable = False #TODO: remove me
    if am_trackable: #start keeping track of other players' reputations
        early_generosity = False
        #tracked_player array key
        #0: player reputation; 1: location in unsorted list; 2: tit tat score; 
        #3: the action; 4: expected action; 5: location in sorted list
        #For readability this would be better as an object.  For just working an array just works.  
        Expanded_List = [[z,0,0.0,'x','x',0] for z in player_reputations]
        for x in range(0,player_count): #set initial location so I can reference back later
            Expanded_List[x][1] = x
        basic_sorted_reputations = sorted(Expanded_List) #sorted() does exactly what I want without extra work
        ord_reps = [[-1.0,-1,0.0,'x','x',0]] + basic_sorted_reputations + [[2.0,-1,0.0,'x','x',0]]
        
        y = 0 #index of tracked_players
        number_tracked = len(tracked_players)
        for x in range(1,player_count+1):
            plr = ord_reps[x]
            
            plr[5] = x
            if (plr[0] - ord_reps[x-1][0]) < max_rep_change and (plr[0] - ord_reps[x-1][0]) < max_rep_change:
                #they are trackable
                while y < number_tracked and tracked_players[y][0] <= (plr[0] + p_max_rep_change):
                    in_range = (abs(plr[0] - tracked_players[y][0]) <= p_max_rep_change) #player is in range
                    matching_location = (last_player_count != player_count or plr[5] == tracked_players[y][5])
                    if in_range and matching_location: #they are the same player
                        plr[2] = tracked_players[y][2]
                        plr[4] = tracked_players[y][4]
                        #print "tracking", plr[2], "\n"
                        if plr[2] > 2.5: #this appears to be a tit tat player
                            #print "play tit tat"
                            #play tit for tat strategy with small chance of being generous
                            decision = tracked_players[y][3]
                            if random()<.05:
                                decision = 'h'
                            hunt_decisions[plr[1]] = decision
                    y += 1 
                trackable_players = trackable_players + [plr]
                
                plr[3] = hunt_decisions[plr[1]] #keep track of my action to them 
                     
    tracked_players = trackable_players
    titarray = [x[2] for x in tracked_players]
    #print titarray
    return hunt_decisions
    
def hunt_outcomes(food_earnings):
    # hunt_outcomes is called after all hunts for the round are complete.

    # Add any code you wish to modify your variables based on the outcome of the last round.

    # The variable passed in to hunt_outcomes for your use is:
    #     food_earnings: list of integers, the amount of food earned from the last round's hunts.
    #                    The entries can be negative as it is possible to lose food from a hunt.
    #                    The amount of food you have for the next round will be current_food
    #                    + sum of all entries of food_earnings + award from round_end.
    #                    The list will be in the same order as the decisions you made in that round.
    global total_hunts_so_far
    total_hunts_so_far += len(food_earnings)
    global a_previous_round_value, a_round_value, a_value_slope
    global b_previous_round_value, b_round_value, b_value_slope
    global value_slope 
    a_previous_round_value = a_round_value
    b_previous_round_value = b_round_value
    
    #tracked_player array key
    #0: player reputation; 1: location in unsorted list; 2: tit tat score; 
    #3: the action; 4: expected action; 5: location in sorted list
    for p in tracked_players:
        action = 's'
        if food_earnings[p[1]]>=0: #if the tracked player hunted
            action = 'h'
        if p[4] != 'x':
            if p[4] == action:
                p[2] += 1
            else:
                #if div_cost were /1.6 then a player who ignores my reputation approaches 0 score over long term 
                #a player must use tit tat slightly more often than by random chance to be tit-tatted back
                #I'm being pretty generous here since it might be a good idea to tit tat everyone I can track anyway
                div_cost = 1.6 * ((1.0/(1.00001 - p[0]*cur_reputation - (1-p[0])*(1-cur_reputation)))-.99999)
                p[2] -= div_cost
                #print "div_cost, cur rep, their rep", div_cost, cur_reputation, p[0]
        p[4] = p[3] #their expected action for next round is the action I took this round
        p[3] = action #their action now is what I'll do to them next round (if they are tit tat player)
    
    if current_round > 1:
        #slack/slack = -2
        #hunt/slack = -3
        #hunt/hunt = 0
        #slack/hunt = 1
        other_hunters = 0.0
        round_earnings = 0.0
        for x in food_earnings:
            if x >=0:
                other_hunters += 1.0
                
        inverse_reputation = other_hunters/player_count
                
        round_earnings = other_hunters*3.0
        #my_average_hunts = last_reputation*player_count
        #round_cost = my_average_hunts * 3+(player_count - my_average_hunts)*2
        round_cost = (last_reputation + 2.0) * player_count #hunts cost 1+2, slacks cost 2
        #per player value so dropped players don't effect results too much
        a_round_value = round_earnings/player_count #a doesn't take cost into account
        b_round_value = (round_earnings - round_cost)/player_count 
        #average_hunts = average_reputation*player_count
        #average_value = (average_hunts*3-average_hunts*3 - (player_count- average_hunts)*2)/player_count
        average_value = (-(1-average_reputation)*2)
        
    if current_round > 2:
        slope_direction = 1.0
        if cur_reputation < last_reputation: #should probably never be equal
            slope_direction = -1.0
        if early_generosity:
            a_last_slope = (a_round_value - a_previous_round_value)*slope_direction
            a_value_slope = a_value_slope * .86  + a_last_slope
        b_last_slope = (b_round_value - b_previous_round_value)*slope_direction 
        #positive slope means that value increased by having a higher reputation
        b_value_slope = b_value_slope * .94 + b_last_slope #.95
        #after testing with opponents who hunt on reputation > x, .95 had results
        #print "value", round(b_round_value,5), "slope", round(value_slope,5), "dir", slope_direction, "rep", cur_reputation, "\n"
        
    
    if early_generosity:
        value_slope = a_value_slope
    else:
        value_slope = b_value_slope
    
    #after players start dying its probably too late to drastically alter my reputation
    if (not early_generosity and player_count == initial_player_count):
        if average_value > b_round_value:
            #print "WARNING WORSE THAN AVERAGE PLAYER", average_value, b_round_value, "\n"
            #I am doing worse than the average player, change reputation now!
            value_slope = search_direction #force reputation change in current search direction
            
    

def round_end(award, m, number_hunters):
    # round_end is called after all hunts for the round are complete.

    # award - the total amount of food you received due to cooperation in the round.
    # Can be zero if the threshold m was not reached.

    # Add any code you wish to modify your variables based on the cooperation that occurred in
    # the last round.

    # The variables passed in to round_end for your use are:
    #     award: integer, total food bonus (can be zero) you received due to players cooperating
    #            during the last round. The amount of food you have for the next round will be
    #            current_food (including food_earnings from hunt_outcomes this round) + award.
    #     number_hunters: integer, number of times players chose to hunt in the last round.

    pass
    
    
#only used for testing.  lets me reset to initial conditions so I can get aggregate test results
def reset():
    global initial_player_count,player_count,exists_uniformers,early_generosity,last_reputation
    global cur_reputation,cur_reputation,current_round,a_value_slope,a_previous_round_value
    global a_round_value, b_value_slope, b_previous_round_value, b_round_value, value_slope
    global total_hunts_so_far, max_rep_change,tracked_players, average_reputation, rep_location
    global search_direction
    initial_player_count = 0
    player_count = 0
    exists_uniformers = True
    early_generosity = True
    last_reputation = 0.0
    cur_reputation = 0.0
    current_round = 0.0
    a_value_slope = 0.0
    a_previous_round_value = 0.0
    a_round_value = 0.0
    b_value_slope = 0.0
    b_previous_round_value = 0.0
    b_round_value = 0.0
    value_slope = 0.0
    total_hunts_so_far = 0.0
    max_rep_change = 1.0
    tracked_players = []
    average_reputation = 0.0
    rep_location = 0
    search_direction = -1.0
        
