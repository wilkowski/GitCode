var achievements = {
	level_complete : {},
	only_ones : {},
	limited_outputs: {},
	no_charge: {},
	everything: {},
	par:{}
}

function give_achievement(category, val){
	if(achievements[category][val]){
		return;  //already got the achievement
	}
	add_note("Got achievement: " + category + " on level " + val);  //TODO make cleaner
	achievements[category][val] = true;
	all_complete = true;
	for(var i=1; i< all_levels.length; i++){
		if(! achievements[category][all_levels[i].level_number]){
			all_complete = false;
			return;
		}
	}
	if(all_complete){ //redundant due to return above
		achievements[category]['All levels'] = true;
		add_note("Got " + category + "achievement on all levels!");
	}
	//TODO save achievements

}

//Run on after a level is completed 
function achievement_test(){
	give_achievement('level_complete', game.current_level);
	var only_ones_check = true;
	var limited_outputs_check = true;
	var no_charge_check = true;
	var cell_count = 0;
	for(var i = 1; i<all_cells.length; i++){
		var test_cell = all_cells[i];
		if(!test_cell.type != 'deleted'){
			if(test_cell.max_charge >= 2){only_ones_check = false;}
			if(test_cell.outputs.length > 2){limited_outputs_check = false;}
			if(test_cell.charge > 0){no_charge_test = false;}
			cell_count += 1;
		}
	}
	if(only_ones_check){give_achievement('only_ones',game.current_level);}
	if(limited_outputs_check){give_achievement('limited_outputs',game.current_level);}
	if(no_charge_check){give_achievement('no_charge',game.current_level);}
	if(only_ones_check && limited_outputs_check && no_charge_check){
		give_achievement('no_charge',game.current_level);
	}
	//TODO: par list for number of cells used to complete task
}