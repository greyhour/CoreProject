﻿var _common = new (require("Common")).Common;

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
}


module.exports = { CoreGrid: CoreGrid }