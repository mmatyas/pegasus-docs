# How to add games manually

Pegasus supports several gaming platforms out of the box, but other than those, you can also add your own custom games and emulators. These can be described using **metadata files**.

A metadata file is a human-readable text file that stores information about the individual games (title, developers, release date, etc.), and groups the games into categories (eg. "Playstation games", "Mario games", etc.). These files can be edited either via a text editor or via the [graphical metadata editor for Pegasus](https://github.com/mmatyas/pegasus-metadata-editor). Here is an example (with more details below):

```make
collection: PlayStation
extension: iso
launch: epsxe.exe "{file.path}"


game: Final Fantasy VII
files:
  ffvii_disc1.iso
  ffvii_disc2.iso
developer: Square
genre: Role-playing
description:
  The games story follows Cloud Strife, a mercenary who joins an eco-terrorist
  organization to stop a world-controlling megacorporation from using the planets
  life essence as an energy source.
rating: 92%
```

These files are named `metadata.pegasus.txt`, and Pegasus looks for them in the directories you've added under *Settings menu &rarr; Set game directories*. You can also have more than one in a directory, in which case they follow the `somecustomname.metadata.pegasus.txt` name form.


## File format

The metadata file contains a list of `name: value` *entries*. Each entry is either a single line value (like a name), a list of values (like a list of files), or multiline text (like a description).

There are two special elements, `game` and `collection`, that start a new *Game* and *Collections* section respectively.

### Games

These elements tell Pegasus information about the individual games. You can set functional informations, like what files belong to a game and how they should be launched, and also descriptive informations, like developers or list of game genres.

### Collections

A *Collection* defines a **group of games** that should appear together. In addition, it can also add games automatically, and search files based on extensions or names. A common launch command can be set for all games in the collection too, if you don't wish to define them separately for each game. These features are optional, but often useful for large game sets.

As games often belong to more than one categories, collections too support various combinations:

- a single game can belong to multiple collections
- a single collection can be present in multiple metadata files
- in a single metadata file, games are automatically added to collections mentioned before them

