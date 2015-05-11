import rg

from random import random

class Robot:
    def act(self, game):
        def Get_Action_For(bot, game, depth):
            # if we're in the center, stay put
            loc_types = rg.loc_types(self.location)
            for type in loc_types:
                if type == 'spawn':
                    return ['move', rg.toward(self.location, rg.CENTER_POINT)]

            # if there are enemies around, attack them
            min_dist = 100
            closest_enemy = False
            occupied_locations = []
            
            def occupied(loc, occ_loc):
                for location in occ_loc:
                    if location == loc:
                        return True
                return False
                
            for loc, bot in game['robots'].iteritems():
                if bot.player_id != self.player_id:
                    bot_dist = rg.wdist(loc, self.location)
                    if bot_dist <= min_dist:
                        min_dist = bot_dist
                        closest_enemy = loc
                if(bot.player_id == self.player_id and rg.wdist(loc, self.location) <=4):
                    if(depth > 0):
                        action = Get_Action_For(bot, game, depth-1)
                        if action[0] == 'move':
                            occupied_locations.append(action[1])
                            if(action[1] == self.location): #moving into this bots space
                                occupied_locations.append(loc)
                        else:
                            occupied_locations.append(loc)
                    else:
                        occupied_locations.append(loc)
                
            if(closest_enemy):
                best_target = False
                best_dist = 5
                if(min_dist >= 2):

                    for targ in rg.locs_around(self.location , filter_out=('invalid', 'obstacle')):
                        if rg.dist(targ,closest_enemy) < best_dist and not occupied(targ, occupied_locations):
                            best_target = targ
                            best_dist = rg.dist(targ,closest_enemy)
                if(min_dist == 2):
                    if(best_target):
                        if(game['turn']%1 == 0):
                            return ['move', best_target]
                        else:
                            return ['attack', best_target]
                    else:
                        return ['guard'] #stuck bot, do nothing
                if(min_dist <= 1):
                    return ['attack', closest_enemy]
                else:
                    if(best_target):
                        return ['move', best_target]
                    elif(self.location != rg.CENTER_POINT):
                        return ['move', rg.toward(self.location, rg.CENTER_POINT)]
                    else:
                        return ['guard']
            # move toward the center
            if(self.location != rg.CENTER_POINT):
                return ['move', rg.toward(self.location, rg.CENTER_POINT)]
            else:
                return ['guard']
    
        return Get_Action_For(self, game, 1+random()%2)