var _dropdown = new (require("Dropdown")).Dropdown;

Given("I select the value {arg} from the dropdown {arg}", function (value, dropdownName)
{
    _dropdown.ISelectTheValueP1FromTheDropdownP2(dropdownName, value);
});

Given("I select the value {arg} from the multiselect dropdown {arg}", function (value, dropdownName)
{
    _dropdown.ISelectTheValueP1FromTheMultiselectDropdownP2(dropdownName, value);
});

