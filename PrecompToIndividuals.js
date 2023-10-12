app.beginUndoGroup("Precomp Individuals");

var window = new Window("palette", "Precompose Individually", undefined);
window.orientation = "column";
var infoText = window.add("statictext", undefined, "Select layers, and choose precompose");
var precomposeButton = window.add("button", undefined, "Precompose");

window.center();
window.show();

precomposeButton.onClick = function() {
    if(app.project.activeItem == null || !(app.project.activeItem instanceof CompItem)) {
        alert("Please select a composition");
        return false;
        }
    
    if(app.project.activeItem.selectedLayers.length < 0) {
        alert("Please select at least 1 layer");
        return false;
        }
    
    precomposeOneByOne(app.project.activeItem.selectedLayers);
    }

function precomposeOneByOne(selectedLayers) {
        app.beginUndoGroup("Precompose Individually");
        
        var thisPrecompLayer;
        var thisIndex, inPoint, outPoint;
        var thisPrecompComp;
        for(var i = 0; i < selectedLayers.length; i++) {
            thisIndex = selectedLayers[i].index;
            inPoint = selectedLayers[i].inPoint;
            outPoint = selectedLayers[i].outPoint;
            thisPrecompComp = app.project.activeItem.layers.precompose([thisIndex], selectedLayers[i].name, true);
            thisPrecompLayer = app.project.activeItem.layer(thisIndex);
             thisPrecompLayer.inPoint = inPoint;
             thisPrecompLayer.outPoint = outPoint;
            thisPrecompComp.workAreaStart = thisPrecompLayer.inPoint;
            thisPrecompComp.workAreaDuration = outPoint - inPoint;
            thisPrecompComp.openInViewer();
            app.executeCommand(app.findMenuCommandId("Trim Comp to Work Area"));
            app.executeCommand(app.findMenuCommandId("Close"));
            thisPrecompLayer.startTime = inPoint;
            thisPrecompLayer.inPoint = inPoint;
            }
        
        app.endUndoGroup();
    }
