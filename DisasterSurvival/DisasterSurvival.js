//sample person (copy this to create a new person)
var person = {	id: 0,
				first_name: "Sample"
				last_name: "Samp",
				gender: 'male',
				age: 20.0,
				height: 72, //inches when mature
				hair: "blond",
				ethnicity: "white", //also asian, black or latino
				orientation: 'straight',
				profession: 'office worker', //mostly cosmetic, some professions have associated job/stat bonuses
				//traits
				religion: 0, //0 atheist, 5 agnostic, 10 christian
				politics: 0, //0 republican ... 10 democrat
				ethics: 0, //0 psychopath ... 10 saint //hidden var
				stability: 0, //0 crazy ... 10 a rock //hidden var
				money: 0, //0: homeless ... 10 millionare
				//innate stats: higher is better
				strength: 0,
				intelligence: 0,
				charisma: 0,
				//skills
				hunting: 0, //includes tracking
				fighting: 0,
				mechanicing: 0, //inculdes science
				leading: 0,
				healing: 0,
				farming: 0,
				//variables
				happiness: 100.0,
				health: 100.0,
				stamina: 100.0,
				loyalty: 100.0, 
				breakoff: 0.0, //if loyalty gets here I will leave
				relationships: {}, //see below for how relationships work
				conditions: {}, //any temporary conditions
				posessions: {} //items owned/held exclusively by character (
			}
			
//relationship id: {base: 0, //0-100 how well they get along naturally 50 = neutral
//					relation: '' //is my brother/sister/father/daughter/wife/husband/boyfriend/girlfriend

//more dice means more biased toward the middle
function dice_random(min,max,dice,flip){
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
}

function basic_person(){
	var newbie = {};
	for(var key in person){ //copy all the default values immediately, use these values during a reset
        newbie[key] = person[key];
	}
	newbie[gender] = (Math.random()>.5 ? 'male' : 'female');
	newbie[height] = (newbie[gender] == 'male' ? dice_random(57,83,4) : dice_random(56,75,4));
	newbie[age] = dice_random(0,80,1); //evenly split
	newbie[religion] = dice_random(0,10,1); //evenly split
	newbie[politics] = dice_random(0,10,2,true); //very divided
	newbie[ethics] = dice_random(0,10,2); //triangle graph
	newbie[stability] = dice_random(0,10,1); //evenly split
	newbie[money] = dice_random(0,10,4); // heavily biased toward the middle
	newbie[strength] = dice_random(0,10,2);
	newbie[intelligence] = dice_random(0,10,2);
	newbie[charisma] = dice_random(0,10,2);
	newbie[relationships] = {};
	newbie[conditions] = {};
	newbie[posessions] = {};
	return newbie;
}

function new_person(){
	var newbie = basic_person();
}

function child(parent1, parent2){
	var newbie = basic_person();
}
				
function get_compatability(person1,person2){

}
function update_relationships(person1,person2,bonus){


}