# Queries to resize and reset all the form sizes (for Freshpackmulti|Freshsales|Freshpackapples)
- Sets any expected full screen form to full screen
- Sets any form that is not full screen 10px from the top and 10px from the left (does not fullscreen)
- Sets any form size bigger than 1900px (to allow for 10 px left and right of the form) to full screen
- Sets any form size bigger than 1060px (to allow for 10 px above and below the form) to full screen

# Databases this query has been run on
- FPM_PurePac
- FS_Avoco


# Queries (Note, run in order or in one go)

/* Fullscreen Forms */
UPDATE Core.AppUserRegistry SET KeyValue = '1920;1080;10;10;2' WHERE BranchName = 'FormSettings' AND KeyValue LIKE '%2'

/* None-Fullscreen Forms */
UPDATE Core.AppUserRegistry SET KeyValue = (SUBSTRING(KeyValue, 1, CHARINDEX(';', KeyValue, CHARINDEX(';', KeyValue, 0) + 1)) + '10;10;0') WHERE BranchName = 'FormSettings' AND KeyValue LIKE '%0'

/* Anything as big as a fullscreen but not actually fullscreen */
UPDATE Core.AppUserRegistry SET KeyValue = '1920;1080;10;10;2' WHERE BranchName = 'FormSettings' AND KeyValue LIKE '%0' AND SUBSTRING(KeyValue, 1, (CHARINDEX(';', KeyValue, 0) -1)) > 1900
UPDATE Core.AppUserRegistry SET KeyValue = '1920;1080;10;10;2' WHERE BranchName = 'FormSettings' AND KeyValue LIKE '%0' AND SUBSTRING(KeyValue, ((CHARINDEX(';', KeyValue, 0))+1), ((CHARINDEX(';', KeyValue, ((CHARINDEX(';', KeyValue, 0))+1)))-((CHARINDEX(';', KeyValue, 0))+1))) > 1060