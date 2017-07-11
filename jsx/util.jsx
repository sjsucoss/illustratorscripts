/*
util.jsx
Michael T. Wescoat
michael.wescoat@sjsu.edu

Some general-purpose definitions.

This and other .jsx files should be placed in the Startup Scripts folder for
Illustrator, which should be in one of these locations:

Windows: C:\Program Files\Adobe\Adobe lllustratorCC\Startup Scripts\
Mac OS:  /Applications/Adobe lllustrator CC/Startup Scripts/

People using other versions of Illustrator may need to change "CC" in the above
paths to "C6," "C5," etc.

Make sure that any .jsx file that depends on these definitions does not need to
have them pre-loaded.
*/

var CoSS = this.CoSS || {};

(function (my) {
    'use strict';

	/*
	 * Object Manipulation
	 */ 

    my.extend = function (target) {
        var i, limit, source, key;

        for (i = 1, limit = arguments.length; i < limit; i += 1) {
            source = arguments[i];
            for (key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

	/*
	 * Color Stuff
	 */

	function clip(n) {
		return Math.min(Math.max(Math.round(n), 0), 255);
	}

	my.rgb = function (red, green, blue) {
		var color = new RGBColor();

		color.red = clip(red);
		color.green = clip(green);
		color.blue = clip(blue);

		return color;
	}

	my.rgbShift = function (red, green, blue, shift) {
		return my.rgb(red + shift, green + shift, blue + shift);
	}
}(CoSS));
