# Reactjs

React uses jsx to render html to the DOM quickly and efficiently. In this sense, React is *not* a framework, but rather a view. React allows you to break down the DOM into smaller pieces. This leads to quickly updating singular elements. 


```html
  <div id="hello"></div>
```
```javascript
  var data = "Hello"
  var Hello = React.createClass({
    render: function(){
      return(
      <h1>{data} World!</h1>
      );
    }
  });
  React.render(<Hello data={data}>, document.getElementById('hello'))

```

This is a simple example to show you how react renders elements. The `data` is passed through to the 'Hello' jsx object. 