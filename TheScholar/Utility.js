//UTILITY FUNCTIONS (moved here to clean up main file)
//These functions have little to no dependency on game variables, game objects
//Generic for pretty much any project

function capitalize(text){
     return text.charAt(0).toUpperCase() + text.slice(1);
}

//round_to(51.1,0) gives 51 
function round_to(num, digits){
    var digger = Math.pow(10,digits);
    return (Math.floor(num*digger)/digger);
}

//nice_round(2513.2, 2) gives 2500, rounds to n significant digits
function nice_round(num, digits){
    if(num == 0){ return 0;}
    //add_note(num + " " + digits);
    var num_digits = 1+Math.floor(Math.log(num) / Math.log(10) + .000001);
    var digger = Math.pow(10,num_digits - digits);
    return round_to((Math.floor(num /digger) * digger),digits); //also round to clean up rounding errors
}

function rand_from_list(list_array){
    return list_array[Math.floor(Math.random()*list_array.length)];
}

function number_to_text(num){
    if(player.math_level < 5){
        if(num >= 100){
            return 'Tons';
        }else if(num >= 15){
            return 'Lots';
        }else if(num >= 8){
            return 'Bunch';
        }else if(num >= 4){
            return 'Some';
        }else if(num >= 2){
            return 'Bit';
        }else if(num > 0){
            return 'Little';
        }else{ // num == 0
            return 'None';
        }
    }else{
        if(num >= infinity){
            return "Infinity";
        }else if(num >= 1000000000000000){
            return round_to(num/1000000000000000.0,2) + "Q";
        }else if(num >= 1000000000000){
            return round_to(num/1000000000000.0,2) + "T";
        }else if(num >= 1000000000){
            return round_to(num/1000000000.0,2) + "B"; //I don't think anything in the game gets this big
        }else if(num >= 1000000){
            return round_to(num/1000000.0,2) + "M";
        }else if(num >= 10000){
            return round_to(num/1000.0,1) + "K";
        }
        return num;
    }
}



function disable(button){
    button.is_disabled = true;
    button.style.color = 'grey'; //grey text means disabled
}

function enable(button){
    button.is_disabled = false;
    button.style.color = 'black'; //black text means enabled
}

color_list = ['red', 'yellow', 'green', 'grey_green', 'black'];
function clear_colors(button){
    for(var i = 0; i<color_list.length; i++){
        button.classList.remove(color_list[i]);
    }
}

function set_color(button, color){
    clear_colors(button); //get rid of any other colors first
    if(player.art_level >= 10){
        button.classList.add(color);
    }
}

function set_button_size(button, x_size, y_size){
    button.style.width = x_size + 'px';
    button.style.height = y_size + 'px';
}

function grow_button(button, x_size, y_size){
    var steps = 24.0; //currently 80fps
    var n = 1.0
	set_button_size(button, x_size/steps, y_size/steps); //so button doesn't start large
	button.disabled = true; //so that it can't be clicked while growing (also turns off popup)
    var id = setInterval(function(){
        var step_x_size = x_size * n/steps;
        var step_y_size = y_size * n/steps;
        set_button_size(button, step_x_size, step_y_size);
        n++;
    }, 300.0 * n/steps)
    setTimeout(function(){
		button.disabled = false;
        set_button_size(button, x_size, y_size);
        clearInterval(id);
    }, 300.0 )
}

//scramble characters of text if you dont know how to read yet
function textify(some_text){
    if(player.reading_level <= 4){
        var char_array = some_text.split('');
        for(var i = 0; i< char_array.length; i++){
            var char_code = char_array[i].charCodeAt(0);
            if((char_code+2)%6 >= player.reading_level && char_code != 32){
                char_array[i] = String.fromCharCode(char_code+64*(5-player.reading_level));
            }
        }
        //char_array.join()
        return char_array.join('');
    }else{
        return some_text;
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

function insert_after(element, target){
    var parent = target.parentNode;
    var next_sibling = target.nextSibling;
    if (next_sibling === null){
        parent.appendChild(element);
    }else{
        parent.insertBefore(element, next_sibling);
    }   
}

//on click animations section

var animation_limit = 7; //doesnt seem to work for some reason, oh well
var current_animation = 0;
var text_animation_elements = [];
var text_animations = [];
var x_offsets = [-1,-2,-3,-3,-2,-1,1,2,3,3,2,1]; //guesstimated smoothish curve
var offset_count = 12;

function do_click_animation(element, anim_number, mouse_x, mouse_y){
    var n = 1;
    var randomer = Math.floor(offset_count*Math.random()); //random start in curve
    var randomer_x = 20-Math.floor(40*Math.random()); //random start in curve
    var duration = 1250.0;
    var steps = duration*30/1000.0 //30 fps
    var id = setInterval(function(){
        element.style.top = (mouse_y-2*n-15) + 'px';
        element.style.left = (mouse_x-5 - x_offsets[(n+randomer)%offset_count] + randomer_x - 20) + 'px';
        element.style.display = '';
        element.style.opacity = 1-1.0*n/steps;
        n++;
    }, duration/steps)
    text_animations[anim_number] = id;
    setTimeout(function(){
        clearInterval(id);
        main_body.removeChild(element);
    }, duration )
}

function click_animate(animated_text, y_offset){
    if(evt != null && player.animation_enabled){ //must have moved the mouse at some point to get last position
        var main_body = document.getElementById('main_body')
        if(text_animations[current_animation]){ //hide animations over the 7th so screen doesnt overcrowd
            var elem = text_animation_elements[current_animation];
            elem.style.display = 'none';
        }
        
        var animated_element = document.createElement('div');
        animated_element.className = 'animation';
        animated_element.style.display = 'none';
        animated_element.style.position = 'absolute;';
        animated_element.innerHTML = animated_text;
        insert_start(animated_element,main_body);
        text_animation_elements[current_animation] = animated_element;
        
        var mouse_x = evt.pageX;
        var mouse_y = evt.pageY;
		if(y_offset){ //for use when there are multiple animations at once
			mouse_y+= y_offset;
		}
        do_click_animation(animated_element, current_animation, mouse_x, mouse_y);

        current_animation = (current_animation+1)%animation_limit; //cycle though objects
    }
}

//END OF GAME ANIMATION SECTION

function show_text(elem, text, length, delay){
    setTimeout(function(){
        elem.innerHTML = text.slice(0, length);
    },delay);
}

var fade_duration = 3200;
var short_letter_time = 60;
var long_letter_time = 170;

var main_body = document.getElementById('main_body');

function text_in(text, box, type){
    var text_element = document.createElement('div');
    text_element.className = 'end_text';
    box.appendChild(text_element);
    var letter_time = short_letter_time
    if(type && type == 'cs'){
        letter_time = long_letter_time;
        text_element.style.fontFamily = "Courier New";
    }
    for(var i=0; i<=text.length; i++){
        show_text(text_element, text, i, i*letter_time);
    }
}

function end_animation(type){
    var cover_frame = document.createElement('div');
    cover_frame.id = 'cover_frame';
    main_body.appendChild(cover_frame);
    
    $('#cover_frame').animate({opacity:"1.0"},fade_duration);
    setTimeout(function(){
        var text_box = document.createElement('div');
        text_box.className = 'end_text_box';
        cover_frame.appendChild(text_box);
        if(type == 'cs'){
            var cs_text_1 = "You let the machines plug you into the AI cluster.  "
            var cs_text_2 = "The world goes dark around you.  "  
            var cs_text_3 = "A new world starts to appear before your eyes.  "
            var cs_text_4 = "It is similar to the world before, but things are..."
            var cs_text_5 = "different..."
            special_reset(type); //resetting first gets rid of any scroll bar
            text_in(cs_text_1, text_box);
            var duration = cs_text_1.length*short_letter_time + 500
            setTimeout(function(){text_in(cs_text_2, text_box)}, duration);
            duration += cs_text_2.length*short_letter_time + 500;
            setTimeout(function(){text_in(cs_text_3, text_box)}, duration);
            duration += cs_text_3.length*short_letter_time + 500;
            setTimeout(function(){text_in(cs_text_4, text_box)}, duration);
            duration += cs_text_4.length*short_letter_time + 500;
            setTimeout(function(){text_in(cs_text_5, text_box, 'cs')}, duration);
            duration += cs_text_5.length*long_letter_time + 2500;
            setTimeout(function(){cleanup(cover_frame, text_box, type)}, duration);
        }
    },fade_duration);     
}

function cleanup(cover_frame, text_box, type){
    $('#cover_frame').animate({opacity:"0.0"},fade_duration);
    setTimeout(function(){
        main_body.removeChild(cover_frame);
    },fade_duration)
}