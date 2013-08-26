# This test program should identify the common mistakes
# that you can make, and suggest how you can fix them.
# There are many other things that can be checked, and
# we advise you to add the test cases yourself.

# HOW TO EXECUTE:

# If you are using python shell:
#   import tester
#   tester.run_tests('filename_of_your_script.py')
# If you are using the command line:
#   python tester.py filename_of_your_script.py


import sys
import importlib
from random import random
player_count = 30
hunts = 0.0
skips = 0.0
rep = 0.0
strategy_value = 0.0
mean_odds = 0.05 # don't change since it leads to unreachable states

times_to_test = 1
game_duration = 100
overall_value = 0.0
rep_values = [random() for x in range(0,player_count)]

test_reps = [random() for x in range(0,player_count)]
player_choices = []

def run_tests(script_name):
    global hunts, skips, rep, strategy_value, overall_value, rep_values
    try:
        user_module = importlib.import_module(script_name[:-3])
        if hasattr(user_module, 'Player'):
            try:
                user_module = user_module.Player()
            except:
                print("\nPlayer did not instantiate, make sure it is a class. "
                      "Proceeding assuming non OO code.\n")
    except:
        print ("\nCould not import %s\n" % script_name)
        raise
    
    average_rep = 0.0
    for y in range(0,times_to_test):
        rep_values = [random() for x in range(0,player_count)]
        #for i in range(0,player_count):
        #    if random() > (1-mean_odds):
        #        rep_values[i] = 2
        hunts = 0.0
        skips = 0.0
        rep = 0.0
        strategy_value = 0.0
        

        user_module.reset()
        for x in range(1,game_duration):
            test_hunt_choices(user_module, x)
            test_hunt_outcomes(user_module)
            test_round_end(user_module)

        #print "all tests done \n"
        #print "strategy value:", strategy_value - hunts, "\n"
        overall_value += (strategy_value-hunts)
        average_rep += hunts/(hunts+skips)
    print "average_value:", overall_value/ times_to_test, "rep avg", average_rep/times_to_test

def test_hunt_choices(user_module, round):
    """Checks if hunt_choices runs and returns the correct output"""
    global hunts
    global skips
    global rep
    rep = 0.0
    if hunts+skips > 0:
        rep = hunts/(hunts+skips)
    try:
        #decisions = user_module.hunt_choices(round, 300*player_count, rep, 5, 
        #                                     [random()*(1-mean_odds) for x in range(0,player_count)])
        decisions = user_module.hunt_choices(round, 300*player_count, rep, 5, test_reps )
        for x in decisions:
            if x == 'h':
                hunts = hunts+1
            else:
                skips = skips+1
    except AttributeError:
        print("\nFunction hunt_choices is not defined properly.\n")
        raise # shows the exact exception given by python 
    except:
        print("\nError running hunt_choices.\n")
        raise

    #is the output of the correct length
    if not decisions or len(decisions) != player_count:
        raise BaseException("The array of decisions from hunt_choices "
                            "does not have a correct length. Please match"
                            "each opponent with a decision.")

    #is the output of the correct format
    for decision in decisions:
        if decision not in 'hs':
            raise BaseException("Incorrect format of the decisions. "
                                "Please use strings \"h\" or \"s\" only.")
    #print("hunt_choices ran successfully!\n")


def test_hunt_outcomes(user_module):
    global strategy_value
    """Checks if hunt_outcomes runs"""
    #rep_values = [random() for x in range(0,player_count)]
    outcomes = [-2 for x in range(0,player_count)]
    for x in range(0,player_count):
        if rep > rep_values[x] and random() > (mean_odds):
            outcomes[x] = 0
            strategy_value+=3.0
    #if rep < .25:
    #    outcomes = [-2 for x in range(0,player_count)]
    try:
        user_module.hunt_outcomes(outcomes)
    except AttributeError:
        print("\nFunction hunt_outcomes is not defined properly.\n")
        raise
    except:
        print("\nError running hunt_outcomes.\n")
        raise
    #print("hunt_outcomes ran successfully!\n")

def test_round_end(user_module):
    """Checks if round_end runs"""
    try:
        user_module.round_end(0,4,3)
    except AttributeError:
        print("\nFunction round_end is not defined properly.\n")
        raise
    except:
        print("\nError running round_end.\n")
        raise
    #print("round_end ran successfully!\n")

if __name__ == "__main__":
    try:
        filename = sys.argv[1]
    except IndexError:
        print ("\nYou must include the filename that contains your code "
               "as the only argument to this script.\n\n"
               "Example: python tester.py filename_of_your_script.py\n")
        raise
    else:
        run_tests(filename)