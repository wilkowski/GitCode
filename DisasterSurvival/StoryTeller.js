var main_pane = document.getElementById('main_pane');
var character_pane = document.getElementById('character_pane');

var starter_character = {

}

var all_characters = [starter_character]


//TODO: put all these into a dict so they can be saved easily
var story_so_far = []; //each story passage so far along with its arguments (for saving)
var event_calender = {}; //all scheduled events
var queued_events = {};
var next_story = "Intro1"; //the next text story to show to the player
var next_args = [starter_character]; //arguments for whatever the next story is
var next_passage = null;
var passage_sentences = [];
var sentence_index = 0;
var after_choice_func = null;
var base = "none";
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
	base: "none"
}
//TODO: any setup
//TODO: load game

var game_state = "run"; //"choice", "pause"

//var choice_option = false;
//var in_progress = false;

function add_element(type, text, class_name){
	var new_element = document.createElement(type);
	new_element.innerHTML = text;
	if(class_name){ new_element.className = class_name;}
	insert_end(new_element, main_pane);
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
	choose_button.onclick = function(){
		var entered_val = input_field.value;
		var is_number = new RegExp("-?\\d+.?\\d*"); //optional - followed by number with optional . and more numbers
		if(entered_val.match(is_number)){
			var number_converted = entered_val * 1;
			write_text(number_converted);
			assign_dict[key] = number_converted;
			choice_finish();
		}else{
			var text_note = write_text("A number is required.");
			choice_button_list.push(text_note);
		}
	}
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

//var period_match = new RegExp("\\.");
//var sentence_match = /[^\.]*\./g; //not . followed by a . (return array of all matches)
//big mess o' fun!
var sentence_match = /[^\.\?\!]*[\.\?\!$]\"?/g; //[not . ? or !] followed by a [. ? ! or end of line] (return array of all matches) " added to end if found

function next_text_passage(){
	if(next_story == null || next_story == ""){
		//TODO: figure out next event
		write_text("error missing story");
	}
	next_passage = all_stories[next_story];
	story_so_far.push([next_story,next_args]); //TODO: figure out how to make it save properly
	next_story = ""; //next story has been used
	var text = setup_text_passage();
	passage_sentences = text.match(sentence_match);
	//for(var i=0; i<passage_sentences.length-1; i++){//don't add a period for the last one
	//	passage_sentences[i] = passage_sentences[i] + "." //add the . back
	//}
	//if(passage_sentences[passage_sentences.length-1] == ""){
	//	passage_sentences.pop(); //get rid of final empty element
	//}
	sentence_index = 0;
	game_state = "pause";
	//write_text(text);
	
	//var run_func = next_passage.run;
	//if(run_func){
	//	run_func(next_args);
	//}
}

function next_sentence(){
	if(passage_sentences.length == 0){
		error("empty text");
	}
	var new_sentence = passage_sentences[sentence_index];
	new_sentence = status_out(new_sentence);
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
			run_func(next_args);
		}
	}
}

function setup_text_passage(){
	//next_args
	var next_text = next_passage['text'];
	var pre_run_func = next_passage['pre_run'];
	var choice_run_func = next_passage['choice_run'];
	if(pre_run_func){
		next_text = pre_run_func(next_text,next_args);
	}
	if(choice_run_func){
		//write_text("choice_run found");
		after_choice_func = choice_run_func;
	}
	
	next_text = edit_text(next_text, next_args);
	return next_text;
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
	write_text("There is no one left to continue the story.");
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
		dead_end();
	}
}

function kill(character){
	set_status(character,"Dead");
}

//function mouse_clicked(){
//	game_continue();
//}

function new_base(base_type){
	write_text("Settle in at the " + base_type + "?");
	player_choice(game, 'base', base_type, "ignore it");
}

$(document.body).click(function(){game_continue();})

//document.getElementById('cover_pane').onclick = function(){mouse_clicked();}