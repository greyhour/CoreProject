var _dateEdit = new (require("DateEdit")).DateEdit;

Given("I clear out the date filters for the section {arg}", function (dateSectionName)
{
    _dateEdit.IClearOutTheDateFiltersForTheSectionP1(dateSectionName);
});