var _inputbox = new (require("Inputbox")).Inputbox;

Given("I enter the value {arg} into the inputbox {arg}", function (value, inputboxName)
{
    _inputbox.IEnterTheValueP1IntoTheInputboxP2(inputboxName, value);
});

Given("I should see the value {arg} in the textbox {arg}", function (value, inputboxName)
{
    _inputbox.IShouldSeeTheValueP1InTheTextboxP2(inputboxName, value);
});