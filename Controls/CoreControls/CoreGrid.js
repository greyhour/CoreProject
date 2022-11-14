var _common = new (require("Common")).Common;

class CoreGrid {
    GetRecord(gridName, record){
        return this.GetGrid(gridName).FindChild("Value", "*" + record.slice(1,-1) + "*", 20);
    }
    GetGrid(gridName) {
        return _common.CurrentForm().FindChild("Name", "*(\"" + gridName + "\")", 10);
    }

    OnGridP1ISelectTheCheckboxForTheFollowingRecordInTheListP2(gridName, record) {
        var objRecord = this.GetRecord(gridName, record);
        
        objRecord.FindChild(Array("ObjectType", "Value"), Array("Cell", "Unchecked"), 3).Click();
    }

    OnGridP1IEnterTheValueP2IntoFilterColumnP3(gridName, filterColumn, value) {
        var objGrid = this.GetGrid(gridName);
        var objFilterCell = objGrid.FindChild(Array("ObjectType", "Caption"), Array("Cell", (filterColumn + " filter row")), 5);

        objFilterCell.Click();
        objFilterCell.Keys(value);
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

        if (!objRecord.Exists) {
            Log.Error("The record was not found succesfully");
            return;
        }
        Log.Checkpoint("The record was found successfully");
    }
}


module.exports = { CoreGrid: CoreGrid }