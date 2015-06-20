//test pattern  (adds a default thing to show up on the screen)
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

var save_array = JSON.parse(atob(hello_world_example));
delete_all();
import_cells(save_array[0]);
action_queue = save_array[1];

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