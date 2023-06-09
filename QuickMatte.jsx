// Select the layers to be parented. The first selected layer will be the parent.
app.beginUndoGroup("Matte Selected Layers");
var selectedLayers = app.project.activeItem.selectedLayers, newParent, i;

if (selectedLayers.length > 1) {
	newParent = selectedLayers[0];
	for (i = 1; i < selectedLayers.length; i++) {
		selectedLayers[i].setTrackMatte(newParent, TrackMatteType.ALPHA);
	}
	} else {
		alert("Select the layers to create a matte. The first selected layer will be the matte.");
	}
app.endUndoGroup();
