# Configuring inflates into Obsidian

The way the inflates are working is explicited by the unit tests.
But these tests do not detail how Obsidian must be configured in order to achieve the goals.

A [staging](https://github.com/petitpandarouge/ObsidianScripts/tree/main/obsinflate/vaults/staging) vault has been created to cover this purpose.

The aims of this vault is to
- expose the final Obsidian configuration using the inflates in a production like environment,
- expose all the needed dependencies and their configuration,
- expose inflates good practices to keep them maintanable,
- provide a production integration environment test to combine all the inflates.

All is done in Obsidian and not in the GitHub markdown documentation to have the Obsidian
backlinks power benefits 💪.
