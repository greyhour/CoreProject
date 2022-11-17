var _dropdown = new (require("Dropdown")).Dropdown;

Given("I select the value {arg} from the dropdown {arg}", function (value, dropdownName)
{
    _dropdown.ISelectTheValueP1FromTheDropdownP2(dropdownName, value);
});

Given("I should see the value {arg} selected in the dropdown {arg}", function (value, dropdownName)
{
    _dropdown.IShouldSeeTheValueP1SelectedInTheDropdownP2(dropdownName, value);
});

Given("I select the value {arg} from the multiselect dropdown {arg}", function (value, dropdownName)
{
    _dropdown.ISelectTheValueP1FromTheMultiselectDropdownP2(dropdownName, value);
});

Given("I should see the value {arg} selected in the multiselect dropdown {arg}", function (value, dropdownName)
{
    _dropdown.IShouldSeeTheValueP1SelectedInTheMultiselectDropdownP2(dropdownName, value);
});