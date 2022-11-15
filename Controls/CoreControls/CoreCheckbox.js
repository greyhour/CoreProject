var _common = new (require("Common")).Common;

class CoreCheckbox {
    IShouldSeeTheFollowingCheckboxesP1(checkboxNames) {
        if(checkboxNames == "{N/A}" || checkboxNames == "") { return; }
  
        var checkboxNames = _common.SplitSimpleArray(checkboxNames);

        checkboxNames.forEach(checkbox => {
            if(!_common.CurrentForm().FindChild("Caption", checkbox, 10).VisibleOnScreen)
            {
                Log.Error("Could not identify checkbox " + checkbox);
            }
        });
    }

    IClickTheCheckboxP1(checkboxName) {
        if(checkboxName == "{N/A}" || checkboxName == "") { return; }
  
        var objCheckbox = _common.CurrentForm().FindChild(Array("ObjectType", "Caption"), Array("CheckBox", checkboxName), 10);
        objCheckbox.Click();

        Log.Checkpoint("Checkbox was clicked");
    }
}


module.exports = { CoreCheckbox: CoreCheckbox }