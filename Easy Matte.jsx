//Select the layers to be parented. The first selected layer will be the parent.
 app.beginUndoGroup("MatteCopy");
 if (app.project.activeItem.selectedLayers.length > 1 && app.project.activeItem.selectedLayers[0].hasTrackMatte){ 
 var matteCopy = app.project.activeItem.selectedLayers[0];
 var mattePaste = [0,0,0];
 for (var i = 1; i < app.project.activeItem.selectedLayers.length; i++){
 app.project.activeItem.selectedLayers[i].setTrackMatte(matteCopy.trackMatteLayer, matteCopy.trackMatteType);
 }
} else {
alert("Select the layers to paste the selected matte. The first selected layer will have the Track Matte copied.");
}
app.endUndoGroup();
