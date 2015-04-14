// Constants
var	BG =	0,
	BODY =	1,
	FACE =	2,
	EYE =	3,
	NOSE =	4,
	MOUTH =	5,
	BROW =	6,
	GLASS =	7,
	HAIR =	8,
	ACC =	9;
	
var LEFT =	640,	// Move Left
	RIGHT =	-640,	// Move Right
	NONE =	0;	// Stay Still

var category_count = 10;
var count = new Array(10,10,10,10,10,10,10,10,10,10);
var names = new Array("bg","hand","face","eye","nose","mouth","brow","glass","hair","acc");
var	thumbw = 122,
	thumbh = 88,
	itemw = new Array(640,640,380,300,120,300,300,340,600,340),
	itemh = new Array(1136,708,360,120,120,160,100,140,740,480),
	itemx = new Array(0,0,130,170,260,170,170,150,20,150),
	itemy = new Array(0,440,216,216,260,316,172,216,-130,206);

var images = new Array(category_count); // Untinted Images (Preload images for drawing on the canvas)
var mimages = new Array(count[FACE]);
//var timages = new Array(category_count);

var colors = new Array(
	"#000000",
	"#381508",
	"#434343",
	"#975f10",
	"#5a5908",
	"#1f3f74",
	"#1f7437",
	"#6b1ba8",
	"#cb40a9",
	"#95844a",
	"#d22a2a",
	"#ed9f18",
	"#a96383",
	"#e4ad80",
	"#d57a5a",
	"#956d58"
)
var tint_count = 16;
var tint = new Array(0,0,0,0,0,0,0,0,0,0); // Force reload all tints
var movable = new Array(false,false,false,true,true,true,true,true,true,true),
	animate = new Array(false,true,false,true,true,true,true,true,true,true);
	
// Global variables
var cx=640, cy=1136;
// Selection storage
var active_sel = new Array(category_count);

for (var i = 0; i != category_count; i++)
{
	active_sel[i] = Math.floor(Math.random()*category_count);
}

var active_category;
// Resize&Displacement
var	x_displacement = new Array(0,0,0,0,0,0,0,0,0,0), // not used
	y_displacement = new Array(0,0,0,0,0,0,0,0,0,0),
	x_stretch = new Array(0,0,0,0,0,0,0,0,0,0), // not used
	y_stretch = new Array(0,0,0,0,0,0,0,0,0,0); // not used
var tint;


// main

// Controllers

// Init canvas layers
function initCanvas()
{
	//_alert("initCanvas begin");
	var container = document.getElementById("canvasCell");
	for (var category = 0; category < category_count; category++)
	{
		var canvas = document.createElement("canvas");
		canvas.id = "canvas"+category;
		canvas.width = 640;
		canvas.height = 1137;
		canvas.style.zIndex = category;
		container.appendChild(canvas);
		
		var tcanvas = document.createElement("canvas");
		tcanvas.id = "tmpCanvas"+category;
		tcanvas.width = 640;
		tcanvas.height = 1137;
		tcanvas.style.webkitTransform=
		tcanvas.style.msTransform=
		tcanvas.style.MozTransform=
		tcanvas.style.OTransform=
		tcanvas.style.transform = "translate(640px, 0px)";
		tcanvas.style.zIndex = category;
		container.appendChild(tcanvas);
	}
	//_alert("initCanvas end");
}

// Init category list
function initCategory()
{
	//_alert("initCategory begin");
	active_category = EYE;
	// Create main container
	var navContainer_master = document.getElementById("navCell");
	var navContainer_table = document.createElement("table");
	var navContainer = document.createElement("tr");
	navContainer_table.border=0;
	navContainer_master.appendChild(navContainer_table);
	navContainer_table.appendChild(navContainer);
	var candidateContainer = document.getElementById("candidateCell");
	navContainer_table.id = "navTable";
	// Fill in container
	for(var category=0; category<category_count; category++)
	{
		// Create button in navCell
		var nav_cell = document.createElement("td");
		nav_cell.align = "center";
		var button = document.createElement("a");
		button.className = "candidate";
		button.id = "category"+category;
		button.href = "javascript:setTimeout(function(){selectCategory("+category+")},20);";
		var category_thumb = document.createElement("img");
		category_thumb.src = "ui/tabbat-"+names[category]+"@2x.png";
		button.appendChild(category_thumb);
		nav_cell.appendChild(button);
		navContainer.appendChild(nav_cell);
		
		// Create container in candidateCell
		var selector = document.createElement("table");
		selector.id = "selector"+category;
		selector.className = "disabled";
		candidateContainer.appendChild(selector);
		
		// Create buttons inside selector
		for (var row = 0; row < 2; row++)
		{
			// Create new row
			var table_row = document.createElement("tr");
			selector.appendChild(table_row);
			for (var col = 0; col < 5; col++)
			{
				var index = row*5+col;
				var cell = document.createElement("td");
				cell.style.padding = "0px";
				cell.style.margin = "0px";
				cell.style.width = "128px";
				cell.style.overflow = "hidden";
				cell.align = "center";
				table_row.appendChild(cell);
				var item = document.createElement("a");
				item.href = "javascript:setTimeout(function(){selectObject("+index+")},20);";
				item.className = "itemCandidate";
				item.id = "item_"+category+"_"+index;
				item.align = "center";
				var thumb = document.createElement("img");
				if(category==BG)
				{
					thumb.src = "res/"+names[category]+"/item_"+names[category]+"_"+(index+1)+"_thumb.jpg";
				} else
				{
					thumb.src = "res/"+names[category]+"/item_"+names[category]+"_"+(index+1)+"_thumb.png";
				}
				item.appendChild(thumb);
				cell.appendChild(item);
			}
		}
		// Activate default item
//		document.getElementById("item_"+category+"_"+active_sel[category]).className = "itemActivated";
	}

	// Activate default category
	document.getElementById("category"+active_category).className = "activated";
	document.getElementById("selector"+active_category).className = "enabled";
	//_alert("initCategory end");
}

// Init tint selection list
function initTint()
{
	//_alert("initTint begin");
	var container = document.getElementById("tintRow");
	for (var i = 0; i < tint_count; i++)
	{
		var cell = document.createElement("td");
		container.appendChild(cell);
		var button = document.createElement("a");
		button.className = "tintCandidate";
		button.href = "javascript:setTimeout(function(){selectTint("+i+")},20);";
		button.align = "center";
		button.id = "tint"+i;
		var thumb = document.createElement("img");
		thumb.src = "ui/item_color_"+(i+1)+"_thumb@2x.png";
		button.appendChild(thumb);
		cell.appendChild(button);
	}
	// Activate default
	document.getElementById("tint0").className = "tintActivated"; // Static assignment: conflicts happen due to background precahce
	//_alert("initTint end");
}


// New Tint Selected
function selectTint(newTint)
{
	//_alert("selectTint begin");
	if (tint_moving)
	{
		tint_moving =false;
		return;
	}
	if (animating)
	{
		return;
	}
	// Switch display
	document.getElementById("tint"+tint[active_category]).className = "tintCandidate";
	document.getElementById("tint"+newTint).className = "tintActivated";
	tint[active_category] = newTint;
	if (active_category == BG)
	{
		// Background Tint controls the entire body
		for (var i = 1; i != category_count; i++)
		{
			tint[i] = newTint;
			updateImage(i, NONE, 0);
		}
	} else
	{
		updateImage(active_category, NONE, 0);

	}
	//_alert("selectTint end");
}

// New Category selected

var candidate_moving = false;
function selectCategory(category)
{
	//_alert("selectTint begin");
	if (nav_moving)
	{
		// nav_moving = false;
		return;
	}
	if (category == active_category)
	{
		// Toggle navbar, animation only
		if (selector_visible)
		{
			hideCandidates();
			document.getElementById("item_"+category+"_"+active_sel[category]).className = "itemCandidate";

		}else
		{
			showCandidates();
			document.getElementById("item_"+category+"_"+active_sel[category]).className = "itemActivated";
		}
		return;
	}
	candidate_moving = true;
	// Switch tint profile
	document.getElementById("tint"+tint[active_category]).className = "tintCandidate";
	if (category != BG)
	{
		// Ignore BG
		document.getElementById("tint"+tint[category]).className = "tintActivated";
	}
	
	
	if (!selector_visible)
	{
		// Display new, without delay
		
		// Set new data
		document.getElementById("category"+active_category).className = "candidate";
		document.getElementById("category"+category).className = "activated";
		document.getElementById("selector"+active_category).className = "disabled";
		document.getElementById("selector"+category).className = "enabled";
		active_category = category;
		
		document.getElementById("item_"+category+"_"+active_sel[category]).className = "itemActivated";
		
		showCandidates();
		
		setTimeout(function()
		{
			candidate_moving = false;
		},500);
		
		
		return;
	}
	
	
	// Switch to new
	
	// Hide current
	

	// Wait for animation
	
	// Set new
	document.getElementById("item_"+active_category+"_"+active_sel[active_category]).className = "itemCandidate";
	document.getElementById("item_"+category+"_"+active_sel[category]).className = "itemActivated";

	document.getElementById("category"+active_category).className = "candidate";
	document.getElementById("category"+category).className = "activated";
	document.getElementById("selector"+active_category).className = "disabled";
	document.getElementById("selector"+category).className = "enabled";
	active_category = category;

	// Show new
	candidate_moving = false;
	//_alert("selectTint end");
}

// New Object selected
function selectObject(index)
{
	//_alert("selectObject begin");
	if (index == active_sel[active_category])
	{
		// Nothing happens if the same object is selected
		return;
	}
	if (animating)
	{
		// Prevent interruption of animation
		// ID changes rely on timing
		return;
	}
	if (candidate_moving)
	{
		// Prevent selection during candidate animation
		return;
	}
	document.getElementById("item_"+active_category+"_"+active_sel[active_category]).className = "itemCandidate";
	document.getElementById("item_"+active_category+"_"+index).className = "itemActivated";
	var direction;
	if (index > active_sel[active_category])
	{
		direction = LEFT;
	} else
	{
		direction = RIGHT;
	}
	var oldindex = active_sel[active_category];
	active_sel[active_category] = index;
	updateImage(active_category, direction, oldindex);
	//_alert("selectObject end");
}

// Painting

var animating= false;
function updateImage(category, displacement, oldindex)
{
	// Parameter changed after timeout on android
	var category1=category,
		displacement1=displacement,
		oldindex1=oldindex;
	// Update later: allow safari to update ui after every redraw
	// Safari crash after 10 canvases (or 20) is updated at the same time
	setTimeout(function()
	{
		updateImage1(category1, displacement1, oldindex1);
	},10);
}

// Draw a certain layer
function updateImage1(category, displacement, oldindex)
{
//	//_alert("updateImage begin");
	if (displacement == LEFT || displacement == RIGHT)
	{
		// BEGIN animation
		var canvas = document.getElementById("tmpCanvas"+category);
		var ctx = canvas.getContext("2d");
		// Setup temp canvas
		ctx.clearRect(0,0,cx,cy);
		canvas.className = "noani";
		if (displacement == LEFT)
		{
		canvas.style.webkitTransform=
		canvas.style.msTransform=
		canvas.style.MozTransform=
		canvas.style.OTransform=
		canvas.style.transform = "translate(640px,0px)";
		} else
		{
			canvas.style.webkitTransform=
			canvas.style.msTransform=
			canvas.style.MozTransform=
			canvas.style.OTransform=
			canvas.style.transform = "translate(-640px,0px)";
		}
		
		// Draw in temp canvas
		ctx.globalCompositeOperation = "source-over";
		ctx.drawImage(images[category][active_sel[category]], // image
			/*
			0, // src x
			0, // src y
			itemw[category], // src w
			itemh[category], // src h
			*/
			(itemx[category]+x_displacement[category])/640*cx, // dest x
			(itemy[category]+y_displacement[category])/1136*cy, // dest y
			(itemw[category])/640*cx, // dest w
			(itemh[category])/1136*cy  // dest h
		);
		
		if (category != BG)
		{
			// NEVER tint BG!!!
			ctx.globalCompositeOperation = "source-in";
			ctx.fillStyle = colors[tint[category]];
			ctx.fillRect(0,0,cx,cy);
		}
		
		if (category==BODY)
		{
			// Apply Mask
			ctx.globalCompositeOperation = "destination-out";
			ctx.drawImage(mimages[active_sel[FACE]],
				/*
				0,0, // src x,y
				itemw[FACE],itemh[FACE], // src w,h
				*/
				(itemx[FACE]+x_displacement[FACE])/640*cx, // dest x
				(itemy[FACE]+y_displacement[FACE])/1136*cy, // dest y
				(itemw[FACE])/640*cx, // dest w
				(itemh[FACE])/1136*cy  // dest h
			);
		}
		if (category==FACE)
		{
			// Update body with new mask
			updateImage(BODY, NONE, 0);
		}

		animating = true;
		setTimeout(function()
		{
			// Setup animation
			var oldcanvas = document.getElementById("canvas"+category);
			canvas.className = "animated";
			oldcanvas.className = "animated";
			
			canvas.style.webkitTransform=
			canvas.style.msTransform=
			canvas.style.MozTransform=
			canvas.style.OTransform=
			canvas.style.transform = "translate(0px, 0px)";
			
			if (displacement == LEFT)
			{
				oldcanvas.style.webkitTransform=
				oldcanvas.style.msTransform=
				oldcanvas.style.MozTransform=
				oldcanvas.style.OTransform=
				oldcanvas.style.transform = "translate(-640px, 0px)";
			} else
			{
				oldcanvas.style.webkitTransform=
				oldcanvas.style.msTransform=
				oldcanvas.style.MozTransform=
				oldcanvas.style.OTransform=
				oldcanvas.style.transform = "translate(640px, 0px)";
			}
			setTimeout(function()
			{
				// Animation finished
				oldcanvas.className = "noani";
				canvas.className = "noani";
				oldcanvas.id = "t";
				canvas.id = "canvas"+category;
				oldcanvas.id = "tmpCanvas"+category;
				animating = false;
			}, 300);
		},50);
		
	} else
	{
		// Regular draw
		var ctx = document.getElementById("canvas"+category).getContext("2d");
		ctx.clearRect(0,0,cx,cy);
		ctx.globalCompositeOperation = "source-over";
		ctx.drawImage(
			images[category][active_sel[category]], // image
			/*
			0, // src x
			0, // src y
			itemw[category], // src w
			itemh[category], // src h
			*/
			(itemx[category]+x_displacement[category])/640*cx, // dest x
			(itemy[category]+y_displacement[category])/1136*cy, // dest y
			(itemw[category])/640*cx, // dest w
			(itemh[category])/1136*cy  // dest h
		);
		
		if (category != BG)
		{
			// NEVER tint BG!!!
			ctx.globalCompositeOperation = "source-in";
			ctx.fillStyle = colors[tint[category]];
			ctx.fillRect(0,0,cx,cy);
		}
		
		if (category==BODY)
		{
			// Apply Mask
			ctx.globalCompositeOperation = "destination-out";
			ctx.drawImage(mimages[active_sel[FACE]],
				/*
				0,0, // src x,y
				itemw[FACE],itemh[FACE], // src w,h
				*/
				(itemx[FACE]+x_displacement[FACE])/640*cx, // dest x
				(itemy[FACE]+y_displacement[FACE])/1136*cy, // dest y
				(itemw[FACE])/640*cx, // dest w
				(itemh[FACE])/1136*cy  // dest h
			);
		}
		if (category==FACE)
		{
			// Update body with new mask
			updateImage(BODY, NONE, 0);
		}
//		//_alert("static update succeeded for "+names[category]);
	}
	
//	//_alert("updateImage end");
}


// Preload images

var imgcount=0,imgloaded=0;

function imgOnload()
{
//	//_alert("imgOnload begin");
	// This function only shows the progress
	imgloaded++;
	document.getElementById("progress").style.width = (150*imgloaded/imgcount)+"px";
	document.getElementById("progText").innerHTML = imgloaded+"/"+imgcount;
	if (imgloaded == imgcount)
	{
		// document loaded
		windowInit();
	}
//	//_alert("imgOnload end");
}

// Load images
function loadImages()
{
	//_alert("loadImages begin");
	for (var category = 0; category < category_count; category++)
	{
		imgcount += count[category];
	}
	imgcount += count[FACE]; // For Mask
	for (var category = 0; category < category_count; category++)
	{
		images[category] = new Array(count[category]);
		for (var index = 0; index < count[category]; index++)
		{
			images[category][index] = new Image();
			images[category][index].onload = imgOnload;
			if (category==BG)
			{
				images[category][index].src = "res/"+names[category]+"/item_"+names[category]+"_"+(index+1)+".jpg";
			} else
			{
				images[category][index].src = "res/"+names[category]+"/item_"+names[category]+"_"+(index+1)+".png";
			}
				document.getElementById("imgPreload").appendChild(images[category][index]);
		}
	}
	// Load masks
	for (var index = 0; index < count[FACE]; index++)
	{
		mimages[index] = new Image();
		mimages[index].onload = imgOnload;
		mimages[index].src = "res/face/item_face_"+(index+1)+"_mask.png";
		document.getElementById("imgPreload").appendChild(mimages[index]);
	}
	//_alert("loadImages end");
}

// Random selection for all layers
function random()
{
	//_alert("random begin");
	if (animating)
	{
		return;
	}
	setTimeout(function() // Make button effect visible
	{
		var old_sel = active_sel.slice(0);
		for (var category = 0; category < category_count; category++)
		{
			document.getElementById("item_"+category+"_"+active_sel[category]).className = "itemCandidate";
			active_sel[category]+=(Math.floor(Math.random()*(count[category]-1))+1); // Make sure active_sel is added with a positive, non-zero value
			active_sel[category]%=count[category];
			//updateImage(category, NONE, 0);
			updateImage(category, NONE, 0);
			// Update selection
			document.getElementById("item_"+category+"_"+active_sel[category]).className = "itemActivated";
		}
	},50);
	//_alert("random end");
}

// Images are all loaded, ready to display app
function windowInit()
{
	//_alert("windowInit begin");
	active_category = EYE;
	launch();
	for (var category = 0; category < category_count; category++)
	{
		updateImage(category, NONE, 0);
	}
	//_alert("windowInit end");
}