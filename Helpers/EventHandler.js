// common methods to handle events
var _common = new (require("Common")).Common;

function EventHandling_OnLogError(Sender, LogParams) {
    if (LogParams.MessageText.includes("[IMMEDIATE FAIL]")) {
        TestedApps.TerminateAll
        Runner.Stop(true)
    } else if (LogParams.MessageText.includes("Missing step definition")) {
        TestedApps.TerminateAll
        Runner.Stop(true)
    } else {
        // This is standard [STEP FAIL] which can still continue with test execution
    }
}

function EventHandling_OnLogWarning(Sender, LogParams) {
    if (LogParams.MessageText.includes("New instances will not be launched.")) {
        Sys.Process(Project.Variables.CurrentWorkingApp).Terminate();
        Log.Warning("The app was already opened, This could be because of previous fails. It will be reopened and the test-run will continue, but please check logs");
        _common.OpenApplication(Project.Variables.CurrentWorkingApp);
    } else {
        // This is standard [STEP INFO] which can still continue with test execution
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