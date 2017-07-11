# illustratorscripts

Collected here are a set of JavaScript files for directing Adobe Illustrator to produce buttons used in websites belonging to the College of Social Sciences of San Jos&eacute; State University. The scripts fall into two groups. Files with the extension `.js` are to be invoked from within Illustrator. They are grouped in the **js** directory in this repo. There are also files containing general-purpose auxiliary definitions. These have the `.jsx` extension and reside in the **jsx** directory in this repo.

Users should pay close attention to the comments in the scripts gathered here. The explanation in `buttons.jsx` is especially important, as it indicates how the Illustrator images produced by this code are to be finished by hand in order to achieve a uniform look.

## js

The `.js` files tend to contain simple invocations of functions from the `.jsx` files, applied to arguments that define the unique aspects of particular buttons (text, size, etc.). To make new buttons, use these files as a starting point and provide edit the code inside to use a new set of arguments. These files may reside anywhere on the computer running Illustrator. To invoke these scripts in Illustrator, use **File** &gt; **Scripts** &gt; **Other Scripts** and navigate to the location where you have stored the relevant file.

## jsx

The `.jsx` scripts are auxiliary files that provide most of the general functionality for producing buttons in a consistent style for the College of Social Sciences websites. The `.jsx` files should be placed in the **Startup Scripts** folder for Illustrator, which should be in one of these locations:

<table>
	<tr>
		<td>Windows:</td>
		<td>C:\Program Files\Adobe\Adobe lllustratorCC\Startup Scripts\</td>
	</tr>
	<tr>
		<td>Mac OS:</td>
		<td>/Applications/Adobe lllustrator CC/Startup Scripts/</td>
	</tr>
</table>

People using other versions of Illustrator may need to change &ldquo;CC&rdquo; in the above
paths to &ldquo;C6,&rdquo; &ldquo;C5,&rdquo; etc.


