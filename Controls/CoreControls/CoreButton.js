var _common = new (require("Common")).Common;

class CoreButton {
    GetButton(buttonName) {
        return _common.CurrentForm().FindChild("Caption", buttonName, 10);
    }

    IClickTheButtonP1(buttonName) {
        if(buttonName == "{N/A}" || buttonName == "") { return; }
        
        var objButton = this.GetButton(buttonName);
        objButton.Click();
        
        Log.Checkpoint("Clicked normal button " + buttonName + "!");
    }

    IDoubleClickTheButtonP1(buttonName) {
        if(buttonName == "{N/A}" || buttonName == "") { return; }
        
        var objButton = this.GetButton(buttonName);
        objButton.DblClick();
        
        Log.Checkpoint("Doubleclicked normal button " + buttonName + "!");
    }
    
    OnP1IClickTheButtonP2(objectName, buttonName) {
        if(objectName == "{N/A}" || objectName == "") { return; }
        if(buttonName == "{N/A}" || buttonName == "") { return; }
                
        var objBase = _common.CurrentForm().FindChild("Name", "*(\"" + objectName + "\")", 10);
        var objButton = objBase.FindChild("Caption", buttonName, 10);
        objButton.Click();
        
        Log.Checkpoint("Clicked normal button " + buttonName + "!");
    }
}


// lets make our button class visible
module.exports = { CoreButton: CoreButton }