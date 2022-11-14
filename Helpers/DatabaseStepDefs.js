var _database = new (require("Database")).Database;

Given("I restore database {arg} on the server instance {arg} from filepath {arg}", function (database, serverInstance, backupFile)
{
    _database.IRestoreDatabaseP1OnTheServerInstanceP2FromFilepathP3(database, serverInstance, backupFile);
});