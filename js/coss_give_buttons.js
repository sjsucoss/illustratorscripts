/*
coss_give_button.js
Michael T. Wescoat
michael.wescoat@sjsu.edu

Sets up a Adobe Illustrator document containing a Give Now button for CoSS.

To run this script in Illustrator, use File > Scripts > Other Scripts and
navigate to the location of this file.

Depends on button.jsx and util.jsx, which should be in the Startup Scripts
folder.
*/

CoSS.button(
	'give_button',                                   // title
	'GIVE NOW TO THE\rCOLLEGE OF\rSOCIAL SCIENCES',  // text
	19,                                              // size
	94,                                              // height
	{
		margin: 17
	}
);
