---
title: Get the most out of CSS Modules with TypeScript
description: If you're a TypeScript Dev, here are a few things you can do to get that sweet, sweet CSS class intellisense
date: 14 May, 2021
---

Are you a TypeScript user, who's using CSS modules and ever ran into this little problem where you type `styles.` and expect the list of classes to show up in your VSCode intellisense, but it doesn't?

After going through this article, you'll have this super sweet intellisense like shown below 👇

![](../assets/media/css-modules-typescript-intellisense--intellisense-demo.gif)

And the fun part is, you won't need to install any VSCode extension

# Prerequisites

1. **VSCode** - VSCode has TypeScript built in, which is what's gonna make this feature work. Not sure about Vim or Sublime though, if they'll support this 😅

2. **Locally installed TypeScript** - There must be TypeScript locally installed and present in your `package.json` (Preferably the latest version 😁)

3. **Grit and Debugging skills 😉** - Well, it is a prerequisite for writing every single line of code as a dev, donchya agree?
