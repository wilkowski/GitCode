//Displays stuff and gets the user's inputs

//var canvasEl = document.getElementById('workspace');

var workspace_x = 65; //workspace left margin / toolbar width
var workspace_y = 25; //control(top) bar height

var canvas = new fabric.Canvas('workspace', { selection: false });
//var canvas_container = document.getElementsByClassName('canvas-container')[0];
//canvas_container.style.marginLeft = '100';
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center'; //all calculations are done based on the center of the object
fabric.Object.prototype.hasControls = fabric.Object.prototype.hasBorders = false; //remove the annoying selection box around objects
canvas.renderOnAddRemove = false //makes rendering much faster (only renders after everything's been updated)

//var group_ref

var current_mode = 'drag';

var lines_drawn_dict = {} //contains a,b:n where a<b and counts the lines drawn so far between cells a and b

var tip_length = 9;
var arrow_angle = 25;

//A: draw a line between the start and end points
//B: Make two shorter version of the line, rotate them by +-arrow_angle and offset them so the endpoint lines up with the original line
function draw_arrow(start_point, end_point, line_color, tag2_val){
	var unit_vec = end_point.clone().subtract(start_point.clone()).normalize();
	var normal_vec = unit_vec.clone().rotateDeg(90); //perpendicular vector;
	var offset_length = tip_length/2*Math.sin(arrow_angle*Math.PI/180);
	var offset_vec = new Victor(normal_vec.x * offset_length, normal_vec.y * offset_length);
	var new_line = new fabric.Line([start_point.x, start_point.y, end_point.x, end_point.y], 
		{stroke: line_color, selectable: false, strokeWidth: 2});
	var arrow_half_1 = new fabric.Line([end_point.x+offset_vec.x, end_point.y+offset_vec.y, end_point.x-unit_vec.x*tip_length+offset_vec.x, end_point.y-unit_vec.y*tip_length+offset_vec.y],
		{stroke: line_color, selectable: false, strokeWidth: 2, angle:-arrow_angle});
	var arrow_half_2 = new fabric.Line([end_point.x-offset_vec.x, end_point.y-offset_vec.y, end_point.x-unit_vec.x*tip_length-offset_vec.x, end_point.y-unit_vec.y*tip_length-offset_vec.y],
		{stroke: line_color, selectable: false, strokeWidth: 2, angle:arrow_angle});
	return [new_line,arrow_half_1,arrow_half_2]
}

function get_cell_radius(cell_ref){
	var stroke_width = 1;
	if(cell_ref.type === 'input' || cell_ref.type === 'output'){ stroke_width = 7 }
	return 20 * Math.pow(cell_ref.max_charge, .333333) - stroke_width/2;
}

//Should only ever be called by update_screen
function update_cell_image(cell_id){
	var cell_ref = all_cells[cell_id];
	if(cell_ref.changed === false){ //TODO: figure out how to make this work nice (need to not redraw lines if connected to a cell that didn't update)
		return; //skip a ton of constant redrawing of everything (was getting very laggy when >15 cells were on screen)
	}
	
	//add_note("updating cell "+ cell_id)
	if(cell_ref.type === 'deleted'){ //deleted cells are still there but have no image associated with them
		if(cell_ref.image){
			for(var i in cell_ref.image){
				canvas.remove(cell_ref.image[i]);
			}
		}
		return;
	}
	
	
	var circle_selectable = (current_mode === 'drag');
	var fill_color = 'white';
	var stroke_color = 'black'
	var stroke_width = 1;
	if(cell_ref.charge >= cell_ref.max_charge){
		fill_color = '#00ff00'
	}
	if(cell_ref.type === 'input'){
		circle_selectable = false;
		stroke_color = 'orange';
		stroke_width = 7;
	}
	if(cell_ref.type === 'output'){
		circle_selectable = false;
		stroke_color = 'violet';
		stroke_width = 7;
	}
	var cell_radius = get_cell_radius(cell_ref);
	var cell_circle = new fabric.Circle({
		radius: cell_radius, fill: fill_color, left: cell_ref.pos.x, top: cell_ref.pos.y, strokeWidth: stroke_width, stroke: stroke_color, selectable: circle_selectable
	});
	

	var charge_text = new fabric.Text(cell_ref.charge + "/" + cell_ref.max_charge, {
		left: cell_ref.pos.x, top: cell_ref.pos.y, fontSize: 16, selectable: false
	});
	var circle_element_list = [cell_circle, charge_text];

	//special condition for displaying partially charged cells
	if(cell_ref.charge > 0 && cell_ref.charge < cell_ref.max_charge){
		var fill_portion = cell_ref.charge/cell_ref.max_charge;
		var light_blue = '#bbeeff'
		var circle_portion = new fabric.Circle({
			radius: cell_radius, fill: light_blue, left: cell_ref.pos.x, top: cell_ref.pos.y, startAngle: -Math.PI/2, endAngle: 2 * Math.PI * fill_portion - Math.PI/2
		});
		circle_element_list = [cell_circle, circle_portion, charge_text];
		//fill the arc/chord with a triangle to the center of the circle
		if(cell_ref.charge*2 != cell_ref.max_charge){ //dont need triangle arc filler at half full
			var fill_color = light_blue;
			if(fill_portion > .5){ fill_color = 'white'} //at more than half we flip it and fill with white instead
			var filler_triangle = new fabric.Polygon([//create a triangle to fill in space between the circle chord and center
			{x: cell_ref.pos.x, y: cell_ref.pos.y}, 
			{x: cell_ref.pos.x, y: cell_ref.pos.y - cell_radius},  // -y is up
			{x: cell_ref.pos.x + cell_radius * Math.sin(2 * Math.PI * fill_portion),y: cell_ref.pos.y - cell_radius * Math.cos(2 * Math.PI * fill_portion)}],
			{fill: fill_color, originX: 'left', originY: 'top'});
			circle_element_list = [cell_circle, circle_portion, filler_triangle, charge_text];
		}
	}

	var all_images_list = [new fabric.Group(circle_element_list,{circle_id: cell_id, selectable: circle_selectable})] //text gets grouped together so that its selectable together
	
	//~~~~~~~~~add lines connecting the circles~~~~~~~~~~
	for(var x in cell_ref.outputs){
		var out_id = cell_ref.outputs[x];
		var line_color = 'blue';
		if(out_id<=0){
			out_id = -out_id;
			line_color = 'red';
		}
		if(!cell_ref.image || all_cells[out_id].changed === true){ //don't duplicated existing arrows
			var line_counter_ref = (out_id < cell_id) ? (out_id + "," + cell_id): (cell_id + "," + out_id);
			//add_note(line_counter_ref)
			if(lines_drawn_dict[line_counter_ref]){
				lines_drawn_dict[line_counter_ref] += 1
			}else{
				lines_drawn_dict[line_counter_ref] = 1;
			}
			var end_cell = all_cells[out_id];
			var end_cell_radius = 20 * Math.pow(end_cell.max_charge, .333333);
			var line_vector = end_cell.pos.clone().subtract(cell_ref.pos);
			var unit_vector = line_vector.clone().normalize();
			//TODO: count number of lines between cells and adjust so they don't overlap
			var offset_number = (lines_drawn_dict[line_counter_ref]-1 - (cell_ref.connected_cells[out_id]-1)/2); //offset by a certain amount so it ends up nicelike
			if(out_id < cell_id){offset_number = - offset_number} //invert for the opposite cell
			var degree_start_offset = 15*20/cell_radius * offset_number; //offset the arrow position by a constant arc length along the circle
			var degree_end_offset = 15*20/end_cell_radius * offset_number;
			var start_point = cell_ref.pos.clone().add(unit_vector.clone().rotateDeg(degree_start_offset).multiply(new Victor(cell_radius,cell_radius)));
			var end_point = end_cell.pos.clone().subtract(unit_vector.clone().rotateDeg(-degree_end_offset).multiply(new Victor(end_cell_radius,end_cell_radius)));
			if(out_id == cell_id){start_point = end_point.clone();} //Makes self targeting arrows show up ok
			var result_arrow = draw_arrow(start_point, end_point, line_color, cell_id, out_id);
			var num = x*1+1; //convert from string to integer then add one
			var white_arrow_order_label = new fabric.Text(num+"", {left:start_point.x+unit_vector.x*7, top: start_point.y+unit_vector.y*7, fontSize: 13, selectable: false, fill:'#FFFFFF', stroke:'#FFFFFF', strokeWidth: 3, tag2: out_id});
			var arrow_order_label = new fabric.Text(num+"", {left:start_point.x+unit_vector.x*7, top: start_point.y+unit_vector.y*7, fontSize: 13, selectable: false, fill:'#111111', tag2: out_id});
			result_arrow.push(white_arrow_order_label);
			result_arrow.push(arrow_order_label);
			var arrow_group = new fabric.Group(result_arrow, {selectable: false, tag2: out_id});
			//var arrow_order_label = new fabric.Text(x+"", {left:0+unit_vector.x*5, top: 0+unit_vector.y*5, fontSize: 10, selectable: false})
			//result_arrow.add(arrow_order_label);
			all_images_list.push(arrow_group);
			//all_images_list.push(arrow_order_label);
			//canvas.bringToFront(arrow_order_label);
		}
	}
	
	//Add a label to the circle
	if(cell_ref.label){
		var circle_label = new fabric.Text(cell_ref.label, {
			left: cell_ref.pos.x + cell_radius, top: cell_ref.pos.y - cell_radius, fontSize: 16, originX: 'left', selectable: false})
		all_images_list.push(circle_label);
	}
	
	//saved_images = [];
	if(cell_ref.image){
		for(var i in cell_ref.image){
			if(cell_ref.image[i]['tag2'] && (all_cells[cell_ref.image[i]['tag2']].changed === false)){
				all_images_list.push(cell_ref.image[i]); //save images tagged with an unchanged cell ref
			}
			canvas.remove(cell_ref.image[i]);
		}
	} //remove any old version of cell image
	
	//Organize images and send them to the canvas
	//group_ref = all_images_list;
	cell_ref.image = all_images_list;
	for(var i in all_images_list){
		canvas.add(all_images_list[i]);
		if(all_images_list[i].circle_id){
			canvas.bringToFront(all_images_list[i]); //the cell group goes on top
		}else{
			canvas.sendToBack(all_images_list[i]); //lines and stuff go to back
		}
	}
	//cell_ref.changed = false;
}

function update_screen(){
	lines_drawn_dict = {};
	for(var i = 1; i<all_cells.length; i++){
		update_cell_image(i);
	}
	for(var i = 1; i<all_cells.length; i++){
		all_cells[i].changed = false;
	}
	canvas.renderAll();
}


//TODO: make charges follow the path better (currently doesn't match offset paths)
//TODO: do something special for self targeting cells
function animate_charging(to_cell_no, from_cell_no, type){
	//add_note("animating from " + from_cell_no + " to " + to_cell_no);
	var from_cell = all_cells[from_cell_no];
	var to_cell = all_cells[to_cell_no];
	var animated_object = null;
	
	var cell_radius = get_cell_radius(from_cell); 
	var to_cell_radius = get_cell_radius(to_cell);
	var line_vector = to_cell.pos.clone().subtract(from_cell.pos);
	var unit_vector = line_vector.clone().normalize();
	var start_point = from_cell.pos.clone().add(unit_vector.clone().multiply(new Victor(cell_radius,cell_radius)));
	var end_point = to_cell.pos.clone().subtract(unit_vector.clone().multiply(new Victor(to_cell_radius,to_cell_radius)));

	if(type === 'charge'){
		animated_object = new fabric.Circle({
			radius: 5, fill: 'blue', left: start_point.x, top: start_point.y, strokeWidth: 1, stroke: 'blue', selectable: false
		});
	}else{
		animated_object = new fabric.Circle({
			radius: 5, fill: 'red', left: start_point.x, top: start_point.y, strokeWidth: 1, stroke: 'blue', selectable: false
		});
	}
	canvas.add(animated_object);
	if(start_point.x < end_point.x){ //Why the hell is this even necessary, shouldn't animations work with negative values?
		animated_object.animate('left', '+=' + (end_point.x - start_point.x), { onChange: canvas.renderAll.bind(canvas), duration: queue_interval*.75});
	}else{
		animated_object.animate('left', '-=' + (start_point.x - end_point.x), { onChange: canvas.renderAll.bind(canvas), duration: queue_interval*.75});
	}
	if(start_point.y < end_point.y){
		animated_object.animate('top', '+=' + (end_point.y - start_point.y), { onChange: canvas.renderAll.bind(canvas), duration: queue_interval*.75});
	}else{
		animated_object.animate('top', '-=' + (start_point.y - end_point.y), { onChange: canvas.renderAll.bind(canvas), duration: queue_interval*.75});
	}
	
	setTimeout(function(){ canvas.remove(animated_object); canvas.renderAll();}, queue_interval);
}


//var hold_update = false;

canvas.on('object:moving', function(e) {
	//if(hold_update){return}
	//hold_update = true;
    var moved_circle = e.target;
	if(moved_circle.circle_id){
		update_cell_position(moved_circle.circle_id, new Victor(moved_circle.left, moved_circle.top));
		update_screen();
	}
	//setTimeout(function(){hold_update = false;}, .01);
	
});

var current_target_circle = null;
var temp_arrow = null;

canvas.on('mouse:move', function(options) {
	if(current_target_circle){
		var temp_color = 'blue';
		if(current_mode === 'make_discharger'){
			temp_color = 'red';
		}
		var new_arrow = draw_arrow(get_cell(current_target_circle).pos, new Victor(options.e.layerX, options.e.layerY), temp_color)
		var arrow_group = new fabric.Group(new_arrow, {selectable: false});
		if(temp_arrow){canvas.remove(temp_arrow)}
		canvas.add(arrow_group);
		canvas.sendToBack(arrow_group)
		temp_arrow = arrow_group;
		canvas.renderAll();
    }else{
		canvas.remove(temp_arrow)
		canvas.renderAll();
	}
});


canvas.on('mouse:down', function(options) {
	//current_mode == 'drag' is handled by updating the cell images
	if(current_mode === 'make_cell'){
		make_cell(new Victor(options.e.layerX, options.e.layerY));
	}else if(options.target && options.target.circle_id){ //all the other options require a cell to have been clicked
		var clicked_circle_id = options.target.circle_id;
		var locked = (all_cells[clicked_circle_id].type === 'output' || all_cells[clicked_circle_id].type === 'input');
		//Could use a switch statement here but the locked condition make it more complicated
		if(current_mode === 'make_charger' || current_mode === 'make_discharger'){
			current_target_circle = clicked_circle_id;
			if(all_cells[clicked_circle_id].type === 'output'){ current_target_circle = null}; //no internal outputs from the system output
		}else if(current_mode === 'charge' && !locked){
			cycle_charge_cell(clicked_circle_id);
		}else if(current_mode === 'increase_max_charge' && !locked){
			increase_cell_max_charge(clicked_circle_id);
		}else if(current_mode === 'decrease_max_charge' && !locked){
			decrease_cell_max_charge(clicked_circle_id);
		}else if(current_mode === 'clear'){
			clear_cell(clicked_circle_id);
		}else if(current_mode === 'label' && !locked){
			var cell_label = prompt("Add a label to the cell","");
			add_label(clicked_circle_id, cell_label);
		}else if(current_mode === 'text_out' && !locked){
			var current_output_text = "";
			var cell_text = prompt("Text to display when cell activates","");
			add_text_output(clicked_circle_id, cell_text);
		}else if(current_mode === 'cycle_type'){
			cycle_cell_type(clicked_circle_id);
		}
	}
	update_screen();
});

canvas.on('mouse:up', function(options) {
	if((current_mode === 'make_charger' || current_mode === 'make_discharger') && current_target_circle){
		if(options.target && options.target.circle_id && all_cells[options.target.circle_id].type != 'input'){ //no linking to system input
			if(current_mode === 'make_charger'){
				charge_link(current_target_circle, options.target.circle_id);
			}else{
				discharge_link(current_target_circle, options.target.circle_id);
			}
		}
	}
	current_target_circle = null;
	update_screen();
});


//TODO: disable all mode changes while testing and thus all editing during testing
function set_mode(new_mode){
	if(test_running){return;} //no changing the stucture while its being tested.  That's cheating
	current_mode = new_mode;
	for(var i = 1; i<all_cells.length; i++){ //requires full redraw to make cells selectable or unselectable depending on the mode
		cell_small_update(i);
	}
	update_screen();
}

function insert_end(element, parent){
	parent.appendChild(element);
}

var notification_box = document.getElementById('notifications');
var note_list = [];

function add_note(note_text){
    var note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = "" + note_text; //force text to be string
    insert_end(note, notification_box);
    note_list.push(note);
    if(note_list.length > 20){
        //get rid of old notes
        notification_box.removeChild(note_list[0]);
        note_list.shift();
    }
}

function clear_notes(){
	while(note_list.length > 0){
		notification_box.removeChild(note_list[0]);
        note_list.shift();
	}
}
  
//BUTTONS BE HERE

var drag_button = document.getElementById('drag_button');
drag_button.onclick = function(){set_mode('drag');}

var charger_button = document.getElementById('charge_button');
charger_button.onclick = function(){set_mode('charge');}

var make_cell_button = document.getElementById('make_cell_button');
make_cell_button.onclick = function(){set_mode('make_cell');}

var make_charger_link_button = document.getElementById('make_charger_link_button');
make_charger_link_button.onclick = function(){set_mode('make_charger');}

var make_discharger_link_button = document.getElementById('make_discharger_link_button');
make_discharger_link_button.onclick = function(){set_mode('make_discharger');}

var increase_max_charge_button = document.getElementById('increase_max_charge_button');
increase_max_charge_button.onclick = function(){set_mode('increase_max_charge');}

var decrease_max_charge_button = document.getElementById('decrease_max_charge_button');
decrease_max_charge_button.onclick = function(){set_mode('decrease_max_charge');}

var label_button = document.getElementById('label_button');
label_button.onclick = function(){set_mode('label');}

var text_out_button = document.getElementById('text_out_button');
text_out_button.onclick = function(){set_mode('text_out');}

var clear_cell_button = document.getElementById('clear_cell_button');
clear_cell_button.onclick = function(){set_mode('clear');}

var cycle_type_button = document.getElementById('cycle_type_button');
cycle_type_button.onclick = function(){set_mode('cycle_type'); }

//bottom row buttons

var run_button = document.getElementById('run_button');
run_button.onclick = function(){run_all_queue(); update_screen();}

var stop_button = document.getElementById('stop_button');
stop_button.onclick = function(){clearTimeout(running_queue_function); test_over(); update_screen();}

var step_button = document.getElementById('step_button');
step_button.onclick = function(){next_in_queue(); update_screen();}

var faster_button = document.getElementById('faster_button');
faster_button.onclick = function(){queue_interval = queue_interval/2;}

var slower_button = document.getElementById('slower_button');
slower_button.onclick = function(){queue_interval = queue_interval*2;}

//|

var clear_all_button = document.getElementById('clear_all_button');
clear_all_button.onclick = function(){
	var r=confirm("Clear everything?");
    if (r==true){
		delete_all();
		set_up_level(game.current_level);
	}
	update_screen();
}

var string_export_button = document.getElementById('string_export_button');
string_export_button.onclick = function(){
	var exported = export_cells();
	add_note(btoa(JSON.stringify(exported)));
}

var string_import_button = document.getElementById('string_import_button');
string_import_button.onclick = function(){
	if(game.current_level != 0){
		add_note("Can only import in the workspace");
		return;
	}
	var import_string = prompt("Paste the import string here","");
	//TODO: test that the import string is valid somehow
	clean_import(import_string);
}