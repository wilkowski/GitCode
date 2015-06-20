
var base_cell = { //this is a special base cell that other cells are copied from
	id: 0, //id for normal cells can't be 0 since the negative of the id is meaningful
	charge: 0,
	max_charge: 1,
	outputs: [],
	pos: new Victor(50,50),
	connected_cells: {}, 
	changed: true,
	image: null, //used to reference the images that gets added to the screen
	special_func: null,
	output_text: null, //displayed when the cell is executed
	label: null,
	type: null
}

var all_cells = [base_cell]; //imaginary cell at 0 position, does nothing but makes array start at 1.  

var action_queue = [];

var cell_counter = 1;
function make_cell(cell_pos){
	var new_cell = {};
	for(var key in base_cell){
		new_cell[key] = base_cell[key];
	}
	new_cell.outputs = [];
	new_cell.connected_cells = {};
	new_cell.id = cell_counter;
	new_cell.pos = new Victor(70*(cell_counter%10), 50);
	if(cell_pos){
		new_cell.pos = cell_pos;
	}
	cell_counter += 1;
	all_cells.push(new_cell);
	return new_cell.id;
}

function get_cell(cell_id){
	return all_cells[cell_id];
}

function next_in_queue(){
	next_action = action_queue.shift();
	if(next_action == null){
		console.log("end of queue");
		return false;
	}
	var node = all_cells[next_action];
	if(node.charge >= node.max_charge){ //cell goes off
		node.charge = 0;  //discarges itself
		cell_small_update(next_action)
		for(var i = 0; i< node.outputs.length; i++){
			var out_val = node.outputs[i];
			if(out_val > 0){
				charge_cell(out_val);
				animate_charging(out_val, node.id, 'charge');
				update_cell_image(node.id);
			}else{
				discharge_cell(-out_val);
				animate_charging(-out_val, node.id, 'discharge');
				//MAYBE DO: remove all instances of the cell from the queue
			}
		}
		if(node.special_func){
			node.special_func();
		}
		if(node.output_text){
			add_note(node.output_text);
		}
		return true;
	}else{ //nothing triggered so skip ahead to next one (makes animation much smoother)
		return next_in_queue();
	}
}

var running_queue_function = null;

var queue_interval = 250

function run_all_queue(){
	clearTimeout(running_queue_function); //prevents queue from being run twice at once (doesn't actually cause many problems but is weird behaviour)
	if(next_in_queue()){
		running_queue_function = setTimeout(function(){run_all_queue()}, queue_interval);
	};
	setTimeout(function(){update_screen()}, queue_interval*.73);
}

function cell_small_update(cell_no){ //only changes the appearance of this one cell
	var cell_ref = all_cells[cell_no];
	cell_ref.changed = true; 
}

function cell_large_update(cell_no){ //also visually effects all the cells connected to this one
	var cell_ref = all_cells[cell_no];
	cell_ref.changed = true;
	for(var connected_cell_id in cell_ref.connected_cells){
		all_cells[connected_cell_id].changed = true; //this one makes changes to all the connected cells as well
	}
}

function increment_connection(cell_ref, other_cell_no){
	if(cell_ref.connected_cells[other_cell_no]){
		cell_ref.connected_cells[other_cell_no] += 1;
	}else{
		cell_ref.connected_cells[other_cell_no] = 1;
	}
}

//MAYBE DO: change cell_ref.connected_cells to be a count of the connections between the cells
function cell_link_update(cell_no, other_cell_no){//only changes the appearance of this one cell and adds a connection to another cell
	var cell_ref = all_cells[cell_no];
	increment_connection(cell_ref,other_cell_no)
	//cell_ref.connected_cells[other_cell_no] = true; //add the other cell number to the list
	//all_cells[other_cell_no].connected_cells[cell_no] = true; //add this one to the other guy as well
	increment_connection(all_cells[other_cell_no], cell_no);
	cell_ref.changed = true;
	all_cells[other_cell_no].changed = true;
}

function charge_cell(cell_no){
	var cell_ref = all_cells[cell_no];
	cell_ref.charge += 1;
	if(cell_ref.charge >= cell_ref.max_charge){ //maybe do: only queue up on exact equality
		action_queue.push(cell_no);
	}
	cell_small_update(cell_no);
}

function cycle_charge_cell(cell_no){
	var cell_ref = all_cells[cell_no];
	cell_ref.charge += 1;
	if(cell_ref.charge > cell_ref.max_charge){
		cell_ref.charge = 0;
	}
	if(cell_ref.charge >= cell_ref.max_charge){
		action_queue.push(cell_no);
	}
	cell_small_update(cell_no);
}

function discharge_cell(cell_no){
	var cell_ref = all_cells[cell_no];
	cell_ref.charge = 0;
	cell_small_update(cell_no);
}

function update_cell_position(cell_no, new_position){
	var cell_ref = all_cells[cell_no];
	cell_ref.pos = new_position;
	cell_large_update(cell_no);
}

function charge_link(from_cell_no, to_cell_no){
	var from_cell = all_cells[from_cell_no];
	from_cell.outputs.push(to_cell_no);
	cell_link_update(from_cell_no, to_cell_no);
}

function discharge_link(from_cell_no, to_cell_no){
	var from_cell = all_cells[from_cell_no];
	from_cell.outputs.push(-to_cell_no); //just the negation of the value
	cell_link_update(from_cell_no, to_cell_no);
}

function increase_cell_max_charge(cell_no){
	var cell_ref = all_cells[cell_no];
	cell_ref.max_charge += 1;
	cell_large_update(cell_no);
}

function decrease_cell_max_charge(cell_no){
	var cell_ref = all_cells[cell_no];
	cell_ref.max_charge -= 1;
	if(cell_ref.max_charge < 1){ //max charge cannot be 0;
		cell_ref.max_charge = 1; //MAYBE DO: make special option where 0 max charge cells auto fire every time
	}
	cell_large_update(cell_no);
}

function remove_from_array(val, array){
	var index = array.indexOf(val);
	while(index != -1){
		array.splice(index,1)
		index = array.indexOf(val);
	}
	return array;
}

//TODO: remove connections to this cell on second click
//TODO: remove cell completely on third click
function clear_cell(cell_no){
	var cell_ref = all_cells[cell_no];
	cell_large_update(cell_no);
	//TODO: remove connection history from the other cells
	if(cell_ref.outputs.length == 0){ //already cleared outputs
		if(Object.keys(cell_ref.connected_cells).length == 0){ //not connected to anything
			cell_ref.type = 'deleted';
		}
		for(var key in cell_ref.connected_cells){
			var other_cell = all_cells[key];
			other_cell.outputs = remove_from_array(cell_no, other_cell.outputs);
			other_cell.outputs = remove_from_array(-cell_no, other_cell.outputs);
			delete other_cell.connected_cells[cell_no]
		}
		cell_ref.connected_cells = {};
	}else{
		for(var out_cell_no in cell_ref.outputs){
			var abs_cell_no = Math.abs(out_cell_no);
			cell_ref.connected_cells[abs_cell_no] -= 1;
			all_cells[abs_cell_no].connected_cells[cell_no] -= 1;
		}
		cell_ref.outputs = [];
	}
}

function add_label(cell_no, new_label){
	var cell_ref = all_cells[cell_no];
	if(new_label == "" || new_label == null){
		cell_ref.label = null;
	}else{
		cell_ref.label = new_label;
	}
	cell_small_update(cell_no);
}

function add_text_output(cell_no, cell_text){
	var cell_ref = all_cells[cell_no];
	if(cell_text == "" || cell_text == null){
		cell_ref.output_text = null;
	}else{
		cell_ref.output_text = cell_text;
	}
	cell_small_update(cell_no); //probably not necessary
}

function delete_all(){ //delete all the images and then reset all the cell data and stuff (0 index base_cell remains)
	for(var i = 1; i<all_cells.length; i++){
		var cell_ref = all_cells[i];
		if(cell_ref.image){
			for(var j in cell_ref.image){
				canvas.remove(cell_ref.image[j]);
			}
		}
	}
	all_cells = [base_cell];
	cell_counter = 1;
	action_queue = [];
}

//export all the cells currently on screen to a save friendly format
function export_cells(){
	var copied_cells = [];
	for(var i = 0; i<all_cells.length; i++){
		cell_to_copy = all_cells[i];
		var new_cell = {};
		for(var key in cell_to_copy){
			if(key != 'pos' && key != 'image' && key != 'special_func'){
				new_cell[key] = cell_to_copy[key];
			}
		}
		new_cell.pos_x = cell_to_copy.pos.x;
		new_cell.pos_y = cell_to_copy.pos.y;
		copied_cells[i] = new_cell;
	}
	return [copied_cells, action_queue]; //important to copy the queue as well
}

function import_cells(import_array){
	var addendum = all_cells.length-1; //how much to add to each ref id so that everything works out nicely; (new cells get added to end of existing list)
	for(var i = 1; i<import_array.length; i++){
		var copy_cell_ref = import_array[i];
		var new_cell = {}
		for(var key in copy_cell_ref){
			if(key != 'pos_x' && key != 'pos_x'){
				new_cell[key] = copy_cell_ref[key];
			}
		}
		new_cell.changed = true; //so that the change gets copied
		new_cell.pos = new Victor(copy_cell_ref.pos_x, copy_cell_ref.pos_y);
		new_cell.outputs = [];
		for(var n = 0; n< copy_cell_ref.outputs.length; n++){
			new_cell.outputs[n] = copy_cell_ref.outputs[n] + addendum;
		}
		/* //TEMPORARY: removed and recalculated manually based on outputs
		new_cell.connected_cells = {};
		for(var key in copy_cell_ref.connected_cells){
			new_cell.connected_cells[(Number(key) + addendum) + ""] = copy_cell_ref.connected_cells[key] //key to number and then back to a string
		}
		*/
		all_cells[i + addendum] = new_cell;
	}
	//TEMPORARY: reset copy_cell_ref.connected_cells and recalculate (because I updated to new format)
	for(var i = 0; i < all_cells.length; i++){
		var cell_ref = all_cells[i];
		cell_ref.connected_cells = {};
	}
	for(var i = 1; i < all_cells.length; i++){
		var cell_ref = all_cells[i];
		for(var j=0; j< cell_ref.outputs.length; j++){
			var out_cell_no = Math.abs(cell_ref.outputs[j]);
			cell_link_update(i, out_cell_no);
		}
	}
	update_screen();
}

function save_workspace(){
	var export_array = export_cells();
	localStorage['q_cell_save'] = btoa(JSON.stringify(export_array));
}

function load_workspace(){
	if(localStorage['q_cell_save']){
		var save_array = JSON.parse(atob(localStorage['q_cell_save']));
		delete_all();
		import_cells(save_array[0]);
		action_queue = save_array[1];
	}
}
//load_workspace();
