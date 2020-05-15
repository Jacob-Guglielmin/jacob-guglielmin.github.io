var 
saveVar = {},
loadVar = {},
compressed = "",
decompressed = ""

/**
 * Compresses the current save and saves it to localStorage or the export text box
 * 
 * @param saveType how to save the game
 */
function save(saveType) {
    saveVar = {
    }

    decompressed = JSON.stringify(saveVar);
    compressed = LZString.compressToBase64(decompressed);

    if (saveType == "localStorage") {
        try {
            localStorage.setItem("clonesSave", compressed);
        } catch (e) {}
    } else if (saveType == "export") {
        document.getElementById("exportBox").value = compressed;
        setTimeout(() => {
            document.getElementById("exportBox").focus();
            document.getElementById("exportBox").select();
        }, 0);
    }
}

/**
 * Loads a save from localStorage or the import text box
 * 
 * @param loadType what to load the game from
 */
function load(loadType) {
    if (loadType == "localStorage") {
        try {
            compressed = localStorage.getItem("clonesSave");
        } catch (e) {}
    } else if (loadType == "import") {
        compressed = document.getElementById("importBox").value;
    }
    try {
        decompressed = LZString.decompressFromBase64(compressed);
        loadVar = JSON.parse(decompressed);
    } catch (e) {}
    if (loadVar) {
    }
}