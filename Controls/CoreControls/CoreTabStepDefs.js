var _tab = new (require("Tab")).Tab;

Given("I click the tab {arg}", function (tabName)
{
    _tab.IClickTheTabP1(tabName);
});

Given("I should see the following tab {arg}", function (tabName)
{
    _tab.IShouldSeeTheFollowingTab(tabName);
});

Given("I should not see the following tab {arg}", function (tabName)
{
    _tab.IShouldNotSeeTheFollowingTab(tabName);
});