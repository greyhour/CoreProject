var _homePage = new (require("HomePage")).HomePage;


Given("I select tab {arg} and collapse all menu items except {arg}", function (tabCaption, menuItemCaption)
{
    _homePage.ISelectTabP1AndCollapseAllMenuItemsExceptP2(tabCaption, menuItemCaption);
});

Given("I should see menu item {arg} listed only once in the left navigation menu bar for {arg}", function (subMenuItemCaption, menuItemCaption)
{
    _homePage.IShouldSeeMenuItemP1ListedOnlyOnceInTheLeftNavigationMenuBarForP2(menuItemCaption, subMenuItemCaption);
});

Given("I should not see menu item {arg} in the left navigation menu bar for {arg}", function (subMenuItemCaption, menuItemCaption)
{
    _homePage.IShouldNotSeeMenuItemP1InTheLeftNavigationMenuVarForP2(menuItemCaption, subMenuItemCaption);
});

Given("I open {arg} from navbarmenu list {arg} and I will see {arg} window", function (subMenuItemCaption, menuItemCaption, windowCaption)
{
    _homePage.IOpenP1FromNavbarmenuListP2AndIWillSeeP3Window(subMenuItemCaption, menuItemCaption, windowCaption);
});





Given("I have opened tools > settings", function ()
{
    _homePage.IHaveOpenedToolsSettings();
});



// #region here we cater for the reports
Given("I select tab {arg} and scroll the navigation menu to the position {arg}", function (tabCaption, position)
{
    _homePage.ISelectTabP1AndScrollTheNavigationMenuToThePositionP2(tabCaption, position);
});

Given("I should see report menu item {arg} listed only once in the left navigation menu bar for {arg}", function (subMenuItemCaption, menuItemCaption)
{
    _homePage.IShouldSeeReportMenuItemP1ListedOnlyOnceInTheLeftNavigationMenuBarForP2(menuItemCaption, subMenuItemCaption);
});

Given("I open report option {arg} from navbarmenu list {arg} and I will see {arg} window", function (subMenuItemCaption, menuItemCaption, windowCaption)
{
    _homePage.IOpenReportOptionP1FromNavbarmenuListP2AndIWillSeeP3Window(subMenuItemCaption, menuItemCaption, windowCaption);
});
// #endregion