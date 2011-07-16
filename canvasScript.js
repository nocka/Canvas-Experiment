/*
* Andrew Nocka
* 7/15/2011
* V2
* Changed: On contact with wall, Ball's color changes to a random color on the list.
* Changed direction of balls on a split.
* Fixed Problem where balls were getting stuck when clicked while next to a wall.
* Cleaned up code and added some more comments
*/

var numCircles = 1;
var c = document.getElementById("myCanvas");
var cntxt = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;
var coordinates = new Array();
coordinates[0] = new coord(Math.floor(c.width / 2), Math.floor(c.height / 2), Math.floor(c.height / 6), 3,3, 0);
coordinates[0].ascending = true;


//variables for dealing with colors.
var backgroundColor = "#FF0000";
var colors = new Array();
colors[0] = "#003399"; colors[1] = "#00FF00"; colors[2] = "#FFFFFF"; colors[3] = "#FFFF00"; colors[4] = "#61033B"; colors[5] = "#FF9900";


var i = 0;

window.setInterval("drawFrame()", 30); // sets the frame rate limit: 1000 / number chosen.

function coord(xCoord,yCoord,circleRadius,xSpeed,ySpeed, color)
{
	this.x = xCoord;
	this.y = yCoord;
	this.radius = circleRadius;
	this.xVel = xSpeed;
	this.yVel = ySpeed;
	this.colorCounter = color;
}

/*
* Event handler for when mouse is pressed
* If a ball is clicked, the ball multiplies into 2 smaller balls.
*/
document.onmousedown = function(e)
{
	var clickedX = e.pageX;
	var clickedY = e.pageY;
	var currentRadius, currentXVel, currentYVel, currentColor, currentAscending;
	var j = 0;
	for(j = 0; j < numCircles; j++)
	{
		//for a ball to be clicked the coordinates must be between the x +- the radius and the y+- the radius.
		if((coordinates[j].x - coordinates[j].radius < clickedX && clickedX < coordinates[j].x + coordinates[j].radius) && 
		(coordinates[j].y - coordinates[j].radius < clickedY && clickedY < coordinates[j].y + coordinates[j].radius)) 
		{
			currentRadius = coordinates[j].radius; currentXVel = coordinates[j].xVel; currentYVel = coordinates[j].yVel;
			currentColor = coordinates[j].colorCounter; currentAscending = coordinates[j].ascending;
			
			coordinates[j] = new coord(clickedX, clickedY, currentRadius / 2, currentXVel, currentYVel, currentColor);
			coordinates[numCircles] = new coord(clickedX, clickedY, currentRadius / 2, currentXVel * -1, currentYVel, currentColor);
			numCircles++;
			break;
		}
	}
};

/*
*Draws the frame
*Also detects when a ball collides with an edge and changes the velocity accordingly
*/
function drawFrame()
{
	cntxt.fillStyle = backgroundColor;
	cntxt.fillRect(0,0,c.width, c.height);
	
	
	var i = 0;
	for(i = 0; i < numCircles; i++)
	{
		cntxt.fillStyle = colors[coordinates[i].colorCounter];
		cntxt.beginPath();
		cntxt.arc(coordinates[i].x, coordinates[i].y, coordinates[i].radius, 0, Math.PI*2, true);
		cntxt.closePath();
		cntxt.fill();
		
		coordinates[i].x += coordinates[i].xVel;
		coordinates[i].y += coordinates[i].yVel;
		
		//if the ball collides with the west or east edge
		if(coordinates[i].x + coordinates[i].radius  > c.width || coordinates[i].x - coordinates[i].radius < 0)
		{
			coordinates[i].xVel *= -1;
			colorSwitch(i);
		}
		//if the ball collides with the north or south edge
		if(coordinates[i].y + coordinates[i].radius > c.height || coordinates[i].y - coordinates[i].radius < 0)
		{
			coordinates[i].yVel *= -1;
			colorSwitch(i);
		}
	}
}

/*
*Changes the color of the ball
*Takes in the index of the ball in the coordinates array
*/
function colorSwitch(index)
{
	var rand = Math.floor(Math.random() * colors.length); //picks random integer between 0 and the number of colors
	
	if(coordinates[index].colorCounter == rand) //if the chosen color is the same as the current counter, it is changed to the next color.
		rand = (rand + 1) % colors.length;
		
	coordinates[index].colorCounter = rand;
	
}






