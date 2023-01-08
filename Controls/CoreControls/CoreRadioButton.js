var _common = new (require("Common")).Common;

class CoreRadioButton {
    GetRadioButton(radioButtonName) {
        return _common.CurrentForm().FindChild(Array("ObjectType", "Caption"), Array("RadioButton", radioButtonName), 10);
    }

    IClickTheRadioButtonP1(radioButtonName) {
        if(radioButtonName == "{N/A}" || radioButtonName == "") { return; }
        
        var objRadioButton = this.GetRadioButton(radioButtonName);
        objRadioButton.Click();
        
        Log.Checkpoint("Clicked radio button " + radioButtonName + "!");
    }
}


// lets make our radio button class visible
module.exports = { CoreRadioButton: CoreRadioButton }