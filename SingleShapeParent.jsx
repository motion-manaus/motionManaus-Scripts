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
				// Parent the created shape layer to the selected layer's parent
				var shapeLayer = comp.layers.addShape();
				shapeLayer.transform.position.setValue([comp.width / 2, comp.height / 2]);
				shapeLayer.name = selectedLayers[i].name + "_s";
				shapeLayer.guideLayer = true;
				shapeLayer.parent = selectedLayers[i].parent;
				selectedLayers[i].parent = shapeLayer;
			} else {
				// Create a shape layer and parent the selected layer to it
				var shapeLayer = comp.layers.addShape();
				shapeLayer.transform.position.setValue([comp.width / 2, comp.height / 2]);
				shapeLayer.name = selectedLayers[i].name + "_s";
				shapeLayer.guideLayer = true;
				selectedLayers[i].parent = shapeLayer;
			}
		}
	}
}

app.endUndoGroup();
