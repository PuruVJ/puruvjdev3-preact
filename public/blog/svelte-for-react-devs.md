---
title: 'Svelte for Reactaholics'
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

### Scratching you itch: useState in Svelte

If you find the "just-define-variable-and-it-becomes-state" strange, here's something that could make the transition easy: `useState in Svelte`

Here's the code 👇

```js
export function useState(initialState) {
  const state = writable(initialState);

  const update = (val) =>
    state.update((currentState) => (typeof val === 'function' ? val(currentState) : val));

  const readableState = derived(state, ($state) => $state);

  return [readableState, update];
}
```

And you can use this the same way you use `useState` in React.

Oh, and if you're a TypeScripter, you may wanna copy this function instead 👇

```js
export function useState<TState>(initialState: TState) {
  const state = writable(initialState);

  const update = (val: (e: TState) => void | TState) =>
    state.update((currentState) => (typeof val === 'function' ? val(currentState) : val));

  const readableState = derived(state, ($state) => $state);

  return [readableState, update] as const;
}
```

This should work well for you and give the correct intellisense.

## Effects

If you only care about side effects when some **state changes**, and you do not need to take DOM changes into consideration(as in, you don't care when they change), you can treat the `$: ` syntax as your `useEffect`, as just side-effects.

```js
useEffect(() => {
  console.log(name);
}, [name]);
```

Becomes simply 👇

```js
$: console.log(name);
```

You simply do not need to provide any dependency array. Svelte will automatically sort out your dependencies and trigger this effect whenever any dependency changes.

But sometimes, you will use a lot of variables in your reactive statements and you don't want the statements to trigger on all of them, you can actually use a method which is very similar to providing your own dependency array 👇

```js
function doSomethingBigWithLotsOfDeps(state1, state2, state3, state4, state5) {
  /* Do epic shit! */
}

$: doSomethingBigWithLotsOfDeps(state1, state2, state3, state4, state5);
```

Here, the `state1`, `state2` and others are reactive variables being passed to the function. Inside the function, you can use as many other reactive variables, and them changing won't trigger the reactive statement, only when these 5 reactive variables are changed. If you don't want to watch `state4` and `state5`, you simply do not accept these in the function 👇

```js
function doSomethingBigWithLotsOfDeps(state1, state2, state3) {
  /* Do epic shit! */
}

$: doSomethingBigWithLotsOfDeps(state1, state2, state3);
```

### Emulating useEffect and useLayoutEffect

First off, the reason the heading says `Effects`, not `useEffect` is because there are both `useEffect` and `useLayoutEffect` in React, and they both work differently.

> Differences between `useEffect` and `useLayoutEffect`: All the `useEffect`s in a component are gathered, put in a queue and are executed **after** the component has rendered its HTML. Whereas `useLayoutEffect`s are collected and run before the DOM rendering process begins.

Now, if you care about how your side-effects are timed with respect to your DOM changes, I got a slight bad news for you: `$: ` statements in Svelte are equivalent to `useLayoutEffect`, not `useEffect`.

`useLayoutEffect` runs before the DOM changes are done when state is changed. Same with `$: ` reactive statements. If you want `useEffect` exactly, you need to use `afterUpdate` which runs after the DOM has been updated, but no dependencies there. It runs every single time any DOM update happens, plus the pattern doesn't look as good. You'd end up doing your own diffing. Use it sparingly.

### Cleanup function?

One big feature of `useEffect` and `useLayoutEffect` is the ability to return a `cleanup` function. Svelte's reactive statements unfortunately have no built-in method to do so, but we can apply a little hack to achieve that 👇

```js
let cleanup;
$: {
  cleanup?.();

  doStuff();

  cleanup = () => someFunctionThatDoesCleanup();
}
```

And no, this won't trigger an infinite loop. Reassignment inside a reactive statement won't trigger that reactive statement again.

Alternatively, sometimes you'd need to do cleanup when the component is destroyed, so you'd need to run this cleanup function inside the `onDestroy` lifecycle method 👇

```js
onDestroy(() => {
  cleanup?.();
});
```

### Scratching your itch: useEffect in Svelte

If you find this pattern a little hard to wrap your mind around, there's another way, in which you actually use `useEffect` in Svelte.

```js
const useEffect = (subscribe) => ({ subscribe });

export let track;

let effect;
$: effect = useEffect(() => {
  doStuff();

  return () => {
    doCleanupStuff();
  };
});

$: $effect;
```

This may feel weird, but it shows you can have `useEffect` in Svelte too, albeit in a slightly different manner. A very good explanation of this technique in this amazing blog post: [A Svelte Version of useEffect](https://dylanvann.com/svelte-version-of-useeffect)

# Styling

Now, styling is something we devs don't think much about, but in React, styling is pure pain! There's no recommended way of styling, so you basically have to go read for days about a dozen libraries first, then choose one in frustration. Having choices is great, but if there's no base recommended way to fall back to, it's frustrating.

Now, This is the most kickass feature of Svelte for me: **Styling in place**

Svelte is just like a plain HTML file: You can put your styles right in your component file. Unlike HTML however, the styles are scoped to that component.

```html
<section class="container">
  <img class="avatar" src="..." />
  <div class="userInfo">
    <div class="userName">...</div>
    <div class="userStatus">...</div>
  </div>
</section>

<style>
  .container {
  }

  .avatar {
  }

  .userInfo {
  }

  .userName {
  }

  .userStatus {
  }
</style>
```

So tidy, clean and simple 😌

And these styles are scoped by default!! We ourselves don't have to do anything else to achieve the scoping, unlike React, where first you gotta learn 10 ways of styling, spend days researching them and then just picking one up in frustration.

> Unlike CSS Modules, you don't have to litter your HTML with `css.container` or `css.avatar` and stick to only class. Style IDs directly, style tag names directly, do whatever you need to do without letting the framework come in your way. This is the beauty of styling in Svelte.

> Unlike Styled components, no need to declare style in a string template, and install VSCode extension for syntax highlighting and autocomplete, which itself is quite buggy a lot of the times.

But you probably know this already, so I won't beat around the bush much.

Let's talk about something that is not discussed at all. This is something that us React devs find very difficult in Svelte: **Styling Components from Outside**

## Styling components from outside - in React

Let's assume you have an `Avatar` component for displaying user's profile picture in the `Card` component.

```js
const Card = () => {
  return (
    <section className="container">
      <Avatar />
      <div className="userInfo">
        <div className="userName">...</div>
        <div className="userStatus">...</div>
      </div>
    </section>
  );
};
```

> For brevity, let's assume the code above to be in React, and has scoping somehow.

Say you wanna modify the style of `Avatar` component from outside, that is from `Card` component only. How do you do this?

Well, if you are using CSS Modules/Emotion/Any other library where you define your styles and have a `className` to work with, like with CSS Modules 👇

```js
/* CSS MODULES */
import css from './Card.module.css';

export const Card = () => {
  return (
    <section className={css.container}>
      <img className={css.avatar} src="..." />
      <div className={css.userInfo}>
        <div className={css.userName}>...</div>
        <div className={css.userStatus}>...</div>
      </div>
    </section>
  );
};
```

Or with JSS 👇

```js
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    /* Container styles here */
  },
  avatar: {
    /* Avatar styles here */
  },
  userInfo: {
    /* userInfo styles here */
  },
  userName: {
    /* userName styles here */
  },
  userStatus: {
    /* userStatus styles here */
  },
});

export const Card = () => {
  const css = useStyles();

  return (
    <section className={css.container}>
      <img className={css.avatar} src="..." />
      <div className={css.userInfo}>
        <div className={css.userName}>...</div>
        <div className={css.userStatus}>...</div>
      </div>
    </section>
  );
};
```

So when we swap it with `Avatar` component, and style it ourselves(Let's say, make it square rather than round), the markup is as simple as this 👇

```js
<section class={css.container}>
  <Avatar class={css.squaredAvatar} />
  <div class={css.userInfo}>
    <div class={css.userName}>...</div>
    <div class={css.userStatus}>...</div>
  </div>
</section>
```

As you can see, we simply pass the new style along to `Avatar` component as `css.squaredAvatar` class, and our `Avatar` component is set up to take all the props passed to it and pass them to the underlying `img` component. This just works!!

But if you try the same thing svelte(assuming you have set up `Avatar` to accept all the props and apply them to the underlying `img`) 👇

```html
<script>
  import Avatar from './Avatar.svelte';
</script>

<section class="container">
  <Avatar class="squaredAvatar" />
  <div class="userInfo">
    <div class="userName">...</div>
    <div class="userStatus">...</div>
  </div>
</section>

<style>
  .container {
  }

  .squaredAvatar {
  }

  .userInfo {
  }

  .userName {
  }

  .userStatus {
  }
</style>
```

**...this won't work**.

Svelte will pass along the class you gave it to the underlying `img` element, but it won't apply the styles.

Svelte's limitation is that the class must be on a DOM element, like `div`, `section` or `img`, then only will Svelte recognize it. But if you declare styling for the `squaredAvatar` class, and apply it to a component, Svelte will mark your style as unused and remove it in production.

The fix for this is using `:global()`.

Find a parent of the component. In this case it's `section.container` element.

Then define your style like this 👇

```scss
.container :global(.squaredAvatar) {
  /* Your styles go here */
}
```

**Breakdown**: We use a class of a component that Svelte can recognize, then we write a `:global(.squaredAvatar)` after it. Using `:global` in Svelte is basically telling Svelte that you know what you're doing, you're right and the compiler is wrong. And so, Svelte Compiler will let the `squaredAvatar` class be preserved here as it is.

> Why not directly use `:global(.squaredAvatar) {`?
> \
> Because if you use this directly, svelte will output the style globally `.squaredAvatar { /* Styles here */ }`, which could mess up with any other `.squaredAvatar` class defined anywhere else in your app, even if it is scoped, it will be affected.
> <br/><br/>
> That's we scope this class to our component by writing it as a child of an element that Svelte can scope.

## Composing classes and conditional classes

If you're using the CSS in JS way in React, and wanna compose multiple classes, you have to use this syntax 👇

```js
<div className={`${css.class1} ${css.class2} ${css.class3}`} />
```

This isn't as bad. But look when you have to apply classes based on condition, things get messy

```js
<div className={`${css.class1} ${condition ? css.class2 : ''} ${css.class3}`} />
```

As you can see, now it has become pretty ugly. Make `class3` conditional, and the whole thing is gonna look super ugly.

Hopefully, you might have fixed this problem by using libraries like [classnames](https://www.npmjs.com/package/classnames) and [clsx](https://www.npmjs.com/package/clsx)

```js
<div className={clsx(css.class1, condition && css.class2, css.class3)} />
```

Much more cleaner and intentional, but it kinda sucks that we had to pull in a whole library to just do conditional classes cleanly, especially when these use cases are present in almost every app.

In svelte, you need nothing else, first let's see how you do the non-conditional example above 👇

```html
<div class="class1 class2 class3" />
```

And that's it!! Ultimate cleanliness!!

And the conditional class is even easier 👇

```html
<div class="class1 class3" class:class3="{condition}" />
```

So simple and clean!! This is why I love Svelte so much. The developer experience it provides is the best in class 😍

# Props

Props in react are a little different in terms of authoring, but behave more or less the same, ultimately.

```js
export let prop;
```

Prop with default value? 👇

```js
export let prop = 'Hello';
```

Props with TypeScript? 👇

```js
export let prop: string = 'Hello';
```

Works flawlessly!!

## Rest props ({...props})

When authoring general purpose reusable components, like Button, or Image or anything like this, where you want the component to simply accept all the props it is given and pass them as it is to its child component, the actual `<button>` or `<img>` component, you use

```js
const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
```

and every prop that you pass to `Button` will be given to `<button>`. This pattern is really useful.

To achieve the same behavior in Svelte, there's a `$$props` and `$$restProps` variable in Svelte, injected into every component by Svelte itself. You don't have to declare it, it's available in global scope, like `$` of JQuery in old times 😉.

`$$props`: All the props passed to the component, including the ones you declare(`export let propName`)

`$$restProps`: All the **unknown** props, i.e., the ones not declared in the component

So the component above will simply become this 👇

```html
<!-- Button.svelte -->

<button {...$$restProps}>
  <slot />
</button>
```

### TypeScript

In React, if your general purpose component is a simple wrapper over button, or any other component, you can type your props to accept all the props that `<button>` or `<img>` would take

```tsx
export const ButtonBase = ({ children, ...props }: JSX.IntrinsicElements['button']) => {
  return <button {...rest}>{children}</button>;
};
```

When you go to add props to `<ButtonBase>`, you'll get intellisense of every property that can be passed to a regular `<button`, and you won't be able to enter any property like `src` or `href`, which simply does not exist on a `<button>`, so you get some amazing Type Safety too.

Unfortunately, in Svelte, there's no way to Give types to `$$props` or `$$restProps`. This is one place where Svelte loses some significant points, for me, as I'm a die-hard TypeScript Dev 🙃.

# Global state

In React, the most popular way to have global state is using the `context` API. And even more popular is using `useReducer` with it. Well, some news for you(good or bad, depends on you), Svelte has neither of those(It has context, though it's a little different from React context, more on that later). And reducers are discouraged, but you can create your own methods of using reducers(More on that later).

## Svelte context

Svelte has context like React. But if you're reading this article, and have some experience with Svelte, I really really recommend using `Svelte Stores`. They're one of the best APIs in Svelte, and make global state management amazingly easy.

## Svelte Stores 💪

Svelte Stores are one of the best parts of Svelte. SUper easy to use, super simply to understand, and overall one of the best API Designs I have ever seen.

So, a Store API is actually closer to `useState` in react, but it can be declared inside the component as well as outside, in a separate file, so you can actually use `Stores` as local state for your components too 😀

But all that aside, here's the syntax 👇

```js
import { writable } from 'svelte/stores';

export const count = writable(0);
```

Here we have created a store named `count`, and initialized with value of 0.

Now you csn create function that update the value of count, and use them anywhere,

```js
function incrementCount() {
  count.update((n) => n++);
}
```

You can even subscribe to these stores and watch them

```js
count.subscribe((c) => console.log(c));
```

And you can have immutable stores that simply can't be changed in any way. You can use these to create values that should be come from somewhere else, like a timer store

```js
export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});
```

Now `time` will update on its own. You yourselves won't be able to modify it. Think of it as a reactive `Date`. Date as state, updating your other state is just so cool. You can even use readable stores to create reactive localStorage wrappers, so they trigger update if localStorage was changed.

```js
export const theme = readable(null, function start(set) {
  const interval = setInterval(() => {
    set(localstorage.getItem('theme'));
  }, 500);

  return function stop() {
    clearInterval(interval);
  };
});
```

As you can see, we made a theme variable that comes exclusively from `localstorage`. To change this state, you'd have to change the localstorage value directly.

> Note: This isn't fully reactive, as we put a timer of 500ms, so changes within the 500ms window won't be caught, and only the last one will be caught. But still, this pattern is considerable.

And you can compose multiple stores to form 1 big store, that changes when any of its constituents change 👇

```js
import { derived } from 'svelte/stores';

export const elapsed = derived(time, ($time) => Math.round(($time - start) / 1000));
```

This is another reactive store telling us the time elapsed since a given time.

Or with many more stores 👇

```js
export const derivedVal = derived(
  [name, baseStore],
  ([$name, $baseStore]) => {
    return $baseStore.counter * 2;
  },
  0
);
```

1st argument takes an array of all the stores you want to compose, 2nd argument, the function, you can actually destructure the parameter as array, and you'll get your values. Just as simple as that.

### Using in components

Using Svelte stores in components is an amazing experience. By using Svelte's magic, you can get stores to work just like local state 👇

```html
<script>
  import { time } from './stores';
</script>

<div>The time currently: {$time}</div>
```

I simply imported the `time` store, and used it directly like a value by putting a `$` before the name. Where did this variable come from? Svelte made it available!! Now your template will update automatically as `$time` changes!!.

## Scratching itch: useReducer in Svelte

Now, as I promised, I will show you how you can implement the `useReducer` pattern in svelte, just like React

```js
function reducer(count, action) {
  switch (action.type) {
    case 'increment':
      return count + 1;
    case 'decrement':
      return count - 1;
    default:
      throw new Error();
  }
}

const [count, dispatch] = useReducer(0, reducer);
```

And this is how you would define `useReducer`

```js
function useReducer(state, reducer) {
  const { update, subscribe } = writable(state);

  function dispatch(action) {
    update((state) => reducer(state, action));
  }

  return [{ subscribe }, dispatch];
}
```

Here it is. We're using a store to implement the state here. But again, I implore you, try to use this as minimally as possible. Svelte is simple, so the overall code should be simple too 🙂
