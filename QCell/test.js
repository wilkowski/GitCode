var game = {
	current_level: 0,
	levels_completed: {},
	levels_unlocked: [true,true,true], //can have levels unlocked that haven't been made yet. (currently start with workspace and tutorials) 
	achievements_completed: {},
	level_saves:{} //saves on various levels
}

//TODO: have some way to make sure outputs don't come out before the inputs
var all_levels = [{level_number:0, level_name: "Workspace"},//0 is the special case, this level is just the workspace
	{level_number:1,
	level_name: "Tutorial",
	level_string:"W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiUnVuIiwidHlwZSI6ImlucHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjQ4NiwicG9zX3kiOjQyfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MiwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiRmlyc3QiLCJ0eXBlIjoib3V0cHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjMzNiwicG9zX3kiOjUyMX0seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjMsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IlNlY29uZCIsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NTk4LCJwb3NfeSI6NTIwfV0sW11d",
	test_lists: [{input_list:["Run", "Run"],
					output_list:["First","Second","First","Second"]}],
	description:"Create a new cell by clicking the green circle on the left, then click on the cell area between the other cells.  After that click the blue arrow and create a charge link from the 'Run' input to the cell you created.  Then draw two more arrows from the cell to the outputs labelled 'First' and 'Second'.  (The order matters).  When you are done click the 'Run Tests' button to verify your solution.  If you make a mistake use the red X clear button to remove connections or cells",
	par: 0
	},
	{level_number:2,
	level_name: "Tutorial 2",
	level_string: "W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiQ2hhcmdlIiwidHlwZSI6ImlucHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjQ0NSwicG9zX3kiOjY1fSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MiwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiUmVzZXQiLCJ0eXBlIjoiaW5wdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NjA2LCJwb3NfeSI6MTE5fSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MywiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiT3V0cHV0IiwidHlwZSI6Im91dHB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc194Ijo0MzMsInBvc195Ijo0Nzd9XSxbXV0=",
	test_lists: [{input_list:["Charge", "Charge","Charge","Charge"],
					output_list:["Output","Output"]},
				{input_list:["Charge", "Reset","Charge","Charge"],
					output_list:["Output"]},
				{input_list:["Reset", "Charge","Reset","Reset","Charge","Reset"],
					output_list:[]}],
	description: "Again start by creating a cell in the center and add charge links from charge to it and from it to the output.  Next click the small green circle with arrows pointing out and click the cell you created to increase its maximum charge to 2.  Finally, click the red arrow and add a discharge link from 'Reset' input to your cell.  When you are finished, run the tests on this level."
	},
	{level_number: 3,
	level_name: "Once Through Gate",
	level_string:"W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiSW4iLCJ0eXBlIjoiaW5wdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NDI3LCJwb3NfeSI6NjZ9LHsib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6e30sImlkIjoyLCJjaGFuZ2VkIjpmYWxzZSwibGFiZWwiOiJSZXNldCIsInR5cGUiOiJpbnB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc194Ijo2MDIsInBvc195IjoxMjh9LHsib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6e30sImlkIjozLCJjaGFuZ2VkIjpmYWxzZSwibGFiZWwiOiJPdXQiLCJ0eXBlIjoib3V0cHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjQyNCwicG9zX3kiOjQ0MX1dLFtdXQ==",
	test_lists: [{input_list:["In","In","In","In"], 
					output_list:["Out"]},
				{input_list:["In","Reset","In","In"], 
					output_list:["Out","Out"]},
				{input_list:["Reset","In","Reset","Reset","Reset","In","Reset","Reset","In","In"], 
					output_list:["Out","Out","Out"]}],
	description: "Create a cell structure such that when it given multiple inputs, it give an output exactly one time.  Reset to allow one more inputs through.  Hint: if a cell is discharged while at maximum charge it won't fire.",
	par: 2
	},
	{level_number: 4,
	level_name: "And Gate",
	level_string: "W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiVHJ1ZSBJbiIsInR5cGUiOiJpbnB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc194IjozMzgsInBvc195Ijo5Mn0seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjIsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IkZhbHNlIEluIiwidHlwZSI6ImlucHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjU0OSwicG9zX3kiOjkzfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MywiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiVHJ1ZSBPdXQiLCJ0eXBlIjoib3V0cHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjMzNywicG9zX3kiOjUwM30seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjQsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IkZhbHNlIE91dCIsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NTUxLCJwb3NfeSI6NTAyfV0sW11d",
	test_lists: [{input_list:["True In", "True In", "True In", "False In", "False In", "True In", "False In", "False In"], 
					output_list:["True Out","False Out","False Out","False Out"]},
				{input_list:["False In", "True In", "True In", "False In", "True In", "True In", "False In", "False In"], 
					output_list:["False Out","False Out","True Out","False Out"]}],
	description:"Create a binary and function that takes two inputs and outputs true only if both inputs are true",
	par: 2
	},
	{level_number: 5,
	level_name: "Toggle Gate",
	level_string:"W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiQSBJbiIsInR5cGUiOiJpbnB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc194IjoyOTEsInBvc195Ijo1MX0seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjIsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IkIgSW4iLCJ0eXBlIjoiaW5wdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NTA3LCJwb3NfeSI6NTV9LHsib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6e30sImlkIjozLCJjaGFuZ2VkIjpmYWxzZSwibGFiZWwiOiJUb2dnbGUiLCJ0eXBlIjoiaW5wdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6Njg0LCJwb3NfeSI6MTMxfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6NCwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiQSBPdXQiLCJ0eXBlIjoib3V0cHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjI4NCwicG9zX3kiOjUzMn0seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjUsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IkIgT3V0IiwidHlwZSI6Im91dHB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc194Ijo1MDMsInBvc195Ijo1MzV9XSxbXV0=",
	test_lists: [{input_list:["A In","B In","A In","Toggle","B in", "A in", "B in" ],
					output_list:["A Out","A Out","B Out","B Out"]},
				{input_list:["B In","Toggle","Toggle","B In","A In","Toggle","A In","B in","Toggle","B In","A In" ],
					output_list:["A Out","B Out","B Out","A Out"]}],
	description: "Initially A in goes to A out and nothing happens with B in.  When toggled it swaps, causing B in to go to B out and nothing to happen with A.  Toggling again goes back to the initial state.  ",
	par: 5
	},
	{level_number: 6,
	level_name: "Most Recent Memory",
	level_string: "W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsInR5cGUiOiJpbnB1dCIsIm1heF9jaGFyZ2UiOjEsImxhYmVsIjoiQSBJbiIsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc195Ijo3NiwicG9zX3giOjIzN30seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjIsImNoYW5nZWQiOmZhbHNlLCJ0eXBlIjoiaW5wdXQiLCJtYXhfY2hhcmdlIjoxLCJsYWJlbCI6IkIgSW4iLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeSI6NzgsInBvc194Ijo0NTR9LHsib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6e30sImlkIjozLCJjaGFuZ2VkIjpmYWxzZSwidHlwZSI6ImlucHV0IiwibWF4X2NoYXJnZSI6MSwibGFiZWwiOiJDIEluIiwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3kiOjgwLCJwb3NfeCI6NjU0fSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6NCwiY2hhbmdlZCI6ZmFsc2UsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJsYWJlbCI6IkEgT3V0IiwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3kiOjUxNCwicG9zX3giOjIzN30seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjUsImNoYW5nZWQiOmZhbHNlLCJ0eXBlIjoib3V0cHV0IiwibWF4X2NoYXJnZSI6MSwibGFiZWwiOiJCIE91dCIsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc195Ijo1MTQsInBvc194Ijo0NTR9LHsib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6e30sImlkIjo2LCJjaGFuZ2VkIjpmYWxzZSwidHlwZSI6Im91dHB1dCIsIm1heF9jaGFyZ2UiOjEsImxhYmVsIjoiQyBPdXQiLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeSI6NTEzLCJwb3NfeCI6NjU2fSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6NywiY2hhbmdlZCI6ZmFsc2UsInR5cGUiOiJpbnB1dCIsIm1heF9jaGFyZ2UiOjEsImxhYmVsIjoiR2V0IFJlc3VsdCIsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc195IjoxNDUsInBvc194Ijo4MTV9XSxbXV0=",
	test_lists: [{input_list:["C In", "Get Result", "C In", "B In", "A In", "Get Result", "C In", "B In", "Get Result", "B In", "Get Result"], 
					output_list:["C Out","A Out","B Out","B Out"]},
				{input_list:["C In", "B In", "Get Result", "B In", "Get Result", "A In", "A In", "A In", "Get Result", "C In", "B In", "A In", "C In", "Get Result"], 
					output_list:["B Out","B Out","A Out","C Out"]}],
	description: "Give as an output whatever the most recent input was when 'Get result' is triggered.  ",
	par: 3
	},
	{level_number:7,
	level_name: "1000 Bottles of Beer on the Wall",
	level_string:"W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiUnVuIiwidHlwZSI6ImlucHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjExMCwicG9zX3kiOjQ3fSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MiwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiMCIsIm91dHB1dF90ZXh0IjoiMCIsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsInBvc194Ijo2OTUsInBvc195IjozMDd9LHsib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6e30sImlkIjozLCJjaGFuZ2VkIjpmYWxzZSwibGFiZWwiOiIxIiwib3V0cHV0X3RleHQiOiIxIiwidHlwZSI6Im91dHB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwicG9zX3giOjYzNiwicG9zX3kiOjM5Mn0seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjQsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6ImJvdHRsZXMgb2YgYmVlciBvbiB0aGUgd2FsbCwgdGFrZSBvbmUgZG93biBwYXNzIGl0IGFyb3VuZCIsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NTgwLCJwb3NfeSI6NDcyfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6NSwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoibm8gbW9yZSBib3R0bGVzIG9mIGJlZXIgb24gdGhlIHdhbGwiLCJvdXRwdXRfdGV4dCI6Im5vIG1vcmUgYm90dGxlcyBvZiBiZWVyIG9uIHRoZSB3YWxsIiwidHlwZSI6Im91dHB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwicG9zX3giOjUxNywicG9zX3kiOjU1NH1dLFtdXQ==",
	test_lists: [{input_list:["Run"], output_list: ["1","0","0","0","bottles of beer on the wall, take one down pass it around","1","1","1","bottles of beer on the wall, take one down pass it around","1","1","0","bottles of beer on the wall, take one down pass it around","1","0","1","bottles of beer on the wall, take one down pass it around","1","0","0","bottles of beer on the wall, take one down pass it around","1","1","bottles of beer on the wall, take one down pass it around","1","0","bottles of beer on the wall, take one down pass it around","1","bottles of beer on the wall, take one down pass it around", "no more bottles of beer on the wall"]}],
	description: "Output the lyrics to 1000 bottles of beer in binary:  Count down from 1000 in binary, following each number with \"bottles of beer on the wall ...\".  Don't include any leading 0's and end with \"no more bottles...\"",
	par: 16
	},
	{level_number:8,
	level_name: "Binary Adder",
	level_string:"W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6MSwiY2hhbmdlZCI6ZmFsc2UsIm1heF9jaGFyZ2UiOjEsImxhYmVsIjoiMCBEaWdpdCBJbiIsInR5cGUiOiJpbnB1dCIsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc194IjozNDYsInBvc195Ijo3Mn0seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjIsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IjEgRGlnaXQgSW4iLCJ0eXBlIjoiaW5wdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6MTIxLCJwb3NfeSI6Njl9LHsib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6e30sImlkIjozLCJjaGFuZ2VkIjpmYWxzZSwibGFiZWwiOiIxIERpZ2l0IE91dCIsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6MTE0LCJwb3NfeSI6NTM3fSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6NCwiY2hhbmdlZCI6ZmFsc2UsImxhYmVsIjoiMCBEaWdpdCBPdXQiLCJ0eXBlIjoib3V0cHV0IiwibWF4X2NoYXJnZSI6MSwiY2hhcmdlIjowLCJvdXRwdXRfdGV4dCI6bnVsbCwicG9zX3giOjMzMCwicG9zX3kiOjUzOX0seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjUsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6IkNhcnJ5IE91dCIsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NTY5LCJwb3NfeSI6NTM4fSx7Im91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnt9LCJpZCI6NiwiY2hhbmdlZCI6ZmFsc2UsIm1heF9jaGFyZ2UiOjEsImxhYmVsIjoiQ2FycnkgSW4iLCJ0eXBlIjoiaW5wdXQiLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6NTcxLCJwb3NfeSI6NzN9LHsib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6e30sImlkIjo3LCJjaGFuZ2VkIjpmYWxzZSwibGFiZWwiOiJObyBDYXJyeSBJbiIsInR5cGUiOiJpbnB1dCIsIm1heF9jaGFyZ2UiOjEsImNoYXJnZSI6MCwib3V0cHV0X3RleHQiOm51bGwsInBvc194Ijo3ODIsInBvc195Ijo3M30seyJvdXRwdXRzIjpbXSwiY29ubmVjdGVkX2NlbGxzIjp7fSwiaWQiOjgsImNoYW5nZWQiOmZhbHNlLCJsYWJlbCI6Ik5vIENhcnJ5IE91dCIsInR5cGUiOiJvdXRwdXQiLCJtYXhfY2hhcmdlIjoxLCJjaGFyZ2UiOjAsIm91dHB1dF90ZXh0IjpudWxsLCJwb3NfeCI6ODAyLCJwb3NfeSI6NTM4fV0sW11d",
	test_lists: [{input_list:[], output_list: []}],
	description: "Create a structure that can add together 2 binary digits along with the option of a carried digit and give the correct digit as a result as well as if there was a carry.  For example inputs of 0,1 and a carry should result in 0 out and a carry out.  Output the resulting digits before the carry result."
	}
]

//TODO: load saved gamestate

var level_menu = document.getElementById('level_menu');

//TODO: BUG: when a menu option/save is updated a duplicate option gets created
//function add_menu_option(key, menu_text, menu_ref){ 
//	var option = document.createElement("option");
//	option.text = menu_text;
//	option.value = key;
//	menu_ref.add(option);
//}

function save_game(){
	localStorage['q_cell_saved_game'] = btoa(JSON.stringify(game));
}

function load_game(){
	if(localStorage['q_cell_saved_game'] != null){
		game = JSON.parse(atob(localStorage['q_cell_saved_game']));
	}
}

load_game();

function save_level(){
	var level_name = all_levels[game.current_level].level_name; //save by name makes it more resilient to changes in all_levels
	game.level_saves[level_name] = string_export_workspace();
	save_game();
}

function load_saved_level(){
	var level_name = all_levels[game.current_level].level_name;
	if(game.level_saves[level_name]){
		var save_string = game.level_saves[level_name];
		clean_import(save_string);
	}
}

function set_up_level_menu(){
	while (level_menu.firstChild){ //first remove all children
		level_menu.removeChild(level_menu.firstChild);
	}
	add_menu_option(0,"Workspace",level_menu);
	for(var i = 1; i<all_levels.length; i++){
		if(game.levels_unlocked[i] && all_levels[i]){ //level is unlocked and it exists
			add_menu_option(i,"" + i + ": " + all_levels[i].level_name, level_menu);
		}
	}
	level_menu.selectedIndex = game.current_level;
}
set_up_level_menu();

level_menu.onchange = function(){
	var level_key = level_menu.options[level_menu.selectedIndex].value;
	if(game.current_level == level_key){
		return;
	}
	save_level();
	//TODO: save workspace when leaving a level and load again when returning to the level.  
	set_up_level(level_key);
	load_saved_level();
}

var input_cells = {};
var output_cells = {};
var queued_tests = [];

function set_up_testing(){
	input_cells = {};
	output_cells = {};
	for(var cell_no = 1; cell_no <all_cells.length; cell_no+=1){
		var cell_ref = all_cells[cell_no]
		if(cell_ref.type == 'input' || cell_ref.type == 'output'){
			var cell_label = cell_ref.label;
			if(! cell_label){ cell_label = cell_no; add_note("error, input missing label")}
			if(cell_ref.type == 'input'){
				input_cells[cell_label] = cell_no;
			}else{ //== 'output'
				output_cells[cell_label] = cell_no;
			}
		}
	}
}

var step_delay = 3;  //3 action queue cycles in between test inputs
var max_extra_steps = 60; //maximum number of steps taken by program after the last input ~20 second runtime at 350 queue interval
//hopefully nothing needs 60 extra steps, that would be rather excessive

var anticipated_outputs = [];
var input_queue = [];
var test_running = false;
var step = 0;

//var workspace_backup_string
var running_test = null;
function finish_level(level_no){
	add_note("Level "+ level_no + " successfully completed");
	if(!game.levels_completed[level_no]){ //first time finishing level
		game.levels_completed[level_no] = true;
		game.levels_unlocked[game.levels_unlocked.length] = true; //next level unlocked
		if(game.levels_unlocked.length <= all_levels.length){
			add_note("Unlocked level " + (game.levels_unlocked.length-1));
		}
		if(game.levels_unlocked.length >= all_levels.length){
			add_note("All levels unlocked");
		}
		set_up_level_menu();
	}
	save_level();
	//TODO: achievement check
	//don't really do anything interesting right now for beating a level multiple times
}

function test_over(success){ //success argument optional
	if(test_running){add_note("Test ended");}
	test_running = false;
	clearTimeout(running_test); //stop any more tests from running
	load_saved_level();
	//clean_import(game.level_saves[game.current_level]);
	if(success){
		if(queued_tests.length == 0){
			finish_level(game.current_level);
		}else{
			add_note("Running next test");
			test_running = true;
			next_queued_test();
		}
	}
	if(test_running == false){ //if a new test hasn't started
		set_mode('drag');
	}
	//TODO: enable any buttons that were disabled during testing
}

//TODO: small BUG: the second queued test runs at double speed for some reason
function next_queued_test(){
	var testing_list = queued_tests.shift();
	input_queue = testing_list.input_list.slice(0);//slicing makes copies of the arrays
	anticipated_outputs = testing_list.output_list.slice(0);
	set_mode('testing');
	test_running = true;
	step = 0; //step counts down to 0 from something, when it hits 0 the next input get sent
	save_level();
	//game.level_saves[game.current_level] = string_export_workspace();
	//workspace_backup_string = string_export_workspace();

	function run_inputs(){
		if(test_running == false){ //test has ended
			test_over();
			return;
		}
		if(step < -max_extra_steps && input_queue.length == 0){
			if(anticipated_outputs.length > 0){	
				add_note("TEST FAILED: Program exceeded maximum allowed steps without giving all outputs");
				test_over();
				return
			}
			test_over(true); //something running in the background but still counts as a success
			return;
		}
		if(step <= 0 && input_queue.length > 0){
			var in_cell = input_queue.shift();
			if(in_cell != ""){ //empty inputs are allowed as a spacer
				charge_cell(input_cells[in_cell]);
			}
			step = action_queue.length*step_delay;
		}
		next_in_queue();
		update_screen();
		step -= 1;
		var speed_up = (anticipated_outputs.length == 0 ? .5 : 1);
		running_test = setTimeout(function(){run_inputs(input_queue)}, queue_interval*speed_up);
	}
	clearTimeout(running_test); //don't want multiple tests running at once
	run_inputs(input_queue, 0);
}

function got_output(label){
	if(!test_running){return}
	if(anticipated_outputs.length == 0){
		add_note("TEST FAILED: received " + label + " output when none was expected");
		test_over();
		return;
	}
	var expected_val = anticipated_outputs.shift();
	if(label != expected_val){
		add_note("TEST FAILED: received " + label + " output when " + expected_val + " was expected");
		test_over();
		return;
	}
	//add_note(label + " matching output.  " + anticipated_outputs.length + " outputs left");
	//else Success
}

function end_of_queue(){
	if(!test_running){return}
	if(input_queue.length == 0 && anticipated_outputs.length >0){
		add_note("TEST FAILED: End of queue reached when " + anticipated_outputs[0] + " output was still expected");
		test_over();
		return;
	}//else Success
	if(input_queue.length == 0 && anticipated_outputs.length == 0){
		add_note("Test Successful");
		test_over(true);
	}
}

function set_up_level(level_no){
	game.current_level = level_no;
	if(level_no == 0){ //0 is just the normal workspace
		delete_all();
		cycle_type_button.style.display = "";
		update_screen();
		return;
	}
	cycle_type_button.style.display = "none";
	var level_object = all_levels[level_no];
	clean_import(level_object.level_string);
	clear_notes(); //clean up the note area first
	add_note(level_object.level_name);
	add_note(level_object.description); //some text to show what to do this level
	set_up_testing();
	level_menu.selectedIndex = game.current_level; //;evel_menu change only runs when these are different
}



var run_tests_button = document.getElementById('run_tests_button');
run_tests_button.onclick = function(){
	var level_object = all_levels[game.current_level];
	queued_tests = level_object.test_lists.slice(0); //copy array;
	next_queued_test();
}

var hello_world_example = "W1t7ImlkIjowLCJjaGFyZ2UiOjAsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOltdLCJjb25uZWN0ZWRfY2VsbHMiOnsiMSI6MSwiMiI6MSwiMyI6LTEsIjQiOjF9LCJjaGFuZ2VkIjp0cnVlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194Ijo1MCwicG9zX3kiOjUwfSx7ImlkIjoxLCJjaGFyZ2UiOjEsIm1heF9jaGFyZ2UiOjEsIm91dHB1dHMiOlsyLDMsNF0sImNvbm5lY3RlZF9jZWxscyI6eyIyIjoxLCIzIjotMSwiNCI6MX0sImNoYW5nZWQiOmZhbHNlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194IjoyMzAsInBvc195IjozOH0seyJpZCI6MiwiY2hhcmdlIjowLCJtYXhfY2hhcmdlIjoyLCJvdXRwdXRzIjpbNF0sImNvbm5lY3RlZF9jZWxscyI6eyIxIjoxLCIzIjozLCI0IjoxfSwiY2hhbmdlZCI6ZmFsc2UsIm91dHB1dF90ZXh0IjpudWxsLCJsYWJlbCI6bnVsbCwidHlwZSI6bnVsbCwicG9zX3giOjIwMiwicG9zX3kiOjE1MX0seyJpZCI6MywiY2hhcmdlIjowLCJtYXhfY2hhcmdlIjoxLCJvdXRwdXRzIjpbMiwtNF0sImNvbm5lY3RlZF9jZWxscyI6eyIwIjpudWxsLCIxIjotMSwiMiI6MywiNCI6M30sImNoYW5nZWQiOmZhbHNlLCJvdXRwdXRfdGV4dCI6bnVsbCwibGFiZWwiOm51bGwsInR5cGUiOm51bGwsInBvc194IjoyODMsInBvc195IjoxMDd9LHsiaWQiOjQsImNoYXJnZSI6MCwibWF4X2NoYXJnZSI6MSwib3V0cHV0cyI6WzVdLCJjb25uZWN0ZWRfY2VsbHMiOnsiMSI6MSwiMiI6MSwiMyI6MywiNSI6MX0sImNoYW5nZWQiOmZhbHNlLCJvdXRwdXRfdGV4dCI6IkhlbGxvIiwibGFiZWwiOiJIZWxsbyIsInR5cGUiOm51bGwsInBvc194IjoyNTgsInBvc195IjoxOTl9LHsiaWQiOjUsImNoYXJnZSI6MCwibWF4X2NoYXJnZSI6MSwib3V0cHV0cyI6W10sImNvbm5lY3RlZF9jZWxscyI6eyI0IjoxfSwiY2hhbmdlZCI6ZmFsc2UsIm91dHB1dF90ZXh0Ijoid29ybGQhIiwibGFiZWwiOiJ3b3JsZCEiLCJ0eXBlIjpudWxsLCJwb3NfeCI6MzUzLCJwb3NfeSI6MjQ0fV0sWzFdXQ=="

//update_screen();

set_up_level(game.current_level);
level_menu.selectedIndex = game.current_level; //strange bug, this 
load_saved_level();
if(all_cells.length == 1){
	clean_import(hello_world_example); //show this example if the workspace is empty
}
update_screen();

