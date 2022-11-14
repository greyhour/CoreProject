var _common = new (require("Common")).Common;

class CoreDateEdit {
    IClearOutTheDateFiltersForTheSectionP1(dateSectionName) {
        if(dateSectionName == "{N/A}" || dateSectionName == "") { return; }
    
        var objDateSection = _common.CurrentForm().FindChild("Name", "*(\"" + dateSectionName + "\")", 10);
        var objDateFields = Array.from(objDateSection.FindAllChildren("WinFormsControlName", "dtp*", 5));
        
        objDateFields.forEach(item => {
            item.Keys("^a" + "[Del]");
        });
        
        Log.Checkpoint("All date fields from section cleared");
    }
}


module.exports = { CoreDateEdit: CoreDateEdit }