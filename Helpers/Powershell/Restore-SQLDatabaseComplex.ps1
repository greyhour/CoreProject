[CmdletBinding(DefaultParameterSetName='Cred')]
Param(
[Parameter(Mandatory=$true)]
$SQLInstance = 'RSLSQL04'
,
[Parameter(Mandatory=$true)]
$SQLDatabase = 'FreshCoolTest'
,
[Parameter(Mandatory=$true)]
$SQLBackupFile = '\\rslsql04.radfords.internal\SQLBackup\FC-EP\FC_Iteration_Test_Backup.bak'
,
[Parameter(ParameterSetName='NoCred',Mandatory=$true)]
[Parameter(ParameterSetName='SecNoCred',Mandatory=$false)]
$SQLUser = 'FCRestore'
,
[Parameter(ParameterSetName='NoCred',Mandatory=$true)]
$SQLPassword
,
[Parameter(ParameterSetName='SecNoCred')]
[string]
$SecurePassword = '76492d1116743f0423413b16050a5345MgB8AEcAUwB6ADgAWAB3ADUAYwB1AGwAawB3AGcAbwBoAGgANwBNAEoAMwBoAHcAPQA9AHwANQBmADMAMQBjADQAOABjAGUAOABmADQAMwAxADcANQBkAGEANwBlAGQAZQBhADMAZQA5ADEAOAA3ADUAMgBkADAANwBkAGYAZgAzAGEAMAAxAGUAMwA2ADYAMQBiAGEANABjAGIAYwA2AGQANABlADMAZABkADYAMABkADIAOQA='
,
[Parameter(ParameterSetName='Cred',Mandatory=$true)]
[pscredential]
$Credential
,
[byte[]]
$Key = @(52,0,90,0,71,0,100,0,101,0,120,0,56,0,72,0)
)
$ErrorActionPreference = 'Stop'
Switch ($PSCmdlet.ParameterSetName){
    'NoCred'{
        $Credential = New-Object -TypeName 'PSCredential' -ArgumentList ($SQLUser,(ConvertTo-SecureString -String $SQLPassword -AsPlainText -Force))
    }
    'Cred'{}
    'SecNoCred'{
        $Credential = New-Object -TypeName 'PSCredential' -ArgumentList ($SQLUser,(ConvertTo-SecureString -String $SecurePassword -Key $Key))
    }
}
If(!(Test-Path -Path $SQLBackupFile)){
    Write-Error -Message ('Backup File {0} Not Found' -f $SQLBackupFile)
    Break
}
If($SQLDatabase -match '^FreshCool'){
    $ServiceAccount = 'RADFORDS\svc.FreshCool'
}ElseIf($SQLDatabase -match '^FreshGrow'){
    $ServiceAccount = 'RADFORDS\svc.FreshGrow'
}Else{
    $ServiceAccount = 'RADFORDS\RSLService'
}
Import-Module SQLServer
$SQL = @"
DECLARE @mdf nvarchar(255),@ldf nvarchar(255), @lojD nvarchar(128), @lojL nvarchar(128)
USE [master]
SET @mdf = (SELECT smf.physical_name
	FROM sys.databases sd INNER JOIN sys.master_files smf ON sd.database_id = smf.database_id
	WHERE sd.[Name] LIKE '$SQLDatabase' AND smf.[type_desc] LIKE 'ROWS')
SET @ldf = (SELECT smf.physical_name
	FROM sys.databases sd INNER JOIN sys.master_files smf ON sd.database_id = smf.database_id
	WHERE sd.[Name] LIKE '$SQLDatabase' AND smf.[type_desc] LIKE 'LOG')
DECLARE @Table TABLE (
	LogicalName VARCHAR(128) ,
      [PhysicalName] VARCHAR(128) ,
      [Type] VARCHAR ,
      [FileGroupName] VARCHAR(128) ,
      [Size] VARCHAR(128) ,
      [MaxSize] VARCHAR(128) ,
      [FileId] VARCHAR(128) ,
      [CreateLSN] VARCHAR(128) ,
      [DropLSN] VARCHAR(128) ,
      [UniqueId] VARCHAR(128) ,
      [ReadOnlyLSN] VARCHAR(128) ,
      [ReadWriteLSN] VARCHAR(128) ,
      [BackupSizeInBytes] VARCHAR(128) ,
      [SourceBlockSize] VARCHAR(128) ,
      [FileGroupId] VARCHAR(128) ,
      [LogGroupGUID] VARCHAR(128) ,
      [DifferentialBaseLSN] VARCHAR(128) ,
      [DifferentialBaseGUID] VARCHAR(128) ,
      [IsReadOnly] VARCHAR(128) ,
      [IsPresent] VARCHAR(128) ,
      [TDEThumbprint] VARCHAR(128),
	  [SnapshotUrl] VARCHAR(128)
)
INSERT INTO @table
EXEC('
RESTORE FILELISTONLY
   FROM DISK=''$SQLBackupFile''
   ')
   SET @lojD=(SELECT LogicalName FROM @Table WHERE Type='D')
   SET @lojL=(SELECT LogicalName FROM @Table WHERE Type='L')
ALTER DATABASE [$SQLDatabase] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
RESTORE DATABASE [$SQLDatabase]
FROM  DISK = '$SQLBackupFile'
WITH  FILE = 1,
MOVE @lojD TO @mdf,
MOVE @lojL TO @ldf,
NOUNLOAD,  REPLACE,  STATS = 5
ALTER DATABASE [$SQLDatabase] SET MULTI_USER
GO
ALTER DATABASE [$SQLDatabase] SET RECOVERY SIMPLE
GO

USE [$SQLDatabase]
GO
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'RADFORDS\Domain Users')
BEGIN
CREATE USER [RADFORDS\Domain Users] FOR LOGIN [RADFORDS\Domain Users]
ALTER ROLE [db_owner] ADD MEMBER [RADFORDS\Domain Users]
END
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = '$ServiceAccount')
BEGIN
CREATE USER [$ServiceAccount] FOR LOGIN [$ServiceAccount]
ALTER ROLE [db_owner] ADD MEMBER [$ServiceAccount]
END
"@
If([String]::IsNullOrEmpty($SQLUser)){
    Invoke-Sqlcmd -ServerInstance $SQLInstance -Database 'master' -Query $SQL -QueryTimeout 3600
}else{
    Invoke-Sqlcmd -ServerInstance $SQLInstance -Database 'master' -Query $SQL -QueryTimeout 3600 -Credential $Credential
}
$SQL = @"
DECLARE @lojL varchar(128) = (SELECT smf.name
	FROM sys.databases sd INNER JOIN sys.master_files smf ON sd.database_id = smf.database_id
	WHERE sd.[Name] LIKE '$SQLDatabase' AND smf.[type_desc] LIKE 'LOG')
DBCC SHRINKFILE (@lojL , 0)
GO
"@
If([String]::IsNullOrEmpty($SQLUser)){
    Invoke-Sqlcmd -ServerInstance $SQLInstance -Database $SQLDatabase -Query $SQL -QueryTimeout 3600
}else{
    Invoke-Sqlcmd -ServerInstance $SQLInstance -Database $SQLDatabase -Query $SQL -QueryTimeout 3600 -Credential $Credential
}