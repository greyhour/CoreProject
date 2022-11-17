var _common = new (require("Common")).Common;

class CoreSettingsPage {
    OnSettingsISelectSectionP1AndTabP2(sectionName, tabName) {
        var objSection = _common.CurrentForm().FindChild(Array("ObjectType", "Caption"), Array("PageTab", sectionName), 3);
        objSection.Click();

        var objTab = _common.CurrentForm().FindChild(Array("ObjectType", "Caption"), Array("PageTab", tabName), 6);
        objTab.Click();
    }
}


// lets make our button class visible
module.exports = { CoreSettingsPage: CoreSettingsPage }