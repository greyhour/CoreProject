DELETE FROM Core.AppUserRegistry WHERE KeyName IN ('DefaultSkin', 'DefaultSkinPalette')
INSERT INTO Core.AppUserRegistry (AppUserId, BranchName, KeyName, KeyValue, XMLValue, CreatedDateTime)
SELECT AppUserId, 'General', 'DefaultSkin', '', 'Office 2007 Green', '2022-09-21' FROM Core.AppUser
DELETE FROM Core.AppUserRegistry WHERE KeyName = 'ShowUpdateNotesSplash'
INSERT INTO Core.AppUserRegistry (AppUserId, BranchName, KeyName, KeyValue, XMLValue, CreatedDateTime)
SELECT AppUserId, 'General', 'ShowUpdateNotesSplash', '0', '', '2022-09-21' FROM Core.AppUser