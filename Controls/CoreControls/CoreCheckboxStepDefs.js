var _checkbox = new (require("Checkbox")).Checkbox;

Given("I should see the following checkboxes {arg}", function (checkboxNames)
{
    _checkbox.IShouldSeeTheFollowingCheckboxesP1(checkboxNames);
});

Given("I click the checkbox {arg}", function (checkboxName)
{
    _checkbox.IClickTheCheckboxP1(checkboxName);
});