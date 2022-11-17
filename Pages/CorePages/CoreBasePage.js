var _common = new (require("Common")).Common;

class CoreBasePage {
    ISeeThePopupMessageP1AndClickTheButtonP2(message, buttonName) {
        if (message == "{N/A}" || message == "") { return; }
        
        var objPopup = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild(Array("VisibleOnScreen", "Name"), Array(true, "Dialog*"), 2);
        var objMessage = objPopup.FindChild(Array("VisibleOnScreen", "Value"), Array(true, message));

        if(!(objMessage.Exists)) {
            objMessage = objPopup.FindChild(Array("VisibleOnScreen", "Caption"), Array(true, message));
            
            if(!(objMessage.Exists)) {
                Log.Error("The message was not found!");
                return;
            }
        }
        
        Log.Checkpoint("The message was found successfully");
        if (buttonName == "{N/A}" || buttonName == "") { return; }

        var objButton = objPopup.FindChild("Caption", buttonName, 3);
        objButton.Click();
    }
    
    ISeeTheP1Window(windowCaption) {
        if (windowCaption == "{N/A}" || windowCaption == "") { return; }

        var objApp = Sys.WaitProcess(Project.Variables.CurrentWorkingApp, 10000);
        var objForm = objApp.FindChildEx(Array("WndCaption", "Visible"), Array(windowCaption, true), 2, true, 60000);

        objForm.SetFocus();
        Project.Variables.CurrentWorkingForm = objForm.WndCaption;
    }

    IShouldNotSeeAnyUnexpectedErrorMessages()
    {
        var exception_name_error = Sys.Process(Project.Variables.CurrentWorkingApp).FindAllChildren("Name", "*Exception*", 2);
        var error_name_error = Sys.Process(Project.Variables.CurrentWorkingApp).FindAllChildren("Name", "*Error*", 2);
        var exception_winform_error = Sys.Process(Project.Variables.CurrentWorkingApp).FindAllChildren("WinFormsControlName", "*Exception*", 2);
        var error_winform_error = Sys.Process(Project.Variables.CurrentWorkingApp).FindAllChildren("WinFormsControlName", "*Error*", 2);
        
        if(!(exception_name_error.length == 0) || !(error_name_error.length == 0) || !(exception_winform_error.length == 0) || !(error_winform_error.length == 0))
        {
            Log.Error("[IMMEDIATE FAIL] : Unexpected error message is present");
        }
    }
    
    ICloseP1App(applicationName) 
    {
        Sys.Process(applicationName).Terminate();
    }
}


// lets make our button class visible
module.exports = { CoreBasePage: CoreBasePage }