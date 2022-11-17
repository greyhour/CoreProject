var _common = new (require("Common")).Common;

class CoreInputbox {
    IEnterTheValueP1IntoTheInputboxP2(inputboxName, value) {
        if(inputboxName == "{N/A}" || inputboxName == "") { return; }
    
        var objInputbox = _common.CurrentForm().FindChild(Array("Visible", "WinFormsControlName"), Array(true, ("*" + inputboxName)), 20);
        
        objInputbox.Focus();
        objInputbox.Keys("^a" + value);
        
        Log.Checkpoint("Value " + value + " has been entered");
    }

    IShouldSeeTheValueP1InTheTextboxP2(inputboxName, value) {
        if(inputboxName == "{N/A}" || inputboxName == "") { return; }
    
        var objInputbox = _common.CurrentForm().FindChild("WinFormsControlName", ("*" + inputboxName), 20);
        
        objInputbox.Focus();
        if (objInputbox.Value == value || objInputbox.wText == value || objInputbox.Caption == value) {
            Log.Checkpoint("The inputbox was populated with the correct value");
            return;
        }
        
        Log.Error("The inputbox did not contain the correct value");
    }
}


module.exports = { CoreInputbox: CoreInputbox }