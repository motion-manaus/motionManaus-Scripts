// Get the active composition
var comp = app.project.activeItem;
if (comp === null || !(comp instanceof CompItem)) {
  alert("Please select a composition.");
} else {
  // Get the selected layers
  var selectedLayers = comp.selectedLayers;
  if (selectedLayers.length === 0) {
    alert("Please select at least one layer.");
  } else {
    // Loop through the selected layers
    for (var i = 0; i < selectedLayers.length; i++) {
      // Create a null layer
      var nullLayer = comp.layers.addNull();
      
      // Set the null layer's position to the center of the composition
      nullLayer.transform.position.setValue([comp.width/2, comp.height/2]);
      
      // Parent the selected layer to the null layer
      selectedLayers[i].parent = nullLayer;
    }
  }
}
