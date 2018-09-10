# Configuration directories

This page list the directories where Pegasus is allowed to find your configuration files, including themes.

**All platforms:**

- `<directory of the program>/`
- `<directory of the program>/config`
- `<INSTALL_DATADIR>/` (only if defined during a [manual build](../dev/build.md))

**Linux:**

- `~/.config/pegasus-frontend/` (default)
- `~/.local/share/pegasus-frontend/`
- `/etc/xdg/pegasus-frontend/`
- `/usr/local/share/pegasus-frontend/`
- `/usr/share/pegasus-frontend/`

**Windows:**

- `C:/Users/[user name]/AppData/Local/pegasus-frontend/` (default)
- `C:/ProgramData/pegasus-frontend/`

**macOS:**

- `~/Library/Preferences/pegasus-frontend/` (default)
- `~/Library/Application Support/pegasus-frontend/`
- `/Library/Application Support/pegasus-frontend/`

**Android:**

- `<storage>/pegasus-frontend`, where `<storage>` the internal storage, if you have one, otherwise the SD card

## Portable mode

If you launch Pegasus with the `--portable` command line parameter, it will read/write settings only under `<directory of the program>/config/`.
