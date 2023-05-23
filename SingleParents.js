app.beginUndoGroup("Single Parent");

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
			// Check if the selected layer already has a parent
			if (selectedLayers[i].parent !== null) {
				// Parent the created null layer to the selected layer's parent
				var nullLayer = comp.layers.addNull();
                                nullLayer.index = selectedLayer[i]+1
				nullLayer.transform.position.setValue([comp.width / 2, comp.height / 2]);
				nullLayer.name = selectedLayers[i].name + "_n";
				nullLayer.parent = selectedLayers[i].parent;
				selectedLayers[i].parent = nullLayer;
			} else {
				// Create a null layer and parent the selected layer to it
				var nullLayer = comp.layers.addNull();
				nullLayer.index = selectedLayer[i]+1
				nullLayer.transform.position.setValue([comp.width / 2, comp.height / 2]);
				nullLayer.name = selectedLayers[i].name + "_n";
				selectedLayers[i].parent = nullLayer;
			}
		}
	}
}

app.endUndoGroup();
