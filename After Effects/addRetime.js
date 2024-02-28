app.beginUndoGroup("Retime");

// Define the expression to be applied to selected properties
var expressionCode = 'c = effect("retime")("Slider");\n' +
                     'min = 0;\n' +
                     'max = 100;\n' +
                     'a = key(1).time;\n' +
                     'b = key(numKeys).time;\n' +
                     't = linear(c, min, max, a, b);\n' +
                     'valueAtTime(t);';

// Get the currently selected properties
var selectedProperties = app.project.activeItem.selectedProperties;

// Apply the expression to selected properties
for (var i = 0; i < selectedProperties.length; i++) {
    var property = selectedProperties[i];
    if (property instanceof Property) {
        if (property.canSetExpression) {
            property.expression = expressionCode;
        }
    }
}

// Create a slider control and name it "retime" for each selected layer
var selectedLayers = app.project.activeItem.selectedLayers;

for (var i = 0; i < selectedLayers.length; i++) {
    var layer = selectedLayers[i];
    
    // Create a new slider control
    var sliderControl = layer.Effects.addProperty("ADBE Slider Control");
    sliderControl.name = "retime";
    
    // Apply the expression to the slider control
    sliderControl.property("ADBE Slider Control-0001").expression =
        'r = thisComp.layer("re_master").effect("retime")("Slider");\n' +
        'i = index - 3;\n' +
        't = thisComp.layer("re_master").effect("offset")("Slider");\n' +
        'r - (i * thisComp.layer("re_master").effect("factor")("Slider")) - (t * 1.19)';
}

// Check if the null "re_master" already exists in the composition
var reMasterLayer = app.project.activeItem.layer("re_master");
var nullLayer;

if (!reMasterLayer) {
    // Create a null object named "re_master" if it doesn't exist
    nullLayer = app.project.activeItem.layers.addNull();
    nullLayer.name = "re_master";

    // Add a slider control named "retime" with an initial value of 100
    var retimeControl = nullLayer.Effects.addProperty("ADBE Slider Control");
    retimeControl.name = "retime";
    retimeControl.property("Slider").setValue(100);

    // Add a slider control named "offset" with an initial value of 12
    var offsetControl = nullLayer.Effects.addProperty("ADBE Slider Control");
    offsetControl.name = "offset";
    offsetControl.property("Slider").setValue(12);

    // Add a slider control named "factor" with an initial value of 6
    var factorControl = nullLayer.Effects.addProperty("ADBE Slider Control");
    factorControl.name = "factor";
    factorControl.property("Slider").setValue(6);
} else {
    // Use the existing null "re_master" layer
    nullLayer = reMasterLayer;
}
app.endUndoGroup();
