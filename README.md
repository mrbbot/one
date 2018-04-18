# One

Whenever I'm working on a smaller project, I always feel that I can't use something like React or Vue because there's just too much extra stuff included that I'll never use.

Lots of these libraries seem to reimplement existing features in modern JavaScript the most notable of which are templates. Whilst this definitely makes them more powerful, for these smaller projects I talk about, I don't really need those things.

I thought about this for a bit and wondered how small I could make an easy to use rendering library. The result was **One**. When minified, this code is just above 500 bytes, *which doesn't sound like too much to me*.

## Usage
Let's assume we have the following HTML structure:
```html
<html>
    <head>
        <title>App</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="one.min.js"></script>
        <script src="app.js"></script>
    </body>
</html>
```
In our `app.js` file we can initialise One like this:
```js
const app = new One({
    el: "#app",
    render() {
        return `Hello world!`;
    }
});
```
This binds the One instance to the app div and will replace its contents with "Hello world!".

### Data
Now let's add some data:
```js
const app = new One({
    el: "#app",
    data: {
        greeting: "Hello"
    },
    render() {
        return `${this.greeting} world!`;
    }
});
```
Notice the use of template literals instead of some fancy syntax. You also don't need to use `this.data.greeting`, just `this.greeting`.

If we imagine that we have some asynchronously loaded data that sets the greeting we can just change the `greeting` value as if it `app` was a normal JavaScript object.
```js
setTimeout(() => {
   app.greeting = "Goodbye"; 
}, 1000);
```
One will automatically render the template again with the new data.

### Lists
Now let's create a to-do list (because that's what everyone seems to want to do these days) and add an item to it:
```js
const app = new One({
    el: "#app",
    data: {
        list: [
            "Buy something",
            "Write something"
        ]
    },
    render() {
        return `<ul>${this.list.map(item => `<li>${item}</li>`).join("")}</ul>`;
    }
});

setTimeout(() => {
    app.list = [...app.list, "Make something"];
}, 1000);
```
Observe again how we're using built-in functions for mapping our array to an unordered list. Something else to note is that `app.list` cannot be mutated as this won't trigger a render of the template. Instead, we have to create a new array with all the old items and our new item.

### Nesting
You can nest One instances to organise different components of your UI. In the example below, we create a separate instance for navigation.
```js
const app = new One({
    el: "#app",
    data: {
        greeting: "Hello world!",
        navbar: new One({
            data: {
                title: "My First App"
            },
            render(page) {
                return `<h1>${this.title} - ${page}</h1>`
            }
        })
    },
    render() {
        return `${this.navbar.render("Home")}<p>${this.greeting}</p>`;
    }
});

setTimeout(() => {
    app.navbar.title = "My One App";
}, 1000);
```
When nesting components, you can also pass arguments to the render function.

### Improvements
Whilst One is intentionally simple, there are some things that I might try to add/improve in the future:
* Handling user input (clicks, text, etc.)
* Only updating what needs to be updated

Whether or not I end up using this in any of my projects, it has been fun to try to compact things as much as possible and gain a deeper understanding of how some of these frameworks work under the hood.
