var _basePage = new (require("BasePage")).BasePage;

class CoreHomePage {
    ISelectTabP1AndCollapseAllMenuItemsExceptP2(tabCaption, menuItemCaption) {
        // select the expected main menu item
        var objSideBar = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild("Caption", "Main Navigation", 7);
        objSideBar.FindChild(Array("Visible", "ObjectType", "Caption"), Array(true, "Button", tabCaption), 2).Click();

        // lets get ourselves an array of all the expanded items
        var objTabGrouping = objSideBar.FindChild(Array("Visible", "ObjectType"), Array(true, "Pane"), 4);
        const listItems = Array.from(objTabGrouping.FindAllChildren(Array("Visible", "ObjectState"), Array(true, "expanded"), 2));
        
        // and we are going to need them in order!
        listItems.sort((list1, list2) => list1.ControlIndex - list2.ControlIndex);
        
        // now that they are in order, lets close them one by one
        listItems.forEach(item => {
            item.Click(5, 5);
        });

        // finally we open the one we are interested in
        objTabGrouping.FindChild(Array("Visible", "Caption"), Array(true, menuItemCaption), 5).Click(5, 5);
    }
    
    IShouldSeeMenuItemP1ListedOnlyOnceInTheLeftNavigationMenuBarForP2(menuItemCaption, subMenuItemCaption) {
        // lets get all the main menu items with the expected caption
        var objSideBar = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild("Caption", "Main Navigation", 7);
        var objmenuItem = objSideBar.FindChild(Array("Visible", "ObjectType", "Caption"), Array(true, "List", menuItemCaption), 5);
        var objsubMenuItems = Array.from(objmenuItem.FindAllChildren(Array("Visible", "Caption"), Array(true, subMenuItemCaption), 3));
        
        // if there is more than one item found something must have gone wrong!
        if(!(objsubMenuItems.length == 1)){
            Log.Error("The submenu item " + subMenuItemCaption + " was found more than once!");
        }
    }

    IShouldNotSeeMenuItemP1InTheLeftNavigationMenuVarForP2(menuItemCaption, subMenuItemCaption) {
        // lets get all the main menu items with the expected caption
        var objSideBar = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild("Caption", "Main Navigation", 7);
        var objmenuItem = objSideBar.FindChild(Array("Visible", "ObjectType", "Caption"), Array(true, "List", menuItemCaption), 5);
        var objsubMenuItems = Array.from(objmenuItem.FindAllChildren(Array("Visible", "Caption"), Array(true, subMenuItemCaption), 3));
        
        // if there is more than one item found something must have gone wrong!
        if(!(objsubMenuItems.length == 0)){
            Log.Error("The submenu item " + subMenuItemCaption + " was found at least once!");
        }
    }

    IOpenP1FromNavbarmenuListP2AndIWillSeeP3Window(subMenuItemCaption, menuItemCaption, windowCaption) {
        var objSideBar = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild("Caption", "Main Navigation", 7);
        var objmenuItem = objSideBar.FindChild(Array("VisibleOnScreen", "ObjectType", "Caption"), Array(true, "List", menuItemCaption), 5);
        var objsubMenuItem = objmenuItem.FindChild(Array("VisibleOnScreen", "Caption"), Array(true, subMenuItemCaption), 3);

        objsubMenuItem.Click(40, 9);

        _basePage.ISeeTheP1Window(windowCaption);
    }






    IHaveOpenedToolsSettings() {
        var objMenu = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild("Name", "PropertyPage(\"The Ribbon\")", 6);

        var objToolsTab = objMenu.FindChild("Caption", "Tools", 4);
        objToolsTab.Click();

        var objSettingsButton = objMenu.FindChild("Caption", "Settings", 4);
        objSettingsButton.Click();

        _basePage.ISeeTheP1Window("Application Settings");
    }



    
    ISelectTabP1AndScrollTheNavigationMenuToThePositionP2(tabCaption, position) {
        // select the expected main menu item. (mainly used for reports because we cannot collapse the menu items)
        var objSideBar = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild("Caption", "Main Navigation", 7);
        objSideBar.FindChild(Array("Visible", "ObjectType", "Caption"), Array(true, "Button", tabCaption), 2).Click();
        
        // lets get the main scroll bar
        var objSideBarScrollBar = objSideBar.FindChild(Array("VisibleOnScreen", "ObjectType"), Array(true, "ScrollBar"), 7);
        
        // and now the single items in the scroll bar so we can work out top/bottom
        var objSideBarScrollBarSlider = objSideBarScrollBar.FindChild("Caption", "Position", 2);
        
        // well our scroll bar also has some meat to it                                             // account for the top/bottom buttons
        var sideBarScrollBarSliderTravel = objSideBarScrollBar.Height - objSideBarScrollBarSlider.Height - (17 + 17);
        
        // lets move the scroll bar to the top
        objSideBarScrollBarSlider.Drag(5, 5, 0, (objSideBarScrollBar.ScreenTop - objSideBarScrollBarSlider.ScreenTop));
        
        switch (position) {
            case "TOP":
              position = "0%";
              break;
            case "MIDDLE":
              position = "50%";
              break;
            case "BOTTOM":
              position = "100%";
              break;
            default:
              Log.Message("Trying to use input as a percentage..");
              break;
        }
        
        // if position is not a percentage at this point, something went wrong
        if(!position.includes("%")){
            Log.Error(position + " is not a recognized percentage!");
            return;
        }
        
        // now lets scroll to the percentage specified and let the use know it worked!
        objSideBarScrollBarSlider.Drag(5, 5, 0, ((position.replace("%", "") / 100) * sideBarScrollBarSliderTravel));
        Log.Message("Scrolled to exact percentage " + position);
    }
    
    IShouldSeeReportMenuItemP1ListedOnlyOnceInTheLeftNavigationMenuBarForP2(menuItemCaption, subMenuItemCaption){
        // lets get all the main menu items with the expected caption
        var objSideBar = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild("Caption", "Main Navigation", 7);
        var objmenuItem = objSideBar.FindChild(Array("ObjectType", "Value"), Array("Cell", menuItemCaption), 8).Parent.Parent;
        var objsubMenuItems = Array.from(objmenuItem.FindAllChildren(Array("Visible", "Value"), Array(true, subMenuItemCaption), 1));
        
        // if there is more than one item found something must have gone wrong!
        if(objsubMenuItems.length != 1){
            Log.Error("The submenu item " + subMenuItemCaption + " was found more or less than once! Found " + objsubMenuItems.length + " times.");
        }
    }
    
    IOpenReportOptionP1FromNavbarmenuListP2AndIWillSeeP3Window(subMenuItemCaption, menuItemCaption, windowCaption) {
        var objSideBar = Sys.Process(Project.Variables.CurrentWorkingApp).FindChild("Caption", "Main Navigation", 7);
        var objmenuItem = objSideBar.FindChild(Array("ObjectType", "Value"), Array("Cell", menuItemCaption), 8).Parent.Parent;
        var objsubMenuItem = objmenuItem.FindChild(Array("Visible", "Value"), Array(true, subMenuItemCaption), 1);

        objsubMenuItem.Click(40, 9);

        _basePage.ISeeTheP1Window(windowCaption);
    }
}


// lets make our button class visible
module.exports = { CoreHomePage: CoreHomePage }