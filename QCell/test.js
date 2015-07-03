var game_state = {
	current_level: 0,
	levels_completed: {},
	levels_unlocked: {'1':true, '2':true, '3':true},
	achievements_completed: {},
	level_sates:{} //saves on various levels
}

var all_levels = [{level_number:0},//no 0 zero level, since most levels start at 1
	{level_number: 1,
	level_string: "W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiVHJ1ZSBJbiIsInR5cGUiOiJpbnB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc194IjozMzgsInBvc195Ijo5Mn0seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjIsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IkZhbHNlIEluIiwidHlwZSI6ImlucHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjU0OSwicG9zX3kiOjkzfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MywiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiVHJ1ZSBPdXQiLCJ0eXBlIjoib3V0cHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjMzNywicG9zX3kiOjUwM30seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjQsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IkZhbHNlIE91dCIsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NTUxLCJwb3NfeSI6NTAyfV0sW11d",
	test_lists: [{input_list:["True In", "True In", "True In", "False In", "False In", "True In", "False In", "False In"], 
					output_list:["True Out","False Out","False Out","False Out"]},
				{input_list:["False In", "True In", "True In", "False In", "True In", "True In", "False In", "False In"], 
					output_list:["False Out","False Out","True Out","False Out"]}]
	}

]

var input_cells = {};
var output_cells = {};
var queued_tests = [];

function set_up_testing(){
	input_cells = {};
	output_cells = {};
	for(var cell_no = 1; cell_no <all_cells.length; cell_no+=1){
		var cell_ref = all_cells[cell_no]
		if(cell_ref.type == 'input' || cell_ref.type == 'output'){
			var cell_label = cell_ref.label;
			if(! cell_label){ cell_label = cell_no; add_note("error, input missing label")}
			if(cell_ref.type == 'input'){
				input_cells[cell_label] = cell_no;
			}else{ //== 'output'
				output_cells[cell_label] = cell_no;
			}
		}
	}
}

var step_delay = 3;  //3 action queue cycles in between test inputs
var max_step_time = 100; //maximum number of steps taken by program after the last input

var anticipated_outputs = [];
var test_running = false;
var step = 0;
var inputs_left = 0;

var workspace_backup_string
var running_test = null;
function test_over(){
	test_running = false;
	clearTimeout(running_test); //stop any more tests from running
	clean_import(workspace_backup_string);
	set_mode('drag');
	//TODO: enable any buttons that were disabled during testing
}

function run_test(input_queue, expected_outputs){
	set_mode('testing');
	anticipated_outputs = expected_outputs;
	test_running = true;
	step = 0;
	workspace_backup_string = string_export_workspace();
	function run_inputs(input_queue){
		if(test_running == false){ //test has ended
			add_note("Test ended");
			clean_import(workspace_backup_string);
			return;
		}
		if(step < -max_step_time){
			test_running = false;
			if(anticipated_outputs.length > 0){	
				add_note("TEST FAILED: Program exceeded maximum allowed steps without giving all outputs");
			}else{
				add_note("Test ended");
			}
			clean_import(workspace_backup_string);
			return;
		}
		if(step <= 0 && input_queue.length > 0){
			var in_cell = input_queue.shift();
			if(in_cell != ""){ //empty inputs are allowed as a spacer
				charge_cell(input_cells[in_cell]);
			}
			step = action_queue.length*step_delay;
		}
		inputs_left = input_queue.length;
		next_in_queue();
		update_screen();
		step -= 1; 
		running_test = setTimeout(function(){run_inputs(input_queue)}, queue_interval);
	}
	clearTimeout(running_test); //dont wan't multiple tests running at once
	run_inputs(input_queue, 0);
}

function got_output(label){
	if(!test_running){return}
	if(anticipated_outputs.length == 0){
		test_running = false;
		add_note("TEST FAILED: received " + label + " output when none was expected");
		return;
	}
	var expected_val = anticipated_outputs.shift();
	if(label != expected_val){
		test_running = false;
		add_note("TEST FAILED: received " + label + " output when " + expected_val + " was expected");
		return;
	}
	add_note(label + " matching output.  " + anticipated_outputs.length + " outputs left");
	//else Success
}

function end_of_queue(){
	if(!test_running){return}
	if(inputs_left == 0 && anticipated_outputs.length >0){
		test_running = false;
		add_note("TEST FAILED: End of queue reached when " + anticipated_outputs[0] + " output was still expected");
		return;
	}//else Success
	if(inputs_left == 0 && anticipated_outputs.length == 0){
		test_running = false;
		add_note("Test Successful");
	}
}

function set_up_level(level_no){
	if(level_no == 0){ //0 is just the normal workspace
		delete_all();
		cycle_type_button.style.display = "";
		update_screen();
		return;
	}
	cycle_type_button.style.display = "none";
	var level_object = all_levels[level_no];
	clean_import(level_object.level_string);
	set_up_testing();
	game_state.current_level = level_no;
}

var run_tests_button = document.getElementById('run_tests_button');
run_tests_button.onclick = function(){
	var level_object = all_levels[game_state.current_level];
	var testing_list = level_object.test_lists[0];
	run_test(testing_list.input_list.slice(0), testing_list.output_list.slice(0)); //slicing makes copies of the arrays
	//TODO: make it queue up more tests
}



//test pattern  (adds a few cells as an example to get things started)
/*
var cell_1 = make_cell(); //cells are used by id
var cell_2 = make_cell();
charge_cell(cell_1);
charge_link(cell_1,cell_2);
var cell_3 = make_cell();
//charge_cell(cell_3);
charge_link(cell_3,cell_2);
charge_link(cell_1,cell_3);
var cell_2_obj = get_cell(cell_2);
cell_2_obj.max_charge += 1;
cell_2_obj.label = "Cell 2"
cell_2_obj.output_text = "Cell 2 has been triggered";
cell_2_obj.special_func = function(){console.log("Cell 2 has been triggered");}
*/

var hello_world_example = "W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnsiMSI6MSwiMiI6MSwiMyI6LTEsIjQiOjF9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7ImlkIjoxLCJjaGFyZ2UiOjEsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOlsyLDMsNF0sImNvbm5lY3RlZF9jZWxscyI6eyIyIjoxLCIzIjotMSwiNCI6MX0sImNoYW5nZWQiOmZhbHNlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194IjoyMzAsInBvc195IjozOH0seyJpZCI6MiwiY2hhcmdlIjowLCJtYXhfY2hhcmdlIjoyLCJvdXRwdXRzIjpbNF0sImNvbm5lY3RlZF9jZWxscyI6eyIxIjoxLCIzIjozLCI0IjoxfSwiY2hhbmdlZCI6ZmFsc2UsIm91dHB1dF90ZXh0IjpudWxsLCJsYWJlbCI6bnVsbCwidHlwZSI6bnVsbCwicG9zX3giOjIwMiwicG9zX3kiOjE1MX0seyJpZCI6MywiY2hhcmdlIjowLCJtYXhfY2hhcmdlIjoxLCJvdXRwdXRzIjpbMiwtNF0sImNvbm5lY3RlZF9jZWxscyI6eyIwIjpudWxsLCIxIjotMSwiMiI6MywiNCI6M30sImNoYW5nZWQiOmZhbHNlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194IjoyODMsInBvc195IjoxMDd9LHsiaWQiOjQsImNoYXJnZSI6MCwibWF4X2NoYXJnZSI6MSwib3V0cHV0cyI6WzVdLCJjb25uZWN0ZWRfY2VsbHMiOnsiMSI6MSwiMiI6MSwiMyI6MywiNSI6MX0sImNoYW5nZWQiOmZhbHNlLCJvdXRwdXRfdGV4dCI6IkhlbGxvIiwibGFiZWwiOiJIZWxsbyIsInR5cGUiOm51bGwsInBvc194IjoyNTgsInBvc195IjoxOTl9LHsiaWQiOjUsImNoYXJnZSI6MCwibWF4X2NoYXJnZSI6MSwib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6eyI0IjoxfSwiY2hhbmdlZCI6ZmFsc2UsIm91dHB1dF90ZXh0Ijoid29ybGQhIiwibGFiZWwiOiJ3b3JsZCEiLCJ0eXBlIjpudWxsLCJwb3NfeCI6MzUzLCJwb3NfeSI6MjQ0fV0sWzFdXQ=="


clean_import(hello_world_example);

//run_all_queue();
//update_screen();
//cell_2_obj.pos.y += 100;
//cell_large_update(cell_2);
update_screen();

//add_note(export_cells());

/*
var cell_1 = make_cell(new Victor(100,250));
var cell_2 = make_cell(new Victor(250,100));
charge_link(cell_1,cell_2);

var cell_3 = make_cell(new Victor(400,250));
var cell_4 = make_cell(new Victor(550,100));
discharge_link(cell_3,cell_4);
update_screen();
*/

set_up_level(1);