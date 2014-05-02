//this file sets up the data used for each button

var effort_box = document.getElementById('effort_box');
var money_box = document.getElementById('money_box');
var calculations_box = document.getElementById('calculations_box');
calculations_box.requirements = {show_calculations: 1};
var code_box = document.getElementById('code_box');
code_box.requirements = {show_code: 1};
var math_skill_box = document.getElementById('math_skill_box');
math_skill_box.requirements = {show_math_level: 1};
var cs_skill_box = document.getElementById('cs_skill_box');
cs_skill_box.requirements = {show_cs_level: 1};

/*
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
*/

var muster_button = document.getElementById('muster');
muster_button.requirements = {grade: 3};
muster_button.reward = {musters: 1, text: "4 musters = 1 effort"}; //gets updated by main

var tab_bar = document.getElementById('tab_bar');
tab_bar.requirements = {math_level: 5};

//main section buttons

//var main_section = document.getElementById('main_section');
//var math_section = document.getElementById('math_section');
//var cs_section = document.getElementById('cs_section');

var main_tab_button = document.getElementById('main_tab_button');
main_tab_button.requirements = {math_level: 5};
//main classes
var learn_logic_button = document.getElementById('learn_logic');
learn_logic_button.requirements = {school: 3, math_level:3000};
learn_logic_button.cost = {effort: 20};
learn_logic_button.reward = {cs_level: 1};
learn_logic_button.disable = {cs_level: 10};

var learn_math_button = document.getElementById('learn_math');
learn_math_button.requirements = {grade: 2};
learn_math_button.disable = {math_level: 5};
learn_math_button.cost = {effort: 2};
learn_math_button.reward = {math_level: 1};

var learn_reading_button = document.getElementById('learn_reading');
learn_reading_button.requirements = {school: 1};
learn_reading_button.cost = {effort: 1};
learn_reading_button.disable = {reading_level: 5};
learn_reading_button.reward = {reading_level: 1};
//main grades/schools
//graduated:6
var school_up_5_button = document.getElementById('school_up_5');
school_up_5_button.requirements = {school: 4, math_level: 100000000, grade:20};
school_up_5_button.disable = {school: 6};
school_up_5_button.cost = {effort: 1000000};
school_up_5_button.reward = {school: 1, grade:1, effort_per_second: 7.0, money_per_second:1.5, max_effort: 9000000};

var grade_up_4_button = document.getElementById('grade_up_4'); //special disable condition at 20
grade_up_4_button.requirements = {school: 5};
grade_up_4_button.cost = {effort: 1.52587890625};
grade_up_4_button.exponent = {grade: 2.0};
grade_up_4_button.reward = {grade: 1, effort_per_second: 2.0};
//grad school:5
var school_up_4_button = document.getElementById('school_up_4');
school_up_4_button.requirements = {school: 3, math_level: 6000000, grade:16};
school_up_4_button.disable = {school: 5};
school_up_4_button.cost = {effort: 100000};
school_up_4_button.reward = {school: 1, grade:1, effort_per_second: 2.0, money_per_second:1.0, max_effort: 900000, show_cs_level:1};

var grade_up_3_button = document.getElementById('grade_up_3'); //special disable condition at 16
grade_up_3_button.requirements = {school: 4};
grade_up_3_button.cost = {effort: 2.44140625}; //20000/2^13
grade_up_3_button.exponent = {grade: 2.0};
grade_up_3_button.reward = {grade: 1, effort_per_second: 2.0};
//college:4
var school_up_3_button = document.getElementById('school_up_3');
school_up_3_button.requirements = {school: 2, math_level: 200000, grade:12};
school_up_3_button.disable = {school: 4};
school_up_3_button.cost = {effort: 10000};
school_up_3_button.reward = {school: 1, grade:1, effort_per_second: 2.0, money_per_second:0.5, max_effort: 90000};

var grade_up_2_button = document.getElementById('grade_up_2'); //special disable condition at 12
grade_up_2_button.requirements = {school: 3};
grade_up_2_button.cost = {effort: 3.90625}; // 2000/2^9
grade_up_2_button.exponent = {grade: 2.0};
grade_up_2_button.reward = {grade: 1, effort_per_second: 1, show_next_math_level: 1};
//high school:3
var school_up_2_button = document.getElementById('school_up_2');
school_up_2_button.requirements = {school: 1, math_level: 3000, grade:8};
school_up_2_button.disable = {school: 3};
school_up_2_button.cost = {effort: 1000};
school_up_2_button.reward = {school: 1, grade:1, show_math_level:1, effort_per_second: 1.0, money:200, max_effort: 9000, bought_answers:1};

var grade_up_1_button = document.getElementById('grade_up_1'); //special disable condition at 8
grade_up_1_button.requirements = {school: 2}; //math level: 100, 400, 900
grade_up_1_button.cost = {effort: 5};
grade_up_1_button.exponent = {grade: 2.0};
grade_up_1_button.reward = {grade: 1, effort_per_second: 0.5};
//grade_up_1_button.special_disable = {grade: {1:0, 2:5, 3:15}}; //TODO: make this work nicely
//middle school:2
var school_up_1_button = document.getElementById('school_up_1');
school_up_1_button.requirements = {math_level: 30, grade:4}; //TODO: fix math level
school_up_1_button.disable = {school: 2};
school_up_1_button.cost = {effort: 75};
school_up_1_button.reward = {school: 1, grade:1, effort_per_second: 0.5, money:20, max_effort: 900};

var grade_up_0_button = document.getElementById('grade_up_0'); //special disable condition at 4
grade_up_0_button.requirements = {reading_level: 5};
grade_up_0_button.cost = {effort: 4.0};
grade_up_0_button.exponent = {grade: 2.0};
grade_up_0_button.reward = {grade: 1, effort_per_second: 0.25};
//elementary school:1
var school_up_0_button = document.getElementById('school_up_0');
school_up_0_button.disable = {school: 1};
school_up_0_button.cost = {effort: 2};
school_up_0_button.reward = {school: 1, grade: 1, effort_per_second: 0.25};

var buy_vacation_button = document.getElementById('buy_vacation');
buy_vacation_button.requirements = {school: 6};
buy_vacation_button.cost = {money: 250000};
buy_vacation_button.exponent = {vacations: 2.0}
buy_vacation_button.reward = {vacations:1, effort_per_second: 5.0,  max_effort: 5000000}
buy_vacation_button.text_counter = 'vacations';

var buy_motivation_button = document.getElementById('buy_motivation');
buy_motivation_button.requirements = {school: 3};
buy_motivation_button.cost = {money: 625};
buy_motivation_button.exponent = {motivations: 4};
buy_motivation_button.reward = {motivations: 1, text: "+1 muster reward"}; //text is updated in main section
buy_motivation_button.text_counter = 'motivations'

//MATH section buttons
var math_tab_button = document.getElementById('math_tab_button');
math_tab_button.requirements = {math_level: 5}; 

var learn_complex_analysis_button = document.getElementById('learn_complex_analysis');
learn_complex_analysis_button.requirements = {school: 3, math_level: 2500000};
learn_complex_analysis_button.cost = {effort: 120, calculations: 300};
learn_complex_analysis_button.reward = {math_level: 75000};

var learn_linear_algebra_button = document.getElementById('learn_linear_algebra');
learn_linear_algebra_button.requirements = {school: 3, math_level: 1000000};
learn_linear_algebra_button.cost = {effort: 80, calculations: 160};
learn_linear_algebra_button.reward = {math_level: 3000};

var learn_number_theory_button = document.getElementById('learn_number_theory');
learn_number_theory_button.requirements = {school: 3, math_level: 400000};
learn_number_theory_button.cost = {effort: 80, calculations: 25};
learn_number_theory_button.reward = {math_level: 1500};

var learn_advanced_calculus_button = document.getElementById('learn_advanced_calculus');
learn_advanced_calculus_button.requirements = {school: 2, math_level: 75000};
learn_advanced_calculus_button.cost = {effort: 25, calculations:35};
learn_advanced_calculus_button.reward = {math_level: 625};

var learn_calculus_button = document.getElementById('learn_calculus');
learn_calculus_button.requirements = {school: 2, math_level: 27000};
learn_calculus_button.cost = {effort: 15, calculations:15};
learn_calculus_button.reward = {math_level: 225};

var learn_trigonometry_button = document.getElementById('learn_trigonometry');
learn_trigonometry_button.requirements = {school: 2, math_level: 9000};
learn_trigonometry_button.cost = {effort: 10, calculations:6};
learn_trigonometry_button.reward = {math_level: 100};

var learn_algebra_2_button = document.getElementById('learn_algebra_2');
learn_algebra_2_button.requirements = {school: 2, math_level: 3000};
learn_algebra_2_button.cost = {effort: 10, calculations:3};
learn_algebra_2_button.reward = {math_level: 50};

var learn_algebra_button = document.getElementById('learn_algebra');
learn_algebra_button.requirements = {math_level: 1250};
learn_algebra_button.cost = {effort: 8, calculations:2};
learn_algebra_button.reward = {math_level: 24};

var learn_geometry_button = document.getElementById('learn_geometry');
learn_geometry_button.requirements = {math_level: 500};
learn_geometry_button.cost = {effort: 8};
learn_geometry_button.reward = {math_level: 12};

var learn_prealgebra_button = document.getElementById('learn_prealgebra');
learn_prealgebra_button.requirements = {math_level: 160};
learn_prealgebra_button.cost = {effort: 4, calculations: 1};
learn_prealgebra_button.reward = {math_level: 7};

var learn_decimals_button = document.getElementById('learn_decimals');
learn_decimals_button.requirements = {math_level: 30};
learn_decimals_button.cost = {effort: 4};
learn_decimals_button.reward = {math_level: 4};

var learn_arithmetic_button = document.getElementById('learn_arithmetic');
learn_arithmetic_button.requirements = {math_level: 5};
learn_arithmetic_button.cost = {effort: 3};
learn_arithmetic_button.reward = {math_level: 2};

//do math things
var do_math_super_project_button = document.getElementById('do_math_super_project');
do_math_super_project_button.requirements = {school: 6, math_level:100000000, math_research_calculation_bonus: 4};
do_math_super_project_button.cost = {effort:1000000, money: 100000.00};//subject to change
do_math_super_project_button.disable = {super_project_started: 1};
do_math_super_project_button.reward = {super_project_started: 1, math_super_project_status: 1, text:"Start math super project"};

var start_math_research_button = document.getElementById('start_math_research');
start_math_research_button.requirements = {school: 4, math_level:200000}; //TODO: balance numbers
start_math_research_button.cost = {effort:2500, calculations: 500};//subject to change
start_math_research_button.exponent = {math_research_projects_count: 1.15}; //2^.25
//start_math_research_button.reward = {money: 1000.00, math_level:100};//subject to change

var start_math_contest_button = document.getElementById('start_math_contest');
var do_math_contest_button = document.getElementById('do_math_contest');

var do_tutoring_button = document.getElementById('do_tutoring');
do_tutoring_button.requirements = {school: 3};
do_tutoring_button.cost = {effort:40};
do_tutoring_button.exponent = {times_tutored: 1.20}
do_tutoring_button.reward = {money: 20.00, times_tutored: 1};

var do_calculation_button = document.getElementById('do_calculation');
do_calculation_button.requirements = {show_calculations: 1};
do_calculation_button.cost = {effort:2};
do_calculation_button.reward = {calculations: 1};
//math shop
var buy_chalkboard_button = document.getElementById('buy_chalkboard');
buy_chalkboard_button.requirements = {max_calculations:100000};
buy_chalkboard_button.cost = {money:1000};
buy_chalkboard_button.exponent = {chalkboards: 1.05};
buy_chalkboard_button.reward = {max_calculations: 10000, chalkboards:1};
buy_chalkboard_button.text_counter = 'chalkboards';

var buy_notebook_button = document.getElementById('buy_notebook');
buy_notebook_button.requirements = {calculations_per_second:1};
buy_notebook_button.cost = {money:19.8808}; //  20/1.006
buy_notebook_button.exponent = {notebooks: 1.006}
buy_notebook_button.reward = {max_calculations: 250, notebooks:1};
buy_notebook_button.text_counter = 'notebooks';

var buy_computer_math_button = document.getElementById('buy_computer_math');
buy_computer_math_button.requirements = {school: 3, cs_level:10};
buy_computer_math_button.cost = {money:1000.00};
buy_computer_math_button.exponent = {computers: 1.5};
buy_computer_math_button.reward = {calculations_per_second: 2, code_per_second: .5, computers:1, show_code:1};
buy_computer_math_button.text_counter = 'computers';

var buy_graphing_calculator_button = document.getElementById('buy_graphing_calculator');
buy_graphing_calculator_button.requirements = {calculators: 2, math_level: 70};
buy_graphing_calculator_button.cost = {money:100.00};
buy_graphing_calculator_button.exponent = {graphing_calculators: 1.5};
buy_graphing_calculator_button.reward = {calculations_per_second: .5, graphing_calculators:1};
buy_graphing_calculator_button.text_counter = 'graphing_calculators';

var buy_calculator_button = document.getElementById('buy_calculator');
buy_calculator_button.requirements = {grade: 8, show_calculations: 1};
buy_calculator_button.cost = {money:10.00};
buy_calculator_button.exponent = {calculators: 1.5};
buy_calculator_button.reward = {calculations_per_second: 0.1, calculators:1};
buy_calculator_button.text_counter = 'calculators';

var buy_answers_button = document.getElementById('buy_answers');
buy_answers_button.requirements = {grade: 7, math_level: 500};
buy_answers_button.cost = {money:5.00};
buy_answers_button.reward = {bought_answers:1};
buy_answers_button.disable = {bought_answers:1};

var math_ongoing_section = document.getElementById('math_ongoing');

//cs section buttons

var cs_tab_button = document.getElementById('cs_tab_button');
cs_tab_button.requirements = {cs_level: 10};

var learn_haskell_button =  document.getElementById('learn_haskell');
learn_haskell_button.requirements = {cs_level: 75000, school:5};//
learn_haskell_button.cost = {effort: 100, code:150};
learn_haskell_button.reward = {cs_level: 800};

var learn_assembly_button = document.getElementById('learn_assembly');
learn_assembly_button.requirements = {cs_level: 25000};//
learn_assembly_button.cost = {effort: 50, code:50};
learn_assembly_button.reward = {cs_level: 250};

var learn_javascript_button = document.getElementById('learn_javascript');
learn_javascript_button.requirements = {cs_level: 7000};// ()
learn_javascript_button.cost = {effort: 60, code:10};
learn_javascript_button.reward = {cs_level: 120};

var learn_algorithms_button = document.getElementById('learn_algorithms');
learn_algorithms_button.requirements = {cs_level: 4000, math_level:15000}; //(3000e)
learn_algorithms_button.cost = {effort: 80};
learn_algorithms_button.reward = {cs_level: 80};

var learn_cplusplus_button = document.getElementById('learn_cplusplus');
learn_cplusplus_button.requirements = {cs_level: 1500};//
learn_cplusplus_button.cost = {effort: 50, code:5};
learn_cplusplus_button.reward = {cs_level: 50};

var learn_c_button = document.getElementById('learn_c');
learn_c_button.requirements = {cs_level: 500};//900e
learn_c_button.cost = {effort: 30, code:2};
learn_c_button.reward = {cs_level: 20};

var learn_html_button = document.getElementById('learn_html');
learn_html_button.requirements = {cs_level: 200};//560e
learn_html_button.cost = {effort: 30};
learn_html_button.reward = {cs_level: 10};

var learn_python_button = document.getElementById('learn_python');
learn_python_button.requirements = {cs_level: 60};//250e
learn_python_button.cost = {effort: 20};
learn_python_button.reward = {cs_level: 5};

var learn_logo_button = document.getElementById('learn_logo');
learn_logo_button.requirements = {cs_level: 10};
learn_logo_button.cost = {effort: 10};
learn_logo_button.reward = {cs_level: 2};

//CS shop
var buy_memory_button = document.getElementById('buy_memory');
buy_memory_button.requirements = {computers:2};
buy_memory_button.cost = {money: 100};
buy_memory_button.reward = {max_code: 128, memories: 1}; //gets changed in main
buy_memory_button.text_counter = 'memories';

var buy_developer_button = document.getElementById('buy_developer');
buy_developer_button.requirements = {school: 5, computers:5, dev_tools:2};
buy_developer_button.cost = {money: 40000};
buy_developer_button.exponent = {developers: 1.5};
buy_developer_button.reward = {code_per_second: 5, developers:1};
buy_developer_button.text_counter = 'developers';

var buy_dev_tools_button = document.getElementById('buy_dev_tools');
buy_dev_tools_button.requirements = {cs_level: 2000, computers:1};
buy_dev_tools_button.cost = {money: 2000};
buy_dev_tools_button.exponent = {dev_tools: 1.5};
buy_dev_tools_button.reward = {code_per_second: 2, dev_tools:1};
buy_dev_tools_button.text_counter = 'dev_tools';

var buy_computer_cs_button = document.getElementById('buy_computer_cs');
buy_computer_cs_button.requirements = buy_computer_math_button.requirements;
buy_computer_cs_button.cost = buy_computer_math_button.cost;
buy_computer_cs_button.exponent = buy_computer_math_button.exponent;
buy_computer_cs_button.reward = buy_computer_math_button.reward;
buy_computer_cs_button.text_counter = buy_computer_math_button.text_counter;

//CS projects
var create_cs_super_project_button = document.getElementById('create_cs_super_project');
create_cs_super_project_button.requirements = {grade:13, cs_level:9999999999};

var create_neural_net_button = document.getElementById('create_neural_net');
create_neural_net_button.requirements = {grade:20, cs_level:200000, school:5, cs_language_projects:2};
create_neural_net_button.cost =  {effort: 1000, code: 1000, calculations: 1000};
create_neural_net_button.reward = {text: "+ 15% Code/s when complete"};
create_neural_net_button.exponent = {cs_neural_net_projects: 1.5};
create_neural_net_button.text_counter  = 'cs_neural_net_projects';

var create_language_button = document.getElementById('create_language');
create_language_button.requirements = {grade:11, cs_level:35000, dev_tools:1};
create_language_button.cost = {effort: 500, code:200};
create_language_button.reward = {text: "+ 20% Fewer bugs and less frequent bugs when complete"};
create_language_button.exponent = {cs_language_projects: 1.4142135624}; //sqrt(2)
create_language_button.text_counter = 'cs_language_projects'

var create_website_button = document.getElementById('create_website');
create_website_button.requirements = {grade:10, cs_level:10000, computers:1};
create_website_button.cost = {effort: 200, code: 50};
create_website_button.reward = {text: "+ 10% Money/s when complete"};
create_website_button.exponent = {cs_website_projects: 1.4142135624}; //sqrt(2)
create_website_button.text_counter = 'cs_website_projects';

var create_math_solver_button = document.getElementById('create_math_solver');
create_math_solver_button.requirements = {grade:9, cs_level:1000, math_level:5000, computers:1};
create_math_solver_button.cost = {effort: 100, code: 25, calculations: 25};
create_math_solver_button.reward = {text: "+ 10% Calculations/s when complete"};
create_math_solver_button.exponent = {cs_math_solver_projects: 1.4142135624}; //sqrt(2)
create_math_solver_button.text_counter = 'cs_math_solver_projects';

var create_game_button = document.getElementById('create_game');
create_game_button.requirements = {grade:8, cs_level:500, show_code:1}
create_game_button.cost = {effort: 50, code:10};
create_game_button.reward = {text: "+ $0.50/s when complete"};
create_game_button.exponent = {cs_game_projects: 1.4142135624}; //sqrt(2)
create_game_button.text_counter = 'cs_game_projects';

var write_code_button = document.getElementById('write_code');
write_code_button.requirements = {show_code:1};
write_code_button.cost = {effort:5};
write_code_button.reward = {code:1};

var cs_ongoing_section = document.getElementById('cs_ongoing');

//SUPER project section
var special_tab_button = document.getElementById('special_tab_button');
special_tab_button.requirements = {super_project_started: 1};

//Footer section

var save_game_button = document.getElementById('save_game');
var reset_game_button = document.getElementById('reset_game');

var autosaving = document.getElementById('autosaving');