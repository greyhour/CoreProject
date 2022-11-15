var _common = new (require("Common")).Common;

class CoreDatePicker {
    IClearOutTheDateFiltersForTheSectionP1(dateSectionName) {
        if(dateSectionName == "{N/A}" || dateSectionName == "") { return; }
    
        var objDateSection = _common.CurrentForm().FindChild("Name", "*(\"" + dateSectionName + "\")", 10);
        var objDateFields = Array.from(objDateSection.FindAllChildren("WinFormsControlName", "dtp*", 5));
        
        objDateFields.forEach(item => {
            item.Keys("^a" + "[Del]");
        });
        
        Log.Checkpoint("All date fields from section cleared");
    }

    IShouldSeeTheValueP1InTheDatePickerP2(datePickerName, value) {
        if(datePickerName == "{N/A}" || datePickerName == "") { return; }
    
        var objDatePicker = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + datePickerName), 20);
        
        objDatePicker.Focus();
        if (aqConvert.DateTimeToStr(objDatePicker.wDate) == value) {
            Log.Checkpoint("The datepicker was populated with the correct value");
            return;
        }
        
        Log.Error("The datepicker did not contain the correct value");
    }
}


module.exports = { CoreDatePicker: CoreDatePicker }