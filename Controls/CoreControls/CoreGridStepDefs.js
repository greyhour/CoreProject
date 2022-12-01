var _grid = new (require("Grid")).Grid;

Given("On grid {arg} i select the checkbox for the following record in the list {arg}", function (gridName, record)
{
    _grid.OnGridP1ISelectTheCheckboxForTheFollowingRecordInTheListP2(gridName, record);
});

Given("On grid {arg} i enter the value {arg} into filter column {arg}", function (gridName, value, filterColumn)
{
    _grid.OnGridP1IEnterTheValueP2IntoFilterColumnP3(gridName, filterColumn, value);
});

Given("On grid {arg} i select the following record in the list {arg}", function (gridName, record)
{
    _grid.OnGridP1ISelectTheFollowingRecordInTheListP2(gridName, record);
});

Given("On grid {arg} i open the following record in the list {arg}", function (gridName, record)
{
    _grid.OnGridP1IOpenTheFollowingRecordInTheListP2(gridName, record);
});

Given("On grid {arg} i should see the following record in the list {arg}", function (gridName, record)
{
    _grid.OnGridP1IShouldSeeTheFollowingRecordInTheListP2(gridName, record);
});

Given("On grid {arg} i should not see the following record in the list {arg}", function (gridName, record)
{
    _grid.OnGridP1IShouldNotSeeTheFollowingRecordInTheListP2(gridName, record);
});

Given("On grid {arg} i should see {arg} records in the list", function (gridName, recordCount)
{
    _grid.OnGridP1IShouldSeeP2RecordsInTheList(gridName, recordCount);
});

Given("On grid {arg} i enter the value {arg} into column {arg} for the record {arg}", function (gridName, value, columnName, record)
{
    _grid.OnGridP1IEnterTheValueP2IntoColumnP3ForTheRecordP4(gridName, record, columnName, value);
});