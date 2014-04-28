var debug = true;
var debug_multiplier = 1;

var math_calc_multiplier = 1.05;
var math_code_multiplier = 1.05;
var math_money_multiplier = 1.05;
var cs_calc_multiplier = 1.10;
var cs_money_multiplier = 1.10;
var cs_bug_multiplier = 1.20;

var button_width = 150.0

var player = {
    version: '0.145',

    musters: 0,
    effort: 9,
    money: 0.00,
    calculations: 0.0,
    code: 0.0,
    materials: 0.0,
    max_effort: 100,
    max_calculations: 250,
    max_code: 128,
    next_math_level: 5, //NEW
    next_cs_level: 5, //NEW
    
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
    show_next_math_level: 0, //NEW
    show_cs_level: 0,
    show_next_cs_level: 0, //NEW
    show_physics_level: 0,
    show_engineering_level: 0,
    show_calculations: 0,
    show_code: 0,
    show_materials: 0,
    
    super_project_started: 0, //new
    math_super_project_status: 0, //new
    cs_super_project_status: 0, //new
    
    vacations: 0,
    motivations: 0, //new
    notebooks: 1,
    chalkboards: 0, //new
    
    bought_answers: 0,
    times_tutored: 0,
    calculators: 0,
    graphing_calculators: 0,
    computers: 0,
    
    memories: 0,
    dev_tools: 0,
    developers: 0,
    
    in_contest: false,
    contest_strength: 0,
    contest_progress: 0,
    contest_winnings: 100, //rewards are 1st: 100%, 2nd: 50%, 3rd: 20%
    
    math_research_projects_count: 0.0,
    math_research_failures: 0.0, //worth a bit of math skill
    math_research_money: 0.0, //+ money/s
    math_research_calculation_bonus: 0.0, //calculations/s multiplier
    math_research_money_bonus: 0.0, //money/s multiplier
    math_research_code_bonus: 0.0, //code/s multiplier
    math_research_projects: {},
    
    cs_projects_count:0,
    cs_super_project_stage: 0, //+code/s multiplier of 1.1, (effort scales with .95, code with 1.05)
                                //gradual scale up of starting progress (at starting progress > cost game ends)
    cs_ai_projects: 0, //+code/s (eventually unlocks cs super project)
    cs_language_projects: 0, //reduces bug frequency/count
    cs_website_projects: 0, //haven't decided
    cs_math_solver_projects: 0, //+ calculations/s
    cs_game_projects: 0, //money/s
    //Active projects are completed and contributing, bugs can make them inactive
    cs_active_ais: 0, 
    cs_active_languages: 0,
    cs_active_websites: 0,
    cs_active_math_solvers: 0,
    cs_active_games: 0,
    cs_projects: {},
    
    seconds_played: 0 //New
};

var player_reset_copy = {};
for(var key in player){ //copy all the default values immediately, use these values during a reset
    player_reset_copy[key] = player[key];
    player_reset_copy.math_research_projects = {};
    player_reset_copy.cs_projects = {};
}

var contest_time = 300 //default value, set randomly after first time out

//button order is as it appears on page
//Buttons become available in reverse order
//Top table:
var effort_box = document.getElementById('effort_box');
var money_box = document.getElementById('money_box');
var calculations_box = document.getElementById('calculations_box');
var code_box = document.getElementById('code_box');
var math_skill_box = document.getElementById('math_skill_box');
var cs_skill_box = document.getElementById('cs_skill_box');

var effort_label_element = document.getElementById('effort_label');
var effort_count_element = document.getElementById('effort_count');
var money_label_element = document.getElementById('money_label');
var money_count_element = document.getElementById('money_count');
var calculations_label_element = document.getElementById('calculations_label');
var calculations_count_element = document.getElementById('calculations_count');
var code_label_element = document.getElementById('code_label');
var code_count_element = document.getElementById('code_count');
var math_label_element = document.getElementById('math_skill_label');
var math_count_element = document.getElementById('math_skill_count');
var cs_label_element = document.getElementById('cs_skill_label');
var cs_count_element = document.getElementById('cs_skill_count');
var muster_button = document.getElementById('muster');
var tab_bar = document.getElementById('tab_bar');
//main section buttons
var main_section = document.getElementById('main_section');
var math_section = document.getElementById('math_section');
var cs_section = document.getElementById('cs_section');
var main_tab_button = document.getElementById('main_tab_button');
//main classes
var learn_logic_button = document.getElementById('learn_logic');
var learn_math_button = document.getElementById('learn_math');
var learn_reading_button = document.getElementById('learn_reading');
learn_reading_button.innerHTML = textify('Learn to read');
//main grades/schools
//graduated:6
var school_up_5_button = document.getElementById('school_up_5');
var grade_up_4_button = document.getElementById('grade_up_4');
//grad school:5
var school_up_4_button = document.getElementById('school_up_4');
var grade_up_3_button = document.getElementById('grade_up_3'); 
//college:4
var school_up_3_button = document.getElementById('school_up_3');
var grade_up_2_button = document.getElementById('grade_up_2');
//high school:3
var school_up_2_button = document.getElementById('school_up_2');
var grade_up_1_button = document.getElementById('grade_up_1');
//middle school:2
var school_up_1_button = document.getElementById('school_up_1');
var grade_up_0_button = document.getElementById('grade_up_0');
//elementary school:1
var school_up_0_button = document.getElementById('school_up_0');
school_up_0_button.innerHTML = textify('Start School')
var buy_vacation_button = document.getElementById('buy_vacation');
var buy_motivation_button = document.getElementById('buy_motivation');
    //MATH section buttons
var math_tab_button = document.getElementById('math_tab_button');
//math classes buttons
var learn_complex_analysis_button = document.getElementById('learn_complex_analysis');
var learn_linear_algebra_button = document.getElementById('learn_linear_algebra');
var learn_number_theory_button = document.getElementById('learn_number_theory');
var learn_advanced_calculus_button = document.getElementById('learn_advanced_calculus');
var learn_calculus_button = document.getElementById('learn_calculus');
var learn_trigonometry_button = document.getElementById('learn_trigonometry');
var learn_algebra_2_button = document.getElementById('learn_algebra_2');
var learn_algebra_button = document.getElementById('learn_algebra');
var learn_geometry_button = document.getElementById('learn_geometry');
var learn_prealgebra_button = document.getElementById('learn_prealgebra');
var learn_decimals_button = document.getElementById('learn_decimals');
var learn_arithmetic_button = document.getElementById('learn_arithmetic');
//math shop
var buy_chalkboard_button = document.getElementById('buy_chalkboard');
var buy_notebook_button = document.getElementById('buy_notebook');
var buy_computer_math_button = document.getElementById('buy_computer_math');
var buy_graphing_calculator_button = document.getElementById('buy_graphing_calculator');
var buy_calculator_button = document.getElementById('buy_calculator');
var buy_answers_button = document.getElementById('buy_answers');
var math_ongoing_section = document.getElementById('math_ongoing');
//do math things
var do_math_super_project_button = document.getElementById('do_math_super_project');
var start_math_research_button = document.getElementById('start_math_research');
var start_math_contest_button = document.getElementById('start_math_contest');
var do_math_contest_button = document.getElementById('do_math_contest');
var do_tutoring_button = document.getElementById('do_tutoring');
var do_calculation_button = document.getElementById('do_calculation');
    //CS section buttons
var cs_tab_button = document.getElementById('cs_tab_button');
//cs classes buttons
var learn_haskell_button =  document.getElementById('learn_haskell');
var learn_javascript_button = document.getElementById('learn_javascript');
var learn_algorithms_button = document.getElementById('learn_algorithms');
var learn_cplusplus_button = document.getElementById('learn_cplusplus');
var learn_c_button = document.getElementById('learn_c');
var learn_html_button = document.getElementById('learn_html');
var learn_python_button = document.getElementById('learn_python');
var learn_logo_button = document.getElementById('learn_logo');
//CS shop
var buy_memory_button = document.getElementById('buy_memory');
var buy_developer_button = document.getElementById('buy_developer');
var buy_dev_tools_button = document.getElementById('buy_dev_tools');
var buy_computer_cs_button = document.getElementById('buy_computer_cs');
//CS projects
var create_cs_super_project_button = document.getElementById('create_cs_super_project');
var create_language_button = document.getElementById('create_language');
var create_website_button = document.getElementById('create_website');
var create_math_solver_button = document.getElementById('create_math_solver');
var create_game_button = document.getElementById('create_game');
var write_code_button = document.getElementById('write_code');
var cs_ongoing_section = document.getElementById('cs_ongoing');
    //Special section
var special_tab_button = document.getElementById('special_tab_button');
//Footer section
var save_game_button = document.getElementById('save_game');
var reset_game_button = document.getElementById('reset_game');
var autosaving = document.getElementById('autosaving');

var timer = document.getElementById('timer');

var visible_list = [
    effort_box,
    money_box,
    calculations_box,
    code_box,
    math_skill_box,
    cs_skill_box,

    muster_button,

    tab_bar,
    
    main_tab_button, //Main
    
    learn_logic_button,
    learn_reading_button,
    learn_math_button,
    
    school_up_5_button,
    grade_up_4_button,
    school_up_4_button,
    grade_up_3_button,
    school_up_3_button,
    grade_up_2_button,
    school_up_2_button,
    grade_up_1_button,
    school_up_1_button,
    grade_up_0_button,
    school_up_0_button,
    
    buy_vacation_button,
    buy_motivation_button,
    
    math_tab_button, //Math
    learn_complex_analysis_button,
    learn_linear_algebra_button,
    learn_number_theory_button,
    learn_advanced_calculus_button,
    learn_calculus_button,
    learn_trigonometry_button,
    learn_algebra_2_button,
    learn_algebra_button,
    learn_geometry_button,
    learn_prealgebra_button,
    learn_decimals_button,
    learn_arithmetic_button,
    
    do_math_super_project_button,
    start_math_research_button,
    start_math_contest_button,
    do_math_contest_button,
    do_tutoring_button,
    do_calculation_button,
    
    buy_chalkboard_button,
    buy_notebook_button,
    buy_computer_math_button,
    buy_graphing_calculator_button,
    buy_calculator_button,
    buy_answers_button,
    
    cs_tab_button, //CS
    learn_haskell_button,
    learn_javascript_button,
    learn_algorithms_button,
    learn_cplusplus_button,
    learn_html_button,
    learn_c_button,
    learn_python_button,
    learn_logo_button,
    
    buy_developer_button,
    buy_dev_tools_button,
    buy_computer_cs_button,
    buy_memory_button,
    
    create_cs_super_project_button,
    create_language_button,
    create_website_button,
    create_math_solver_button,
    create_game_button,
    write_code_button,
    
    special_tab_button
];

var notification_box = document.getElementById('notifications');

var note_list = new Array();
var note_text_list = new Array();

var tab_bar = document.getElementById('tab_bar');

var popup = document.getElementById('popup');
var popup_special_text = document.getElementById('popup_special_text');
var popup_cost = document.getElementById('popup_cost');
var popup_reward = document.getElementById('popup_reward');

// functions yay!

function save_game(){
    localStorage['scholar_clicker_save'] = btoa(JSON.stringify(player));
}

function load_save(){
    var current_version = player.version;
    if(localStorage['scholar_clicker_save']){
        player = JSON.parse(atob(localStorage['scholar_clicker_save']));
    }
    if(player.version != current_version){
        add_note("updated game to version " + current_version);
        
        //heck player variables against reset player variables to see if any are missing
        //If they are then update them to reset values and notify player that there may be errors
        var variable_warning = false;
        for(var key in player_reset_copy){
            if(player[key] == null){ //new variable added this version
                variable_warning = true;
                add_note("missing var" + key);
                player[key] = player_reset_copy[key];
            }
        }
        if(variable_warning){
            add_note("Some features may not work with your save");
            add_note("WARNING: You may need to reset");
        }
        player.version = current_version;
    }
}

load_save();

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

//round_to(51.1,0) gives 51 
function round_to(num, digits){
    var digger = Math.pow(10,digits);
    return (Math.floor(num*digger)/digger);
}

function number_to_text(num){
    if(player.math_level < 5){
        if(num <= 0){
            return 'None';
        }else if(num < 2){
            return 'Little';
        }else if(num < 5){
            return 'Bit';
        }else if(num < 8){
            return 'Some';
        }else if(num < 15){
            return 'Bunch';
        }else if(num < 100){
            return 'Lots';
        }else{
            return 'Tons';
        }
    }else{
        if(num >= 10000000){
            return round_to(num/1000000,1) + "m";
        }else if(num >= 10000){
            return round_to(num/1000,1) + "k";
        }
        return num;
    }
}

function next_level(skill_name){
    var very_large = 9000000000; //numbers seem to get messed up over 9.999 bil
    var best_next = very_large;
    for(var i = 0; i < visible_list.length; i++){
        var cur_button = visible_list[i];
        if(cur_button.requirements && cur_button.requirements[skill_name]){
            var others_met = true;
            for(var key in cur_button.requirements){
                if(key != skill_name && cur_button.requirements[key] > player[key]){
                    others_met = false;
                }
            }
            if(cur_button.requirements[skill_name] > player[skill_name]){
                best_next = Math.min(best_next, cur_button.requirements[skill_name]);
            }
        }    
    }
    if(best_next >= very_large){
        return false;
    }
    return best_next;
}

function update_counts() { //this function updates the number of clicks displayed
    if(player.musters >= 4){
        player.musters -= 4;
        player.effort += 1 + player.motivations;
    }
    muster_button.innerHTML = textify("Muster " + player.musters + "/4");
    muster_button.reward = {musters: 1, text: "4 musters = " + (1 + player.motivations) +" effort"};

    player.effort = Math.min(player.effort, player.max_effort);
    player.calculations = Math.min(player.calculations, player.max_calculations);
    player.code = Math.min(player.code, player.max_code);
    var show_rate = false;
    if(player.math_level >= 40){
        show_rate = true;
    }
    
    effort_label_element.innerHTML = textify('Effort');
    var shown_effort = number_to_text(Math.floor(player.effort));
    shown_effort += "/" + number_to_text(player.max_effort);
    if(show_rate){
        shown_effort += " (" + round_to(player.effort_per_second,2) + "/s)";
    }
    effort_count_element.innerHTML = textify(shown_effort);
    
    money_label_element.innerHTML = textify('Money');
    
    var shown_money = number_to_text(round_to(player.money,2));
    var money_rate = player.cs_active_games * 0.5 + player.money_per_second;
    money_rate = money_rate * Math.pow(cs_money_multiplier, player.cs_active_websites);
    money_rate = money_rate * Math.pow(math_money_multiplier, player.math_research_money_bonus);
    if(show_rate && money_rate > 0){
        shown_money = shown_money + " (" + round_to(money_rate,2) + "/s)";
    }
    money_count_element.innerHTML = textify(shown_money);
    
    //TODO: make it so grade ups are counted by this thing
    //TODO: grade up.[something] = [req0,req1,req2,req3]
    var shown_math_skill = number_to_text(player.math_level);
    if(player.show_next_math_level>0){
        if(player.next_math_level <= player.math_level){
            var new_math_level = next_level('math_level');
            player.next_math_level = new_math_level;
        }
        if(player.next_math_level){ //false if everything is unlocked
            shown_math_skill += "/" + number_to_text(player.next_math_level);
        }
    }
    math_count_element.innerHTML = textify(shown_math_skill);
    
    var shown_cs_skill = number_to_text(player.cs_level);
    if(player.show_next_cs_level>0){
        if(player.next_cs_level <= player.cs_level){
            var new_cs_level = next_level('cs_level');
            player.next_cs_level = new_cs_level;
        }
        if(player.next_cs_level){ //false if everything is unlocked
            shown_cs_skill += "/" + number_to_text(player.next_cs_level);
        }
    }
    cs_count_element.innerHTML = textify(shown_cs_skill);
    
    var shown_calculations = number_to_text(round_to(player.calculations,0));
    shown_calculations += "/" + number_to_text(player.max_calculations);
    if(show_rate && player.calculations_per_second > 0){
        var calc_rate = player.calculations_per_second*Math.pow(math_calc_multiplier, player.math_research_calculation_bonus);
        calc_rate = calc_rate * Math.pow(cs_calc_multiplier, player.cs_active_math_solvers);
        shown_calculations += " (" + round_to(calc_rate,2) + "/s)";
    }
    calculations_count_element.innerHTML = textify(shown_calculations);
    
    shown_code = number_to_text(round_to(player.code,0));
    shown_code += "/" + number_to_text(player.max_code);
    if(show_rate && player.code_per_second > 0){
        shown_code += " (" + round_to(Math.pow(math_code_multiplier,player.math_research_code_bonus)* player.code_per_second,2) + "/s)";
    }
    code_count_element.innerHTML = textify(shown_code);
    if(start_math_contest_button.disabled == false){
        start_math_contest_button.innerHTML = "Start Math Contest " + contest_time;
    }else{
        start_math_contest_button.innerHTML = "Start Math Contest";
    }
    if(debug){//TODO: eventually move this to some stats screen (make true time count, not fake time count)
        var seconds = player.seconds_played%60;
        var minutes = (round_to(player.seconds_played/60, 0))%60;
        var hours = (round_to(player.seconds_played/3600, 0))%60;
        timer_text = "" + seconds
        if(seconds <10){
            timer_text = "0" + timer_text;
        }
        timer_text = minutes + ":" + timer_text;
        if(minutes <10){
            timer_text = "0" + timer_text;
        }
        timer_text = "  " + hours + ":" + timer_text;
        timer.innerHTML = timer_text;
    }else{
        timer.innerHTML = "";
    }
}

function set_button_size(button, x_size, y_size){
    button.style.width = x_size + 'px';
    button.style.height = y_size + 'px';
}

function grow_button(button, x_size, y_size){
    var steps = 20.0;
    var n = 1.0
    var id = setInterval(function(){
        var step_x_size = x_size * n/steps;
        var step_y_size = y_size * n/steps;
        set_button_size(button, step_x_size, step_y_size);
        n++;
    }, 300.0 * n/steps)
    setTimeout(function(){
        set_button_size(button, x_size, y_size);
        clearInterval(id);
    }, 300.0 )
}

function button_appears(button){
    popup.style.display = 'none'; //hide the popup if we add a new button
    if(button.nodeName == 'BUTTON'){ //if its a button animate its appearance
        if(button.className == 'tab_button'){
            grow_button(button, 50.0, 23.0);
        }else{
            grow_button(button, button_width, 23.0);
        }
    }
    var parent_node = button.parentNode;
    while(parent_node != null){
        if(parent_node == main_section){
            if(main_tab_button.disabled == false){
                main_tab_button.innerHTML = "*main*"; //TODO: do something like change the color
            }
            break;
        }else if(parent_node == math_section){
            if(math_tab_button.disabled == false){
                math_tab_button.innerHTML = "*math*";
            }
            break;
        }else if(parent_node == cs_section){
            if(cs_tab_button.disabled == false){
                cs_tab_button.innerHTML = "*cs*";
            }
            break;
        }
        parent_node = parent_node.parentNode;
    }
}

function update_screen(){
    //TODO: make a list of key values where something changes and only update when one is passed
    //If this function gets too slow
    for(var i = 0; i < visible_list.length; i++){
        var cur_button = visible_list[i];
        //check if the current button should be visible now
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
                if(cur_button.style.display == 'none'){ // new button appears
                    button_appears(cur_button);
                } 
                cur_button.style.display = 'inline';
            }else{
                cur_button.style.display = 'none';
            }
        }
        //check if the current button should be disabled now
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
                if(! cur_button.disabled){
                    popup.style.display = 'none'; //hide popup when disabling a button
                    cur_button.disabled = true;
                }
            }else{
                cur_button.disabled = false;
            }
        }
        if(cur_button.inner_text){
            if(cur_button.text_counter && (player[cur_button.text_counter] > 0)){
                cur_button.innerHTML = "("+ player[cur_button.text_counter] + ") " + cur_button.inner_text;
            }else{
                cur_button.innerHTML = cur_button.inner_text;
            }
        }
    }
    //Custom button behavior (normal conditions aren't satifactory)

    var p_grade = player.grade;
    var p_math = player.math_level;
    //grades 1->2: free ,2->3:5, 3->4:15
    if((p_grade == 1) || (p_grade == 2 && p_math >= 5) || (p_grade == 3 && p_math >= 15)){
        if(grade_up_0_button.disabled == true){
            button_appears(grade_up_0_button); //newly appearing button so make it appear
        }
        grade_up_0_button.disabled = false;
    }else{
        grade_up_0_button.disabled = true;
    }
    //grades 5->6:160, 6->7:500, 7->8:1250
    if((p_grade == 5 && p_math >= 160) || (p_grade == 6 && p_math >= 500) || (p_grade == 7 && p_math >= 1250)){
        if(grade_up_1_button.disabled == true){
            button_appears(grade_up_1_button); //newly appearing button so make it appear
        }
        grade_up_1_button.disabled = false;
    }else{
        grade_up_1_button.disabled = true;
    }
    
    //grades 9->10:9000, 10->11:27000, 11->12:75000
    if((p_grade == 9 && p_math >= 9000) || (p_grade == 10 && p_math >= 27000) || (p_grade == 11 && p_math >= 75000)){
        if(grade_up_2_button.disabled == true){
            button_appears(grade_up_2_button); //newly appearing button so make it appear
        }
        grade_up_2_button.disabled = false;
    }else{
        grade_up_2_button.disabled = true;
    }
    
    //grades 13->14:400000 ,14->15:1000000 ,15->16: 2500000
    if((p_grade == 13 && p_math >= 400000) || (p_grade == 14 && p_math >= 1000000) || (p_grade == 15 && p_math >= 2500000)){
        if(grade_up_3_button.disabled == true){
            button_appears(grade_up_3_button); //newly appearing button so make it appear
        }
        grade_up_3_button.disabled = false;
    }else{
        grade_up_3_button.disabled = true;
    }
    
     //grades 17->18:10000000 ,18->19:20000000 ,19->20: 40000000
    if((p_grade == 17 && p_math >= 10000000) || (p_grade == 18 && p_math >= 20000000) || (p_grade == 19 && p_math >= 40000000)){
        if(grade_up_4_button.disabled == true){
            button_appears(grade_up_4_button); //newly appearing button so make it appear
        }
        grade_up_4_button.disabled = false;
    }else{
        grade_up_4_button.disabled = true;
    }
    
    if(player.bought_answers > 0){
        learn_algebra_button.style.display = 'inline'; 
    }
    if(player.bought_answers > 1){
        learn_algebra_2_button.style.display = 'inline'; 
    }
    buy_memory_button.reward = {max_code: player.max_code, memories: 1};
    buy_memory_button.cost = {money: (player.max_code/128)*100};
    if(player.calculations >= player.max_calculations){
        do_calculation_button.disabled = true;
    }else{
        do_calculation_button.disabled = false;
    }
    if(player.code >= player.max_code){
        write_code_button.disabled = true;
    }else{
        write_code_button.disabled = false;
    }
}

function textify(some_text){
    if(player.reading_level <= 4){
        var char_array = some_text.split('');
        for(var i = 0; i< char_array.length; i++){
            var char_code = char_array[i].charCodeAt(0);
            if(char_code%6 >= player.reading_level){
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

function try_to_get_something(button) {
    if(button.requirements){
        if(button.requirements.math_level){
            if(button.requirements.math_level > player.math_level){
                add_note("Math Skill not high enough");
                player.show_math_level = 1;
                update_screen();
                return;
            }
        }
    }
    if(button.cost){
        //var can_buy = true;
        var effort_cost = 0;
        var calculation_cost = 0;
        var money_cost = 0;
        var code_cost = 0;
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
        if(button.cost.code){
            code_cost = round_to(button.cost.code * multiplier, 0);
        }
        if (player.code < code_cost) {
            add_note('Not enough code');
            if(player.show_code == 0){
                player.show_code = 1;
                update_screen();
            }
            return false;
        }
        player.calculations -= calculation_cost;
        player.effort -= effort_cost;
        player.money -= money_cost;
        player.code -= code_cost;
    }
    return true;
}

function do_button_clicked(button){
    if(!try_to_get_something(button)){
        return false;
    }
    if(button.reward){
        for (var key in button.reward){
            if(key != 'text'){
                player[key] += button.reward[key];
            }
        }
    }
    update_counts();
    update_screen();
    update_popup(button);
    return true;
}

function update_popup(button){
    var popup_text_0 = '';
    var popup_text_1 = '';
    var popup_text_2 = '';
    if(button.disabled == true){
        popup.style.display = 'none';
        mouse_outs += 1;
        return;
    }
    if(button.special_text){
        popup_text_0 = button.special_text;
    }
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
            popup_text_1 += ' Effort, ';
            previous = true;
        }
        if(button.cost.money){
            popup_text_1 += '$' + number_to_text(round_to(button.cost.money*multiplier,2)) + ', ';
            previous = true;
        }
        if(button.cost.calculations && player.show_calculations > 0){
            popup_text_1 += number_to_text(round_to(button.cost.calculations*multiplier,0));
            popup_text_1 += ' Calculations, ';
            previous = true;
        }
        if(button.cost.code && player.show_code > 0){
            popup_text_1 += number_to_text(round_to(button.cost.code*multiplier,0));
            popup_text_1 += ' Code, ';
        }
        if(popup_text_1.length >= 2){ //chop off last 2 characters: ', '
            popup_text_1 = popup_text_1.slice(0, -2); 
        }
    }
    
    if(button.reward){
        previous = false;
        if(button.reward.math_level){
            if(player.show_math_level > 0){
                popup_text_2 += '+ ' + button.reward.math_level + ' Math Skill, ';
            }else{
                popup_text_2 += '+ Skill, ';
            }
        }
        if(button.reward.cs_level){
            if(player.show_cs_level > 0){
                popup_text_2 += '+ ' + button.reward.cs_level + ' CS Skill, ';
            }else{
                popup_text_2 += '+ Skill, ';
            }
        }
        if(button.reward.money){
            popup_text_2 += '+ $' + number_to_text(round_to(button.reward.money,2)) + ', ';
        }
        if(button.reward.calculations){
            popup_text_2 += '+ ' + round_to(button.reward.calculations,0) + 'Calculation';
            if(round_to(button.reward.calculations,0) != 1){popup_text_2 += 's';}
            popup_text_2 += ', ';
        }
        if(button.reward.code){
            popup_text_2 += '+ ' + button.reward.code + ' Code, ';
        }
        if(button.reward.effort_per_second){
            if(player.math_level >= 5){
                popup_text_2 += '+ ' + button.reward.effort_per_second + ' Effort/s, ';
            }else{
                popup_text_2 += '+ Effort/s, ';
            }
        }
        if(button.reward.calculations_per_second){
            popup_text_2 += '+ ' + round_to(button.reward.calculations_per_second,2) + ' Calculations/s, ';
        }
        if(button.reward.code_per_second){
            popup_text_2 += '+ ' + round_to(button.reward.code_per_second,2) + ' Code/s, ';
        }
        if(button.reward.max_calculations){
            popup_text_2 += '+ ' + number_to_text(round_to(button.reward.max_calculations,0)) + ' Max Calculations, ';
        }
        if(button.reward.max_code){
            popup_text_2 += '+ ' + number_to_text(round_to(button.reward.max_code,0)) + ' Max Code, ';
        }
        if(button.reward.text){ //special reward text
            popup_text_2 += button.reward.text + ', ';
        }
        if(popup_text_2.length >= 2){ //chop off last 2 characters which are: ', '
            popup_text_2 = popup_text_2.slice(0, -2); 
        }
    }
    popup_special_text.innerHTML = textify(popup_text_0);
    popup_cost.innerHTML = textify(popup_text_1);
    popup_reward.innerHTML = textify(popup_text_2);
}

var mouse_outs = 0;

function popup_display(check){
    if(mouse_outs == check){
        popup.style.display = 'inline';
    }
}

function button_mouse_over(button){
    var check_val = mouse_outs;
    
    update_popup(button);
    
   if(button.cost || button.reward){
        setTimeout(function()
        {
            popup_display(check_val); //don't show popup if player moved mouse elsewhere
        },900);
    }
}

popup.style.display = 'none';

function button_mouse_out(button){
    popup.style.display = 'none';
    mouse_outs += 1;
}

document.onmousemove = function follow(evt){
    popup.style.left = (evt.pageX+20) + 'px';
    popup.style.top = (evt.pageY+20) + 'px';
}


//Set up default behaviour for all buttons
//some overridden below for speciality buttons
for(var i = 0; i < visible_list.length; i++){
    var cur_item = visible_list[i];
    if(cur_item.nodeName == 'BUTTON'){ //isa button
        cur_item.onclick = function() {
            do_button_clicked(this);
        }
        cur_item.onmouseover = function(){
            button_mouse_over(this);
        }
        cur_item.onmouseout = function(){
            button_mouse_out(this);
        }
    }
}

//Main buttons click section

learn_math_button.onclick = function() {
    if(!do_button_clicked(this)){
        return;
    }
    if(player.math_level >= 5){
        add_note('Learned to count');
    }
}

function textify_update(){
    learn_reading_button.innerHTML = textify('Learn to read');
    school_up_0_button.innerHTML = textify('Start School');
    for(var i = 0; i< note_text_list.length; i++){
        var note = note_list[i];
        note.innerHTML = textify(note_text_list[i]);
    }
}

learn_reading_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    player.reading_level++;
    if(player.reading_level == 5){
        add_note('Learned to read');
    }
    textify_update();
    update_screen();
    update_counts(); //updates the text
    update_popup(this);
};

grade_up_4_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    var note_text = 'Started Grade ' + player.grade;
    add_note(note_text);
}

school_up_4_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started Grad School');
}

grade_up_3_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    var note_text = 'Started Grade ' + player.grade;
    add_note(note_text);
}

school_up_3_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started College');
}

grade_up_2_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    var note_text = 'Started Grade ' + player.grade;
    add_note(note_text);
}

school_up_2_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started High School');
}

grade_up_1_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    var note_text = 'Started Grade ' + player.grade;
    add_note(note_text);
}

school_up_1_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started Middle School');
    add_note('Autosave enabled');
    save_game();
}

grade_up_0_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    var note_text = 'Started Grade ' + player.grade;
    add_note(note_text);
}

school_up_0_button.onclick = function() {
    if(!do_button_clicked(this)){ return; }
    add_note('Started School');
}

//math section buttons
//math learning button click functionality done automatically
//math store buttons

buy_answers_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    player.bought_answers +=1;
    if(player.math_level > 1250){ //Skips another class if we already have access to it
        player.bought_answers +=1;
    }
    update_screen();
    update_counts();
}

function open_menu(menu_name){
    main_section.style.display = 'none';
    math_section.style.display = 'none';
    cs_section.style.display = 'none';
    main_tab_button.disabled = false;
    math_tab_button.disabled = false;
    cs_tab_button.disabled = false;
    if(menu_name == 'main'){
        main_tab_button.innerHTML = "main";
        main_section.style.display = 'inline';
        main_tab_button.disabled = true;
    }else if(menu_name == 'math'){
        math_tab_button.innerHTML = "math";
        math_section.style.display = 'inline';
        math_tab_button.disabled = true;
    }else if(menu_name == 'cs'){
        cs_tab_button.innerHTML = "cs";
        cs_section.style.display = 'inline';
        cs_tab_button.disabled = true;
    }
}

main_tab_button.onclick = function() {open_menu('main')}
math_tab_button.onclick = function() {open_menu('math')}
cs_tab_button.onclick = function() {open_menu('cs')}

function math_project_clicked(button){
    if(!try_to_get_something(button)){
        return;
    }
    var project_id = button.id;
    var players_project = player.math_research_projects[project_id];
    if(! players_project){
        add_note("Error: missing "+ project_id + " from player data");
        return;
    }
    players_project.progress += 1;

    if(players_project.progress >= players_project.max_progress){
        players_project.value = player.math_level* Math.random();
        players_project.status = 'completed';

        if(players_project.value > 500000 * Math.pow(3.0,player.math_research_calculation_bonus)){
            add_note("+" + round_to((math_calc_multiplier-1)*100,1) + "% bonus to calculations/s" );
            add_note("Discovered new computational method");
            add_note(players_project.name);
            //calculations/s multiplier
            player.math_research_calculation_bonus += 1;
        }else if(players_project.value > 200000*Math.pow(2.4,player.math_research_money_bonus)){
            //money/s multiplier
            add_note("+5% bonus to money/s");
            add_note("Found money management technique");
            add_note(players_project.name);
            player.math_research_money_bonus += 1;
        }else if(players_project.value > 100000*Math.pow(2.3,player.math_research_code_bonus)){
            add_note("+5% bonus to code/s");
            add_note("Computational breakthrough"); 
            add_note(players_project.name);
            player.math_research_code_bonus += 1;
        }else if(players_project.value > 50000*Math.pow(1.7,player.math_research_money)){
            players_project.status = 'failed';
            add_note("Won prize worth $5,000");
            add_note("Novel discovery");
            add_note(players_project.name);
            player.money += 5000.0;
            //+ money/s
            player.math_research_money += 1;
        }else{
            players_project.status = 'failed';
            add_note(players_project.name);
            add_note("hit a dead end");
            add_note("got 1000 Math Skill for the experience");
            player.math_level += 1000.0;
        }  
    }
    update_math_projects();
    update_screen();
    update_counts();
    update_popup(button);
}

//function for scoping button var 
function set_up_project_functions(project_button){
    var button_copy = project_button
    button_copy.onclick = function(){
        math_project_clicked(button_copy);
    }
    button_copy.onmouseover = function(){
        button_mouse_over(button_copy);
    }
    button_copy.onmouseout = function(){
        button_mouse_out(button_copy);
    }
}

function update_math_projects(){
    for(var i = 0; i < player.math_research_projects_count; i++){
        var project_id = "math_project_" + i;
        var players_project = player.math_research_projects[project_id];
        var current_project = document.getElementById(project_id);
        if(current_project == null){
            current_project = document.createElement('button');
            container_div = document.createElement('div');
            insert_start(container_div, math_ongoing_section);
            insert_start(current_project, container_div);
            current_project.style.height = "46px";
            current_project.id = project_id;
            current_project.innerHTML = players_project.name;
            current_project.cost = {};
            current_project.cost.effort = players_project.cost_effort;
            current_project.cost.calculations = players_project.cost_calculations;
            current_project.reward = {text: "+ ???"};
            grow_button(current_project, button_width, 46);
            set_up_project_functions(current_project);
        }
        if(players_project.status == 'started'){
            //add_note('started project '+ project_id)
            //add_note("button has id " + current_project.id);
            current_project.style.display = 'inline';
            current_project.disabled = false;
        }else if(players_project.status == 'failed'){
            current_project.style.display = 'none';
            current_project.disabled = true;
        }else{ //completed
            current_project.style.display = 'inline';
            current_project.disabled = true;
        }
        var percent = 100.0*players_project.progress/ players_project.max_progress;
        current_project.special_text = round_to(percent,1) + "% complete";
    }
}

var math_pre_prefix_words = ["Pure", "Applied", "Abstract", "Complex"];
var math_prefix_words = [   "Algebraic", "Geometric", "Hyperbolic", "Trigonometric", 
                            "Elliptical", "Numeric", "Homological", "Linear",
                            "Vector", "Dynamical", "Probabilistic", "Computational",
                            "Differential", "Fractal", "Quantum"];
var math_midfix_words = [   "Algebra", "Geometry", "Curves", "Knot Theory", 
                            "Number Theory", "Topology", "Information Theory", 
                            "Game Theory", "Calculus", "Group Theory", "Tensor Theory",
                            "Combinatorics", "Statistics", "Manifolds"];
                       
start_math_research_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    
    var new_project_name = "";
    if(Math.random() < .25){
        var pre_prefix = math_pre_prefix_words[Math.floor(Math.random()*math_pre_prefix_words.length)];
        new_project_name = new_project_name + pre_prefix + " ";
    }
    var prefix = math_prefix_words[Math.floor(Math.random()*math_prefix_words.length)];
    new_project_name = new_project_name + prefix + " ";
    var midfix = math_midfix_words[Math.floor(Math.random()*math_midfix_words.length)];
    new_project_name = new_project_name + midfix;
    //TODO: give bonus attributes for certain names
    
    var project_id = "math_project_" + player.math_research_projects_count;
    var exponent_multiplier = Math.pow(1.15, player.math_research_projects_count);
    //calculation costs increase much faster since calculation makers are much easier to get
    var calculation_multiplier = Math.pow(1.26, player.math_research_projects_count); 
    
    player.math_research_projects[project_id] = {};
    players_project = player.math_research_projects[project_id];
    players_project.name = new_project_name;
    players_project.progress = 0.0;
    players_project.max_progress = Math.floor(Math.pow(exponent_multiplier,.7)*20.0); //max progress increases slower
    players_project.cost_effort = Math.floor(exponent_multiplier*(10.0+20.0*Math.random()));
    players_project.cost_calculations = Math.floor(calculation_multiplier*(10+40*Math.random()));;
    players_project.value = 0;
    players_project.status = 'started';
    
    player.math_research_projects_count+=1;
    update_math_projects();
}

function math_contest_popup_text(){ 
    //rewards are 1st: 100%, 2nd: 50%, 3rd: 20%
    var reward_text = "1st: $";
    reward_text += round_to(player.contest_winnings * 1.0, 2);
    reward_text += ", 2nd: $";
    reward_text += round_to(player.contest_winnings * 0.5, 2);
    reward_text += ", 3rd: $";
    reward_text += round_to(player.contest_winnings * 0.2, 2);
    do_math_contest_button.reward = {text: reward_text};
    if(player.contest_progress > 0){
        do_math_contest_button.special_text = player.contest_progress + "0% completed";
    }else{
        do_math_contest_button.special_text = "0% completed";
    }
    
    //also sets the button cost            e:contest_win*3.0   
    do_math_contest_button.cost = { calculations: Math.floor(player.contest_winnings *0.10),
                                    effort: Math.floor(player.contest_winnings *0.10)}
}


start_math_contest_button.onclick = function() {
    start_math_contest_button.disabled = true;
    do_math_contest_button.style.display = 'inline';
    player.in_contest = true;
    math_contest_popup_text();
}

do_math_contest_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    player.contest_strength += player.math_level * Math.random() * Math.random() * 0.1; 
    player.contest_progress += 1;
    add_note(player.contest_progress + "0% completed"); //TODO: remove maybe?
    do_math_contest_button.special_text = player.contest_progress + "0% completed";
    update_popup(this); //update the popup's progress counter
    if(player.contest_progress >= 10){
        //player strength average of player.math_level/4
        var base_competitor_strength = player.contest_winnings * 100.0; //competitor strength = 
        var ranking = 1;
        for(var i = 0; i<9; i++){
            var competitor_strength = Math.random()* Math.random() * base_competitor_strength;
            if(competitor_strength > player.contest_strength){ //someone did better than you
                ranking+=1;
            }
        }
        //TODO make this a switch statement if possible
        if(ranking == 1){
            var first_prize = round_to(player.contest_winnings * 1.0,2);
            player.money += first_prize;
            player.contest_winnings += first_prize * 0.8; //20% not counted bonus for easier next round 
            add_note("Got 1st place and won $" + first_prize);
        }else if(ranking == 2){
            var second_prize = round_to(player.contest_winnings * 0.5,2)
            player.money += second_prize;
            player.contest_winnings += second_prize;
            add_note("Got 2nd place and won $" + second_prize);
        }else if(ranking == 3){
            var third_prize = round_to(player.contest_winnings * 0.2,2)
            player.money += third_prize;
            player.contest_winnings += third_prize;
            add_note("Got 3rd place and won $" + third_prize);
        }else if(ranking == 10) {
            add_note("Got last place, no prize for you");
        }else{
            add_note("Got "+ ranking + "th place, no prize"); //4th-9th
        }
        player.contest_progress = 0;
        player.contest_strength = 0;
        player.in_contest = false;
        do_math_contest_button.style.display = 'none';
        start_math_contest_button.style.display = 'none';
        start_math_contest_button.disabled = false;
        reset_math_timer();
    }
    
    update_counts();
}

function reset_math_timer(){
    contest_time = 240* (1.0+ Math.random()); //random 4-8 minutes
}
//reset_math_timer()

function math_timer(){
    if(! player.in_contest){
        if(start_math_contest_button.style.display == 'none'){
            if(player.math_level > 9000 && player.grade >= 10){ //over nine thousand
                start_math_contest_button.style.display = 'inline'; //make button visible
                contest_time = 30; //but only for 30 seconds
            }else{
                start_math_contest_button.style.display = 'none';
                reset_math_timer(); //restart the wait 
            }
        }else{ //30 seconds ran out, hide again
            start_math_contest_button.style.display = 'none';
            reset_math_timer();
        }
    }
}

function cs_project_clicked(button){
    if(!try_to_get_something(button)){
        return;
    }
    var project_id = button.id;
    var players_project = player.cs_projects[project_id];
    if(! players_project){
        add_note("Error: missing "+ project_id + " from player data");
        return;
    }
    //add_note("curent status " + players_project.status);
    if(players_project.status == 'started'){
        players_project.progress += 1;
        //add_note("progress made");
    }else if(players_project.status == 'bugged'){
        players_project.bug_count -= 1;
    }

    if(players_project.progress >= players_project.max_progress && players_project.bug_count <= 0){
        var bug_special = Math.pow(cs_bug_multiplier, player.cs_active_languages);
        players_project.bug_count = Math.floor(Math.random() * players_project.max_bugs / bug_special);
        players_project.max_bugs = players_project.bug_count;
        if(players_project.bug_count > 0){
            if(players_project.bug_count == 1){
                add_note(players_project.bug_count + " bug appeared");
            }else{
                add_note(players_project.bug_count + " bugs appeared");
            }
            add_note(players_project.name);
            players_project.status = 'bugged';
        }else{
            add_note("fully debugged for now");
            add_note(players_project.name);
            players_project.status = 'active';
            player.show_cs_level = 1;  //bonus prize: now show your cs level for first project finished
            if(players_project.type != 'cs_game_projects'){
                player.show_next_cs_level = 1;
            }
        }

        update_cs_projects();
    }else if(players_project.status == 'started'){
        //note removed, it was taking up too much note space, popup is sufficient instead
        //var percent = 100.0*(players_project.progress/ players_project.max_progress);
        //add_note(players_project.name + " " + round_to(percent,1) + "% complete");
        //update the popup's progress counter
    }
    update_screen();
    update_counts();
    update_cs_projects();
    update_popup(button); 
}

function check_cs_project(project_id){
    var current_project_button = document.getElementById(project_id);
    var players_project = player.cs_projects[project_id];
    if(current_project_button == null){
        current_project_button = document.createElement('button');
        container_div = document.createElement('div');
        insert_start(container_div, cs_ongoing_section);
        insert_start(current_project_button, container_div);
        current_project_button.id = project_id;
        current_project_button.style.height = '46px';
        current_project_button.innerHTML = players_project.name;
        current_project_button.cost = {};
        current_project_button.cost.effort = players_project.cost_effort;
        current_project_button.cost.code = players_project.cost_code;
        if(players_project.cost_calculations){
            current_project_button.cost.calculations = players_project.cost_calculations;
        }
        if(players_project.type == 'cs_game_projects'){
            current_project_button.reward = {text: "+ $0.50/s when active"};
        }else if(players_project.type == 'cs_math_solver_projects'){
            current_project_button.reward = {text: "+ 10% calculations/s when active"};
        }else if(players_project.type == 'cs_website_projects'){
            current_project_button.reward = {text: "+ 10% money/s when active"};
        }else if(players_project.type == 'cs_language_projects'){
            current_project_button.reward = {text: "+ 20% fewer bugs/less frequent bugs"};
        }else{ 
            add_note("ERROR: bad project type");
        }
        grow_button(current_project_button, button_width, 46);
        
        current_project_button.onclick = function(){
            cs_project_clicked(current_project_button);
        }
        current_project_button.onmouseover = function(){
            button_mouse_over(current_project_button);
        }
        current_project_button.onmouseout = function(){
            button_mouse_out(current_project_button);
        }
    }
    var percent = 100.0*(players_project.progress/ players_project.max_progress);
    if(players_project.progress < players_project.max_progress){
        current_project_button.special_text = round_to(percent,1) + "% complete";
    }else{
        current_project_button.special_text = "";
    }
    if(players_project.bug_count > 0){
        current_project_button.innerHTML = players_project.name + "  bugs: " + players_project.bug_count;
    }else{
        current_project_button.innerHTML = players_project.name;
    }
    if(players_project.status == 'active'){
        current_project_button.disabled = true;
    }else{
        current_project_button.disabled = false;
    }
}

function update_cs_projects(){
    var active_games = 0;
    var active_math_solvers = 0;
    var active_websites = 0;
    var active_languages = 0;
    for(var i = 0; i < player.cs_projects_count; i++){
        var project_id = 'cs_project' + i;
        check_cs_project(project_id);
        var players_project = player.cs_projects[project_id];
        if(players_project.type == 'cs_game_projects'){
            if(players_project.status == 'active'){
                active_games += 1;
            }
        }else if(players_project.type == 'cs_math_solver_projects'){
            if(players_project.status == 'active'){
                active_math_solvers += 1;
            }
        }else if(players_project.type == 'cs_website_projects'){
            if(players_project.status == 'active'){
                active_websites += 1;
            }
        }else if(players_project.type == 'cs_language_projects'){
            if(players_project.status == 'active'){
                active_languages += 1;
            }
        }
    }
    player.cs_active_games = active_games;
    player.cs_active_math_solvers = active_math_solvers;
    player.cs_active_websites = active_websites;
    player.cs_active_languages = active_languages;
    //TODO: ai projects, somehow
}

function start_cs_project(project_type){
    var project_name = prompt("Enter a name for your project","");
    if(project_name == null || project_name == ""){
        project_name = "Project " + player.cs_projects_count;
    }
    
    var project_id = 'cs_project' + player.cs_projects_count; //type followed by count

    var difficulty_multiplier = 1.0;
    var calculation_cost_multiplier = 0;
    //no multiplier for cs_game
    if(project_type == 'cs_math_solver_projects'){
        difficulty_multiplier = 2.0;
        calculation_cost_multiplier = 1.0; //this one also needs calculations
    }else if(project_type == 'cs_website_projects'){
        difficulty_multiplier = 4.0;
    }else if(project_type == 'cs_language_projects'){
        difficulty_multiplier = 10.0;
    }
    
    var exponent_multiplier = difficulty_multiplier * Math.pow(1.75, player[project_type]);
    //effort gets a smaller multiplier since its harder to get
    var effort_multiplier = Math.pow(difficulty_multiplier, .65);
    //max progress is linear so it doesn't matter in the long run O(n)<O(e^n)
    var progress_multiplier = difficulty_multiplier * (1.0 + (player[project_type])/3.0);
    
    player.cs_projects[project_id] = {};
    players_project = player.cs_projects[project_id];
    players_project.name = project_name;
    players_project.type = project_type;
    players_project.progress = 0.0;
    players_project.max_progress = Math.floor(progress_multiplier*10.0);
    players_project.cost_effort = Math.floor(effort_multiplier*(12.0+25.0*Math.random()));
    players_project.cost_code = Math.floor(exponent_multiplier*(3+8*Math.random()));
    if(calculation_cost_multiplier > 0){
        players_project.cost_calculations = Math.floor(exponent_multiplier*(6+6*Math.random()));
    }
    players_project.value = 0;
    players_project.max_bugs = players_project.max_progress;
    players_project.bug_count = 0;
    players_project.status = 'started';
    
    player[project_type] += 1;
    player.cs_projects_count += 1;
    update_cs_projects();
}

//create_cs_super_project_button.requirements = {grade:12, cs_level:9999999999};

create_language_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    start_cs_project('cs_language_projects');
}

create_website_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    start_cs_project('cs_website_projects');
}

create_math_solver_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    start_cs_project('cs_math_solver_projects');
}

create_game_button.onclick = function() {
    if(!try_to_get_something(this)){
        return;
    }
    start_cs_project('cs_game_projects');
}

if(debug){
    var multiplier_element = document.getElementById('multiplier_text');
    multiplier_element.style.display = '';
    var speed_up_button = document.getElementById('speed_up');
    speed_up_button.style.display = '';
    speed_up_button.onclick = function(){
        debug_multiplier = debug_multiplier *2;
        multiplier_element.innerHTML = "x" + debug_multiplier;
    };
    var slow_down_button = document.getElementById('slow_down');
    slow_down_button.style.display = '';
    slow_down_button.onclick = function(){
        debug_multiplier = debug_multiplier/2;
        multiplier_element.innerHTML = "x" + debug_multiplier;
    };
}


function initialize(){ //run all the update type functions
    if(player.effort_per_second == 0){ //new game or game reset
        add_note('Born');
    }
    textify_update();
    //buy_calculator_button.innerHTML = "Calculator";
    //buy_graphing_calculator_button.innerHTML = "Graphing Calculator";
    //buy_computer_math_button.innerHTML = "Computer";
    //buy_computer_cs_button.innerHTML = "Computer";
    //buy_dev_tools_button.innerHTML = "Dev Tools";
    //buy_developer_button.innerHTML = "Developer";
    math_contest_popup_text();
    math_timer();
    open_menu('main');
    player.next_math_level = 5; //reset these so they get updated by update_counts if something new was added
    player.next_cs_level = 5;
    update_screen();
    update_counts();
    autosaving.style.display = 'none';
    update_math_projects();
    update_cs_projects();
    if(player.in_contest){
        start_math_contest_button.disabled = true;
        do_math_contest_button.style.display = 'inline';
    }else{
        do_math_contest_button.style.display = 'none';
    }
}

initialize();

save_game_button.onclick = function(){
    save_game();
    add_note("Game Saved");
}

reset_game_button.onclick = function(){
    var r = confirm("Reset Everything?");
    if(r == true){
        while(cs_ongoing_section.firstChild){
            cs_ongoing_section.removeChild(cs_ongoing_section.firstChild);
        }
        while(math_ongoing_section.firstChild){
            math_ongoing_section.removeChild(math_ongoing_section.firstChild);
        }
        for(var key in player_reset_copy){ //copy all the default values immediately, use these values during a reset
            player[key] = player_reset_copy[key];
            player.math_research_projects = {};
            player.cs_projects = {};
        }
        initialize();
    }
}

var autosave_timer = 0;

setInterval(function () { 
    var effort_rate = player.effort_per_second;
    var money_rate = player.money_per_second + player.cs_active_games * .5;
    money_rate = money_rate * Math.pow(cs_money_multiplier, player.cs_active_websites);
    money_rate = money_rate * Math.pow(math_money_multiplier, player.math_research_money_bonus);
    var calculation_rate = player.calculations_per_second * Math.pow(math_calc_multiplier, player.math_research_calculation_bonus);
    calculation_rate = calculation_rate * Math.pow(cs_calc_multiplier, player.cs_active_math_solvers);
    var code_rate = player.code_per_second * Math.pow(math_code_multiplier,player.math_research_code_bonus);
    var multiplier = 1;
    if(debug){
        multiplier = debug_multiplier;
    }
    player.effort += effort_rate*multiplier;
    
    player.money += money_rate*multiplier;
    player.calculations += calculation_rate*multiplier;
    player.code += code_rate*multiplier;
    
    player.seconds_played += debug_multiplier;
    
    
    contest_time -= 1 * multiplier;
    //player.money = contest_time; //Test line
    if(contest_time <= 0){
        math_timer();
    }
    
    autosave_timer = (autosave_timer+1)%20 //autosave every 20 sec
    if(autosave_timer == 0 && player.school >= 2){
        autosaving.style.display = '';
        save_game();
    }else{
        autosaving.style.display = 'none';
    }
    
    for(var key in player.cs_projects){
        //1 in 10000 chance to bug per second (lasts ~3 hours on average)
        var players_project = player.cs_projects[key];
        var bug_special = Math.pow(cs_bug_multiplier, player.cs_active_languages);
        //x times speed means x times bug chance
        if(players_project.status == "active"  && Math.random() * 10000/multiplier * bug_special < 1.0){
            players_project.bug_count = Math.floor(players_project.max_progress/10 * Math.random()/bug_special);
            if(players_project.bug_count > 0){
                add_note(players_project.bug_count + " bugs appeared in " + players_project.name);
                players_project.status = 'bugged';
                update_cs_projects();
            }
        }
    }

    update_counts(); 
}, 1000); //update stuff once per second
