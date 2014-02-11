
var player = {
    version: '.1',

    effort: 2,
    money: 0.00,
    calculations: 0.0,
    code: 0.0,
    materials: 0.0,
    
    effort_per_second: 0.00,
    money_per_second: 0.00,
    calculations_per_second: 0.0,
    code_per_second: 0.0,
    materials_per_second: 0.0,
    grade:0,
    school:0,

    reading_level: 0,
    math_level: 0,
    cs_level: 0,
    physics_level: 0,
    engineering_level: 0,
    
    show_math_level: 0,
    show_cs_level: 0,
    show_physics_level: 0,
    show_engineering_level: 0,
    show_calculations: 0,
    show_materials: 0,
    
    bought_answers: 0,
    calculators: 0,
    graphing_calculators: 0,
    computers: 0,
    
    dev_tools: 0,
    developers: 0,
    
    
    //calculator_cost: 5.00,
    
    research_projects: {}
};

//button order is as it appears on page
//Buttons become available in reverse order

//main section buttons
var main_tab_button = document.getElementById("main_tab_button");
main_tab_button.requirements = {math_level: 5};
//main classes
var learn_logic_button = document.getElementById("learn_logic");
learn_logic_button.requirements = {school: 1, math_level:50};
learn_logic_button.cost = {effort: 5};
learn_logic_button.reward = {cs_level: 1};
learn_logic_button.disable = {cs_level: 5};

var learn_math_button = document.getElementById("learn_math");
learn_math_button.style.display = 'none';
learn_math_button.requirements = {reading_level: 5};
learn_math_button.disable = {math_level: 5};
learn_math_button.cost = {effort: 2};
learn_math_button.reward = {math_level: 1};

var learn_reading_button = document.getElementById("learn_reading");
learn_reading_button.innerHTML = textify('Learn to read');
learn_reading_button.requirements = {school: 1};
learn_reading_button.cost = {effort: 1};
learn_reading_button.disable = {reading_level: 5};
learn_reading_button.reward = {reading_level: 1};
//main grades/schools
var school_up_4_button = document.getElementById("school_up_4");
school_up_4_button.requirements = {school: 3, math_level: 500, grade:16};
school_up_4_button.disable = {school: 4};
school_up_4_button.cost = {effort: 100};
school_up_4_button.reward = {school: 1, effort_per_second: 0.5, money_per_second:0.5};

var grade_up_3_button = document.getElementById("grade_up_3");
grade_up_3_button.requirements = {school: 4};
grade_up_3_button.innerHTML = textify('Grade Up');
grade_up_3_button.disable = {grade: 4};
grade_up_3_button.cost = {effort: 2};
grade_up_3_button.exponent = {grade: 2.0};
grade_up_3_button.reward = {grade: 1, effort_per_second: 0.25};

var school_up_3_button = document.getElementById("school_up_3");
school_up_3_button.requirements = {school: 2, math_level: 200, grade:12};
school_up_3_button.disable = {school: 4};
school_up_3_button.cost = {effort: 100};
school_up_3_button.reward = {school: 1, effort_per_second: 0.25, money:100};

var grade_up_2_button = document.getElementById("grade_up_2");
grade_up_2_button.requirements = {school: 3};
grade_up_2_button.innerHTML = textify('Grade Up');
grade_up_2_button.disable = {grade: 4};
grade_up_2_button.cost = {effort: 2};
grade_up_2_button.exponent = {grade: 2.0};
grade_up_2_button.reward = {grade: 1, effort_per_second: 0.25};

var school_up_2_button = document.getElementById("school_up_2");
school_up_2_button.requirements = {school: 1, math_level: 100, grade:8};
school_up_2_button.disable = {school: 3};
school_up_2_button.cost = {effort: 20};
school_up_2_button.reward = {school: 1, effort_per_second: 0.25, money_per_second:0.1};

var grade_up_1_button = document.getElementById("grade_up_1");
grade_up_1_button.requirements = {school: 2};
grade_up_1_button.disable = {grade: 4};
grade_up_1_button.cost = {effort: 2};
grade_up_1_button.exponent = {grade: 2.0};
grade_up_1_button.reward = {grade: 1, effort_per_second: 0.25};

var school_up_1_button = document.getElementById("school_up_1");
school_up_1_button.requirements = {math_level: 35, grade:4};
school_up_1_button.disable = {school: 2};
school_up_1_button.cost = {effort: 5};
school_up_1_button.reward = {school: 1, effort_per_second: 0.5, money:10};

var grade_up_0_button = document.getElementById("grade_up_0");
grade_up_0_button.requirements = {reading_level: 5};
//grade_up_0_button.innerHTML = textify('Grade Up');
grade_up_0_button.disable = {grade: 4};
grade_up_0_button.cost = {effort: 2};
grade_up_0_button.exponent = {grade: 2.0};
grade_up_0_button.reward = {grade: 1, effort_per_second: 0.25};

var school_up_0_button = document.getElementById("school_up_0");
school_up_0_button.innerHTML = textify('Start School');
school_up_0_button.disable = {school: 1};
school_up_0_button.cost = {effort: 2};
school_up_0_button.reward = {school: 1, effort_per_second: 0.25};


//math section buttons
var math_tab_button = document.getElementById("math_tab_button");
math_tab_button.requirements = {math_level: 5};

var learn_advanced_calculus_button = document.getElementById("learn_advanced_calculus");
learn_advanced_calculus_button.requirements = {school: 2, math_level: 500};
learn_advanced_calculus_button.cost = {effort: 10, calculations:20};
learn_advanced_calculus_button.reward = {math_level: 50};

var learn_calculus_button = document.getElementById("learn_calculus");
learn_calculus_button.requirements = {school: 2, math_level: 300};
learn_calculus_button.cost = {effort: 5, calculations:10};
learn_calculus_button.reward = {math_level: 20};

var learn_trigonometry_button = document.getElementById("learn_trigonometry");
learn_trigonometry_button.requirements = {school: 2, math_level: 200};
learn_trigonometry_button.cost = {effort: 5, calculations:5};
learn_trigonometry_button.reward = {math_level: 12};

var learn_algebra_2_button = document.getElementById("learn_algebra_2");
learn_algebra_2_button.requirements = {school: 2};
learn_algebra_2_button.cost = {effort: 3, calculations:2};
learn_algebra_2_button.reward = {math_level: 5};

var learn_algebra_button = document.getElementById("learn_algebra");
learn_algebra_button.requirements = {math_level: 20};
learn_algebra_button.cost = {effort: 3, calculations:1};
learn_algebra_button.reward = {math_level: 3};

var learn_geometry_button = document.getElementById("learn_geometry");
learn_geometry_button.requirements = {math_level: 10};
learn_geometry_button.cost = {effort: 3};
learn_geometry_button.reward = {math_level: 2};

var learn_arithmetic_button = document.getElementById("learn_arithmetic");
learn_arithmetic_button.requirements = {math_level: 5};
learn_arithmetic_button.cost = {effort: 2};
learn_arithmetic_button.reward = {math_level: 1};

//do math things
var do_math_super_project_button = document.getElementById("do_math_super_project");
do_math_super_project_button.requirements = {grade: 16, math_level:50000};
do_math_super_project_button.cost = {effort:100000};//subject to change
do_math_super_project_button.reward = {money: 100000.00, math_level:10000};//subject to change

var do_math_research_button = document.getElementById("do_math_research");
do_math_research_button.requirements = {grade: 12, math_level:500};
do_math_research_button.cost = {effort:1000};//subject to change
do_math_research_button.reward = {money: 1000.00, math_level:100};//subject to change

var do_math_competition_button = document.getElementById("do_math_competition");
do_math_competition_button.requirements = {grade: 10, math_level:200};
do_math_competition_button.cost = {effort:100};//subject to change
do_math_competition_button.reward = {money: 50.00};//subject to change

var do_tutoring_button = document.getElementById("do_tutoring");
do_tutoring_button.requirements = {school: 2, math_level:100};
do_tutoring_button.cost = {effort:10};
do_tutoring_button.reward = {money: 5.00};

var do_calculation_button = document.getElementById("do_calculation");
do_calculation_button.requirements = {show_calculations: 1};
do_calculation_button.cost = {effort:1};
do_calculation_button.reward = {calculations: 1};
//math shop
var buy_computer_math_button = document.getElementById("buy_computer_math");
buy_computer_math_button.requirements = {school: 5};
buy_computer_math_button.cost = {money:1000.00};
buy_computer_math_button.exponent = {computers: 1.5};
buy_computer_math_button.reward = {calculations_per_second: 10, code_per_second: 10, computers:1};

var buy_graphing_calculator_button = document.getElementById("buy_graphing_calculator");
buy_graphing_calculator_button.requirements = {calculator: 2, math_level: 70};
buy_graphing_calculator_button.cost = {money:100.00};
buy_graphing_calculator_button.exponent = {graphing_calculators: 1.5};
buy_graphing_calculator_button.reward = {calculations_per_second: 1, graphing_calculators:1};

var buy_calculator_button = document.getElementById("buy_calculator");
buy_calculator_button.requirements = {school: 1};
buy_calculator_button.cost = {money:5.00};
buy_calculator_button.exponent = {calculators: 1.5};
buy_calculator_button.reward = {calculations_per_second: 0.1, calculators:1};
//buy_calculator_button.cost.money = round_to(5.00 * Math.pow(1.5,player.calculators), 2);

var buy_answers_button = document.getElementById("buy_answers");
buy_answers_button.requirements = {school: 1};
buy_answers_button.cost = {money:5.00};
buy_answers_button.reward = {bought_answers:1};
buy_answers_button.disable = {bought_answers:1};

var cs_tab_button = document.getElementById("cs_tab_button");
cs_tab_button.requirements = {cs_level: 5};

var learn_c_button = document.getElementById("learn_logo");
learn_c_button.requirements = {cs_level: 15};
learn_c_button.cost = {effort: 1};
learn_c_button.reward = {cs_level: 1};

var learn_logo_button = document.getElementById("learn_logo");
learn_logo_button.requirements = {cs_level: 5};
learn_logo_button.cost = {effort: 2};
learn_logo_button.reward = {cs_level: 1};

//CS shop

var buy_computer_cs_button = document.getElementById("buy_computer_cs");
buy_computer_cs_button.requirements = {school: 5};
buy_computer_cs_button.cost = {money:1000.00};
buy_computer_cs_button.exponent = {computers: 1.5};
buy_computer_cs_button.reward = {calculations_per_second: 10, code_per_second: 10, computers:1};

//Top table:

var effort_label_element = document.getElementById("effort_label");
var effort_count_element = document.getElementById("effort_count");

var money_label_element = document.getElementById("money_label");
var money_count_element = document.getElementById("money_count");

var calculations_label_element = document.getElementById("calculations_label");
calculations_label_element.requirements = {show_calculations: 1};
var calculations_count_element = document.getElementById("calculations_count");
calculations_count_element.requirements = {show_calculations: 1};
//calculations have special requirements

var math_label_element = document.getElementById("math_skill_label");
var math_count_element = document.getElementById("math_skill_count");

var tab_bar = document.getElementById("tab_bar");
tab_bar.requirements = {math_level: 5};

var visible_list = [
    calculations_label_element,
    calculations_count_element,

    tab_bar,
    
    main_tab_button, //Main
    
    learn_logic_button,
    learn_reading_button,
    learn_math_button,
    
    school_up_4_button,
    grade_up_3_button,
    school_up_3_button,
    grade_up_2_button,
    school_up_2_button,
    grade_up_1_button,
    school_up_1_button,
    grade_up_0_button,
    school_up_0_button,
    
    math_tab_button, //Math
    learn_advanced_calculus_button,
    learn_calculus_button,
    learn_trigonometry_button,
    learn_algebra_2_button,
    learn_algebra_button,
    learn_geometry_button,
    learn_arithmetic_button,
    
    do_math_super_project_button,
    do_math_research_button,
    do_math_competition_button,
    do_tutoring_button,
    do_calculation_button,
    
    buy_computer_math_button,
    buy_graphing_calculator_button,
    buy_calculator_button,
    buy_answers_button,
    
    cs_tab_button,
    learn_c_button,
    learn_logo_button,
    
    buy_computer_cs_button
];

var notification_box = document.getElementById("notifications");

var note_list = new Array();
var note_text_list = new Array();

var tab_bar = document.getElementById("tab_bar");

var debug = true;

var popup = document.getElementById("popup");
var popup_cost = document.getElementById("popup_cost");
var popup_reward = document.getElementById("popup_reward");

open_menu('main');
add_note('Born');

// functions yay!

function save_game(){
    localStorage['scholar_clicker_save'] = btoa(JSON.stringify(player));
}

function load_save(){
    player = JSON.parse(atob(localStorage['scholar_clicker_save']));
}

function add_note(note_text){
    var note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = textify(note_text);
    insert_start(note,notification_box);
    note_list.push(note);
    note_text_list.push(note_text);
    
    if(note_text_list.length > 20){
        //get rid of old notes
        notification_box.removeChild(note_list[0]);
        note_list.shift();
        note_text_list.shift();
    }
}

function number_to_text(num){
    if(player.math_level < 5){
        if(num <= 0){
            return 'None';
        }else if(num < 2){
            return 'Little';
        }else if(num < 5){
            return 'Bit';
        }else if(num < 10){
            return 'Some';
        }else{
            return 'Lots';
        }
    }else{
        return num;
    }
}

function round_to(num, digits){
    var digger = Math.pow(10,digits);
    return (Math.floor(num*digger)/digger);
}

function update_counts() { //this function updates the number of clicks displayed       
    var effort_label_element = document.getElementById("effort_label");
    effort_label_element.innerHTML = textify('Effort');
    var effort_count_element = document.getElementById("effort_count");
    var shown_effort = number_to_text(Math.floor(player.effort));
    if(player.math_level >= 25){
        shown_effort = shown_effort + ' (' + round_to(player.effort_per_second,2) + '/s)';
    }
    effort_count_element.innerHTML = textify(shown_effort);
    
    money_label_element.innerHTML = textify('Money');
    
    var shown_money = number_to_text(round_to(player.money,2));
    if(player.math_level >= 25 && player.money_per_second > 0){
        shown_money = shown_money + ' (' + round_to(player.money_per_second,2) + '/s)';
    }
    money_count_element.innerHTML = textify(shown_money);
    
    var math_skill_count_element = document.getElementById("math_skill_count");
    var shown_math_skill = number_to_text(player.math_skill);
    math_skill_count_element.innerHTML = textify(shown_math_skill);
    
    var calculations_count_element = document.getElementById("calculations_count");
    var shown_calculations = number_to_text(round_to(player.calculations,0));
    if(player.math_level >= 25 && player.calculations_per_second > 0){
        shown_calculations = shown_calculations + ' (' + round_to(player.calculations_per_second) + '/s)';
    }
    calculations_count_element.innerHTML = textify(shown_calculations);
}

function update_screen(){
    //TODO: make a list of key values where something changes and only update when one is passed
    //If this function gets too slow
    for(var i = 0; i < visible_list.length; i++){
        var cur_button = visible_list[i];
        if(cur_button.requirements){
            var meets_requirements = true;
            for (var key in cur_button.requirements){
                //check each requirement against the players level in that requirement
                if(cur_button.requirements[key] > player[key]){ 
                    meets_requirements = false;
                    break;
                }
            }
            if(meets_requirements){
                if(cur_button.style.display == 'none'){
                    popup.style.display = 'none'; //hide the popup if we add a new button
                } 
                cur_button.style.display = '';
            }else{
                cur_button.style.display = 'none';
            }
        }
        if(cur_button.disable){
            var should_disable = true;
            for (var key in cur_button.disable){
                //check each requirement against the players level in that requirement
                if(player[key] < cur_button.disable[key]){ 
                    should_disable = false;
                    break;
                }
            }
            if(should_disable){
                cur_button.disabled = true;
            }else{
                cur_button.disabled = false;
            }
        }
    }
    
    var math_label_element = document.getElementById("math_skill_label");
    var math_count_element = document.getElementById("math_skill_count");
    if(player.show_math_level > 0){
        math_label_element.style.display = '';
        math_count_element.style.display = '';
    }else{
        math_label_element.style.display = 'none';
        math_count_element.style.display = 'none';
    }
    /*
    if(player.show_calculations > 0){
        do_calculation_button.style.display = '';
        calculations_label_element.style.display = '';
        calculations_count_element.style.display = '';
    }else{
        do_calculation_button.style.display = 'none';
        calculations_label_element.style.display = 'none';
        calculations_count_element.style.display = 'none';
    }
    */
}

function textify(some_text){
    if(player.reading_level <= 4){
        var char_array = some_text.split("");
        for(var i = 0; i< char_array.length; i++){
            char_array[i] = String.fromCharCode((char_array[i].charCodeAt(0))+64*(5-player.reading_level));
        }
        //char_array.join()
        return char_array.join("");
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

function try_to_get_something(button) {
    if(button.cost){
        //var can_buy = true;
        var effort_cost = 0;
        var calculation_cost = 0;
        var money_cost = 0;
        var multiplier = 1;
        if(button.exponent){
            for(var key in button.exponent){ //Should have exactly one value key pair
                multiplier = Math.pow(button.exponent[key],player[key]);
            }
        }
        if(button.cost.effort){
            effort_cost = round_to(button.cost.effort * multiplier, 0);
        }
        if (player.effort < effort_cost) {
            add_note('Not enough effort');
            return false;
        }
        if(button.cost.calculations){
            calculation_cost = round_to(button.cost.calculations * multiplier, 0);
        }
        if (player.calculations < calculation_cost) {
            add_note('Not enough calculations');
            if(player.show_calculations == 0){
                player.show_calculations = 1;
                update_screen();
            }
            return false;
        }
        if(button.cost.money){
            money_cost = round_to(button.cost.money * multiplier, 2);
        }
        if (player.money < money_cost) {
            add_note('Not enough money');
            return false;
        }
        player.calculations -= calculation_cost;
        player.effort -= effort_cost;
        player.money -= money_cost;
    }
    return true;
}

function do_button_clicked(button){
    if(!try_to_get_something(button)){
        return false;
    }
    if(button.reward){
        for (var key in button.reward){
            player[key] += button.reward[key];
        }
    }
    update_counts();
    update_screen();
    return true;
}



function update_popup(button){
    var popup_text_1 = '';
    var popup_text_2 = '';
    if(button.cost){
        multiplier = 1;
        previous = false;
        if(button.exponent){
            for(var key in button.exponent){ //Should have exactly one value key pair
                multiplier = Math.pow(button.exponent[key],player[key]);
            }
        }
        popup_text_1 += '- ';
        if(button.cost.effort){
            popup_text_1 += number_to_text(round_to(button.cost.effort*multiplier,0));
            popup_text_1 += ' effort';
            previous = true;
        }
        if(button.cost.money){
            if(previous){popup_text_1 += ', ';}
            popup_text_1 += '$' + number_to_text(round_to(button.cost.money*multiplier,2));
            previous = true;
        }
        if(button.cost.calculations && player.show_calculations > 0){
            if(previous){popup_text_1 += ', ';}
            popup_text_1 += number_to_text(round_to(button.cost.calculations*multiplier,0));
            popup_text_1 += ' calculations';
            previous = true;
        }
    }
    if(button.reward){
        previous = false;
        if(button.reward.math_level){
            if(player.show_math_level > 0){
                popup_text_2 += '+ ' + button.reward.math_level + ' math skill';
            }else{
                popup_text_2 += '+ skill';
            }
        }
        if(button.reward.cs_level){
            if(player.show_cs_level > 0){
                popup_text_2 += '+ ' + button.reward.cs_level + ' programming skill';
            }else{
                popup_text_2 += '+ skill';
            }
        }
        if(button.reward.effort_per_second){
            popup_text_2 += '+ ' + button.reward.effort_per_second + ' effort per second';
        }
        if(button.reward.money){
            popup_text_2 += '+ $' + round_to(button.reward.money,2);
        }
        if(button.reward.code){
            popup_text_2 += '+ ' + button.reward.code + ' code';
        }
        if(button.reward.code_per_second){
            popup_text_2 += '+ ' + round_to(button.reward.code_per_second,2) + ' code per second';
        }
        if(button.reward.calculations_per_second){
            popup_text_2 += '+ ' + round_to(button.reward.calculations_per_second,2) + ' calculations per second';
        }
    }
    popup_cost.innerHTML = textify(popup_text_1);
    popup_reward.innerHTML = textify(popup_text_2);
}

var mouse_outs = 0;

function popup_display(check){
    if(mouse_outs == check){
        popup.style.display = '';
    }
}

function button_mouse_over(button){
    var check_val = mouse_outs;
    
    update_popup(button);
    
   // popup.style.display = 'none';
    setTimeout(function()
    {
        popup_display(check_val);
    },1500);
}

popup.style.display = 'none';

function button_mouse_out(button){
    popup.style.display = 'none';
    mouse_outs += 1;
}

popup.style.position = 'absolute';

document.onmousemove = function follow(evt){
    popup.style.left = (evt.pageX+20) + 'px'
    popup.style.top = (evt.pageY+20) + 'px'
}


//Set up default behaviour for all buttons
//some overridden below for speciality buttons
for(var i = 0; i < visible_list.length; i++){
    var cur_button = visible_list[i];
    if(cur_button.nodeName == "BUTTON"){
        cur_button.onclick = function() {
            do_button_clicked(this);
        }
        cur_button.onmouseover = function(){
            button_mouse_over(this);
        }
        cur_button.onmouseout = function(){
            button_mouse_out(this);
        }
    }
}

//Main buttons click section

school_up_1_button.onclick = function() {
    if(!do_button_clicked(this)){
        return;
    }
    add_note('Entered Middle School');
}

learn_math_button.onclick = function() {
    if(!do_button_clicked(this)){
        return;
    }
    if(player.math_level >= 5){
        add_note('Learned to count');
    }
}

learn_reading_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    player.reading_level++;
    learn_reading_button.innerHTML = textify('Learn to read');
    school_up_0_button.innerHTML = textify('Start School');
    if(player.reading_level > 4){
        if(player.reading_level == 5){
            add_note('Learned to read');
        }
        update_screen();
    }
    for(var i = 0; i< note_text_list.length; i++){
        var note = note_list[i];
        note.innerHTML = textify(note_text_list[i]);
    }
    update_counts(); //updates the text
};

//math section buttons
//learn_logic_button.onclick = function() {do_button_clicked(this)}
//learn_algebra_2_button.onclick = function() {do_button_clicked(this)}
//learn_algebra_button.onclick = function() {do_button_clicked(this)}
//learn_geometry_button.onclick = function() {do_button_clicked(this)}
//do math thing
//do_calculation_button.onclick = function() {do_button_clicked(this)}
//math store buttons
buy_calculator_button.onclick = function() {
    if(!do_button_clicked(this)){
        return;
    }
    //player.calculator_cost = player.calculator_cost * 1.5;
}


function open_menu(menu_name){
    document.getElementById("main_section").style.display = 'none';
    document.getElementById("math_section").style.display = 'none';
    document.getElementById("cs_section").style.display = 'none';
    document.getElementById("main_tab_button").disabled = false;
    document.getElementById("math_tab_button").disabled = false;
    document.getElementById("cs_tab_button").disabled = false;
    if(menu_name == 'main'){
        document.getElementById("main_section").style.display = '';
        document.getElementById("main_tab_button").disabled = true;
    }else if(menu_name == 'math'){
        document.getElementById("math_section").style.display = '';
        document.getElementById("math_tab_button").disabled = true;
    }else if(menu_name == 'cs'){
        document.getElementById("cs_section").style.display = '';
        document.getElementById("cs_tab_button").disabled = true;
    }
}

main_tab_button.onclick = function() {open_menu('main')}
math_tab_button.onclick = function() {open_menu('math')}
cs_tab_button.onclick = function() {open_menu('cs')}

update_screen();
update_counts();

setInterval(function () { 
    var effort_rate = player.effort_per_second;
    var money_rate = player.money_per_second;
    var calculation_rate = player.calculations_per_second;
    debug_multiplier = 1;
    if(debug){
        debug_multiplier = 5;
    }
    player.effort += effort_rate*debug_multiplier;
    player.money += money_rate*debug_multiplier;
    player.calculations += calculation_rate*debug_multiplier;
    
    //clicks += auto_clicks;
    update_counts(); 
}, 1000); //once per second use the auto clickers

//var school_up_0_button = document.getElementById("school_up_0");
//school_up_0_button.innerHTML = "TESTING"