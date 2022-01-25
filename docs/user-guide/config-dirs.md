# Configuration directories

This page list the directories where Pegasus is allowed to find your configuration files, including themes.

## Default directories

Platform | Directory
---------|----------
**all platforms:** | `<directory of the program>/config`
**Linux:** | `~/.config/pegasus-frontend/`
**Linux (Flatpak):** | `~/.var/app/org.pegasus_frontend.Pegasus/config/pegasus-frontend/`
**Windows:** | `C:\Users\[username]\AppData\Local\pegasus-frontend\`
**macOS:** | `~/Library/Preferences/pegasus-frontend/`
**Android:** | `<storage>/pegasus-frontend/`

If you launch Pegasus in [portable mode](portable.md), it will read/write settings to `<directory of the program>/config/`.

## All possible directories

Most platforms define multiple possible directories for storing user content, and so Pegasus can also detect configuration files in locations different than the default:

**All platforms:**

- `<directory of the program>/config`
- `<directory of the program>/`

**Linux:**

- `~/.config/pegasus-frontend/` (**default**)
- `~/.local/share/pegasus-frontend/`
- `/etc/xdg/pegasus-frontend/`
- `/usr/local/share/pegasus-frontend/`
- `/usr/share/pegasus-frontend/`

**Windows:**

- `C:\Users\[username]\AppData\Local\pegasus-frontend\` (**default**)
- `C:\ProgramData\pegasus-frontend\`

**macOS:**

- `~/Library/Preferences/pegasus-frontend/` (**default**)
- `~/Library/Application Support/pegasus-frontend/`
- `/Library/Application Support/pegasus-frontend/`

**Android:**

- `<storage>/pegasus-frontend`, where `<storage>` the internal storage, if you have one, otherwise the SD card
