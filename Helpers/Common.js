// common methods
class Common {
    IWaitForP1Seconds(seconds) 
    {
        aqUtils.Delay(seconds * 1000);
        Log.Message("The script was delayed [" + seconds + "] seconds");
    }

    
    
    
    
    
    SplitSimpleArray(strArray)
    {
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





module.exports = { Common: Common }