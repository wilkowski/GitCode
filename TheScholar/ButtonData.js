//This file not currently being used, I'll set it up later maybe

var main_tab_button = document.getElementById("main_tab_button");
main_tab_button.requirements = {math_level: 5};
//main classes
var learn_logic_button = document.getElementById("learn_logic");
learn_logic_button.requirements = {school: 1, math_level:50};
learn_logic_button.cost = {effort: 20};
learn_logic_button.reward = {cs_level: 1};
learn_logic_button.disable = {cs_level: 5};

var learn_math_button = document.getElementById("learn_math");
learn_math_button.style.display = 'none';
learn_math_button.requirements = {grade: 2};
learn_math_button.disable = {math_level: 10};
learn_math_button.cost = {effort: 2};
learn_math_button.reward = {math_level: 1};

var learn_reading_button = document.getElementById("learn_reading");
learn_reading_button.innerHTML = textify('Learn to read');
learn_reading_button.requirements = {school: 1};
learn_reading_button.cost = {effort: 1};
learn_reading_button.disable = {reading_level: 5};
learn_reading_button.reward = {reading_level: 1};
//main grades/schools
var grade_up_4_button = document.getElementById("grade_up_4");
grade_up_4_button.requirements = {school: 5};
grade_up_4_button.disable = {grade: 20}; //unused
grade_up_4_button.cost = {effort: 1.953125};
grade_up_4_button.exponent = {grade: 2.0};
grade_up_4_button.reward = {grade: 1, effort_per_second: 2.0};
//grad school:5
var school_up_4_button = document.getElementById("school_up_4");
school_up_4_button.requirements = {school: 3, math_level: 500, grade:16};
school_up_4_button.disable = {school: 4};
school_up_4_button.cost = {effort: 100};
school_up_4_button.reward = {school: 1, grade:1, effort_per_second: 2.0, money_per_second:0.4};

var grade_up_3_button = document.getElementById("grade_up_3");
grade_up_3_button.requirements = {school: 4};
grade_up_3_button.disable = {grade: 16}; //unused
grade_up_3_button.cost = {effort: 1.953125};
grade_up_3_button.exponent = {grade: 2.0};
grade_up_3_button.reward = {grade: 1, effort_per_second: 2.0};
//college:4
var school_up_3_button = document.getElementById("school_up_3");
school_up_3_button.requirements = {school: 2, math_level: 200, grade:12};
school_up_3_button.disable = {school: 4};
school_up_3_button.cost = {effort: 100};
school_up_3_button.reward = {school: 1, grade:1, effort_per_second: 2.0, money:100};

var grade_up_2_button = document.getElementById("grade_up_2");
grade_up_2_button.requirements = {school: 3};
grade_up_2_button.disable = {grade: 12}; //unused
grade_up_2_button.cost = {effort: 1.953125};
grade_up_2_button.exponent = {grade: 2.0};
grade_up_2_button.reward = {grade: 1, effort_per_second: 1};
//high school:3
var school_up_2_button = document.getElementById("school_up_2");
school_up_2_button.requirements = {school: 1, math_level: 100, grade:8};
school_up_2_button.disable = {school: 3};
school_up_2_button.cost = {effort: 500};
school_up_2_button.reward = {school: 1, grade:1, show_math_level:1, effort_per_second: 1.0, money_per_second:0.1};

var grade_up_1_button = document.getElementById("grade_up_1");
grade_up_1_button.requirements = {school: 2}; //math level: 100, 400, 900
grade_up_1_button.disable = {grade: 8}; //unused
grade_up_1_button.cost = {effort: 3.90625};
grade_up_1_button.exponent = {grade: 2.0};
grade_up_1_button.reward = {grade: 1, effort_per_second: 0.5};
//middle school:2
var school_up_1_button = document.getElementById("school_up_1");
school_up_1_button.requirements = {math_level: 200, grade:4};
school_up_1_button.disable = {school: 2};
school_up_1_button.cost = {effort: 200};
school_up_1_button.reward = {school: 1, grade:1, effort_per_second: 0.5, money:10};

var grade_up_0_button = document.getElementById("grade_up_0");
grade_up_0_button.requirements = {reading_level: 5};
grade_up_0_button.disable = {grade: 4}; //unused
grade_up_0_button.cost = {effort: 8.0/3.0};
grade_up_0_button.exponent = {grade: 3.0};
grade_up_0_button.reward = {grade: 1, effort_per_second: 0.25};
//elementary school:1
var school_up_0_button = document.getElementById("school_up_0");
school_up_0_button.innerHTML = textify('Start School');
school_up_0_button.disable = {school: 1};
school_up_0_button.cost = {effort: 2};
school_up_0_button.reward = {school: 1, grade: 1, effort_per_second: 0.25};


//math section buttons
var math_tab_button = document.getElementById("math_tab_button");
math_tab_button.requirements = {math_level: 5};

var learn_advanced_calculus_button = document.getElementById("learn_advanced_calculus");
learn_advanced_calculus_button.requirements = {school: 3, math_level: 4000};
learn_advanced_calculus_button.cost = {effort: 7, calculations:12};
learn_advanced_calculus_button.reward = {math_level: 35};

var learn_calculus_button = document.getElementById("learn_calculus");
learn_calculus_button.requirements = {school: 2, math_level: 2000};
learn_calculus_button.cost = {effort: 5, calculations:9};
learn_calculus_button.reward = {math_level: 20};

var learn_trigonometry_button = document.getElementById("learn_trigonometry");
learn_trigonometry_button.requirements = {school: 2, math_level: 1000};
learn_trigonometry_button.cost = {effort: 5, calculations:4};
learn_trigonometry_button.reward = {math_level: 12};

var learn_algebra_2_button = document.getElementById("learn_algebra_2");
learn_algebra_2_button.requirements = {school: 2,math_level: 500};
learn_algebra_2_button.cost = {effort: 5, calculations:3};
learn_algebra_2_button.reward = {math_level: 10};

var learn_algebra_button = document.getElementById("learn_algebra");
learn_algebra_button.requirements = {math_level: 200};
learn_algebra_button.cost = {effort: 3, calculations:2};
learn_algebra_button.reward = {math_level: 6};

var learn_prealgebra_button = document.getElementById("learn_prealgebra");
learn_prealgebra_button.requirements = {grade: 4};
learn_prealgebra_button.cost = {effort: 5};
learn_prealgebra_button.reward = {math_level: 5};

var learn_geometry_button = document.getElementById("learn_geometry");
learn_geometry_button.requirements = {math_level: 35};
learn_geometry_button.cost = {effort: 4};
learn_geometry_button.reward = {math_level: 3};

var learn_arithmetic_button = document.getElementById("learn_arithmetic");
learn_arithmetic_button.requirements = {math_level: 10};
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

var start_math_contest_button = document.getElementById("start_math_contest");
var do_math_contest_button = document.getElementById("do_math_contest");

var do_tutoring_button = document.getElementById("do_tutoring");
do_tutoring_button.requirements = {school: 3};
do_tutoring_button.cost = {effort:40};
do_tutoring_button.exponent = {times_tutored: 1.5}
do_tutoring_button.reward = {money: 20.00, times_tutored: 1};

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
buy_graphing_calculator_button.requirements = {calculators: 2, math_level: 70};
buy_graphing_calculator_button.cost = {money:100.00};
buy_graphing_calculator_button.exponent = {graphing_calculators: 1.5};
buy_graphing_calculator_button.reward = {calculations_per_second: 1, graphing_calculators:1};

var buy_calculator_button = document.getElementById("buy_calculator");
buy_calculator_button.requirements = {school: 2};
buy_calculator_button.cost = {money:5.00};
buy_calculator_button.exponent = {calculators: 1.5};
buy_calculator_button.reward = {calculations_per_second: 0.1, calculators:1};
//buy_calculator_button.cost.money = round_to(5.00 * Math.pow(1.5,player.calculators), 2);

var buy_answers_button = document.getElementById("buy_answers");
buy_answers_button.requirements = {school: 2};
buy_answers_button.cost = {money:5.00};
buy_answers_button.reward = {bought_answers:1};
buy_answers_button.disable = {bought_answers:1};

//cs section buttons

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
buy_computer_cs_button.cost = {money: 1000.00};
buy_computer_cs_button.exponent = {computers: 1.5};
buy_computer_cs_button.reward = {calculations_per_second: 10, code_per_second: 10, computers: 1};

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
math_label_element.requirements = {show_math_level: 1};
var math_count_element = document.getElementById("math_skill_count");
math_count_element.requirements  = {show_math_level: 1};

var tab_bar = document.getElementById("tab_bar");
tab_bar.requirements = {math_level: 10};