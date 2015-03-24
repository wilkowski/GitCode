function round_to(num, digits){
    var digger = Math.pow(10,digits);
    return (Math.floor(num*digger)/digger);
}

function capitalize(text){
	text = text + "" //force text to be a string (this way numbers can safely be passed as the argument, this did cause problems before)
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function rand_from_list(list_array){
    return list_array[Math.floor(Math.random()*list_array.length)];
}

function rand_dict_key(list_dict){
	var size = 0;
	for(var key in list_dict){
		size +=1;
	}
	var key_index = Math.floor(Math.random()*size);
	for(var key in list_dict){
		if(key_index == 0){
			return key;
		}else{
			key_index -= 1;
		}
	}
}

function insert_start(element, parent){
    var first_child = parent.firstChild;
    if(first_child === null){
        parent.appendChild(element);
    }else{
        parent.insertBefore(element, first_child);
    }
}

function insert_end(element, parent){
	parent.appendChild(element);
}

function insert_after(element, target){
    var parent = target.parentNode;
    var next_sibling = target.nextSibling;
    if (next_sibling === null){
        parent.appendChild(element);
    }else{
        parent.insertBefore(element, next_sibling);
    }   
}



function remove_element(element){
	element.parentNode.removeChild(element);
}

function delay_set(object, ref, new_value){
	object[ref] = new_value;
}