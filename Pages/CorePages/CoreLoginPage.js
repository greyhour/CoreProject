var _common = new (require("Common")).Common;

class CoreLoginPage {
    IHaveOpenedP1AndSelectedDatabaseP2(applicationName, databaseName)
    {
        Project.Variables.CurrentWorkingApp = applicationName;
        _common.OpenApplication(Project.Variables.CurrentWorkingApp);
        
        Sys.Process(Project.Variables.CurrentWorkingApp).FindChildEx("WinFormsControlName", "ListBoxDataSource", 5, true, 20000).ClickItem(databaseName);
        Sys.Process(Project.Variables.CurrentWorkingApp).FindChildEx("WndCaption", "OK", 5, true, 20000).Click();

        Log.Checkpoint("[STEP PASS] : Successfully opened [ " + applicationName + " ] connected to database [ " + databaseName + " ]")
    }
    
    IEnterTheUsernameP1AndThePasswordP2(username, password){
        // lets login
        var objLoginForm = Sys.Process(Project.Variables.CurrentWorkingApp).FindChildEx("WinFormsControlName", "UserLoginDialog", 5, true, 60000)
  
        objLoginForm.FindChildEx("WinFormsControlName", "txtUserName",5, true, 20000).SetText(username)
        objLoginForm.FindChildEx("WinFormsControlName", "txtPassword", 5, true, 20000).SetText(password)

        ImageRepository.LoginScreen.LoginButton.Click()
    }
}


// lets make our button class visible
module.exports = { CoreLoginPage: CoreLoginPage }