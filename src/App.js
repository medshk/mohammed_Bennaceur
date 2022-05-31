import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Product from "./pages/product";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
	return (
		<Router>
			<CurrencyProvider>
				<CartProvider>
					<Header />
					<Switch>
            <Route exact path="/" component={Home} />
						<Route path="/cart" component={Cart} />
						<Route path="/product/:id" component={Product} />
            <Route path="/:name" component={Home} />
					</Switch>
				</CartProvider>
			</CurrencyProvider>
		</Router>
	);
}

export default App;
