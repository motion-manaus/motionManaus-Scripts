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

function getVisibleBounds(object) {
  var bounds, clippedItem, sandboxItem, sandboxLayer;
  var curItem;
  if (object.typename == "GroupItem") {
      // if the object is clipped
      if (object.clipped) {
          // check all sub objects to find the clipping path
          for (var i = 0; i < object.pageItems.length; i++) {
              curItem = object.pageItems[i];
              if (curItem.clipping) {
                  clippedItem = curItem;
                  break;
              } else if (curItem.typename == "CompoundPathItem") {
                  if (!curItem.pathItems.length) {
                      // catch compound path items with no pathItems via william dowling @ github.com/wdjsdev
                      sandboxLayer = app.activeDocument.layers.add();
                      sandboxItem = curItem.duplicate(sandboxLayer);
                      app.activeDocument.selection = null;
                      sandboxItem.selected = true;
                      app.executeMenuCommand("noCompoundPath");
                      sandboxLayer.hasSelectedArtwork = true;
                      app.executeMenuCommand("group");
                      clippedItem = app.activeDocument.selection[0];
                      break;
                  } else if (curItem.pathItems[0].clipping) {
                      clippedItem = curItem;
                      break;
                  }
              } else {
                  clippedItem = curItem;
                  break;
              }
          }
          bounds = clippedItem.geometricBounds;
          if (sandboxLayer) {
              // eliminate the sandbox layer since it's no longer needed
              sandboxLayer.remove();
              sandboxLayer = undefined;
          }
      } else {
          // if the object is not clipped
          var subObjectBounds;
          var allBoundPoints = [[], [], [], []];
          // get the bounds of every object in the group
          for (var i = 0; i < object.pageItems.length; i++) {
              curItem = object.pageItems[i];
              subObjectBounds = getVisibleBounds(curItem);
              allBoundPoints[0].push(subObjectBounds[0]);
              allBoundPoints[1].push(subObjectBounds[1]);
              allBoundPoints[2].push(subObjectBounds[2]);
              allBoundPoints[3].push(subObjectBounds[3]);
          }
          // determine the groups bounds from it sub object bound points
          bounds = [
              Math.min.apply(Math, allBoundPoints[0]),
              Math.max.apply(Math, allBoundPoints[1]),
              Math.max.apply(Math, allBoundPoints[2]),
              Math.min.apply(Math, allBoundPoints[3]),
          ];
      }
  } else {
      bounds = object.geometricBounds;
  }
  return bounds;
}

function addBg() {
  if (selection.length > 0) {
    for (var s = 0; s < selection.length; s++) {
      var selectedItem = selection[s];
      var selectedBounds = getVisibleBounds(selectedItem);
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
    }
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

