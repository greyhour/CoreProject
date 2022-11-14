var _loginPage = new (require("LoginPage")).LoginPage;


Given("I have opened {arg} and selected database {arg}", function (applicationName, database)
{
    _loginPage.IHaveOpenedP1AndSelectedDatabaseP2(applicationName, database);
});

Given("I enter the username {arg} and the password {arg}", function (username, password)
{
    _loginPage.IEnterTheUsernameP1AndThePasswordP2(username, password);
});

