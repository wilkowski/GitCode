//test pattern
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
cell_2_obj.special_func = function(){console.log("Cell 2 has been triggered");}

//run_all_queue();
update_screen();
cell_2_obj.pos.y += 50;
update_screen();