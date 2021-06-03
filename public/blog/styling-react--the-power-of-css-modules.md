---
title: The power of CSS Modules 💪
description: CSS Modules are extremely powerful. Find out why in this article.
date: 14 June, 2021
---

CSS Modules are one of the best ways of styling in React. We have libraries that people consider better than CSS Modules, but CSS Modules have stood the test of time and are still one of the most universal ways of styling React. They give you superpowers, and are simple enough that even beginners can grasp it.

# Advantages

1. **Scoped** - CSS modules are scoped when you use them the right way.
2. **Highly composable** - You can compose different styles in a lot of ways
3. **Tree shakable** - Styles you don't use are removed, just like modern JS tooling.
4. **Very easy to pick up** - CSS Modules are very easy to understand and takes almost no effort to start using.
5. **It's just CSS!!** - CSS Modules are just CSS that you write with some specific rules in mind. You get the great tooling from your IDE, and IDEs are really good at plain ol' CSS.
6. **PostCSS tooling just works** - Because CSS Modules are just CSS, all of your PostCSS tooling will work flawlessly.

# Prerequisites

- Basic knowledge of CSS.
- Have worked with React before.
- Hungry to learn 😋.

So we have seen the advantages and why you should learn CSS Modules. Now let's actually look at the syntax

# The syntax

Let's build a little Card component.

This will be our directory structure 👇

```txt
|- Card.jsx
|- Card.module.css
```

Notice we're naming our CSS file a `*.module.css`. This is a convention that is good to follow, and in a lot of build tools, is actually necessary, if you want the file to be processed as a CSS Module file.

Now let's look at the CSS file.

```css
/* Card.module.scss */

.container {
}

.avatar {
}

.userInfo {
}

.userName {
}

.userDescription {
}
```

Your CSS naming sense might be going off looking at the `.userInfo` and `.userName`. Shouldn't they be named `.user-info` and ``
