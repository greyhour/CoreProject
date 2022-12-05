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

    IConfirmTheExcelFileP1MatchesTheOriginalFileP2(newFileName, originalFileName) {
        var newFilePath = _config.downloadLocation + newFileName;
        var originalFilePath = _config.resourceLocation + originalFileName;
        
        var newFile = Excel.Open(newFilePath).ActiveSheet;
        var originalFile = Excel.Open(originalFilePath).ActiveSheet;
        
        if(originalFile.ColumnCount != newFile.ColumnCount)
            Log.Error("Wrong amount of columns!");
            
        if(originalFile.RowCount != newFile.RowCount)
            Log.Error("Wrong amount of rows!");
        
        
        var badCells = [];
            
        for (let r = 1; r <= originalFile.RowCount; r++) {
            for (let c = 1; c <= originalFile.ColumnCount; c++) {
                if(originalFile.Cell(c, r).Value != newFile.Cell(c, r).Value)
                    badCells.push({c, r});
            }
        }
            
        if(badCells.length > 0) {
            let xl = getActiveXObject("Excel.Application");
            let newWorksheet = xl.Workbooks.Open(newFilePath);
            xl.DisplayAlerts = false;
            xl.Visible = true;
            badCells.forEach(cell => newWorksheet.ActiveSheet.Cells.Item(cell['r'], cell['c']).Interior.ColorIndex = 6);
            newWorksheet.Save();
            xl.Quit();
            badCells.forEach(cell => Log.Message("The cell [column: " + cell['c'] + " | row: " + cell['r'] + "] did not match!"));
            Log.Error("The two excel files are not the same! -see downloaded file for more info");
        }
        
        Log.Checkpoint("The two files were identical");
    }
}

module.exports = { File: File }