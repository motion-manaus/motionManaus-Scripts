//Select the layers to be parented. The first selected layer will be the parent.
 app.beginUndoGroup("Parent Selected Layers");
 if (app.project.activeItem.selectedLayers.length > 1){ 
 var parent = app.project.activeItem.selectedLayers[0];
 var newPosition = [0,0,0];
 var newAnchor = [0,0,0];
 var newRotation = [0];
    var xPositions = [];
    var yPositions = [];
    var zPositions = [];
 for (var i = 1; i < app.project.activeItem.selectedLayers.length; i++){
 app.project.activeItem.selectedLayers[i].parent = parent;

   if (app.project.activeItem.selectedLayers[i].transform.position.dimensionsSeparated === true) {
     app.project.activeItem.selectedLayers[i].transform.xPosition.setValue(newPosition[0]);
      app.project.activeItem.selectedLayers[i].transform.yPosition.setValue(newPosition[1]);
        if (app.project.activeItem.selectedLayers[i].threeDLayer === true) {
            app.project.activeItem.selectedLayers[i].transform.zPosition.setValue(newPosition[2]);
        }
    } else {
         app.project.activeItem.selectedLayers[i].transform.position.setValue(newPosition);    
    }
   
 app.project.activeItem.selectedLayers[i].transform.anchorPoint.setValue(newAnchor);
 app.project.activeItem.selectedLayers[i].transform.rotation.setValue(newRotation);
 
 }
} else {
alert("Select the layers to be parented. The first selected layer will be the parent.");
}
app.endUndoGroup();
