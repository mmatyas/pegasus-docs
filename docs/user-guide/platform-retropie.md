# Platform notes: RetroPie

For Raspberry Pi devices Pegasus is also available from the RetroPie repositories. You can install it by two ways:

- a) From the RetroPie setup menu
- b) Using the Frontend Chooser tool

!!! note
    You will need RetroPie version **4.6** (released on April 28, 2020) or later to successfully install Pegasus.

## From the setup menu

You can start the RetroPie setup script from the terminal (`sudo ~/RetroPie-Setup/retropie_setup.sh`) or from another already installed frontend. You will be greeted with a text-based interface.

To install Pegasus, select *Manage Packages &rarr; Manage experimental packages &rarr; pegasus-fe &rarr; Install from binary*. The latest release will then be downloaded. You can also update your existing installation here.

![retropie screenshot](img/retropie-expmenu.png)

After the installation, you can either call `pegasus-fe` manually, or edit `/opt/retropie/configs/all/autostart.sh` to launch Pegasus on boot (instead of eg. ES2).

## Using the Frontend Chooser

There's also a graphical tool for installing various frontend and setting them up to boot automatically. It is available from [HERE](https://github.com/mmatyas/retropie-frontendchooser).

![retropie frontend chooser screenshot](img/retropie-frontendchooser.png)

