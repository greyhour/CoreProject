var _common = new (require("Common")).Common;


class CoreInputbox {
    GetInputbox(inputboxName) {
        return _common.CurrentForm().FindChild(Array("Visible", "WinFormsControlName"), Array(true, ("*" + inputboxName)), 20);
    }


    IEnterTheValueP1IntoTheInputboxP2(inputboxName, value) {
        if(inputboxName == "{N/A}" || inputboxName == "") { return; }
        value = _common.ReplaceTempVariable(value);
    
        var objInputbox = this.GetInputbox(inputboxName);
        
        objInputbox.Focus();
        objInputbox.Keys("^a" + value);
        
        Log.Checkpoint("Value " + value + " has been entered");
    }

    IShouldSeeTheValueP1InTheTextboxP2(inputboxName, value) {
        if (inputboxName == "{N/A}" || inputboxName == "") { return; }
        value = _common.ReplaceTempVariable(value);
    
        var objInputbox = this.GetInputbox(inputboxName);
        
        objInputbox.Focus();
        if (objInputbox.Value == value || objInputbox.wText == value || objInputbox.Caption == value) {
            Log.Checkpoint("The inputbox was populated with the correct value");
            return;
        }
        
        Log.Error("The inputbox did not contain the correct value");
    }
    
    ISaveTheValueFromTheTextboxP1AsATempVariableP2(inputboxName, variableName) {
        if(inputboxName == "{N/A}" || inputboxName == "") { return; }
        if(variableName == "{N/A}" || variableName == "") { return; }
        
        var objInputbox = this.GetInputbox(inputboxName);
        
        if(objInputbox.Value != "")
            _common.AddTempVariable(variableName, objInputbox.Value);
        else
            _common.AddTempVariable(variableName, objInputbox.wText);
        
        
        Log.Message("Saved the following variable [" + variableName + " : " + _common.GetTempVariable(variableName) + "]");
    }
}


module.exports = { CoreInputbox: CoreInputbox }