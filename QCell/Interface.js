//var canvasEl = document.getElementById('workspace');

var canvas = new fabric.Canvas('workspace', { selection: false });
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center'; //all calculations are done based on the center of the object
fabric.Object.prototype.hasControls = fabric.Object.prototype.hasBorders = false; //remove the annoying selection box around objects

var group_ref

var current_mode = 'drag';

function update_cell_image(cell_id){
	var cell_ref = get_cell(cell_id);
	if(cell_ref.image){
		for(var i in cell_ref.image){
			canvas.remove(cell_ref.image[i]);
		}
		//canvas.remove(cell_ref.image)
	} //remove any old version of cell image
	var cell_radius = 20 * Math.pow(cell_ref.max_charge, .333333);
	var circle_selectable = (current_mode == 'drag');
	var cell_circle = new fabric.Circle({
		radius: cell_radius, fill: 'white', left: cell_ref.pos.x, top: cell_ref.pos.y, strokeWidth: 1, stroke: 'black', selectable: circle_selectable
	});
	
	if(cell_ref.charge >= cell_ref.max_charge){
		cell_circle.set({fill:'#00ff00'})
	}
	var charge_text = new fabric.Text(cell_ref.charge + "/" + cell_ref.max_charge, {
		left: cell_ref.pos.x, top: cell_ref.pos.y, fontSize: 16, selectable: false
	});
	var all_images_list = [new fabric.Group([cell_circle, charge_text],{circle_id: cell_id, selectable: circle_selectable})] //text gets grouped together so that its selectable together
	for(var x in cell_ref.outputs){ //add lines connecting the circles;
		var out_id = cell_ref.outputs[x];
		var line_color = 'blue';
		if(out_id<=0){
			out_id = -out_id;
			line_color = 'red';
		}
		var end_cell = get_cell(out_id);
		var end_cell_radius = 20 * Math.pow(end_cell.max_charge, .333333);
		var line_vector = end_cell.pos.clone().subtract(cell_ref.pos);
		var unit_vector = line_vector.clone().normalize();
		var start_point = cell_ref.pos.clone().add(unit_vector.clone().multiply(new Victor(cell_radius,cell_radius)));
		var end_point = end_cell.pos.clone().subtract(unit_vector.clone().multiply(new Victor(end_cell_radius,end_cell_radius)));
		var new_line = new fabric.Line([start_point.x, start_point.y, end_point.x, end_point.y], 
			{stroke: line_color, selectable: false, strokeWidth: 2});
		var arrow_half_1 = new fabric.Line([end_point.x+unit_vector.x*8, end_point.y+unit_vector.y*8, end_point.x-unit_vector.x*8, end_point.y-unit_vector.y*8],
			{stroke: line_color, selectable: false, strokeWidth: 2, angle:25});
		var arrow_half_2 = new fabric.Line([end_point.x+unit_vector.x*8, end_point.y+unit_vector.y*8, end_point.x-unit_vector.x*8, end_point.y-unit_vector.y*8],
			{stroke: line_color, selectable: false, strokeWidth: 2, angle:-25});
		all_images_list.push(arrow_half_1);
		all_images_list.push(arrow_half_2);
		all_images_list.push(new_line);
	}
	
	//var group_image = new fabric.Group(all_images_list, {originX:'center', originY:'center', circle_id: cell_id});
	group_ref = all_images_list;
	cell_ref.image = all_images_list;
	for(var i in all_images_list){
		canvas.add(all_images_list[i]);
		if(i== 0){
			canvas.bringToFront(all_images_list[i]);
		}else{
			canvas.sendToBack(all_images_list[i]);
		}
	}
	
}

function update_screen(){
	for(var i = 1; i<all_cells.length; i++){
		update_cell_image(i);
	}
}

canvas.on('object:moving', function(e) {
    var moved_circle = e.target;
	if(moved_circle.circle_id){
		var cell_ref = get_cell(moved_circle.circle_id);
		cell_ref.pos = new Victor(moved_circle.left, moved_circle.top);
		update_screen();
	}
});

var current_target_circle = null;

canvas.on('mouse:down', function(options) {
	if(current_mode == 'make_cell'){
		make_cell(new Victor(options.e.clientX, options.e.clientY));
	}else if(current_mode == 'make_charger' || current_mode == 'make_discharger'){
		if(options.target && options.target.circle_id){
			current_target_circle = options.target.circle_id;
			console.log("Cell " + options.target.circle_id + "has been clicked");
		}
	}else if(current_mode == 'charge'){
		if(options.target && options.target.circle_id){
			cycle_charge_cell(options.target.circle_id);
		}
	}
	update_screen();
});

canvas.on('mouse:up', function(options) {
	if(current_mode == 'make_charger' || current_mode == 'make_discharger'){
		if(options.target && options.target.circle_id){
			if(current_mode == 'make_charger'){
				charge_link(current_target_circle, options.target.circle_id);
			}else{
				discharge_link(current_target_circle, options.target.circle_id);
			}
		}
	}
	current_target_circle = null;
	update_screen();
})
  
var run_button = document.getElementById('run_button');
run_button.onclick = function(){run_all_queue(); update_screen();}

var stop_button = document.getElementById('stop_button');
stop_button.onclick = function(){clearTimeout(running_queue_function); update_screen();}

var step_button = document.getElementById('step_button');
step_button.onclick = function(){next_in_queue(); update_screen();}

var drag_button = document.getElementById('drag_button');
drag_button.onclick = function(){current_mode = 'drag';}

var make_cell_button = document.getElementById('make_cell_button');
make_cell_button.onclick = function(){current_mode = 'make_cell';}

var make_charger_link_button = document.getElementById('make_charger_link_button');
make_charger_link_button.onclick = function(){current_mode = 'make_charger';}

var make_discharger_link_button = document.getElementById('make_discharger_link_button');
make_discharger_link_button.onclick = function(){current_mode = 'make_discharger';}

var charger_button = document.getElementById('charge_button');
charger_button.onclick = function(){current_mode = 'charge';}

