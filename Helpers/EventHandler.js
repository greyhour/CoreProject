// common methods to handle events
var _common = new (require("Common")).Common;

function EventHandling_OnLogError(Sender, LogParams) {
    if (LogParams.MessageText.includes("[DELAYED FAIL]")) {
        Log.Warning("Continuing after error");
        return;
    }

    TestedApps.TerminateAll();
    Runner.Stop(true);
}

function EventHandling_OnLogWarning(Sender, LogParams) {
    if (LogParams.MessageText.includes("New instances will not be launched.")) {
        // and now termiante the app with admin rights
        Sys.Process(Project.Variables.CurrentWorkingApp).Terminate();
        
        Log.Warning("The app was already opened, trying to reopen..");
        delay(3000);
        
        // once its gone, lets reopen it
        _common.OpenApplication(Project.Variables.CurrentWorkingApp);
    }
    
    if(LogParams.MessageText.includes("The window cannot get focus.")) {
        Log.Warning("The window cannot get focus.");
    }
}

function EventHandling_OnUnexpectedWindow(Sender, Window, LogParams) {
    if (Window.FindChild("Caption", "Original Form Settings Restored", 4).Exists) {
        Log.Message("Form restore found!");
        Window.FindChild("Caption", "&OK").Click;
    } else {
        Log.Error("Unexpected form found!");
    }
}