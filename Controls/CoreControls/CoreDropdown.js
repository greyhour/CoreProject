var _common = new (require("Common")).Common;

class CoreDropdown {
    ISelectTheValueP1FromTheDropdownP2(dropdownName, value) {
        if(dropdownName == "{N/A}" || dropdownName == "") { return; }
        value = _common.ReplaceTempVariable(value);
    
        var objDropdown = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + dropdownName), 20);
        
        objDropdown.Focus();
        objDropdown.Keys("^a" + value + "[Enter]");
        
        Log.Checkpoint("Value " + value + " has been selected");
    }
    
    ISelectTheValueP1FromTheDropdownP2WithoutPressingEnter(dropdownName, value) {
        if(dropdownName == "{N/A}" || dropdownName == "") { return; }
        value = _common.ReplaceTempVariable(value);
    
        var objDropdown = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + dropdownName), 20);
        
        objDropdown.Focus();
        objDropdown.Keys("^a" + value);
        delay(500);
        
        
        if(!(Sys.Process(Project.Variables.CurrentWorkingApp).FindChild(Array("Visible", "Name"), Array(true, "*PopupLookUpEditForm*"), 2).Exists)){
            objDropdown.Click();
            delay(500);
        }
            
        
        var objList = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild(Array("Visible", "Name"), Array(true, "*PopupLookUpEditForm*"), 2);
        objList.FindChild("Value", value, 4).Click();
        
        Log.Checkpoint("Value " + value + " has been selected");
    }

    IShouldSeeTheValueP1SelectedInTheDropdownP2(dropdownName, value) {
        if(dropdownName == "{N/A}" || dropdownName == "") { return; } 
        value = _common.ReplaceTempVariable(value);   
    
        var objDropdown = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + dropdownName), 20);

        if(!(objDropdown.Exists)){
            Log.Error("The dropdown did not exist");
            return;
        }
        Log.Checkpoint("The dropdown was found");

        if(!(objDropdown.Value == value)){
            Log.Error("The dropdown did not contain the correct value");
        }
        Log.Checkpoint("The value was found in the dropdown");
    }
    
    ISelectTheValueP1FromTheMultiselectDropdownP2(dropdownName, value) {
        if(dropdownName == "{N/A}" || dropdownName == "") { return; }
        value = _common.ReplaceTempVariable(value);
    
        var objDropdown = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + dropdownName), 20);
        var objInput = objDropdown.FindChild(Array("ObjectType", "Name"), Array("Edit", "*TextBox*"), 4);
        
        objInput.Focus();
        objInput.Keys(value);
        objInput.Keys("[Tab]");
        
        Log.Checkpoint("Value " + value + " has been selected");
    }

    IShouldSeeTheValueP1SelectedInTheMultiselectDropdownP2(dropdownName, value) {
        if(dropdownName == "{N/A}" || dropdownName == "") { return; }
        value = _common.ReplaceTempVariable(value);
    
        var objDropdown = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + dropdownName), 20);
        var objInnerContent = objDropdown.FindChild("Value", value, 2);

        if(!(objDropdown.Exists)){
            Log.Error("The dropdown did not exist");
            return;
        }
        Log.Checkpoint("The dropdown was found");

        if(!(objInnerContent.Exists)){
            Log.Error("The dropdown did not contain the correct value");
        }
        Log.Checkpoint("The value was found in the dropdown");
    }

    
}


module.exports = { CoreDropdown: CoreDropdown }