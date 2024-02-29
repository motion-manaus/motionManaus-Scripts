app.beginUndoGroup("MoveAboveParent");

// Function to move a layer before another layer
function moveLayerBefore(layer, targetLayer) {
    var targetIndex = targetLayer.index;
    if (layer.index > targetIndex) {
        targetIndex++;
    }
    layerIndex = layer.index;
    while (layerIndex > targetIndex) {
        app.project.activeItem.layers[layerIndex].moveAfter(app.project.activeItem.layers[layerIndex - 1]);
        layerIndex--;
    }
    layer.moveBefore(targetLayer);
}

// Check if layers are selected
if (app.project.activeItem instanceof CompItem && app.project.activeItem.selectedLayers.length > 0) {
    var selectedLayers = app.project.activeItem.selectedLayers;
    
    // Iterate through each selected layer
    for (var i = 0; i < selectedLayers.length; i++) {
        var selectedLayer = selectedLayers[i];

        // Check if the selected layer has a parent
        if (selectedLayer.parent !== null) {
            // Get the index of the parent layer
            var parentIndex = selectedLayer.parent.index;

            // Move the selected layer before its parent
            moveLayerBefore(selectedLayer, selectedLayer.parent);
        } else {
            alert("Selected layer has no parent.");
        }
    }
} else {
    alert("Please select one or more layers in the active composition.");
}

app.endUndoGroup();
