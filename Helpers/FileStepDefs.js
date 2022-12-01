var _file = new (require("File")).File;

Given("I see the {arg} dialog and save the file as {arg}", function (dialogName, fileName)
{
    _file.ISeeTheP1DialogAndSaveTheFileAsP2(dialogName, fileName);
});


Given("I confirm the excel file {arg} matches the original file {arg}", function (newFile, originalFile)
{
    _file.IConfirmTheExcelFileP1MatchesTheOriginalFileP2(newFile, originalFile);
});