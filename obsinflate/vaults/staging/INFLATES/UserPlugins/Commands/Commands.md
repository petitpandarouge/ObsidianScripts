---
tags:
  - inflate
  - inflates/script
dependencies:
  - "[[UserPlugins]]"
---

The `commands` main script loads all the commands that can be executed using the UserPlugins plugin.

Here is the commands it embeds:
```dataview
LIST 
FROM #inflates/command AND !"TEMPLATES" 
```
## Configuration

Nothing to do.

