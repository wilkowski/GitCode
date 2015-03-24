var melee_weapon_items = {"wrench":{}, 
	"metal bat":{}, 
	"wooden bat":{}, 
	"machete":{}, 
	"wood board":{},
	"katana":{},
	"golf club":{}, 
	"metal pipe":{}, 
	"kitchen knife":{}, 
	"cleaver":{},
	"fire poker":{},
	"sharp stick": {},
	"lead candletick": {},
	"wood axe":{}
	"fire axe":{}
}

var gun_items = {

}

//var bow_items = {
//
//}

var food_items = {
	"box of cereal":{},
	"can of beans": {},
	"can of chicken soup": {},
	"can of tomatoes": {},
	"can of peaches": {},
	"beef jerkey":{},
	"box of twinkies":{},
	"bag of ramen":{},
	"salted meat": {}
}

var liquid_container_items = {
	"plastic bottle":{},
	"metal thermis":{},
	"flask":{},
	"canteen":{},
	"jug": {}
}

var medicine_items = {
	"band-aids":{use: "cuts"},
	"medical wrap":{use: "cuts"},
	"bandage": {use: "cuts"},
	"rubbing alchol": {use: "cuts"},
	"iodide": {use: "cuts"},
	"needle and thread": {use: "cuts"},
	"penicillin":{use: "antibiotic"},
	"amoxicillin":{use: "antibiotic"},
	"sling":{use: "broken bone"},
	"brace":{use: "broken bone"},
	"asprin":{use:"painkiller"},
	"Tylenol":{use:"painkiller"},
	"Bayer":{use:"painkiller"},
	"morphine":{use:"painkiller"},
	//first aid kit will contain multiple items
}

var car_items = {


}

var alcohol_items = {
	"whiskey":{}
}

var gasoline_items = {

}

var general_items = {
	"flashlight":{},
	"batteries":{},
	"radio":{},
	"shovel":{},
	"tool kit":{},
	"hand crank flashlight radio":{},
	"plank":{},
	"chalk":{},
	"spray paint":{},
	"sharpie":{},
	"water filter":{},
	"plastic tarp":{},
	"aluminum foil":{}
}

var crafted_items = {
	water_collector:{}
}

var recipies = {
	
}

var all_item_groups = {
	"melee": melee_weapon_items,
	"gun": gun_items,
	"food":food_items,
	"liquid container": liquid_container_items,
	"medicine": medicine_items,
	"car":car_items,
	"gasoline":gasoline_items,
	"general":general_items
}


function set_type(group, group_type){ //add each group as a tag within the item
	for(var key in group){
		var item = group[key];
		item[category] = group_type;
	}
}
for(var group_type in all_item_groups){
	var current_group = all_item_groups[group_type];
	set_type(current_group,group_type);
}

function random_item(type){

}
