var _checkbox = new (require("Checkbox")).Checkbox;

Given("I should see the following checkboxes {arg}", function (checkboxNames)
{
    _checkbox.IShouldSeeTheFollowingCheckboxesP1(checkboxNames);
});

Given("I set the checkbox {arg} to {arg}", function (checkboxName, state)
{
    _checkbox.ISetTheCheckboxP1ToP2(checkboxName, state);
});