class CoreBasePage {
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
        
        if(!exception_name_error.length == 0 || !error_name_error.length == 0 || !exception_winform_error.length == 0 || !error_winform_error.length == 0)
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