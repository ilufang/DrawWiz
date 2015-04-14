var	toolbars_visible = true,
	selector_visible = false,
	tint_visible = false;

function toggleTint()
{
	//_alert("toggleTint begin");
	if (tint_visible)
	{
		hideTint();
	}else
	{
		showTint();
	}
	//_alert("toggleTint end");
}
function hideTint()
{
	//_alert("hideTint begin");
	var cell = document.getElementById("tintCell");
//	cell.style.height = "0px";
//	cell.style.opacity = 0.0;
	cell.style.webkitTransform=
	cell.style.MozTransform=
	cell.style.OTransform=
	cell.style.msTransform=
	cell.style.transform = "translate(0px, 0px)";
	tint_visible = false;
	//_alert("hideTint end");
}

function showTint()
{
	//_alert("showTint begin");
	var cell = document.getElementById("tintCell");
//	cell.style.height = "82px"; 
//	cell.style.opacity = 0.7;
	cell.style.webkitTransform=
	cell.style.MozTransform=
	cell.style.OTransform=
	cell.style.msTransform=
	cell.style.transform = "translate(0px, 92px)";
	tint_visible = true;
	//_alert("showTint end");
}

function hideToolbar()
{
	//_alert("hideToolbar begin");
	var nav = document.getElementById("navCell");
	var tool = document.getElementById("toolCell");
//	tool.style.opacity = 0.0;
	tool.style.webkitTransform=
	tool.style.MozTransform=
	tool.style.OTransform=
	tool.style.msTransform=
	tool.style.transform = "translate(0px, -92px)";
//	nav.style.opacity = 0.0;
	nav.style.webkitTransform=
	nav.style.MozTransform=
	nav.style.OTransform=
	nav.style.msTransform=
	nav.style.transform = "translate(0px, 110px)";
//	nav.style.height = "0px";
	
	document.getElementById("candidateCell").style.webkitTransform=
	document.getElementById("candidateCell").style.MozTransform=
	document.getElementById("candidateCell").style.OTransform=
	document.getElementById("candidateCell").style.msTransform=
	document.getElementById("candidateCell").style.transform = "translate(0px, 88px)";
//		document.getElementById("candidateCell").style.opacity = 0.0;
//		document.getElementById("candidateCell").style.height = "0px";
	
	var cell = document.getElementById("tintCell");
	// Now Cell is always controlled by style.top
//	if (tint_visible)
//	{
		cell.style.webkitTransform=
		cell.style.MozTransform=
		cell.style.OTransform=
		cell.style.msTransform=
		cell.style.transform = "translate(0, -103px)";
//		cell.style.height = "0px";
//		cell.style.opacity = 0.0;
//	} else 
//	{
//		cell.height = "0px";
//	}
	toolbars_visible = false;
	//_alert("hideToolbar end");
}

function showToolbar()
{
	//_alert("showToolbar begin");
	var nav = document.getElementById("navCell");
	var tool = document.getElementById("toolCell");
//	tool.style.opacity = 0.7;
	tool.style.webkitTransform=
	tool.style.MozTransform=
	tool.style.OTransform=
	tool.style.msTransform=
	tool.style.transform = "translate(0px, 0px)";
//	nav.style.opacity = 1.0;
	nav.style.webkitTransform=
	nav.style.MozTransform=
	nav.style.OTransform=
	nav.style.msTransform=
	nav.style.transform = "translate(0px, 0px)";
//	nav.style.height = "92px";

	if (selector_visible)
	{
		document.getElementById("candidateCell").style.webkitTransform=
		document.getElementById("candidateCell").style.MozTransform=
		document.getElementById("candidateCell").style.OTransform=
		document.getElementById("candidateCell").style.msTransform=
		document.getElementById("candidateCell").style.transform = "translate(0px, -234px)";
//		document.getElementById("candidateCell").style.opacity = 0.9;
//		document.getElementById("candidateCell").style.height = "233px";
	}
	
	var cell = document.getElementById("tintCell");
	if (tint_visible)
	{
		cell.style.webkitTransform=
		cell.style.MozTransform=
		cell.style.OTransform=
		cell.style.msTransform=
		cell.style.transform = "translate(0px, 92px)"
//		cell.style.height = "82px";
//		cell.style.opacity = 0.7;
	}

	toolbars_visible = true;
	//_alert("showToolbar end");
}

function toggleToolbar()
{
	//_alert("toggleToolbar begin");
	if (toolbars_visible)
	{
		hideToolbar();
	} else
	{
		showToolbar();
	}
	//_alert("toggleToolbar end");
}

function hideCandidates()
{
	//_alert("hideCandidates begin");
	document.getElementById("candidateCell").style.webkitTransform=
	document.getElementById("candidateCell").style.MozTransform=
	document.getElementById("candidateCell").style.OTransform=
	document.getElementById("candidateCell").style.msTransform=
	document.getElementById("candidateCell").style.transform = "translate(0px, 0px)";
//	document.getElementById("candidateCell").style.opacity = 0.0;
//	document.getElementById("candidateCell").style.height = "0px";
	selector_visible = false;
	//_alert("hideCandidates end");
}

function showCandidates()
{
	//_alert("showCandidates begin");
	document.getElementById("candidateCell").style.webkitTransform=
	document.getElementById("candidateCell").style.MozTransform=
	document.getElementById("candidateCell").style.OTransform=
	document.getElementById("candidateCell").style.msTransform=
	document.getElementById("candidateCell").style.transform = "translate(0px, -234px)";
//	document.getElementById("candidateCell").style.opacity = 0.9;
//	document.getElementById("candidateCell").style.height = "233px";
	selector_visible = true;
	//_alert("showCandidates end");
}

// Gestures
var	NONE = 		0,
	PAN = 		1,
	SWITCH =	2;

var	dragging = false,
	drag_end = false;
var mode = NONE;
var mouseX0, mouseY0;

var Xy0; // For PAN
var executed; // For SWITCH


var x = 0, y = 0;

var tint_moving =false;
var nav_moving = false;



var dragging = false; // Solve conflicts between interact.js and pure js
	
function clickStart(event)
{
	mouseX0 = event.changedTouches[0].clientX;
	mouseY0 = event.changedTouches[0].clientY;
	mouseX0*=(640.0/$(window).width());
	mouseY0*=(640.0/$(window).width());
	if (touchOnLinks(mouseY0))
	{
		return;
	}
	// Reset tracking vars
	Xy0 = y_displacement[active_category];
	mode = NONE;
	executed = false;
	event.preventDefault();
	dragging = true;
}

function clickEnd()
{
	if (!dragging)
	{
		return;
	}
	dragging = false;
	// Perform operations
	if (mode==NONE)
	{
		toggleToolbar();
	}
	event.preventDefault();
}

function touchOnLinks(y)
{
	// Calculate range

	var	ymin = 0,
		ymax = 1137+y_offset;
	if (toolbars_visible)
	{
		ymin+=93; // ToolBar
		ymax-=88; // NavBar
		if (tint_visible)
		{
			ymin+=82; // Tint
		}
		if (selector_visible)
		{
			ymax-=234; // Candidates
		}
	}
	// Check if in range
	if (y>=ymin && y<=ymax)
	{
		return false;
	}
	return true;
}

function clickMove(event)
{
	if (!dragging)
	{
		return;
	}
	x = event.changedTouches[0].clientX;
	y = event.changedTouches[0].clientY;
	x*=(640.0/$(window).width());
	y*=(640.0/$(window).width());
	event.preventDefault();
	
	if (mode==NONE)
	{
		// detect displacement direction
		if (Math.abs(x-mouseX0)<10&&Math.abs(y-mouseY0)>10)
		{
			mode = PAN;
		} else if (Math.abs(x-mouseX0)>10&&Math.abs(y-mouseY0)<10)
		{
			mode = SWITCH;
		} else if (Math.abs(x-mouseX0)>10&&Math.abs(y-mouseY0)>10)
		{
			// The user is crazy...
			if (Math.abs(x-mouseX0)>Math.abs(y-mouseY0))
			{
				mode = SWITCH;
			} else
			{
				mode = PAN;
			}
		}
	}
	
	if (mode==PAN && movable[active_category])
	{
		if (!executed)
		{
			if (y-mouseY0<-($(window).height())/100)
			{
				y_displacement[active_category]-=5;
				executed = true;
			} else if (y-mouseY0>($(window).height())/100)
			{
				// To previous item
				y_displacement[active_category]+=5;
				executed = true;
			}
			if (y_displacement[active_category] < -50)
			{
				y_displacement[active_category] = -50;
			}
			if (y_displacement[active_category] > 50)
			{
				y_displacement[active_category] = 50;
			}

			updateImage(active_category, NONE, 0);
		}
	}

	
	if (mode==SWITCH)
	{
		if (!executed)
		{
			if (x-mouseX0<-20)
			{
				// To next item
				if (active_sel[active_category]==(count[active_category]-1))
				{
					selectObject(0);
				} else
				{
					selectObject(active_sel[active_category]+1);
				}
				executed = true;
			} else if (x-mouseX0>20)
			{
				// To previous item
				if (active_sel[active_category]!=0)
				{
					selectObject(active_sel[active_category]-1);
				} else
				{
					selectObject(count[active_category]-1);
				}
				executed = true;
			}
		}
	}

}


function fsChange()
{
	//_alert("fsChange begin");
	// Resize body
	setTimeout(function()
	{
		var width = $(window).width(),
			height = $(window).height();

		document.body.style.webkitTransform = 
		document.body.style.MozTransform = 
		document.body.style.msTransform =
		document.body.style.OTransform=
		document.body.style.transform = "scale("+(width/640.0)+","+(width/640.0)+")";	// Maintain aspect ratio
		y_offset = height*640.0/width-1136;
		if (y_offset>0)
		{
			// If the screen is higher than expected, just truncate buttom
			// TODO: Maybe this section can be improved
			y_offset = 0;
		}
		// Adjust restrict div
		document.getElementById("screen").style.height = 1136+y_offset+"px";
		// Adjust nav and candidate
		document.getElementById("navCell").style.top = 1047+y_offset+"px";
		document.getElementById("candidateCell").style.top = 1049+y_offset+"px";
	},1000);

	//_alert("fsChange end");
	
}

function launch() {
	//_alert("launch begin");
	document.body.addEventListener("touchstart",clickStart);
	document.body.addEventListener("touchmove", clickMove);
	document.body.addEventListener("touchend",clickEnd);
	/*
	document.body.addEventListener("mousedown",clickStart);
	document.body.addEventListener("mousemove", clickMove);
	document.body.addEventListener("mouseup",clickEnd);
	*/
	document.getElementById("loadingIndicator").style.opacity = 0.0;
	document.getElementById("item_"+active_category+"_"+active_sel[active_category]).className = "itemActivated";
	showCandidates();
	setTimeout(function()
	{
		document.getElementById("loadingIndicator").style.display = "none";
	},500);
	//_alert("launch end");
}
/*
// Not toggling fullscreen now
var pfx = ["webkit", "moz", "ms", "o", ""];
function RunPrefixMethod(obj, method) {
	
	var p = 0, m, t;
	while (p < pfx.length && !obj[m]) {
		m = method;
		if (pfx[p] == "") {
			m = m.substr(0,1).toLowerCase() + m.substr(1);
		}
		m = pfx[p] + m;
		t = typeof obj[m];
		if (t != "undefined") {
			pfx = [pfx[p]];
			return (t == "function" ? obj[m]() : obj[m]);
		}
		p++;
	}

}
*/