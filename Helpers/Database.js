// database methods
var _config = new (require("Config")).Config;
    
class Database {
    IRestoreDatabaseP1OnTheServerInstanceP2FromFilepathP3(database, serverInstance, backupFile) {
        var command = Utilities.GetCurrentDir() + "\\Script\\CoreProject\\Helpers\\Powershell\\Restore-SQLDatabaseComplex.ps1";
        var variables = "-SQLInstance '" + serverInstance + "' -SQLDatabase '" + database + "' -SQLBackupFile '" + backupFile + "' -SQLUser '" + _config.sqlUsername + "' -SQLPassword '" + _config.sqlPassword + "'";
        
        var oShell = getActiveXObject("WScript.Shell"); // Or oShell = WshShell
        var oExec = oShell.Exec("powershell -command " + command + " " + variables);
        oExec.StdIn.Close(); // Close standard input before reading output

        // Get PowerShell output
        var strOutput = oExec.StdOut.ReadAll();
        strOutput = aqString.Trim(strOutput, aqString.stAll);

        // Post PowerShell output to the test log line by line
        aqString.ListSeparator = "\r\n";
        for (var i = 0; i < aqString.GetListLength(strOutput); i++) {
            Log.Message(aqString.GetListItem(strOutput, i));
        }
    }
    
    UsingDbP1PassingParametersP2IntoQueryP3IShouldSeeARecordCountOfP4(database, parameters, queryFile, recordCount) {
        var connectionString = "Provider=SQLNCLI11;Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=" + database + ";Data Source=RSLNUC177\\SQL2017";
        var queryFilePath =  _config.resourceLocation + "\\SqlQuery\\" + queryFile;
          

        var query = aqFile.ReadWholeTextFile(queryFilePath, aqFile.ctANSI);
        query = parameters + " " + query;

        var sql = ADO.CreateADOQuery();
        sql.ConnectionString = connectionString;
        sql.SQL = query;
        sql.Open();
        sql.First();
          
        if (!(sql.State == 1)) 
          Log.Error("The query was not executed successfully!");
          
        if (!(sql.RecordCount == recordCount))
          Log.Error("The record count did not match the expected outcome. Instead saw " + sql.RecordCount);
          
        Log.Checkpoint("The correct amount of records were found");
        sql.Close();
    }
}





module.exports = { Database: Database }
