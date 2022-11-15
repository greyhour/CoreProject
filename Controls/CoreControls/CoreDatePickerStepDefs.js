var _datePicker = new (require("DatePicker")).DatePicker;

Given("I clear out the date filters for the section {arg}", function (dateSectionName)
{
    _datePicker.IClearOutTheDateFiltersForTheSectionP1(dateSectionName);
});

Given("I should see the value {arg} in the datepicker {arg}", function (value, datePickerName)
{
    _datePicker.IShouldSeeTheValueP1InTheDatePickerP2(datePickerName, value);
});