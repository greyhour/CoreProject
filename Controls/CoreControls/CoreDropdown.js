var _common = new (require("Common")).Common;

class CoreDropdown {
    ISelectTheValueP1FromTheDropdownP2(dropdownName, value) {
        if(dropdownName == "{N/A}" || dropdownName == "") { return; }    
    
        var objDropdown = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + dropdownName), 20);
        
        objDropdown.Focus();
        objDropdown.Keys("^a" + value + "[Enter]");
        
        Log.Checkpoint("Value " + value + " has been selected");
    }
    
    ISelectTheValueP1FromTheMultiselectDropdownP2(dropdownName, value) {
        if(dropdownName == "{N/A}" || dropdownName == "") { return; }    
    
        var objDropdown = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + dropdownName), 20);
        var objInput = objDropdown.FindChild(Array("ObjectType", "Name"), Array("Edit", "*TextBox*"), 4);
        
        objInput.Focus();
        objInput.Keys(value);
        objInput.Keys("[Tab]");
        
        Log.Checkpoint("Value " + value + " has been selected");
    }
}


module.exports = { CoreDropdown: CoreDropdown }