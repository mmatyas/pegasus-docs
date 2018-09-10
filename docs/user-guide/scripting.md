# Scripting

Pegasus supports calling external scripts and executables on certain program events.

## 1. The scripts directory

First, find your [config directory](config-dirs.md) and create a new directory there called `scripts` (eg. `~/.config/pegasus-frontend/scripts/`).

## 2. Event directories

Inside the `scripts` folder, create a new directory for the kind of events for which you want to react:

Name | When
:--- | ----
`quit` | on program quit
`reboot` | on system reboot (also calls `quit` first)
`shutdown` | on system shutdown (also calls `quit` first)
`config-changed` | on the change of any configuration option
`controls-changed` | on change of the control settings (also calls `config` first)
`settings-changed` | on change of the regular (non-control) settings (also calls `config` first)
`game-start` | before starting a game
`game-end` | after finishing a game

## 3. Script calling

Put your executable scripts or binaries into these new directories. They will be called in **alphabetic order** when the event happens.
