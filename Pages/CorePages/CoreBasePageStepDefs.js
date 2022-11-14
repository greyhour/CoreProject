var _basePage = new (require("BasePage")).BasePage;

Given("I see the popup message {arg} and click the button {arg}", function (message, buttonName)
{
    _basePage.ISeeThePopupMessageP1AndClickTheButtonP2(message, buttonName);
});

Given("I see the {arg} window", function (windowCaption)
{
    _basePage.ISeeTheP1Window(windowCaption);
});

Given("I should not see any unexpected error messages", function ()
{
    _basePage.IShouldNotSeeAnyUnexpectedErrorMessages();
});

Given("I close {arg} app", function (applicationName)
{
    _basePage.ICloseP1App(applicationName);
});