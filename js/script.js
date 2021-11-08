// Reference: https://rembound.com/articles/drawing-pixels-with-html5-canvas-and-javascript

// Motion
var motion_slider = document.getElementById("motion-slider");
var motion = 50;
motion = motion_slider.value; // Display the default motion_slider value
document.getElementById("motion-label").innerHTML = "Motion = " + motion;

// Red_m
var red_m_slider = document.getElementById("rm-slider");
var red_m = 0;
red_m = red_m_slider.value; // Display the default motion_slider value
document.getElementById("rm-label").innerHTML = "Red_m = " + red_m;

// Green_m
var green_m_slider = document.getElementById("gm-slider");
var green_m = 0;
green_m = green_m_slider.value; // Display the default motion_slider value
document.getElementById("gm-label").innerHTML = "Green_m = " + green_m;

// Blue_m
var blue_m_slider = document.getElementById("bm-slider");
var blue_m = 0;
blue_m = blue_m_slider.value; // Display the default motion_slider value
document.getElementById("bm-label").innerHTML = "Blue_m = " + blue_m;

// Offset_x
var offset_slider = document.getElementById("offset-slider");
var offset = 0;
offset = offset_slider.value; // Display the default motion_slider value
document.getElementById("offset-label").innerHTML = "Offset = " + offset;

// Slider callbacks
motion_slider.oninput = function() {
  motion = this.value;
  document.getElementById("motion-label").innerHTML = "Motion = " + motion;
}

red_m_slider.oninput = function() {
    red_m = this.value;
    document.getElementById("rm-label").innerHTML = "Red_m = " + red_m;
}

green_m_slider.oninput = function() {
    green_m = this.value;
    document.getElementById("gm-label").innerHTML = "Green_m = " + green_m;
}

blue_m_slider.oninput = function() {
    blue_m = this.value;
    document.getElementById("bm-label").innerHTML = "Blue_m = " + blue_m;
}

offset_slider.oninput = function() {
    offset = this.value;
    document.getElementById("offset-label").innerHTML = "Offset = " + offset;
}

// The function gets called when the window is fully loaded
window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
 
    // Define the image dimensions
    var width = canvas.width;
    var height = canvas.height;
 
    // Create an ImageData object
    var imagedata = context.createImageData(width, height);
 
    // Create the image
    function createImage(motion) {
        // Loop over all of the pixels
        for (var x=0; x < width; x++) {
            for (var y=0; y < height; y++) {
                // Get the pixel index
                var pixelindex = (y * width + x) * 4;
 
                // Generate a xor pattern with some random noise
                var red = (red_m * x + motion + offset * y) % 256;
                var green = (green_m * x + motion + offset * y) % 256;
                var blue = (blue_m * x + motion + offset * y) % 256;

                // Set the pixel data
                imagedata.data[pixelindex] = red;     // Red
                imagedata.data[pixelindex+1] = green; // Green
                imagedata.data[pixelindex+2] = blue;  // Blue
                imagedata.data[pixelindex+3] = 255;   // Alpha
            }
        }
    }
 
    // Main loop
    function main(tframe) {
        // Request animation frames
        window.requestAnimationFrame(main);
 
        if (motion <= 0)
            motion = 1;

        // Create the image
        createImage(Math.floor(tframe / motion));
 
        // Draw the image data to the canvas
        context.putImageData(imagedata, 0, 0);
    }
 
    // Call the main loop
    main(0);
};