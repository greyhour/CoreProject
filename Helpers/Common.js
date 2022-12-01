// common methods
class Common {
    IWaitForP1Seconds(seconds) {
        aqUtils.Delay(seconds * 1000);
        Log.Message("The script was delayed [" + seconds + "] seconds");
    }

    IPressTheEnterKey() {
        this.CurrentForm().Keys("[Enter]");
    }
    
    AddTempVariable(variableName, value) {
        Common.tempVariables[variableName] = value;
    }
    
    GetTempVariable(variableName) {
        return Common.tempVariables[variableName];
    }
    
    ReplaceTempVariable(input) {
        if(input == "")
            return input;
        for(var key in Common.tempVariables) {
            input = input.replace(key, Common.tempVariables[key]);
        }
        return input;
    }
    
    SplitSimpleArray(strArray) {
        strArray = Replace(strArray, "{", "");
        strArray = Replace(strArray, "}", "");
        strArray = Split(strArray, ";");

        strArray.slice().reverse().forEach(function(item, index, object) {
            if (item === 'N/A') {
                strArray.splice(object.length - 1 - index, 1);
            }
        });
        
        return strArray;
    }
    
    CurrentForm() {
        return Sys.Process(Project.Variables.CurrentWorkingApp).FindChild(Array("Visible", "WndCaption"), Array(true, Project.Variables.CurrentWorkingForm), 3);
    }
    
    OpenApplication(applicationName) {
        switch(applicationName) {
            case "FreshPackMultiProduce":
                TestedApps.FreshPackMultiProduce.Run();
                break;
            case "FreshPackApples":
                TestedApps.FreshPackApples.Run();
                break;
            case "FreshSales":
                TestedApps.FreshSales.Run();
                break;
            default:
              Log.Error("Tested app has not been added to the project");
        }
    }
}




Common.tempVariables = {};
module.exports = { Common: Common }