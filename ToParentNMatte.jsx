// Select the layers to be parented. The first selected layer will be the parent.
app.beginUndoGroup("Parent Selected Layers");
var selectedLayers = app.project.activeItem.selectedLayers, newParent, i;

if (selectedLayers.length > 1) {
    newParent = selectedLayers[0];
    for (i = 1; i < selectedLayers.length; i++) {
        selectedLayers[i].parent = newParent;
		selectedLayers[i].setTrackMatte(newParent, TrackMatteType.ALPHA);
		  if (selectedLayers[i].transform.position.dimensionsSeparated == true){
			  selectedLayers[i].transform.xPosition.setValue(newParent.transform.anchorPoint.value[0]);
			  selectedLayers[i].transform.yPosition.setValue(newParent.transform.anchorPoint.value[1]);
				if (selectedLayers[i].threeDLayer === true) {
				selectedLayers[i].transform.zPosition.setValue(newParent.transform.anchorPoint.value[2]);
				}
			}else{
				selectedLayers[i].transform.position.setValue(newParent.transform.anchorPoint.value);
			}
		
    }
} else if (selectedLayers.length === 1) {
    alert("Select at least one more layer to be parented.");
} else {
    alert("Select the layers to be parented. The first selected layer will be the parent.");
}
app.endUndoGroup();
