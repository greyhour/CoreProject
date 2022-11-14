var _common = new (require("Common")).Common;

class CoreGrid {
    OnP1ISelectTheCheckboxForTheFollowingRecordInTheListP2(gridName, record) {
        var objGrid = _common.CurrentForm().FindChild("Name", "*(\"" + gridName + "\")", 10);
        var objRecord = objGrid.FindChild("Value", "*" + record.slice(1,-1) + "*", 20);
        
        objRecord.FindChild(Array("ObjectType", "Value"), Array("Cell", "Unchecked"), 3).Click();
    }
}


module.exports = { CoreGrid: CoreGrid }