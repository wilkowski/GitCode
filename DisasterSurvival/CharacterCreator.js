//sample person (copy this to create a new person)
var character_count = 0;

var person = {	id: 0,
				first_name: "Sample",
				last_name: "Samp",
				gender: "Male",
				age: 20.0,
				height: 72, //inches when mature
				hair: "blond",
				eye_color: "blue",
				ethnicity: "white", //also Asian, black or Latino
				orientation: 'bi', //the more potential pairings the better (possibility for full gay groups is amusing)
				profession: 'office worker', //mostly cosmetic, some professions have associated job/stat bonuses
				//traits
				religion: 0, //0 atheist, 5 agnostic, 10 Christian
				politics: 0, //0 republican ... 10 democrat
				ethics: 0, //0 psychopath ... 10 saint //hidden var
				stability: 0, //0 crazy ... 10 like a rock //hidden var
				money: 0, //0: homeless ... 10 millionaire (effects social status mainly)
				//innate stats: higher is better
				strength: 0,
				intelligence: 0,
				charisma: 0,
				//skills
				raiding: 0, //includes tracking
				fighting: 0,
				mechanicing: 0, //inculdes science, crafting, etc
				leading: 0, //giving out orders
				healing: 0, //doctory stuff
				farming: 0,
				//variables
				happiness: 100.0,
				health: 100.0,
				stamina: 100.0,
				loyalty: 100.0, 
				breakoff: 0.0, //if loyalty gets here I will leave
				relationships: {}, //see below for how relationships work
				conditions: {}, //any temporary conditions
				posessions: {}, //items owned/held exclusively by character (
				role: 'none', //what the character is currently doing
				status: 'Healthy' //what shows up on the character pane
			}
			
//relationship id: {base: 0, //0-100 how well they get along naturally 50 = neutral
//					relation: '' //is my brother/sister/father/daughter/wife/husband/boyfriend/girlfriend

//more dice means more biased toward the middle
function dice_random(min,max,dice){ //dice number cannot be 0
	var flip = false;
	if(dice < 0){ 
		flip = true; 
		dice = -dice;
	}
	var result = min;
	var die_size = (max-min)/dice;
	for(var i=0; i<dice; i++){
		result+= Math.random()*die_size;
	}
	if(flip){ //flip each half about quarter sections abcd -> badc (for probability graph)
		var average = (max+min)/2
		if(result> average){
			result = max - (result - average);
		}else{
			result = min + (average - result);
		}
	}
	return result;
}

var stat_ranges_dice = {
	height: [57,83,4],
	age: [20,80,1],
	religion: [0,10,1],
	politics: [0,10,-2],
	ethics: [0,10,2],
	stability: [0,10,1],
	money: [0,9,4], //cap is naturally 1 lower, can be increased
	strength: [0,10,2],
	intelligence: [0,10,3],
	charisma: [0,10,2],
	//skills vary from 0 to 10 for everyone but typically start very low
	//5 is able to perform skill well, 10 is perfect
	raiding:[0,2,1],
	fighting:[0,3,1],
	mechanicing:[0,3,1],
	leading: [0,5,1],
	healing: [0,2,1],
	farming: [0,2,1]
}

var gender_list = {	"Male": {'strength':[1,0]},  
				"Female": {'height':[-1,-7]}  };
				
var profession_list = {	
	"bar tender": {'charisma': [1,0]},
	"barber": {},
	"blogger": {'charisma': [1,0],'stability': [0,-2]},
	"butcher":{},
	"cashier": {},
	"chef":{},
	"child":{'age':[-20,-70],'religion':[1,-1],'money':[0,-1], 'strength':[0,-4],'stability':[0,-2],'fighting':[0,-2],'leading':[0,-3]},
	"cop":{'strength':[2,0], 'politics':[0,-3],'stability':[2,0],'intelligence':[0,-1],'raiding':[2,2],'fighting':[4,4],'leading':[1,1]},
	"doctor":{'age':[10,0], 'money':[2,1], 'intelligence':[2,0], 'stability':[2,0],'healing':[6,6]},
	"farmer":{'strength':[2,0],'raiding':[2,2],'mechanicing':[1,1],'farming': [6,6]},
	"journalist": {'charisma': [1,0],'ethics': [1,0]},
	"judge":{'age':[10,0],'ethics':[3,0],'money':[1,1],'stability':[1,0],'leading':[1,1]},
	"lawyer":{'ethics':[0,-3],'money':[2,1]},
	"marine":{'strength':[3,0],'stability':[4,0],'politics':[0,-4],'fighting':[6,6],'leading':[2,2]},
	"mechanic":{'strength': [1,0], 'mechanicing':[4,4]},
	//"None":{'stability':[0,-1],'money':[0,-2]},
	"nurse":{'stability':[1,0],'fighting':[0,-1],'healing':[3,3]},
	"office worker":{'money':[1,-1]},
	"pastor":{'religion':[5,0],'politics':[0,-3],'charisma': [2,0],'leading':[3,2]},
	"plumber": {'mechanicing':[1,1]},
	"politician":{'age':[10,0],'money':[3,1],'ethics':[0,-3],'charisma':[4,0],'leading':[3,3]},
	"student":{'age':[-10,-55], 'strength':[0,-1], 'stability':[0,-1],'leading':[0,-2]},
	"scientist": {'intelligence':[3,0], 'religion': [0,-3],'politics':[3,0],'money':[0,1],'mechanicing':[3,2]},
	"store owner":{'money':[1,1],'leading':[2,2]},
	"software engineer": {'intelligence': [2,0], 'strength': [0,-2],'politics':[2,0],'leading':[0,-2]},
	//"Stripper":{},
	//"Paramedic":{},
	//"Prostitute:{},
	"teacher":{'intelligence':[1,0], 'religion': [0,-1],'politics':[1,0],'ethics':[1,0],'leading':[2,1]},
	"truck driver": {'strength':[1,0],'intelligence':[0,-1]},
	"veterinarian":{'age':[5,0], 'money':[2,0],'intelligence':[2,0],'healing':[4,4]},
	"waiter":{'age':[0,-30],'charisma':[1,0]},
};

//currently trying to avoid gender neutral names since it can make things a little confusing
//Half of the names of interesting famous people or fictional people are good (subtle names are best)(need tons and tons of last names)
var male_names = ["Aaron", "Adam", "Anthony", "Ash", "Bill", "Ben", "Chris", "Charlie", "David", "Eric", "George", "Hector", "Isaac", "Jack", "Jake", "Joel", "Joseph", "Joshua", "Luke", "Malcolm", "Michael", "Morty", "Noah", "Patrick", "Paul", "Rick", "Sam", "Simon", "Thomas", "Tony", "Tyler", "Wesley", "Xander"];
var female_names = ["Anne", "Aria", "Betty", "Caitlyn", "Chandra", "Chelsea", "Christina", "Diana", "Elizabeth", "Ellie", "Hannah", "Jane", "Jessica", "Kate", "Lauren", "Lisa", "Lois", "Lucy", "Lyra", "Maria", "Mary", "Megan", "Nia", "River", "Rose", "Sabriel", "Sabrina", "Sarah", "Sasha", "Trisha", "Willow", "Zelda"];
var nick_names = {David:"Dave", Joseph: "Joe", Joshua:"Josh", Michael: "Mike", Thomas: "Tom", Trisha: "Trish"}
var last_names = ["Ackerman", "Aldrin", "Armstrong", "Barnes", "Beleren", "Black", "Blouse", "Brando", "Burkle", "Buvelle", "Chase", "Clegane", "Comstock", "Costa", "Deel", "Dian", "Dixon", "Ford", "Franks", "Fredricksen", "Fuller", "Gallagher", "Gecko", "Gerald", "Goodwin", "Hastur", "Jefferson", "Johnson", "Kent", "Lars", "Leonhart", "Liebert", "Lockhart", "MacGuffin", "Macintosh", "Makise", "McDonald", "Meruem", "Muntz", "Newell", "Nimoy", "North", "Organa", "Parr", "Reynolds", "Robinson", "Russo", "Shepard", "Slate", "Smith", "Spade", "Sparrow", "Stanfield", "Stark", "Stinson", "Sutton", "Swanson", "Tam", "Tenma", "Tepplin", "Titor", "Todd", "Troyard", "Vess", "Walker", "Wallace", "White", "Wilkowski", "Williams"];
//var ethnicities = ["white","hispanic","black","asian"] //(maybe everyone just default to white? or let reader imagine race?)

var starter_weapons = ["axe", "kitchen knife", "cleaver"] //bladed start

var hair_color_list = ["blond", "brown", "black", "red"]
var eye_color_list = ["blue", "green", "brown"]

var characteristic_lists = {'gender':gender_list, 'profession':profession_list, 'last_name':last_names}
//d&d style stat creation using dice
function basic_person(fixed_characteristics_list){
	var newbie = {};
	for(var key in person){ //copy all the default values immediately, use these values during a reset
        newbie[key] = person[key];
	}
	if(!fixed_characteristics_list){
		fixed_characteristics_list = {};
	}
	var fixed_age = fixed_characteristics_list['age']; //youngins can't have jobs yet (generally)
	if(fixed_age){
		if(fixed_age >= 0 && fixed_age < 10){
			fixed_characteristics_list['profession'] = "child";
		}else if(fixed_age >= 10 && fixed_age < 20){
			fixed_characteristics_list['profession'] = "student";
		}
	}
	
	var stat_bonuses = {};
	for(var stat in stat_ranges_dice){
		stat_bonuses[stat] = [0,0];
	}
	function set_characteristic(characteristic,list,value){
		newbie[characteristic] = value;
		var charteristic_bonuses = list[characteristic]
		for(var bonus_type in charteristic_bonuses){
			stat_bonuses[bonus_type][0] += charteristic_bonuses[bonus_type][0];
			stat_bonuses[bonus_type][1] += charteristic_bonuses[bonus_type][1];
		}
	}
	
	for(var characteristic in characteristic_lists){
		var char_list = characteristic_lists[characteristic];
		if(fixed_characteristics_list[characteristic]){
			set_characteristic(characteristic,char_list,fixed_characteristics_list[characteristic]); //use predetermined one
		}else{
			set_characteristic(characteristic,char_list,rand_dict_key(char_list));//get a random one and set it
		}
	}
	
	for(var stat in stat_ranges_dice){
		if(fixed_characteristics_list[stat]){
			newbie[stat] = fixed_characteristics_list[stat];
		}else{
			
			var array = stat_ranges_dice[stat];
			var min = array[0] + stat_bonuses[stat][0];
			var max = array[1] + stat_bonuses[stat][1];
			var dice = array[2];
			newbie[stat] = dice_random(min,max,dice);
			//write_text(stat + " being added " + newbie[stat] + " " + min +" " + max + " " +dice );
		}
	}
	//this stuff is handled differently
	newbie['relationships'] = {};
	newbie['conditions'] = {};
	newbie['posessions'] = {};
	newbie['melee_weapon'] = "kitchen knife";
	if(newbie['gender'] == "Male"){
		newbie['first_name'] = rand_from_list(male_names);
	}else{
		newbie['first_name'] = rand_from_list(female_names);
	}
	newbie['last_name'] = rand_from_list(last_names);
	if(fixed_characteristics_list['last_name']){
		newbie['last_name']=fixed_characteristics_list['last_name'];
	}
	newbie['hair'] = rand_from_list(hair_color_list);
	if(newbie['hair'] == "Red"){newbie['hair'] = rand_from_list('hair_color_list');} //red is rare so reroll;
	if(newbie['age'] > dice_random(45,70,2)){newbie['hair'] = "Grey"} //old people get grey hair
	newbie['eye_color'] = rand_from_list(eye_color_list);
	character_count += 1;
	newbie['id'] = character_count; //1 indexed, not 0 indexed, which shouldn't matter for uniqueID
	return newbie;
}

//function new_person(fixed_characteristics_list){
//	var newbie = basic_person(fixed_characteristics_list);
//	return newbie;
//}


var copy_traits = ['last_name','hair','height', 'ethnicity','profession']
function make_child(parent1, parent2){
	if(!parent2){ //if we aren't given a second parent then make one randomly
		parent2 = basic_person({'age':parent1.age}) //copy age from first parent //random gender doesn't matter
	}

	var fixed_chars = {};
	
	for(var stat_key in person){
		if(Math.random() < .5 || stat_key == 'last_name' || stat_key == 'hair' || stat_key == 'eye_color' || stat_key == 'ethnicity'){ //50% chance of copying a stat from a parent, some stats are always copied
			if(stat_key != 'gender' && stat_key != 'first_name'){//some are never copied
				if(Math.random() < .5){ //get the stat from a random parent
					fixed_chars[stat_key] = parent1[stat_key];
				}else{
					fixed_chars[stat_key] = parent2[stat_key];
				}
			}
		}
	}
	var max_age = Math.min(parent1.age-17,parent2.age-17) //17 years younger than the younger of the two parents
	var min_age = Math.max(parent1.age-40,parent2.age-40) //40 years younger than the older of the two parents
	fixed_chars['age'] = dice_random(min_age,max_age,2); //random in between
	//profession gets fixed automatically based on age
	return basic_person(fixed_chars);
}
				
function get_compatability(person1,person2){

}
function update_relationships(person1,person2,bonus){

}

function aged_height(character){
	var height = character.height;
	if(character.age < 17 && character.age >= 0){
		height = 30 + (character.age/17)*(character.height-30) //scale height based on age
	}
	return height;
}

var stat_descriptors = {
	'low_religion': "is not religious",
	'very_high_religion': "is very religious",
	//politics
	'very_low_money': "comes from a poor family.",
	'high_money': "has a rich family.",
	'high_strength': "is fairly strong",
	'very_low_intelligence': "is not the brightest",
	'very_high_intelligence': "is quite clever",
	'high_charisma': "gets along well with others",
	'average_raiding':"knows where to find supplies",
	'high_raiding': "knows where to find supplies",
	'average_fighter': "has been in a few fights",
	'high_fighter': "has significant combat experience",
	'average_mechanicing': "is good with machines",
	'high_mechanicing': "is very good with machines",
	//high_leading
	'high_healing': "has treated a few injuries",
	'high_healing': "is skilled at treating wounds"
	//farming //farming is boring, might not be worthwhile to include
}

function generate_bio(character){
	//"[Name] [Last_Name]"
	var height = aged_height(character);
	var result_text = "" //"Age " + round_to(character.age,0) + " and " + Math.floor(height/12) + "'" + Math.floor(height%12) + "''";
	//if(character.profession != "Child"){ result_text = result_text + ", " + character.profession;}
	//character.first_name;
	
	var description_text = "[Name] is a [Age] year old [man] with [hair_color] hair and [eye_color] eyes.  ";
	if(character.profession != "child"){ description_text = description_text + "[He] is a [job].  "}
	var special_descriptors = [];
	function add_if_found(text_key){ //short function to add found description to special_descriptors
		if(stat_descriptors[text_key]){ special_descriptors.push(stat_descriptors[text_key])}
	}
	for(var stat_key in stat_ranges_dice){//stat_ranges_dice has all the variable stats that the description is based on
		var stat_val = character[stat_key];
		if(stat_val < 1){add_if_found("very_low" + stat_key)};
		if(stat_val < 2.5){add_if_found("low_" + stat_key)};
		if(stat_val > 3.5 && stat_val <= 7.5){add_if_found("average_" + stat_key)};
		if(stat_val > 7.5){add_if_found("high_" + stat_key)};
		if(stat_val > 9){add_if_found("very_high_" + stat_key)};
	}
	while(special_descriptors.length > 0){
		description_text = description_text + "[Name] " + special_descriptors.shift();
		if(special_descriptors.length > 0){
			description_text = description_text + " and " + special_descriptors.shift();
		}
		description_text = description_text + ".  ";
	}
	return result_text + edit_text(description_text,[character]);
}

function add_text_line(text, location){
	var text_div = document.createElement('div');
	text_div.innerHTML = text;
	//text_div.style.cssFloat = "left";
	insert_end(text_div, location);
	return text_div;
}

function make_character_pane(character){
	var new_character_div = add_text_line("", character_pane);
	var status_text = add_text_line(character.status,new_character_div);
	status_text.style.cssFloat = "right";
	status_text.className = character.status; //statuses get colored by their classname
	var char_name_div = add_text_line(character.first_name + " " + character.last_name, new_character_div);
	var appearance_text = (character.gender == "Male" ? "M" : "F");
	appearance_text = appearance_text + " " + aged_height(character);
	//char_name_div.style.cssFloat = "left";
	var char_bio_div = add_text_line(generate_bio(character), new_character_div);
	return new_character_div;
}

function update_character_pane(character){
	if(character['pane_ref'] != null){
		var old_char_pane = character['pane_ref'];
		var new_char_pane = make_character_pane(character); //make a new pane
		insert_after(new_char_pane, old_char_pane); //put it where the old one is
		remove_element(old_char_pane); //remove the old one;
		character['pane_ref'] = new_char_pane;
	}else{
		character['pane_ref'] = make_character_pane(character);
	}
}

