function text_in(){

}


function end_animation(type){
    var cover_frame = document.createElement('div');
    cover_frame.style = 'position:absolute;  width: 100%; height: 100%; opacity:0.0';
    cover_frame.id = 'cover_frame';
    document.appendChild(cover_frame);
    $('#cover_frame').animate({opacity:"1.0"},"slow");
    var text_box = document.createElement('div');
    if(type == 'cs'){
        
    }
}