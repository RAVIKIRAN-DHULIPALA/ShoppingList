# ShoppingList
An electron js made application

## How to install Electron js 
```npm i -D electron@latest```
type this command in the terminal.your system should have a valid internet connection.

Use VScode editor for better development.

## Do the following to pack the application as .exe file
step1: To install the Electron Packager <br>
```npm install --save-dev electron-packager``` <br>

therefore the dependency will be added to the package.json files <br>

step2: Add these lines inside the "script" in package.json . <br>

```
"package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
"package-win": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron Tutorial App\"",    
"package-linux": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"

```

replace the icons and the name of the application accordingly <br>

now to pack the application run the following command <br>
for mac: <br>
```npm run package-mac``` <br>
for windows: <br>
 ```npm run package-win``` <br>
for linux: <br>
```npm run package-linux``` 





