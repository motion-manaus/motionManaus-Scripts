// Select the layers to be parented. The first selected layer will be the parent.
app.beginUndoGroup("Parent Selected Layers");
var selectedLayers = app.project.activeItem.selectedLayers, newParent, i;

if (selectedLayers.length > 1) {
    newParent = selectedLayers[0];
    for (i = 1; i < selectedLayers.length; i++) {
        selectedLayers[i].parent = newParent;
    }
} else if (selectedLayers.length === 1) {
    alert("Select at least one more layer to be parented.");
} else {
    alert("Select the layers to be parented. The first selected layer will be the parent.");
}
app.endUndoGroup();
