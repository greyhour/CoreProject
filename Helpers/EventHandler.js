// common methods to handle events
var _common = new (require("Common")).Common;

function EventHandling_OnLogError(Sender, LogParams) {
    if (LogParams.MessageText.includes("[IMMEDIATE FAIL]")) {
        TestedApps.TerminateAll();
        Runner.Stop(true);
    } else if (LogParams.MessageText.includes("Missing step definition")) {
        TestedApps.TerminateAll();
        Runner.Stop(true);
    }
}

function EventHandling_OnLogWarning(Sender, LogParams) {
    if (LogParams.MessageText.includes("New instances will not be launched.")) {
        // and now termiante the app
        Sys.Process(Project.Variables.CurrentWorkingApp).Terminate();
        delay(3000);
        
        Log.Warning("The app was already opened, trying to reopen..");
        
        // once its gone, lets reopen it
        _common.OpenApplication(Project.Variables.CurrentWorkingApp);
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