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
}





module.exports = { Database: Database }
