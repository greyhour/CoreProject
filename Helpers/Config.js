var configFile = Utilities.GetCurrentDir() + "\\Script\\config.json";

class Config {
    constructor() {
        var _parsedJson = eval("(" + aqFile.ReadWholeTextFile(configFile, aqFile.ctANSI) + ")");
        
        this.sqlUsername = _parsedJson.sqlUsername;
        this.sqlPassword = _parsedJson.sqlPassword;
      }
}





module.exports = { Config: Config }