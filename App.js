const head = React.createElement("h1", {id:"heading"}, "hello from react");
const root = ReactDOM.createRoot(document.getElementById("root"));

const parent = React.createElement("div",{id:"parent"},
    React.createElement("h1",{id:"child"},"h1 tag",)
)
root.render(parent);