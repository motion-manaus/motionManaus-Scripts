var checkboxControl = thisComp.layer("COMP-MASTER").effect("Color Switch")("Checkbox");

// Define the HEX codes for the two colors
var aHex = hexToRgb("#FFFFFF");
var bHex = hexToRgb("#535865");

// Check the value of the checkbox
if ((checkboxControl) == true) {
  // If the checkbox is marked, set the color to 2
  bHex;
} else {
  // If the checkbox is not marked, set the color to 1
  aHex;
}

