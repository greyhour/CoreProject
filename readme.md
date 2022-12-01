# Core Project created to help automate anything using RadfordsFrameworkCore

## Cloning using submodules
- use the `--recursive` flag to ensure submodules are cloned as well
- to update submodules use `git submodule update --init`


## Project Requirments
- `CurrentWorkingApp` & `CurrentWorkingForm` variables (note `CurrentWorkingApp` should default to main tested app)

## Referencing CoreProject from TestComplete
- Clone the *CoreProject* into the ./script folder in the base Testcomplete project
- Open the base TestComplete project
- Create a folder structure (using the UI)
    - Script (default folder that already exists)
        - CoreProject
            - Controls
                - CoreControls
            - Helpers
            - Pages
                - CorePages
- Right click on each folder, *Add* > *Add Exisiting* and then navigate to the respective folder found in the *CoreProject*

## Events
there are core events in the helpers > eventhandler folder. these can be referenced from the main project events section as needed

## Config
to set sql username and passwords create a file in projectName>Script>config,json
    {
        "sqlUser": {
            "sqlUsername": "user23",
            "sqlPassword": "*****"
        },
        "resourceLocation": "//Resources//",
        "downloadLocation": "//Downloads//"
    }