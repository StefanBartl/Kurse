const Pet = (props) => {
	return React.createElement("div", {}, [
		React.createElement("h1", {}, props.name),
		React.createElement("h2", {}, props.animal),
		]);
};


const App = () => {
	return React.createElement(
		"div",
		{},
		[
		React.createElement("h1", {}, "Adopt Me!"),
			React.createElement(Pet, {
				name: "Teddy",
				animal: "Dog"
			}),
		React.createElement("h1", {}, "Adopt Me!"),
			React.createElement(Pet, {
				name: "Teddy",
				animal: "Dog"
			}),
		]
	)
};


const container = document.getElementById('root');
const root  = ReactDOM.createRoot(container);
root.render(React.createElement(App));
