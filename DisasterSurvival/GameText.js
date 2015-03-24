//each section of text has
//text: the text of the passage show to the player; sections in [] are modified before being shown
//chars: the number of player objects required for the text.  
//pre_run: (optional) function to run on text/args before text is shown. NOTE: must return text
//run: (optional) function to be run after text is shown (generally contains player choices etc.)
//choice_run: (optional) function to be run after the result of the next player choice;
//req: (optional) function taking args(matching funct args) that must be met for for text to be used.  
//rel: (optional) effect on relationships of characters involved in story (may be positive or negative effect)

//Gender stuff in brackets should be male, so instead of writing he or she write [he] and it will automagically be linked to the character's gender.  Since [her] could be altered to either 'his' or 'him', male gender terms are preferred.  

var introduction_stories = {
Intro1: {	text:"Thousands of red and orange leaves were littered across a desolate highway cutting through an old forest.  A half mile down the road the forest opens up to a few houses with broken windows at the edge of a town.  The wind blew, sweeping the leaves past a lone figure walking in the middle of the road.  The figure appeared to be a . . .",
			chars: 0,
			run: function(){player_choice(starter_character, "gender", "Male","Female"); next_story = "Intro2";}
		},
Intro2: {	text:"of roughly age . . .",
			chars: 0,
			run: function(){player_choice_number(starter_character, "age")},
			choice_run:  function(){
				starter_character = basic_person(starter_character); //fill out character details
				update_character_pane(starter_character); //add character where its needed since old starter was replaced
				all_characters = [starter_character];
				current_args = [starter_character];
				
				if(starter_character.age<=0){
					next_story = "Intro3_unborn";
				}else if(starter_character.age <4){
					next_story = "Intro3_infant";
				}else if(starter_character.age <10){
					next_story = "Intro3_child";
				}else if(starter_character.age <20){
					next_story = "Intro3_teen"; //not a dead end
				}else if(starter_character.age <75){
					next_story = "Intro3_adult"; //not a dead end
				}else if(starter_character.age <110){
					next_story = "Intro3_oldie";
				}else{
					next_story = "Intro3_ancient";
				}
			}
		},
Intro3_unborn:{	text:"Since [Name] had not even been born yet, it is very odd that the [man] came to be walking down a road at the present time.  [He] continued walking down the road until [he] reached the town.  As [he] approached a woman emerged from behind one of the houses brandishing a shotgun at the traveller.  [Name] reacted impossibly fast, pulling a silver tube from [his] pocket and pointing it at the woman.  A bright light erupted from the tip of the silver tube as the air between the two figures sizzled with heat.  The shotgun exploded in the woman's hands and blood erupted from her chest as she fell backwards onto the ground.  [Name] breathed a sigh of relief and approached the crumpled body on the ground.  [Name] bent over the figure gasping her final breaths of air.  [He] bent over looked at the face of the woman who had threatened [him], and recoiled in horror.  [He] recognized her face, [he] knew it all too well.  [His] hand began to shake; [he] tried to steady it but the shaking grew stronger and stronger.  Soon the skin from [his] hand began peeling off as droplets of blood flew off turning to dust in the air.  [Name] couldn't even scream as [his] lungs turned to dust, and within a few seconds [his] entire body had been reduced to a fine powder upon the ground{Dead}.  For a moment everything was still, then the color began to fade from the world.  The buildings and trees began to disintegrate, covering the earth with a fine grey powder.  The earth then slowly faded out of existence.  \n \n Apparently it is a bad idea for a time traveller to kill their own ancestor.",
			chars: 1,
			run: function(){}},
Intro3_infant:{ text:"[Name] fell down and immediately started crying{Crying}. For a few minutes the only sound that could be heard was the loud bawling of the infant.  The baby's loud crying attracted a wild dingo, perhaps escaped from a zoo.  The dingo picked up the baby with its mouth and then tossed [him] into the air.  The crying stopped as the infant gasped in surprise.  In the next moment the dingo had opened its mouth wide showing its sharp white teeth, and let the baby fall in, swallowing [him] whole{Dead}.  It was a rather large dingo.  [Name] was far too young to survive on [his] own in this world.  ",
			chars: 1,
			run: function(){}},
Intro3_child:{ text:"[Name] walked along the road, stopping to pick up an interesting rock.  [His] tummy growled with hunger and [he] looked around to see if by any chance there was anything to eat{Hungry}.  [He] noticed a patch of white mushrooms growing by the side of the road.  [He] approached them and bent down to examine the mushroom.  They were similar to the white ones [he] had once seen [his] parents eat but it was a little more round and yellowish.  [He] picked one and brought it up to [his] nose, smelling its earthy scent.  [His] stomach growled again and [he] took a tentative bite of the mushroom.  It tasted like Styrofoam but [his] hunger got the best of [him] and [he] finished the entire mushroom.  It wasn't very tasty but at least it was something to fill [his] belly.  [Name] then picked and ate three more mushrooms.  {Default}[He] felt a little better and continued walking along the road as the sun began to set on the horizon filling the sky with a brilliant red and orange glow.  [He] yawned as the sky began to grow dark and walked over to a nearby tree{Tired}.  [He] pushed some leaves into a pile and then curled up on top of [his] makeshift bed.  [He] closed [his] eyes and though of the home [he] used to know{Sleeping}...  A few hours later [he] awoke to pain in [his] stomach and nausea{Sick}.  [He] clutched [his] stomach in pain as [he] looked around in the darkness.  [He] could make out faint points of light in the sky but [his] vision was growing darker moment my moment.  Nausea came with the pain as well and soon [Name] found [him]self puking up stomach acid.  But it did nothing to relieve the pain.  It felt like a hot poker was digging into [his] guts.  [He] started crying softly \"It hurts. It hurts.\".  \"Somebody make it stop hurting.\" The small lights in the sky turned to black before [his] eyes.  Tears flowed from [his] eyes as [he] cried out into the dark\"Mommy\"... \"Mommy where are you?\". [His] conciousness faded away as the pain overwhelmed [his] small body{Dead}.  [Name] was too young to know how dangerous it is to eat wild mushrooms.",  
			chars: 1,
			run: function(){}},
Intro3_teen:{ text:"[Name] took a protein bar out of [his] backpack and bit into it",
			chars: 1,
			run: function(){next_story = "Intro4";}},
Intro3_adult: {	text:"[Name] hopped over the concrete barrier, keeping [his] eyes fixed on the buildings ahead.  [He] drew [his] [weapon] from [his] hip and approached the first building quietly, watching for any sign of movement.  So far so good. [He] reached the wall of the first house, pressing [his] back against the peeling blue paint and peered around the corner.  Still no signs of movement.  [He] continued along down the side of the house.  Suddenly a figure lurched at [him] from behind a bush.  [He] brought [his] arm up, pointing [his] [weapon] at the the cold grey face staring at [him].  Before [he] could move any further a cold hand had latched tightly on [his] arm{Fighting}.  It had large breasts but it was no longer a human being, it was of the dead now.  [Name] stepped back while yanking [his] arm away but the figure held on tightly.  [He] took another quick step back as it's dead eyes stared at [him].  It began toppling forward, twisting [his] arm in the process.  [He] brought [his] knee up to its head as it came down, delivering a heavy blow but even that did nothing to lessen its grip on [him].  It fell over onto its back and [Name] brought [his] knee down onto its head.  It squirmed about underneath [him] but [Name] had it almost completely under control.  [He] swapped [his] [weapon] over to [his] other hand and quickly thrust it into the the zombie's skull.  The zombie gave one final death throw before laying still, however it still maintained its grip on [his] arm.  [He] pulled the [weapon] out from the zombie's head and gagged slightly at the thick black liquid covering it.  [Name] pulled away again but the dead fingers remained tight around [his] arm.  [He] sighed with disgust and sliced at the zombie's wrist until its grip finally loosened enough for [him] to free [him]self{Default}.  [Name] gave the zombie an angry kick in the side before continuing along the side of the house.",
			chars: 1,
			run: function(){next_story = "Intro4";}},
Intro3_oldie:{ text:"There were only a few hours left before night and [Name] shuddered at the thought of spending it outside in the darkness.  approached the town carefully.  ",
			chars: 1,
			run: function(){set_status(starter_character,'Dead');}},
Intro3_ancient:{ text:"[Name] plodded along slowly putting one foot in front of the other as [he] continued down the road.  Something nagged at the back of [his] mind, something that [he] had forgotten long ago.  The memory slowly started to return to [his] brain, it was something that old people did.  Ah ha!  Of course, the one thing that all old people do.  They die.  And with that [Name] promptly dropped dead{Dead}.",
			chars: 1,
			run: function(){}},

Z_Intro:{ text:"",
			chars:1}
}

var base_discovery_stories = {
Base_1:	{text:"An old warehouse a few blocks down the street caught [Name]'s eye.  [He] walked briskly, reaching the large metal gates of the warehouse shortly.  All the gates were closed and trying to open one would probably attract a lot of unwanted attention.  [Name] walked around to the side of the warehouse and discovered a plain metal door on the side.  [He] placed [his] hand on the cool metal doorknob and gave it a twist.  It turned easily in [his] hand.  [Name] drew [his] weapon and cracked open the door, staring intently into the darkness inside.  [He] opened the door slowly to let more light into the warehouse, [his] eyes darting back and forth around searching for any sign of movement.  The warehouse held a few dozen refrigerator sized boxes on pallets but not a living thing was in sight.  [Name] took a step inside.  A black shadow moved by [his] feet and [he] felt [his] entire body tense as [he] brought down [his] [weapon] upon it.  [He] missed and the black form scuttled along the floor, brushing against [his] foot.  It darted out into the sunlight.  A second one ran past [his] feet sporting a small grey tail.  \"Rats\" [he] thought.  [Name] brought up [his] [weapon] again and continued cautiously inside.  As [his] eyes adjusted, [he] could see that the warehouse was mostly empty and the floor was covered with a fine layer of dust and rat droppings, no one had been here for quite some time.  [He] approached the boxes and could just make out the labels in the darkness.  The pictures on the boxes indicated that they contained unassembled furniture, too big to easily transport but would make for effective barricades.  The only entrances were the door [he] came in and the large metal gates used by the trucks.  Although the location was easily defensible, it was nearly pitch black even during the day.  If a solution could be found to that problem it would be an almost ideal location.", 
			chars:1,
			run: function(){new_base('warehouse');}},
Base_2:	{text:"[Name] spotted a two story house down the block with small windows and a clear view of the street.  The house seemed reasonably easy to defend.  [Name] walked up to the house and tried the door.  \nUnlocked.  \n  Someone had probably been here already.  As [Name] opened the door [he] was hit by the stench of rotten flesh.  Something dead was definitely inside.  Weighing [his] options, [Name] decided to continue investigating the house.  It looked as though it had once been kept in a pristine condition, but now papers were and knick-knacks were scattered over the floor.  [Name] decided to investigate the downstairs area first, it would be easier to escape if [he] got into a fight.  As [he] walked down the hallway a crooked picture on the wall caught [his] eye: A perfect family portrait of a mom and dad enjoying a picnic with their daughter in a grassy field.  They all looked so perfectly ignorant of the horrors that would befall them.  [Name] walked slowly into the kitchen where dozens of tiny black flies buzzed around a pile of unidentifiable rotten food on the floor.  A shoe poked out from behind the kitchen island.  [He] held [his] nose and walked slowly around the counter.  The body of a woman lay sideways across the floor.  ",
			chars:1,
			run: function(){new_base('house');}}
}

//stories for when the player decides to send characters out to get supplies.  
var raid_stories = {
Raid1: {	text: "[Name] walked alone along the road toward the old warehouse.  [He] looked up and saw the night sky was pitch black, darker than [he] had ever seen it before.  Millions of tiny points of light poked through the black sky above [him] with the brilliant white moon shining above the horizon.  The greyish glow from the city lights that used to fill the sky was gone.  [He] had never really paid much attention to the stars before, but today they were a beautiful comfort, helping [him] forget about the horrors [he] had seen.  ",  
			chars:1}
// ROMANCE: Romantic outing - 2 romance compatible characters on scouting mission.  Characters enter old building, they get trapped for some reason - they are stuck for a while, one character talks about their past.  Eventually they escape through ingenuity/ luck/ whatever
//INTRO: Raiding a house, find someone already staying there, (skill check): held at weapon point/ suprising the person living there... dialogue
//INTRO: Find zombies surrounding a house, someone is trapped inside, player rescues them
//NEUTRAL: Friendly outing - 2 characters on longish drive together. One talks about their past
//NEUTRAL: Friendly outing - 2 characters on drive togetherVehicle breaks down, repair attempted while (past discussion) If success mission proceeds, if failure eventually picked up by rest of group.
}

//The bulk of the non player controlled events
//Generally events that happen to characters left at the base
var random_events = {
	//INTRO: injured or hungry or thirsty person approaches base: player can save them or turn them away
	//BAD: zombie attacks base, player is injured or killed
	//BAD: Someone snuck in and stole supplies
	//BAD: rats got to some of the food
	//BAD: accident, some gas was spilled
	//GOOD: player wandering around, finds some supplies.  
	//NEUTRAL: players have a chat
	//NEUTRAL: (radio) something important is heard on the radio
	//NEUTRAL: discussion between players (a few of these)
	//NEUTRAL: if pair is left alone they might talk or hook up
	//BAD: two players get into a fight
	//NEUTRAL: someone from another group comes looking for help (supplies manpower fighting or whatever)
	//NEUTRAL: moping/paying respects after someone died
}

var triggered_stories = {
	Game_over:	{text:"There is no one left to continue the story.",
			chars:1,
			run: function(){dead_end();}}
	//Low on food/water/fuel warning
	//ran out of food/water/fuel warning
	//character death
	//Character unsatisfied and runs away
	//
}

//When characters tell somebody about their past
var characters_past_stories = {
	//Various job/age specific stories about a character's past
}

var discussion_stories = {

}
var story_groups = {'introduction_stories':introduction_stories, 'raid_stories':raid_stories, 'base_discovery_stories':base_discovery_stories, 'random_events': random_events, 'triggered_stories':triggered_stories}

var all_stories = {}; //MAYBE DO: move stories and all to a proper database thing such as sql.  
for(var group_key in story_groups){
	var group = story_groups[group_key];
	for(story_key in group){
		all_stories[story_key] = group[story_key]; //copy all the stories into the all stories dict.  
	}
}