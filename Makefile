build:
	pkg src/index.js
	move index-macos bin/macos
	move index-linux bin/linux
	move index-win.exe bin/win32.exe