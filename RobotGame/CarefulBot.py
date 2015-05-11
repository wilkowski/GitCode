import rg

from random import random

min_attack, max_attack = rg.settings.attack_range

print "running careful bot"

class Robot:
    def act(self, game):
        def Get_Action_For(self_bot, game, depth):            
            def adjacent_bots(loc, game):
                ret_list = []
                robot_dict = game['robots']
                for targ in rg.locs_around(loc , filter_out=('invalid', 'obstacle')):
                    if robot_dict.has_key(targ):
                        ret_list.append(robot_dict[targ])
                if robot_dict.has_key(loc):
                    ret_list.append(robot_dict[loc])
                return ret_list
                
            def occupied(loc, occupied_space_list):
                for location in occupied_space_list:
                    if location == loc:
                        return True
                return False    
                
            def places_to_go(from_loc, occupied_space_list):
                ret_list = []
                nearby_places = rg.locs_around(from_loc , filter_out=('invalid', 'obstacle'))
                if(game['turn']%10 == 0 or game['turn']%10 == 9):
                    nearby_places = rg.locs_around(from_loc , filter_out=('invalid', 'obstacle', 'spawn'))
                for targ in nearby_places:
                    if not occupied(targ,occupied_space_list):
                        ret_list.append(targ)
                return ret_list
            
            is_in_spawn = False
            loc_types = rg.loc_types(self_bot.location)
            for type in loc_types:
                if type == 'spawn':
                    is_in_spawn = True

            # if there are enemies around, attack them
            min_dist = 1000
            closest_enemy = False
            occupied_locations = []
                
            bots_attacking_me = 0.0
            adjacent_enemies = 0

            for bot in adjacent_bots(self_bot.location, game):
                if bot.player_id != self_bot.player_id:
                    adjacent_enemies +=1
                    attention = 0.000000001 #should always be at least 1
                    friendlies = adjacent_bots(bot.location, game)
                    for f_bot in friendlies:
                        if f_bot.player_id == self_bot.player_id:
                            attention +=1.0
                    bots_attacking_me += 1.0/attention
                
            for loc, bot in game['robots'].iteritems():
                if loc != self_bot.location:
                    if bot.player_id != self_bot.player_id:
                        bot_dist = rg.wdist(loc, self_bot.location)
                        if bot_dist <= min_dist:
                            min_dist = bot_dist
                            closest_enemy = loc

                    if(bot.player_id == self_bot.player_id and rg.wdist(loc, self_bot.location) <=4):
                        if(depth > 0):
                            action = Get_Action_For(bot, game, depth-1)
                            if action[0] == 'move':
                                occupied_locations.append(action[1])
                                if(action[1] == self_bot.location): #moving into this bots space
                                    occupied_locations.append(loc)
                            else:
                                occupied_locations.append(loc)
                        else:
                            occupied_locations.append(loc)

            if(bots_attacking_me > 1.6 or (adjacent_enemies > 0 and is_in_spawn and game['turn']%10 == 0)): #try to run away or suicide
                if(self_bot.hp <= max_attack):
                    return ['suicide']
                else:
                    #try to run away
                    for targ in places_to_go(self_bot.location , occupied_locations):
                        nearby_enemy = False
                        for enemy_bot in adjacent_bots(targ, game):
                            if enemy_bot.player_id != self_bot.player_id: 
                                nearby_enemy = True
                                break
                        #print nearby_enemy
                        if not nearby_enemy:
                            return ['move', targ] 
                    #failed to find escape:
                    if(self_bot.hp <= bots_attacking_me*max_attack):
                        return ['suicide']
            if(self_bot.hp < max_attack and adjacent_enemies >=2):
                return ['suicide']
                
            if(closest_enemy):
                best_target = False
                best_dist = 1000
                if(min_dist >= 2):
                    for targ in places_to_go(self_bot.location , occupied_locations):
                        if rg.dist(targ,closest_enemy) < best_dist:
                            best_target = targ
                            best_dist = rg.dist(targ,closest_enemy)
                if(min_dist == 2):
                    if(best_target):
                        return ['move', best_target]
                    else:
                        return ['guard'] #stuck bot, do nothing
                if(min_dist <= 1):
                    return ['attack', closest_enemy]
                else:
                    if(best_target):
                        return ['move', best_target]
                    elif(self_bot.location != rg.CENTER_POINT):
                        return ['move', rg.toward(self_bot.location, rg.CENTER_POINT)]
                    else:
                        return ['guard']
            # move toward the center when no nearby enemies
            if(self_bot.location != rg.CENTER_POINT): #only happens if no living enemies
                return ['move', rg.toward(self_bot.location, rg.CENTER_POINT)]
            else:
                return ['guard']

        return Get_Action_For(self, game, 1+random()%2)