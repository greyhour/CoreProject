var configFile = Utilities.GetCurrentDir() + "\\Script\\config.json";

class Config {
    constructor() {
        var _parsedJson = eval("(" + aqFile.ReadWholeTextFile(configFile, aqFile.ctANSI) + ")");

        this.sqlUsername = _parsedJson.sqlUser.sqlUsername;
        this.sqlPassword = _parsedJson.sqlUser.sqlPassword;

        this.resourceLocation = Utilities.GetCurrentDir() + _parsedJson.resourceLocation;
        this.CreateDirIfNotExists(this.resourceLocation);

        this.downloadLocation = Utilities.GetCurrentDir() + _parsedJson.downloadLocation;
        this.CreateDirIfNotExists(this.downloadLocation);
    }

    CreateDirIfNotExists(dir) {
        if (!aqFileSystem.Exists(dir)) {
            aqFileSystem.CreateFolder(dir);
        }
    }
}





module.exports = { Config: Config }