/**
 * HTML5 Canvas Drawing Application
 *
 * A simple yet feature-rich drawing application that allows users to create
 * rainbow-colored strokes with dynamically changing line widths. The stroke
 * color cycles through the HSL color spectrum, and the line width oscillates
 * between minimum and maximum values to create varied visual effects.
 *
 * @requires HTML canvas element with id="draw"
 * @author Senior Engineering Team
 */

// ============================================================================
// Canvas Initialization & Configuration
// ============================================================================

/**
 * Main canvas element reference
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("#draw");

/**
 * 2D rendering context for drawing operations
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext("2d");

// Set canvas dimensions to fill the entire viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ============================================================================
// Drawing Style Configuration
// ============================================================================

/**
 * Initial stroke color (will be overridden by HSL color cycling)
 * @type {string}
 */
ctx.strokeStyle = "#BADA55";

/**
 * Line join style - determines how connecting segments are joined
 * 'round' creates smooth, rounded corners at path intersections
 * @type {string}
 */
ctx.lineJoin = "round";

/**
 * Line cap style - determines the shape of stroke endpoints
 * 'round' creates rounded endpoints for a smoother appearance
 * @type {string}
 */
ctx.lineCap = "round";

/**
 * Initial line width in pixels
 * @type {number}
 */
ctx.lineWidth = 100;

/**
 * Optional composite operation for blending modes
 * Currently disabled - uncomment to enable multiply blend mode
 * @type {string}
 */
// ctx.globalCompositeOperation = 'multiply';

// ============================================================================
// Application State
// ============================================================================

/**
 * Flag indicating whether the user is currently drawing
 * True when mouse is pressed down, false otherwise
 * @type {boolean}
 */
let isDrawing = false;

/**
 * X-coordinate of the last recorded mouse position
 * Used as the starting point for drawing line segments
 * @type {number}
 */
let lastX = 0;

/**
 * Y-coordinate of the last recorded mouse position
 * Used as the starting point for drawing line segments
 * @type {number}
 */
let lastY = 0;

/**
 * Current hue value for HSL color generation (0-360)
 * Increments with each draw operation to create rainbow effect
 * @type {number}
 */
let hue = 0;

/**
 * Direction flag for line width oscillation
 * True = increasing width, False = decreasing width
 * @type {boolean}
 */
let direction = true;

// ============================================================================
// Core Drawing Logic
// ============================================================================

/**
 * Main drawing function - executes on mouse move when drawing is active
 *
 * This function handles the core drawing logic including:
 * - Drawing line segments from the last position to current position
 * - Cycling through rainbow colors using HSL color space
 * - Dynamically adjusting line width to create varied stroke effects
 *
 * Performance Considerations:
 * - Early return pattern prevents unnecessary calculations when not drawing
 * - Destructuring assignment for efficient coordinate updates
 *
 * @param {MouseEvent} e - Mouse event containing current cursor coordinates
 * @returns {void}
 */
function draw(e) {
  // Guard clause: exit early if user is not actively drawing
  if (!isDrawing) return;

  // Debug logging - can be removed in production
  console.log(e);

  // Update stroke color using HSL for smooth color transitions
  // HSL(hue, saturation%, lightness%) - hue cycles 0-360 for full spectrum
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  // Begin a new path for the current stroke segment
  ctx.beginPath();

  // Set starting point of the line (where we left off)
  ctx.moveTo(lastX, lastY);

  // Draw line to current mouse position
  ctx.lineTo(e.offsetX, e.offsetY);

  // Render the stroke to canvas
  ctx.stroke();

  // Update last position to current position for next iteration
  // Using destructuring for concise multi-variable assignment
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // Increment hue for color cycling effect
  hue++;

  // Reset hue to 0 after full rotation through color wheel
  if (hue >= 360) {
    hue = 0;
  }

  // Reverse direction when line width hits boundaries
  // Creates oscillating effect between thick and thin lines
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  // Adjust line width based on current direction
  if (direction) {
    ctx.lineWidth++; // Increase width
  } else {
    ctx.lineWidth--; // Decrease width
  }
}

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * Mouse down event handler
 * Initiates drawing state and captures initial coordinates
 *
 * This prevents drawing lines from (0,0) when user first clicks
 * by setting lastX/lastY to the actual click position
 */
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  // Initialize starting position to prevent unwanted lines from origin
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

/**
 * Mouse move event handler
 * Continuously draws while mouse is pressed and moving
 */
canvas.addEventListener("mousemove", draw);

/**
 * Mouse up event handler
 * Terminates drawing when user releases mouse button
 */
canvas.addEventListener("mouseup", () => (isDrawing = false));

/**
 * Mouse out event handler
 * Terminates drawing when cursor leaves canvas area
 * Prevents unexpected lines when user returns to canvas
 */
canvas.addEventListener("mouseout", () => (isDrawing = false));

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Trying canvas.
// ctx.fillStyle = "blue";
// // fillRect(x, y, width, height)
// ctx.fillRect(50, 50, 200, 100);
//
// ctx.strokeStyle = "red";
// ctx.strokeRect(300, 50, 200, 100);
//
// ctx.beginPath();
// ctx.moveTo(100, 200);
// ctx.lineTo(200, 300);
// ctx.lineTo(50, 300);
// ctx.closePath();
// ctx.fill();
//
// // linejoin and lineCap has 3 options "round - butt(default) - square"
// ctx.lineWidth = 10;
// ctx.lineJoin = "round";
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(250, 50);
// ctx.stroke();
//
// ctx.lineCap = "square";
// ctx.beginPath();
// ctx.moveTo(50, 100);
// ctx.lineTo(250, 100);
// ctx.stroke();
