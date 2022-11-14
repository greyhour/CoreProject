var _button = new (require("Button")).Button


Given("I click the button {arg}", function (buttonName)
{
    _button.IClickTheButtonP1(buttonName);
});

Given("On {arg} i click the button {arg}", function (objectName, buttonName)
{
    _button.OnP1IClickTheButtonP2(objectName, buttonName);
});


Given("I double click the button {arg}", function (buttonName)
{
    _button.IDoubleClickTheButtonP1(buttonName);
});