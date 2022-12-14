var _common = new (require("Common")).Common;

class CoreGrid {
    GetRecord(gridName, record){
        record = _common.ReplaceTempVariable(record);
        return this.GetGrid(gridName).FindChild("Value", "*" + record.slice(1,-1) + "*", 20);
    }
    GetGrid(gridName) {
        return _common.CurrentForm().FindChild("Name", "*(\"" + gridName + "\")", 10);
    }

    OnGridP1ISelectTheCheckboxForTheFollowingRecordInTheListP2(gridName, record) {
        var objRecord = this.GetRecord(gridName, record);
        
        // testcomplete findchild goes back to front, finding the last object first
        var objCheckboxes = Array.from(objRecord.FindAllChildren(Array("ObjectType", "Value"), Array("Cell", "Unchecked"), 3));
        objCheckboxes[objCheckboxes.length - 1].Click();
    }

    OnGridP1IEnterTheValueP2IntoFilterColumnP3(gridName, filterColumn, value) {
        var objGrid = this.GetGrid(gridName);
        var objFilterCell = objGrid.FindChild(Array("ObjectType", "Caption"), Array("Cell", (filterColumn + " filter row")), 5);
        
        value = _common.ReplaceTempVariable(value);
        objFilterCell.Click();
        objFilterCell.Keys("^a" + value);
    }

    OnGridP1ISelectTheFollowingRecordInTheListP2(gridName, record) {
        var objRecord = this.GetRecord(gridName, record);

        objRecord.Click();
    }

    OnGridP1IOpenTheFollowingRecordInTheListP2(gridName, record) {
        var objRecord = this.GetRecord(gridName, record);

        objRecord.DblClick();
    }

    OnGridP1IShouldSeeTheFollowingRecordInTheListP2(gridName, record) {
        var objRecord = this.GetRecord(gridName, record);

        if (!(objRecord.Exists)) {
            Log.Error("The record was not found succesfully");
            return;
        }
        Log.Checkpoint("The record was found successfully");
    }

    OnGridP1IShouldNotSeeTheFollowingRecordInTheListP2(gridName, record) {
        var objRecord = this.GetRecord(gridName, record);

        if (objRecord.Exists) {
            Log.Error("The record was found when it should not have been visible");
            return;
        }
        Log.Checkpoint("The record was not found");
    }

    OnGridP1IShouldSeeP2RecordsInTheList(gridName, recordCount) {
        var objGrid = this.GetGrid(gridName);
        var objDataPanel = objGrid.FindChild("Name", "*Data*Panel*", 5);

        if(!(objDataPanel.ChildCount == recordCount)) {
            Log.Error("There was a wrong amount of records found: " + objDataPanel.ChildCount);
            return;
        }

        Log.Checkpoint("The correct amount of records were found");
    }
    
    OnGridP1IEnterTheValueP2IntoColumnP3ForTheRecordP4(gridName, record, columnName, value) {
        var objRecord = this.GetRecord(gridName, record);
        var objCell = objRecord.FindChild(Array("ObjectType", "Caption"), Array("Cell", (columnName + " row *")), 5);

        objCell.Click();
        objCell.Keys("^a" + value);
    }
    
    OnGridP1IRightClickTheHeaderAndSelectMenuItemP2(gridName, menuItem) {
        var objGrid = this.GetGrid(gridName);
        var objHeader = objGrid.FindChild(Array("ObjectIdentifier"), Array("Header Panel"), 5);
        
        objHeader.ClickR(20, 5);
        delay(500);
        
        var objMenu = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild(Array("Visible", "Name"), Array(true, "*Popup*"), 3);
        var objMenuButton = objMenu.FindChild("Caption", menuItem);
        objMenuButton.Click();
    }
    
    OnGridP1IRightClickOnTheRecordP2AndSelectMenuItemP3(gridName, record, menuItem) {
        var objRecord = this.GetRecord(gridName, record);
        
        objRecord.ClickR(20, 5);
        delay(500);
        
        var objMenu = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild(Array("Visible", "Name"), Array(true, "*PopupMenuBarControl*"), 3);
        var objMenuButton = objMenu.FindChild("Caption", menuItem);
        objMenuButton.Click();
    }
    
    OnGridP1ISeeTheValueP2ForTheCellP3(gridName, value, cell) {
        var objGrid = this.GetGrid(gridName);
        
        var objCell = objGrid.FindChild(Array("Visible", "ObjectType", "Caption"), Array(true, "Cell", cell), 5);
        if (!(objCell.Value == value)){
            Log.Error("The value " + value + " and the cell value " + objCell.Value + " did not match");
            return;
        }
    }
    
    OnGridP1IEnterTheValueP3ForTheCellP3(gridName, value, cell) {
        var objGrid = this.GetGrid(gridName);
        var objCell = objGrid.FindChild(Array("Visible", "ObjectType", "Caption"), Array(true, "Cell", cell), 5);
        
        objCell.Click();
        objCell.Keys("^a" + value);
    }
    
    OnGridP1ISetTheCheckboxCellP2ToP3(gridName, cell, state) {
        var objGrid = this.GetGrid(gridName);
        var objCell = objGrid.FindChild(Array("Visible", "ObjectType", "Caption"), Array(true, "Cell", cell), 5);
        
        if(state.toUpperCase() == "CHECKED") {
            if(!(objCell.Value == state.toUpperCase())) {
                objCell.Click();
                if(!(objCell.Value == state.toUpperCase()))
                    objCell.Click();
                Log.Checkpoint("The checkbox was not checked so was clicked");
                return;
            }
            Log.Checkpoint("The checkbox was already checked so nothing was done");
            return;
        }

        if(state.toUpperCase() == "UNCHECKED") {
            if(objCell.Value == state.toUpperCase()) {
                objCell.Click();
                if(!(objCell.Value == state.toUpperCase()))
                    objCell.Click();
                Log.Checkpoint("The checkbox was checked so was clicked");
                return;
            }
            Log.Checkpoint("The checkbox was not checked so nothing was done");
            return;
        }
        
        Log.Error("[IMMEDIATE FAIL]: The state given was unknown. [CHECKED/UNCHECKED]");
    }
    
    OnGridP1IShouldSeeTheTotalOfP2(gridName, total) {
        var objGrid = this.GetGrid(gridName);
        var objCellTotal = objGrid.FindChild(Array("Visible", "Name", "Value"), Array(true, "Cell(\"Total\")", total), 5);
        
        if(!(objCellTotal.Exists)){
            Log.Error("The total " + total + " was not found correctly");
            return;
        }
        
        Log.Checkpoint("The total was found & is correct");
    }
}


module.exports = { CoreGrid: CoreGrid }