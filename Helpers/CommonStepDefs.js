var _common = new (require("Common")).Common;

Given("I wait for {arg} seconds", function (seconds)
{
    _common.IWaitForP1Seconds(seconds);
});

Given("I press the enter key", function ()
{
    _common.IPressTheEnterKey();
});