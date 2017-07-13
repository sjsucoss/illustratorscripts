/*
button.jsx
Michael T. Wescoat
michael.wescoat@sjsu.edu

Makes a button for use in websites for the SJSU College of Social Sciences and
affiliated departments. The basic invocation is as follows:

CoSS.button(TITLE, TEXT, SIZE, HEIGHT, OPTIONS);

TITLE is the title of the Adobe Illustrator document that contains the resulting
button. TEXT is a string, possibly containing \r for multiple lines, which gives
the text to be displayed on the button. SIZE is the size of the font for the
button text. HEIGHT is the height of the button. The default width of the button
is 180 pixels. Play with SIZE to get the button text to fill up the area up to
the desired side margins. Then play with HEIGHT to make the bottom margin match
the top margin. OPTIONS is an optional object containing attributes and values
to override the values listed in the "defaults" variable at the top of the code
below. The defaults provide a background based on goldenrod, which is used in
SJSU's style for a vertical band running along the left-hand side of each page.
For convenience, two alternative functions are provided that will produce
backgrounds based on SJSU's preferred shades of gold and blue:

CoSS.goldButton(TITLE, TEXT, SIZE, HEIGHT, OPTIONS);
CoSS.blueButton(TITLE, TEXT, SIZE, HEIGHT, OPTIONS);

The resulting Adobe Illustrator documents contain two layers, representing two
distinct versions of the same button. The upper layer is called "normal," and
the lower layer is called "hover." To reveal the hover version of the button,
simply click the eye icon of the normal layer to make it disappear. The hover
version is intended for use when the mouse is over the button; the normal
version is to be used at other times, i.e., when the page is first displayed and
when the mouse moves off of the button.

The background of the two layers are gradients, but the normal version is light
on top and dark below, while the hover version is dark on top and light below.
It is expected that the user will finish off the two versions of the button by
adding a drop shadow to the text in a manner that accords with the gradient.
(Note that the JavaScript interface for Illustrator is currently unable to
create style effects like this.) To create a drop shadow, select the text with
the Selection Tool (press V) or the Direct Selection Tool (press A), and then
apply Effect > Stylize > Drop Shadow. (Do not make this selection via the Text
Tool, because the drop shadow option will not be available.) The Drop Shadow
popup appears, allowing the user to adjust values for a handfull of features.
The recommended values for the normal version of the button are the following:

Mode: Multiply
Opacity: 66%
X Offset: 3 pt
Y Offset: 3 pt
Blur: 3 pt
Color checked and set to black

Click the OK button to complete the process. This creates a shadow as though
caused by a light source coming from the top left. For the hover version of the
button, a shadow from a light source at the bottom left is desirable, and that
can be achieved by changing the Y Offset to -3 pt.

This and other .jsx files should be placed in the Startup Scripts folder for
Illustrator, which should be in one of these locations:

Windows: C:\Program Files\Adobe\Adobe lllustrator CC\Startup Scripts\
Mac OS:  /Applications/Adobe lllustrator CC/Startup Scripts/

People using other versions of Illustrator may need to change "CC" in the above
paths to "C6," "C5," etc.
*/

var CoSS = this.CoSS || {};

(function (my) {
    'use strict';

    var defaults = {
            width: 180,      // Width is fairly standard; height is variable!
            radius: 12,      // Radius of round corners of background rectangle
            margin: 14,      // Top margin
            red: 218,        // RGB for goldenrod, used as the button's
            green: 165,      //   background color--This matches the vertical
            blue: 32,        //   band on the left-hand side of the page.
            shift: 30,       // How much to +/- for each color in gradients
            textFont: 'MyriadPro-Semibold',
            textRed: 255,    // RGB      (used for button text)
            textGreen: 255,  //   for
            textBlue: 255,   //   white
            zoom: 1,         // 100%, i.e., actual size
            colorMode: DocumentColorSpace.RGB
        },
        gold = {
            red: 199,        // RGB
            green: 153,      //   for
            blue: 0,         //   gold as defined in current SJSU style
        };
        blue = {
            red: 0,          // RGB
            green: 90,       //   for
            blue: 139        //   blue as defined in current SJSU style
        };

    function Button(title, text, size, height, options) {
        my.extend(this, defaults, options || {});
        this.title = title;
        this.text = text;
        this.size = size;
        this.height = height;
    }

    Button.prototype.addDocument = function () {
        this.document = app.documents.addDocument('', this.documentPreset());
        this.document.activeView.zoom = this.zoom;
        this.document.defaultStrokeColor = new NoColor();
        this.setGradient('normal', this.shift);
        this.setGradient('hover', -this.shift);
        this.setCharacterStyle('button');
        this.setParagraphStyle('button');
        this.setLayer('hover');
        this.addBackground('hover');
        this.addText();
        this.addLayer('normal');
        this.addBackground('normal');
        this.addText();
    };

    Button.prototype.documentPreset = function () {
        var preset = new DocumentPreset();

        preset.title = this.title + '_' + this.width + 'x' + this.height;
        preset.colorMode = this.colorMode;
        preset.width = this.width;
        preset.height = this.height;

        return preset;
    };

    Button.prototype.setGradient = function (name, shift) {
        var gradient = this.document.gradients.add();

        gradient.name = name;
        gradient.type = GradientType.LINEAR;
        gradient.gradientStops[0].rampPoint = 0;
        gradient.gradientStops[0].midPoint = 50;
        gradient.gradientStops[0].color = my.rgbShift(
            this.red, this.green, this.blue, shift);
        gradient.gradientStops[1].rampPoint = 100;
        gradient.gradientStops[1].color = my.rgbShift(
            this.red, this.green, this.blue, -shift);
    };

    Button.prototype.getGradient = function (name) {
        return this.document.gradients.getByName(name);
    };

    Button.prototype.setCharacterStyle = function (name) {
        var style = this.document.characterStyles.add(name),
            attributes = style.characterAttributes;

        attributes.textFont = app.textFonts.getByName(this.textFont);
        attributes.size = this.size;
        attributes.fillColor =
            my.rgb(this.textRed, this.textGreen, this.textGreen);
    };
        
    Button.prototype.getCharacterStyle = function (name) {
        return this.document.characterStyles.getByName(name);
    };

    Button.prototype.setParagraphStyle = function (name) {
        var style = this.document.paragraphStyles.add(name),
            attributes = style.paragraphAttributes;

        attributes.justification = Justification.CENTER;
    };

    Button.prototype.getParagraphStyle = function (name) {
        return this.document.paragraphStyles.getByName(name);
    };

    Button.prototype.setLayer = function (name) {
        if (this.document.layers.length == 0) {
            this.document.layers.add();
        }
        this.document.activeLayer.name = name;
    };

    Button.prototype.addLayer = function (name) {
        var layer = this.document.layers.add();

        layer.name = name;
    };

    Button.prototype.gradientColor = function (name) {
        var color = new GradientColor();
    
        color.gradient = this.getGradient(name);
        
        return color;
    };

    Button.prototype.addBackground = function (type) {
        var width = this.width,
            height = this.height,
            top = height,
            left = 0,
            horizontalRadius = this.radius,
            verticalRadius = horizontalRadius,
            rectangle = this.document.activeLayer.pathItems.roundedRectangle(
                top, left, width, height, horizontalRadius, verticalRadius);

        rectangle.fillColor = this.gradientColor(type);
        rectangle.rotate(-90, false, false,
            true, false, Transformation.CENTER);
    };

    Button.prototype.addText = function () {
        var width = this.width,
            height = this.height - this.margin,
            top = height,
            left = 0,
            rectangle = this.document.activeLayer.pathItems.rectangle(
                top, left, width, height),
            textFrame = this.document.textFrames.areaText(rectangle),
            paragraphs = textFrame.paragraphs,
            characterStyle = this.getCharacterStyle('button'),
            paragraphStyle = this.getParagraphStyle('button'),
            i, limit;

        paragraphs.add(this.text);

        for (i = 0, limit = paragraphs.length; i < limit; i += 1) {
            characterStyle.applyTo(paragraphs[i], true);
            paragraphStyle.applyTo(paragraphs[i], true);
        }
    };

    my.button = function (title, text, size, height, options) {
        var object = new Button(title, text, size, height, options);

        object.addDocument();
    };

    my.goldButton = function (title, text, size, height, options) {
        my.button(title, text, size, height,
            my.extend({}, gold, options || {}));
    };

    my.blueButton = function (title, text, size, height, options) {
        my.button(title, text, size, height,
            my.extend({}, blue, options || {}));
    };

}(CoSS));
