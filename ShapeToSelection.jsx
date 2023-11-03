#target "Illustrator"

app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;

var docRef = app.activeDocument;
var layers = docRef.layers;
var numLayers = docRef.layers.length;
var selection = docRef.selection; // Get the selected items

// Use the current fill color
var bgColor = docRef.defaultFillColor;

// Input window
var title = "Add Selection Fill";
var bgLayerName = "Image-Container";

addBg();

function addBg() {
  if (selection.length > 0) {
    var selectedItem = selection[0]; // Assuming you want to use the first selected item
    var selectedBounds = selectedItem.visibleBounds;
    var top = selectedBounds[1];
    var left = selectedBounds[0];
    var width = selectedBounds[2] - selectedBounds[0];
    var height = selectedBounds[1] - selectedBounds[3];

    var existingLayer = findLayerByName(bgLayerName);

    if (existingLayer) {
      // Create a rectangle based on the selection size within the existing layer
      var rect = existingLayer.pathItems.rectangle(top, left, width, height);
      rect.fillColor = bgColor;
    } else {
      var bgLayer = docRef.layers.add();
      bgLayer.name = bgLayerName;

      // Create a rectangle based on the selection size in the new layer
      var rect = bgLayer.pathItems.rectangle(top, left, width, height);
      rect.fillColor = bgColor;
    }

    // Move the new layer to the bottom and lock it
    sortAndLock(bgLayerName);
  } else {
    alert("No selection found. Please select an object before running the script.");
  }
}

function findLayerByName(layerName) {
  for (var i = 0; i < numLayers; i++) {
    var layer = docRef.layers[i];
    if (layer.name === layerName) {
      return layer;
    }
  }
  return null; // Layer not found
}

function sortAndLock(whichLayer) {
  for (var i = 0; i < numLayers; i++) {
    var layer = docRef.layers[i];
    var layerName = layer.name;
    if (layerName.match(whichLayer)) {
      layer.zOrder(ZOrderMethod.BRINGTOFRONT);
      layer.locked = false;
    }
  }
}
