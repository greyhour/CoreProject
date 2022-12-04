var _database = new (require("Database")).Database;

Given("I restore database {arg} on the server instance {arg} from filepath {arg}", function (database, serverInstance, backupFile)
{
    _database.IRestoreDatabaseP1OnTheServerInstanceP2FromFilepathP3(database, serverInstance, backupFile);
});


Given("Using db {arg} passing parameters {arg} into query {arg} i should see a record count of {arg}", function (database, parameters, queryFile, recordCount)
{
    _database.UsingDbP1PassingParametersP2IntoQueryP3IShouldSeeARecordCountOfP4(database, parameters, queryFile, recordCount);
});
