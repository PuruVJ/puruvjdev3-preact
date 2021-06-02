---
title: 'Mind-map: Svelte for React Devs'
description: A mind map to learn Svelte for React devs
date: 9 Jun 2021
---

Svelte recently became super popular and loved, to the point that it had <mark>89%</mark> Satisfaction score and <mark>66%</mark> Interest score in [State of JS Survey 2020](https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/), which is quite a big feat and remarkable growth.

Everyone who tries Svelte feels a ton of satisfaction, because of its simplistic-yet-powerful nature. However, a lot of React devs, even after loving Svelte, treat it like a toy, because it doesn't have Hooks or a big-ass community like React yet. It's partially true too. Hooks are so freaking powerful that not having them in Svelte can feel like a turn-off.

But what if I told you that Svelte's got some tricks up its sleeve that can make the lack-of-hooks-pain go away completely.

# A Note

This article isn't gonna be a definitive guide for moving from React to Svelte. This article assumes you've been through the Svelte tutorial, and can write a basic app in it. I won't cover how props are different, how state works(Though there's a section where I will touch on it a bit 😁) etc.

If you wish for article for a syntax-to-syntax mapping, here are some great articles for that 👇

[Svelte for React Developers @ Soshace](https://soshace.com/svelte-for-react-developers/)

[Svelte for the Experienced React Dev @ CSS-tricks](https://css-tricks.com/svelte-for-the-experienced-react-dev/)

This article will be about translating the React patterns in your mind to Svelte equivalent, the kind of patterns which can't be found in the official docs.

With that out of the way, let's dive in.

# For Class-based React-ers

If you're still used to writing the `Class`-based React components rather than the new Hooks based syntax, I got a bad news for you. Wrapping your head around Svelte's gonna be much harder, as Class based components are very very different than Svelte components. Unfortunately, I won't be able to cover Class-based components mapping with Svelte in this article, only Hooks based. If you're comfortable with Hooks, no problem, read on!! But if not, you may wanna learn React Hooks, or even just forget all the patterns you have in mind and just learn Svelte-specific patterns from scratch rather than relating the 2.

# For Hooks based React-ers

Good news!! This article is especially for you!

let's warm up with basic stuff.

## Local state

In React, you have `useState` hook used like this 👇

```js
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return <main>Modal is {isOpen ? 'open' : 'closed'}</main>;
};
```

In Svelte, we don't have a concept of State variables and regular non-reactive variables. Anything can be reactive or non-reactive, based on how it is used. Lemme explain.

This is the above code in svelte 👇

```html
<script>
  let isOpen = false;
</script>

<main>Modal is {isOpen ? 'open' : 'closed'}</main>
```

Right now, this variable **isn't reactive**. It's just a value we're storing somewhere and ot changing it, just accessing.

But say we put a toggle button to change the `isOpen` value 👇

```html
<script>
  let isOpen = false;
</script>

<main>
  <button on:click="{() => isOpen = !isOpen}">Toggle</button> <br />
  Modal is {isOpen ? 'open' : 'closed'}
</main>
```

Now when you click on the button, the text will change from `Modal is open` to `Modal is closed` again and again. How did this happen? How did the non-reactive variable become reactive suddenly?

That's Svelte's magic. it analyses your code and changes the **DOM** when it truly needs to be changed. React re runs your whole code again and again when anything in an ancestor changes. Svelte surgically changes only the parts which needs to be changed.

But that's not the important point here.

> Take Away: Every variable in Svelte is reactive state by default. No special useState or State or anything. Just declare a `let` variable, modify it directly and boom!! You're done. And the ones you don't modify are simply values stores somewhere else, totally un-reactive and have no effect on perf.

## Effects

First off, the reason the heading says `Effects`, not `useEffect` is because there are both `useEffect` and `useLayoutEffect`, and they both work differently.

> Differences between `useEffect` and `useLayoutEffect`: All the `useEffect`s in a component are gathered, put in a queue and are executed **after** the component has rendered its HTML. Whereas `useLayoutEffect`s are collected and run before the DOM rendering process begins.
