var _common = new (require("Common")).Common;
var _config = new (require("Config")).Config;

class File {
    ISeeTheP1DialogAndSaveTheFileAsP2(dialogName, fileName) {
        if (dialogName == "{N/A}" || dialogName == "") { return; }
        if (fileName == "{N/A}" || fileName == "") { return; }
        
        var filePath = _config.downloadLocation + fileName;
        
        if (aqFileSystem.Exists(filePath)) {
            aqFileSystem.DeleteFile(filePath);
        }
        
        var objPopup = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild(Array("VisibleOnScreen", "Caption"), Array(true, dialogName), 3);
        var objFileInput = objPopup.FindChild("Name", "Edit(\"File name:\")", 5);

        objFileInput.Keys(filePath);
        

        var objButton = objPopup.FindChild("Caption", "Save", 3);
        objButton.Click();
        
        Log.Checkpoint("Saved file to " + filePath);
    }

    IConfirmTheExcelFileP1MatchesTheOriginalFileP2(newFile, originalFile) {
        var newFilePath = _config.downloadLocation + newFile;
        var originalFilePath = _config.resourceLocation + originalFile;

        let differencesDetected = 0;
        
        let objOriginalFile = getActiveXObject("Excel.Application").Workbooks.Open(originalFilePath).ActiveSheet;
        let objNewFile = getActiveXObject("Excel.Application").Workbooks.Open(newFilePath).ActiveSheet;
        


        var originalCells = Array.from(objOriginalFile.UsedRange).slice();
        var newCells = Array.from(objNewFile.UsedRange).slice();
        
        if(!(originalCells.length == newCells.length)){
            Log.Error("The length of the two files were not the same!");
        }
        
        
        originalCells.forEach((cell, index) => {
            if (!(cell.Text == newCells[index].Text)) {
                objNewFile.Cells.Item(newCells[index].Row, newCells[index].Column).Interior.ColorIndex = 6;
                differencesDetected += 1;
            }
        });
        
        
        // Save & close all excel files without having a save prompt (if there has been changes to the file)
        objNewFile.Save();
        objOriginalFile.Save();

        //-------------------------------------------------------Assertion
        if (differencesDetected > 0) {
            Log.Error("[IMMEDIATE FAIL] : Detected [" + differencesDetected + "] data mismatch(es) between original & generated file. Please check the file contents for highlighted differences in file [" + newFilePath + "].");
        } else {
            Log.Checkpoint("[STEP PASS] : No data mismatches were found between the  original file [" + originalFilePath + "] & the new generated file [" + newFilePath + "].");
        }
    }
}

module.exports = { File: File }