//[Bla] in text gets replaced by the result of function Bla

//The text "[Name] went to the store and talked to [Name1] about [his] day" with arguments [Bob,Amy] becomes:
//"Bob went to the store and talked to Amy about his day"
//Works nicely for most things, however it can be confusing if both args have matching gender

var f = {
	'Name':	function(args,arg_num){
		return args[arg_num]['first_name'];
	},
	'Last_Name': function (args,arg_num){
		return args[arg_num]['last_name'];
	},
	'Nick': function (args,arg_num){
		if(args[arg_num]['nick_name'] && args[arg_num]['nick_name'] != ""){
			return args[arg_num]['nick_name'];
		}else{
			return args[arg_num]['first_name'];
		}
	},
	'job': function (args,arg_num){
		return args[arg_num]['profession'];
	},
//	'Job': function (args,arg_num){
//		return capitalize(args[arg_num]['profession']);
//	},
	'age': function(args,arg_num){
		return round_to(args[arg_num]['age'],0);
	},
	'base': function(args,arg_num){
		return game['base'];
	},
	'weapon': function(args,arg_num){
		return args[arg_num]['melee_weapon'];
	},
	'weapon_action': function(args,arg_num){
		var player_weapon = args[arg_num]['melee_weapon'];
		return melee_weapon_items[player_weapon]['actions'][0]; //default to first one for now, TODO: use other action words
	},
	'weapon_hit':function(args,arg_num){
		return "hit" //TODO: make this customized for each weapon
	}
	'young': function(args,arg_num){
		var player_age = round_to(args[arg_num]['age'],0);
		if(age <13){
			return 'young';
		}else if(age < 20){
			return 'teenage';
		}else if(age < 30){
			return 'young';
		}else if(age < 60){
			return 'middle-aged';
		}else{
			return 'old';
		}
	},
	'man': function(args,arg_num){ //also does boy/girl based on the age
		var player_age = round_to(args[arg_num]['age'],0);
		if(args[arg_num].gender == "Male"){
			if(player_age < 20 && player_age > 0){
				return 'boy';
			}else{
				return 'man';
			}
		}else{
			if(player_age < 20 && player_age > 0){
				return 'girl';
			}else{
				return 'woman';
			}
		}
	},
	'hair_color': function(args,arg_num){
		return args[arg_num]['hair'];
	},
	'eye_color': function(args,arg_num){
		return args[arg_num]['eye_color'];
	}
}

//automagically add a capitalize version of all these functions


for(var f_key in f){
	var cap_key = capitalize(f_key);
	if(cap_key != f_key){
		function make_capitizer(ccap_key, ff_key){
			var un_cap_func = f[ff_key];
			f[ccap_key] = function(args,arg_num){
				return capitalize(un_cap_func(args,arg_num));
			}
		}
		make_capitizer(cap_key, f_key);
		//f[cap_key] = function(args,arg_num){
		//	return capitalize(un_cap_func(args,arg_num));
		//}
	}
}

//these get put in [] and automatically adjusted to correct gender
var gender_terms = {"he":"she","his":"her","him":"her","himself":"herself"}//"man":"woman","boy":"girl"

function generate_generics(){
	var ender_number = "";

	for(var male_key in gender_terms){
		var female_key = gender_terms[male_key]; //lots of strings
		var cap_male_key = capitalize(male_key);
		var cap_female_key = capitalize(female_key);
		function make_function(m_key, f_key){
			var m_return = m_key; //local copy //TODO: are the function args sufficient to be local var copies?
			var f_return = f_key; //local copy
			f[m_key] = function(args,arg_num){ //function key is a string, args is array of possible arguments
				if(args[arg_num]){
					var person = args[arg_num];
					if(person.gender == 'Male'){
						return m_return; //return male pronoun
					}else{ //female
						return f_return; //return female pronoun
					}
				}else{
					error("bad function"); //TODO: throw error somehow (use text or something)
				}
			}
			f[f_key] = f[m_key];//female key args work except for her->his/him ambiguity
		}
		make_function(cap_male_key,cap_female_key);
		make_function(male_key,female_key);
	}
}

generate_generics(); //[His2] will return "His" if the argument at index 2 is a male and "Her" if female

//var left_brace_match = new RegExp("\\["); //why the double escape?
//var right_brace_match = new RegExp("\]");
var number_match = new RegExp("\\d");

function edit_text(text, args){
	while(true){
		var left_brace_index = text.search(/\[/);
		var right_brace_index = text.search(/]/);
		if(left_brace_index == -1 || right_brace_index == -1){
			if(left_brace_index != right_brace_index){error("unmatched brace")};
			break; //exit loop when no more braces found
		}
		var text_funct = text.slice(left_brace_index+1,right_brace_index); //cut off braces
		var arg_number_index = text_funct.search(number_match);
		var arg_number = 0; //default value;
		if(arg_number_index != -1){ //the number at the end is which argument to use eg [His2] = the given argument in position 2
			arg_number = text_funct.slice(arg_number_index) * 1;
			text_funct = text_funct.slice(0,arg_number_index); //remove the number at the end
		}
		var f_to_use = f[text_funct];
		if(!f_to_use){
			error("ERROR: " + text_funct + " text function not found");
			break;
		}
		var replacement_text = f_to_use(args,arg_number); //get the text
		if(replacement_text + "" == "undefined"){ //this happens if there is some error in the f_to_use
			error("text func failed: " + text_funct);
		}
		var text_start = text.slice(0,left_brace_index);
		var text_end = text.slice(right_brace_index+1);
		text = text_start + replacement_text + text_end; //replace the middle part with the new text
	}
	var vowel_list = ['a','e','i','o','u'];
	for(var vowel in vowel_list){
		text = text.replace(" a " + vowel_list[vowel], " an " + vowel_list[vowel]); //occasionally articles end up wrong so just fix these
	}
	return text;
}

//slightly modified version of above (yeah, yeah I know I could abstract it, but with only 2 functions now, copy paste is easier to understand)
function status_out(text,args){
	while(true){ //something probably went wrong if more than one status is found in a single section
		var left_curly_index = text.search(/{/); // find the {
		var right_curly_index = text.search(/}/); //find the }
		if(left_curly_index == -1 || right_curly_index == -1){
			if(left_curly_index != right_curly_index){error("unmatched brace")};
			break; //exit loop when no more curly braces found 
		}
		var new_status = text.slice(left_curly_index+1, right_curly_index); //cut off braces
		var arg_number_index = new_status.search(number_match);
		var arg_number = 0; //default value;
		if(arg_number_index != -1){ //the number at the end is which argument to use eg {Hungry2} = the given argument in position 2 of args
			arg_number = new_status.slice(arg_number_index) * 1;
			new_status = new_status.slice(0,arg_number_index); //remove the number at the end
		}
		text = text.slice(0,left_curly_index) + text.slice(right_curly_index+1); //remove the {} section
		set_status(args[arg_number], capitalize(new_status));
	}
	return text;
}