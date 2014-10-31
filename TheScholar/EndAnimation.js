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