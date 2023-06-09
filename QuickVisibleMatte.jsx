app.beginUndoGroup("Matte Selected Layers");

var selectedLayers = app.project.activeItem.selectedLayers;
var newParent, i;

if (selectedLayers.length > 1) {
    newParent = selectedLayers[0];
    for (i = 1; i < selectedLayers.length; i++) {
        selectedLayers[i].setTrackMatte(newParent, TrackMatteType.ALPHA);
    }

    // Make the new parent layer visible
    newParent.enabled = true;

} else {
    alert("Select the layers to create a matte. The first selected layer will be the matte.");
}

app.endUndoGroup();
