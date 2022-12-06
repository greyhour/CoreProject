var _common = new (require("Common")).Common;

class CoreCheckbox {
    IShouldSeeTheFollowingCheckboxesP1(checkboxNames) {
        if(checkboxNames == "{N/A}" || checkboxNames == "") { return; }
  
        var checkboxNames = _common.SplitSimpleArray(checkboxNames);

        checkboxNames.forEach(checkbox => {
            if(!(_common.CurrentForm().FindChild("Caption", checkbox, 10).VisibleOnScreen))
            {
                Log.Error("Could not identify checkbox " + checkbox);
            }
        });
    }

    ISetTheCheckboxP1ToP2(checkboxName, state) {
        if(checkboxName == "{N/A}" || checkboxName == "") { return; }
  
        var objCheckbox = _common.CurrentForm().FindChild(Array("ObjectType", "Caption"), Array("CheckBox", checkboxName), 10);
        
        if(state.toUpperCase() == "CHECKED") {
            if(!(objCheckbox.Checked)) {
                objCheckbox.Click();
                Log.Checkpoint("The checkbox was not checked so was clicked");
                return;
            }
            Log.Checkpoint("The checkbox was already checked so nothing was done");
            return;
        }

        if(state.toUpperCase() == "UNCHECKED") {
            if(objCheckbox.Checked) {
                objCheckbox.Click();
                Log.Checkpoint("The checkbox was checked so was clicked");
                return;
            }
            Log.Checkpoint("The checkbox was not checked so nothing was done");
            return;
        }
        
        Log.Error("[IMMEDIATE FAIL]: The state given was unknown. [CHECKED/UNCHECKED]");
    }
}


module.exports = { CoreCheckbox: CoreCheckbox }