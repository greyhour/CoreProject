var _common = new (require("Common")).Common;

class CoreTab {
    IClickTheTabP1(tabName) {
        var objTab = _common.CurrentForm().FindChild("Caption", tabName, 15);

        objTab.Click();
    }

    IShouldSeeTheFollowingTab(tabName) {
        var objTab = _common.CurrentForm().FindChild("Caption", tabName, 15);

        if (objTab.Exists && objTab.Visible) {
            Log.CheckPoint("The tab was found");
            return;
        }

        Log.Error("The tab was not found!");
    }

    IShouldNotSeeTheFollowingTab(tabName){
        var objTab = _common.CurrentForm().FindChild("Caption", tabName, 15);

        if (!objTab.Exists) {
            Log.CheckPoint("The tab was not found");
            return;
        }
        else if (!objTab.Visible) {
            Log.CheckPoint("The tab was not found");
            return;
        }

        Log.Error("The tab was found!");
    }
}


module.exports = { CoreTab: CoreTab }