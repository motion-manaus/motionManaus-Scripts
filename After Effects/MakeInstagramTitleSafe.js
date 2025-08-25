{
    // 9x16 Instagram Title Safe Area Script
    // Creates or imports a title safe area composition for Instagram stories/reels
    
    function createTitleSafeAreaScript() {
        app.beginUndoGroup("Create 9x16 IG Title Safe Area");
        
        var compName = "9x16-IG-Title Safe Area";
        var compWidth = 1080;
        var compHeight = 1920;
        var compDuration = 60; // 60 seconds
        var compFrameRate = 30;
        
        // Check if we already have this composition
        var titleSafeComp = findComposition(compName);
        var activeComp = app.project.activeItem;
        
        // Step 3: If active comp is the title safe area comp, show message and stop
        if (activeComp && activeComp.name === compName) {
            alert("Title Safe Area created. Select another composition and run the script again to import the Title Safe Area as a guide layer.");
            app.endUndoGroup();
            return;
        }
        
        // Step 1: Create composition if it doesn't exist
        if (!titleSafeComp) {
            titleSafeComp = app.project.items.addComp(compName, compWidth, compHeight, 1, compDuration, compFrameRate);
            
            // Step 2: Create the 6 solid layers with proper setup
            createTitleSafeAreas(titleSafeComp);
            
            alert("Title Safe Area composition created successfully!");
        }
        
        // Step 3: If we have an active composition (and it's not the title safe comp), add the title safe area as guide
        if (activeComp && activeComp instanceof CompItem && activeComp.name !== compName) {
            // Add the title safe area composition to the active comp
            var guideLayer = activeComp.layers.add(titleSafeComp, compDuration);
            guideLayer.moveToBeginning(); // Move to index 1
            guideLayer.guideLayer = true; // Set as guide layer
            guideLayer.name = "IG-Title Safe Area Guide";
            
            alert("Title Safe Area added as guide layer to '" + activeComp.name + "'");
        } else if (!activeComp) {
            alert("Title Safe Area composition is ready. Select a composition and run the script again to add it as a guide layer.");
        }
        
        app.endUndoGroup();
    }
    
    function findComposition(name) {
        for (var i = 1; i <= app.project.numItems; i++) {
            var item = app.project.item(i);
            if (item instanceof CompItem && item.name === name) {
                return item;
            }
        }
        return null;
    }
    
    function createTitleSafeAreas(comp) {
        // Define the safe areas with correct colors and scales
        var areas = [
            {
                name: "Reels-Bottom-Right",
                color: [1, 0, 0.635], // rgb01(1, 0, 0.635) - Magenta/Pink
                position: [966.6, 1536], // Bottom right area
                scale: [21.0, 40.0],
                visible: false // Hidden by default
            },
            {
                name: "Reels-Bottom-2",
                color: [0, 1, 0.894], // rgb01(0, 1, 0.894) - Cyan
                position: [540, 1584], // Bottom center area
                scale: [100.0, 35.0],
                visible: false // Hidden by default
            },
            {
                name: "Stories-Bottom",
                color: [0.91, 1, 0.149], // rgb01(0.91, 1, 0.149) - Yellow-Green
                position: [540, 1728], // Bottom area for stories
                scale: [100.0, 20.0],
                visible: true
            },
            {
                name: "Right",
                color: [0.58, 0.376, 0.988], // rgb01(0.58, 0.376, 0.988) - Purple
                position: [1047.6, 960], // Right side
                scale: [6.0, 100.0],
                visible: true
            },
            {
                name: "Left",
                color: [0.58, 0.376, 0.988], // rgb01(0.58, 0.376, 0.988) - Purple
                position: [32.4, 960], // Left side
                scale: [6.0, 100.0],
                visible: true
            },
            {
                name: "Top",
                color: [0.91, 1, 0.149], // rgb01(0.91, 1, 0.149) - Yellow-Green
                position: [540, 134.4], // Top area
                scale: [100.0, 14.0],
                visible: true
            }
        ];
        
        // Create each safe area
        for (var i = 0; i < areas.length; i++) {
            var area = areas[i];
            
            // Create solid layer with full comp dimensions (1080x1920)
            var solid = comp.layers.addSolid(area.color, area.name, 1080, 1920, 1);
            
            // Set position and anchor point
            solid.transform.position.setValue(area.position);
            solid.transform.anchorPoint.setValue([540, 960]); // Center of 1080x1920
            
            // Set scale percentage
            solid.transform.scale.setValue(area.scale);
            
            // Add Fill effect and set color
            var fillEffect = solid.Effects.addProperty("ADBE Fill");
            fillEffect.name = "Fill";
            fillEffect.property("Color").setValue(area.color);
            
            // Set opacity to 50% and normal blend mode
            solid.transform.opacity.setValue(50);
            solid.blendingMode = BlendingMode.NORMAL;
            
            // Set visibility
            solid.enabled = area.visible;
        }
        
        // Lock all layers to prevent accidental changes
        for (var j = 1; j <= comp.numLayers; j++) {
            comp.layer(j).locked = false;
        }
    }
    
    // Check if After Effects is available
    if (typeof app === "undefined") {
        alert("This script must be run in Adobe After Effects.");
    } else {
        // Run the script
        createTitleSafeAreaScript();
    }
}
