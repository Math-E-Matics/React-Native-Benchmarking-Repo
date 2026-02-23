# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## React Implementation Benchmarking

The purpose of this repo is to show that some React concepts (like how React's VDOM works) can perform better when implemented certain ways. This can enhance(sometime drastically) runtime performance. 


### Case 1: Tagging a <div> element with a unique identifier ex. <div id=div0> <div id=div1> will consistiently reduce memory consumption and time to consume x bytes of memory

This shows how just a tiny modification can significantly reduce memory consumption by the application. The virtual DOM in REACT works using key based heuristics to find similarities and differences with each object-rerender - this means that if DOM element A has re-rendered from its previous state, then the React VDOM would compare the element's current state with the original to see if it needs to be augmented. If not, then it can simply re-render the same element without having to create new html. This drastically saves time and memory when having to constantly re-render and reload pages in real-time. However, if there is no unique identifier for the elements in the DOM, then the VDOM doesn't know WHICH element to compare its previous state to. This means that the VDOM have to re-render and re-calculate the html for every single DOM element. This is very costly time and memory wise. In this case, I show how much memory is saved simply labeling a div element(a counter button) that is replicated 1000 times. 

The metric I used was how quickly the Application's memory consumption reached the 2GB threshold. 

I ran each version of the Application(with and withoug labeling) 5 times.

Time to reach threshold: 
- Without labeling: 43.4s
- With labeling: 52s 

I saved on average roughly 10s of time by simply labeling the div elements with unique identifiers

Code Snippet: 

```
  const [count, setCount] = useState(0)
  const divs = []

for(let t = 0; t < 1000; t++){
  //here is where the unique id labeling is happening - we produce a thousand counters automatically and syncronously incrementing every 10 ms. 
  //if you were to take out the unique id labeling, memory consumption would increase
  divs.push(<button id={t.toString()} onClick={() => setCount((count))}>
  count is {count}
</button>)
```