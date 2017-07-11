/*
comm_buttons.js
Michael T. Wescoat
michael.wescoat@sjsu.edu

Sets up two Adobe Illustrator documents containing buttons for COMM Studies.

To run this script in Illustrator, use File > Scripts > Other Scripts and
navigate to the location of this file.

Depends on button.jsx and util.jsx, which should be in the Startup Scripts
folder.
*/

CoSS.button(
	'advising_button',             // title
	'ADVISING',                    // text
	35,                            // size
	56                             // height
);

CoSS.blueButton(
	'graduation_ceremony_button',  // title
	'GRADUATION\rCEREMONY',        // text
	26,                            // size
	82                             // height
);


