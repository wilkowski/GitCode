var main_pane = document.getElementById('main_pane');
var character_pane = document.getElementById('character_pane');

var starter_character = {
}

var all_characters = [starter_character]


//var event = [story, [arg1, arg2, ...]];

//TODO: put all these into a dict so they can be saved easily
var events_so_far = []; //each story passage so far along with its arguments (for saving)
var event_calender = {}; //all scheduled events
var queued_events = []; //small so using .push() and .shift() is fine
var next_story = "Intro1"; //the next text story to show to the player
var current_args = [starter_character]; //arguments for whatever the current story is
var next_passage = null;
var passage_sentences = [];
var sentence_index = 0;
var after_choice_func = null;
//var run_func = null;
var resources = {	hours: 0, //hours since the event occurred
					food: 0,
					water: 0,
					gas: 0,
					medicine: 0,
					pistol_ammo: 0,
					shotgun_ammo: 0,
					rifle_ammo: 0
				}
				
var group_states = {
	food: 'enough', //none, rationed, enough, plenty
	food_note: '', //Last announcement made about food
	water_note: '',
	gas_note: ''
}

var game = {
	base: "none",
	new_base: "none"
}
//TODO: any setup
//TODO: load game

var game_state = "run"; //"choice", "pause"

//var choice_option = false;
//var in_progress = false;

//TODO: smooth autoscroll?

function add_element(type, text, class_name){
	var new_element = document.createElement(type);
	new_element.innerHTML = text;
	if(class_name){ new_element.className = class_name;}
	insert_end(new_element, main_pane);
	main_pane.scrollTop = main_pane.scrollHeight; //autoscroll
	return new_element;
}
var last_text_element;
function write_text(text){
	var text_line = add_element('div', text, 'text_line');
	last_text_element = text_line;
	return text_line;
}

function append_text(text){
	last_text_element.innerHTML = last_text_element.innerHTML + text;
	main_pane.scrollTop = main_pane.scrollHeight; //autoscroll
}

function error(text){ //smae as write text but red color
	var text_line = add_element('div', text, 'text_line');
	text_line.style.color = "#EE0000"; //red text
	last_text_element = text_line;
	return text_line;
}

var choice_button_list = [];

function choice_finish(){ //delete the buttons from the screen and reset the list
	for(var num in choice_button_list){
		var button = choice_button_list[num];
		remove_element(button);
	}
	choice_button_list = [];
	game_state = "run"
	//choice_option = false;
	if(after_choice_func){
		after_choice_func();
		after_choice_func = null;
	}
}

function choice_setup(button, val, assign_dict, key){
	button.onclick = function(){
		assign_dict[key] = val;
		choice_finish();
		write_text(val);
		//TODO: record choice
	}
}

//TODO: way to show different text than the literal choice
function player_choice(assign_dict, key, choice1, choice2, choice3, choice4, choice5){
//TODO record choice option;
	game_state = "choice";
	//choice_option = true;
	var choices_list = [choice1, choice2, choice3, choice4, choice5]; //max 5 choices for now
	for(var button_num in choices_list){
		var choice_val = choices_list[button_num];
		if(choice_val != null){
			var choice_button = add_element('button', choice_val, 'choice_button')
			choice_setup(choice_button, choice_val, assign_dict, key);
			choice_button_list.push(choice_button);
		}
	}
}

function number_choice_setup(assign_dict, key, input_field, choose_button){
	function click_enter(){
		var entered_val = input_field.value;
		var is_number = new RegExp("-?\\d+.?\\d*"); //optional - followed by number with optional . and more numbers
		if(entered_val.match(is_number)){
			var number_converted = entered_val * 1; //make it into a number
			write_text(number_converted); //turn it back into text (gets rid of excess 0s)
			assign_dict[key] = number_converted;
			choice_finish();
		}else{
			var text_note = write_text("A number is required.");
			choice_button_list.push(text_note);
		}
	}
	choose_button.onclick = function(){click_enter();};
	$(input_field).keydown(function(keypress){
		if(keypress.which == 13){click_enter();}; //hitting enter also submits text
	});
}

function player_choice_number(assign_dict, key){ //probably only used for the age thing
	game_state = "choice";
	//choice_option = true;
	var input_field = add_element('input')
	input_field.type = 'text';
	input_field.id = 'number_input';
	choice_button_list.push(input_field);
	var choose_button = add_element('button', "Ok", 'choice_button');
	choice_button_list.push(choose_button);
	number_choice_setup(assign_dict, key, input_field, choose_button);
}

//Assemble all possible stories to tell
function get_story_for(story_type, args){
	var valid_stories = [];
	var grouped_stories = story_groups[story_type];
	for(var possible_story_key in grouped_stories){
		var possible_story = grouped_stories[possible_story_key];
		if(possible_story['chars'] == args.length){
			valid_stories.push(possible_story_key);
		}
	}
	if(valid_stories.length == 0){
		error("ERROR: no " + story_type + " found for " + args.length + " arguments");
	}
	
	var result_story = rand_from_list(valid_stories);
	//error(valid_stories.length
	return result_story;
}

//var period_match = new RegExp("\\.");
//var sentence_match = /[^\.]*\./g; //not . followed by a . (return array of all matches)
//big mess o' fun!
var sentence_match = /[^.?!]*([.?!]\"?|$)/g; //[not . ? or !] followed by a [. ? !] (return array of all matches) also " added to end if found

//Find something to show to the player
function next_text_passage(){
	if(next_story == null || next_story == ""){
		if(queued_events.length > 0){
			var q_event = queued_events.shift();
			next_story = q_event[0];
			current_args = q_event[1];
		}else if(game.base == "none"){
			next_story = get_story_for('base_discovery_stories', all_characters);
		}else{
			//TODO: figure out next story
			error("error missing story");
		}
	}
	next_passage = all_stories[next_story];
	events_so_far.push([next_story,current_args]); //TODO: figure out how to make it save properly
	next_story = ""; //next story has been used
	
	//parse the text and prepare it to be written out
	function setup_text_passage(){
		//current_args
		var next_text = next_passage['text'];
		var pre_run_func = next_passage['pre_run'];
		var choice_run_func = next_passage['choice_run'];
		if(pre_run_func){
			next_text = pre_run_func(next_text,current_args);
		}
		if(choice_run_func){
			//write_text("choice_run found");
			after_choice_func = choice_run_func;
		}
		next_text = edit_text(next_text, current_args);
		return next_text;
	}
	var text = setup_text_passage();
	passage_sentences = text.match(sentence_match);
	if(passage_sentences == null){passage_sentences = [""]}; //force it to be an array of one element if no matches found
	if(passage_sentences[passage_sentences.length-1] == ""){ passage_sentences.pop()} //remove the "" element that appears at the end for some reason
	sentence_index = 0;
	game_state = "pause";
}

function next_sentence(){
	if( passage_sentences.length == 0){
		error("empty text");
	}
	var new_sentence = passage_sentences[sentence_index];
	new_sentence = status_out(new_sentence,current_args);
	if(sentence_index == 0){
		write_text(new_sentence);
	}else{
		append_text(new_sentence);
	}
	sentence_index += 1;
	if(sentence_index >= passage_sentences.length){
		game_state = "run";
		var run_func = next_passage['run'];
		if(run_func){
			run_func(current_args);
		}
	}
}



function game_continue(){
	if(game_state == "choice"){
		return;
	}else if(game_state == "pause"){
		next_sentence();
	}else if(game_state == "run"){
		var text_to_show = next_text_passage();
		next_sentence();
	}else{
		error("bad game state");
	}
	//write_text(text_to_show);
	//TODO: generate next text passage
	//TODO: queue up the showing of the text passage 
	//TODO: update relationships 
	//TODO: move actors around
	//TODO: time passes
	//TODO: use up resources, food, anything else being used at the moment
	//TODO: autosave game
}
//TODO: mouse event to call continue

//write_text('testing text helloo');

function dead_end(){
	var restart_button = add_element('button', "Restart", 'choice_button');
	restart_button.onclick = function(){location.reload();}
	game_state = "choice";
}

function set_status(character,new_status){
	if(new_status == "Default"){
		new_status = "Healthy"; //current default status, later it will default to other values as well depending on condition
	}
	character.status = new_status;
	update_character_pane(character);
	living_chars = 0;
	for(var k in all_characters){
		var char_ref = all_characters[k];
		if(char_ref.status != "Dead"){
			living_chars += 1;
		}
	}
	if(living_chars == 0){
		queued_events.push(['Game_over',[]])
		//dead_end();
	}
}

function kill(character){
	set_status(character,"Dead");
}

//function mouse_clicked(){
//	game_continue();
//}

function new_base(base_type){
	if(game.base == "none"){
		write_text("The sun was almost setting so this location would have to make due for a place to stay.");
		game.base = base_type
	}else{
		write_text("Settle in at the " + base_type + "?");
		player_choice(game, 'new_base', base_type, "move on");
		if(after_choice_func){
			error("Error: current after_choice_function overwritten by new base after_choice_func");
		}
		after_choice_func = function(){
			if(game.new_base != "move on"){ game.base = game.new_base } //after the choice is run, copy the new base value 
		}
	}
}

$(document.body).click(function(){game_continue();})

//document.getElementById('cover_pane').onclick = function(){mouse_clicked();}