//Select the layers to be parented. The first selected layer will be the parent.
 app.beginUndoGroup("Parent Selected Layers");
 
 if (app.project.activeItem.selectedLayers.length > 1){ 
 var parent = app.project.activeItem.selectedLayers[0];

 for (var i = 1; i < app.project.activeItem.selectedLayers.length; i++){
 app.project.activeItem.selectedLayers[i].parent = parent;
 app.project.activeItem.selectedLayers[i].transform.position.setValue(parent.transform.anchorPoint.value);
 
   

}
} else {
alert("Select the layers to be parented. The first selected layer will be the parent.");
}
app.endUndoGroup();
