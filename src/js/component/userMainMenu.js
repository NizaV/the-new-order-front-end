import React, { useContext, useState, useEffect, useCallback } from "react";
import "../../styles/home.scss";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const UserMainMenu = props => {
	const { store, actions } = useContext(Context);
	//shopping cart hooks and functions

	const [cart, setCart] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);
	const [cartSub, setCartSub] = useState(0);
	let history = useHistory();

	const handleInstructions = (event, product) => {
		let finalCart = [];
		for (let orderItem of cart) {
			if (orderItem.product_id == product.product_id) {
				finalCart.push({
					...orderItem,
					special_instructions: event.target.value
				});
			} else {
				finalCart.push(orderItem);
			}
		}
		setCart(finalCart);
	};
	const handleQuantityDecrease = product => {
		let finalCart = [];
		for (let orderItem of cart) {
			if (orderItem.product_id == product.product_id) {
				if (orderItem.quantity > 1) {
					finalCart.push({
						...orderItem,
						quantity: orderItem.quantity - 1
					});
				}
			} else {
				finalCart.push(orderItem);
			}
		}
		setCart(finalCart);
	};
	const handleQuantityIncrease = product => {
		let finalCart = [];
		for (let orderItem of cart) {
			if (orderItem.product_id == product.product_id && orderItem != finalCart.orderItem) {
				finalCart.push({
					...orderItem,
					quantity: orderItem.quantity + 1
				});
				// console.log("finalCart", finalCart);
			} else {
				finalCart.push(orderItem);
			}
		}
		setCart(finalCart);
		tallyUpSub(product);
	};

	useEffect(() => {
		cartItemsTotal();
	}, [cart]);

	const cartItemsTotal = () => {
		let totalCartItems = 0;
		for (let i = 0; i < cart.length; i++) {
			totalCartItems += cart[i].quantity;
		}
		setCartTotal(totalCartItems);
		// console.log(totalCartItems);
	};

	const addToCart = product => {
		for (let item of cart) {
			// console.log(`checking for id ${product.id} as ${product.name} versus ${item.product_id} as ${item.name}`);
			if (item.product_id == product.id) {
				// console.log(`found in cart... aborting`);
				return false;
			}
		}
		let orderItem = {
			...product,
			product_id: product.id,
			quantity: 1,
			special_instructions: ""
		};
		delete orderItem.id;
		setCart([...cart, orderItem]);
		tallyUpSub(product); //calling subtotal function
	};
	//totals functions
	const tallyUpSub = product => {
		let subTotal = cartSub;
		subTotal += parseFloat(product.price);
		setCartSub(subTotal);
	};
	const tallyUpTotal = subTotal => {
		const tax = subTotal * 0.07;
		return tax + subTotal;
	};
	//remove from cart
	const removeFromCart = product => {
		let finalCart = [...cart];
		finalCart = finalCart.filter(orderItem => orderItem.name !== product.name);
		setCart(finalCart);
		setCartSub(cartSub - parseFloat(product.price));
	};

	//main menu variables required to link vendor to menu page
	const params = useParams();
	const indexVendor = store.vendors.findIndex(item => item.id == params.bubu);

	const getIndex = useCallback(
		product_id => {
			for (let i = 0; i < cart.length; i++) {
				if (cart[i].product_id == product_id) {
					return i;
				}
			}
		},
		[cart]
	);

	useEffect(() => {
		actions.getVendorMenu(params.bubu);
	}, []);

	return (
		<div className="container-fluid">
			<link href="https://fonts.googleapis.com/css2?family=Courgette&display=swap" rel="stylesheet" />
			<div className="jumbotron2 image mb-3">
				<h1 className="shadow2 display-4 text-center text-light">{"Find Your Craving Here"}</h1>
				<p className="shadow2 lead text-center text-light">
					<strong>{"Chefs don't make mistakes; they make new dishes"}</strong>
				</p>
				<div className="d-flex flex-row">
					<p className="lead mr-1 ">
						<Link className="btn btn-dark text-white btn-lg" to="/maps" role="button">
							{"Search for a Vendor"}
						</Link>
					</p>
					<p>
						<Link to="/">
							<p className="lead">
								<a className="btn btn-dark text-white btn-lg" href="#" role="button">
									{"Home"}
								</a>
							</p>
						</Link>
					</p>
				</div>
			</div>
			<div className="d-flex">
				<div className="menu-view border border-dark w-50 mr-4">
					<div className="py-5 container-style">
						<div className="row ml-auto mr-auto">
							<div className="col-lg-10 mx-auto col-12 text-center mb-3 title-border">
								<h1 className="mt-0 main-color menu-font">
									{store.vendors.map(vendor => {
										if (vendor.id == params.bubu) {
											return vendor.vendor_name;
										}
									})}
								</h1>
							</div>
							{store.categories.map((category, index) => {
								return (
									<React.Fragment key={index}>
										<div className="col-12 mt-4">
											<h3 className="text-center to-uppercase menu-font main-color title-border pt-2 pb-2">
												{category}
											</h3>
											<hr className="accent my-5" />
										</div>
										<div className="card-columns w-75 m-auto">
											{store.vendorMenu.map(product => {
												if (product.category == category) {
													return (
														<div
															className="card card-body menu-item menu-font"
															key={product.id}
															onClick={() => addToCart(product)}>
															<span className="float-right font-weight-bold ml-1">
																{"$" + product.price}
															</span>
															<h6 className="mr-1">
																<u>{product.name}</u>
															</h6>
															<p className="small">{product.description}</p>
														</div>
													);
												}
											})}
										</div>
									</React.Fragment>
								);
							})}
							<div className="col-12 mt-5 contact-border pl-4 pr-4 pt-2 pb-2 ml-auto mr-auto">
								<div className="row menu-font main-color">
									<div className="col h5">
										{store.vendors.map(vendor => {
											if (vendor.id == params.bubu) {
												return vendor.vendor_name;
											}
										})}
									</div>
									<div className="col h5 text-right">
										{"Contact: "}
										{store.vendors.map(vendor => {
											if (vendor.id == params.bubu) {
												return vendor.phone;
											}
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="shopping-cart border border-dark ml-auto w-50">
					<section>
						<div className="row d-flex flex-column">
							<div className="pl-4 pr-4">
								<div className="mb-3">
									<div className="pt-4 wish-list">
										<h4 className="mb-4">
											Cart{" "}
											<span className="badge button-background text-light badge-pill ml-2">
												{cartTotal}
											</span>
										</h4>

										<div className="row mb-4">
											<div className="col-md-9 col-lg-12 col-xl-12">
												<div>
													{cart.map(orderItem => {
														return (
															<div key={orderItem.product_id} className="cart-item">
																<div className="d-flex justify-content-between">
																	<div className="col col-6">
																		<h5>{orderItem.name}</h5>
																		<p className="mb-3 text-muted text-uppercase small">
																			{"Special Intructions: "}
																		</p>
																		<input
																			onChange={e =>
																				handleInstructions(e, orderItem)
																			}
																			type="text"
																			id="name"
																			name="name"
																			value={
																				cart[getIndex(orderItem.product_id)]
																					.special_instructions
																			}
																		/>
																	</div>
																	<div className="col col-6">
																		<div className="col col-qty d-flex text-center w-75">
																			<a
																				href="#"
																				className="qty-minus w-25 quantity"
																				onClick={() =>
																					handleQuantityDecrease(orderItem)
																				}>
																				{"-"}
																			</a>
																			<input
																				className="w-50 text-center"
																				type="numeric"
																				value={
																					cart[getIndex(orderItem.product_id)]
																						.quantity
																				}
																				onChange={e =>
																					console.log(
																						`changed to ${e.target.value}`
																					)
																				}
																			/>
																			<a
																				href="#"
																				className="qty-plus w-25 quantity"
																				onClick={() =>
																					handleQuantityIncrease(orderItem)
																				}>
																				{"+"}
																			</a>
																		</div>
																	</div>
																</div>
																<div className="d-flex justify-content-between align-items-center p-3 mb-3">
																	<div>
																		<a
																			href="#!"
																			type="button"
																			className="card-link-secondary small text-uppercase mr-3 trash"
																			onClick={() => removeFromCart(orderItem)}>
																			<i className="fas fa-trash-alt mr-1" />
																			{"Remove item"}
																		</a>
																	</div>
																	<p className="mb-0">
																		<span>
																			<strong id="summary">
																				{"$" + orderItem.price}
																			</strong>
																		</span>
																	</p>
																</div>
															</div>
														);
													})}
												</div>
											</div>
										</div>
										<hr className="mb-4" />
									</div>
								</div>
								<div className="mb-3">
									<div className="pt-4">
										<h5 className="mb-4">We accept</h5>

										<img
											className="payment mr-2"
											width="20px"
											src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
											alt="Visa"
										/>
										<img
											className="payment mr-2"
											width="20px"
											src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
											alt="American Express"
										/>
										<img
											className="payment mr-2"
											width="20px"
											src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
											alt="Mastercard"
										/>
										<img
											className="payment mr-2"
											width="20px"
											src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
											alt="PayPal acceptance mark"
										/>
									</div>
								</div>
							</div>

							<hr className="mb-4" />

							<div className="tally pr-4 pl-4">
								<div className="mb-3">
									<div className="pt-4">
										<h5>Tally Up</h5>
										<ul className="list-group list-group-flush">
											<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
												Subtotal
												<span>
													{"$"}
													{cartSub}
												</span>
											</li>
											<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
												<div>
													<strong>Total Price</strong>
												</div>
												<span>
													<strong>
														{"$"}
														{tallyUpTotal(cartSub)}
													</strong>
												</span>
											</li>
										</ul>

										<button
											type="button"
											className="btn button-background btn-block text-light"
											onClick={async event => {
												console.log(cart);

												event.preventDefault();
												let result = actions.setCartOnStore(cart);
												let totals = actions.setCartSubTotal(cartSub);
												let totalCartItems = actions.setCartItemsTotal(cartTotal);
												if ((result, totals, totalCartItems)) {
													history.push("/payment");
												}
												console.log(cartSub);
											}}>
											{"CHECKOUT"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

//proptypes
UserMainMenu.propTypes = {
	history: PropTypes.object,
	name: PropTypes.string,
	special_instructions: PropTypes.string,
	quantity: PropTypes.number,
	unit_price: PropTypes.number,
	order_id: PropTypes.number,
	match: PropTypes.object,
	id: PropTypes.number,
	category: PropTypes.string,
	description: PropTypes.string
};
