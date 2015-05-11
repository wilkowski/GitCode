
var base_cell = { //this is a special base cell that other cells are copied from
	id: 0, //id for normal cells can't be 0 since the negative of the id is meaningful
	charge: 0,
	max_charge: 1,
	outputs: [],
	special_func: null,
	pos: new Victor(50,50)
}

var all_cells = [base_cell];

var action_queue = [];

var cell_counter = 1;
function make_cell(cell_pos){
	var new_cell = {};
	for(var key in base_cell){
		new_cell[key] = base_cell[key];
	}
	new_cell.outputs = [];
	new_cell.id = cell_counter;
	new_cell.pos = new Victor(70*(cell_counter%10), 50);
	if(cell_pos){
		new_cell.pos = cell_pos;
	}
	cell_counter += 1;
	all_cells.push(new_cell);
	return new_cell.id;
}

function charge_cell(cell_no){
	var cell_ref = all_cells[cell_no];
	cell_ref.charge += 1;
	if(cell_ref.charge >= cell_ref.max_charge){
		action_queue.push(cell_no);
	}
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
}

function discharge_cell(cell_no){
	var cell_ref = all_cells[cell_no];
	cell_ref.charge = 0;
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
		for(var i = 0; i< node.outputs.length; i++){
			var out_val = node.outputs[i];
			if(out_val > 0){
				charge_cell(out_val);
			}else{
				discharge_cell(-out_val);
			}
		}
		if(node.special_func){
			node.special_func();
		}
	}
	return true;
}

var running_queue_function = null;

function run_all_queue(){
	if(next_in_queue()){
		running_queue_function = setTimeout(function(){run_all_queue()},500);
	};
	update_screen();
}

function charge_link(from_cell_no, to_cell_no){
	var from_cell = all_cells[from_cell_no];
	from_cell.outputs.push(to_cell_no);
}

function discharge_link(from_cell_no, to_cell_no){
	var from_cell = all_cells[from_cell_no];
	from_cell.outputs.push(-to_cell_no); //just the negation of the value
}





