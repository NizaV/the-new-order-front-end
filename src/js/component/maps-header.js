import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import "../../styles/maps.scss";
import { Context } from "../store/appContext";

export const MapsHeader = props => {
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [searchName, setSearchName] = useState("");
	const handleChange = event => {
		setSearchName(event.target.value);
	};

	return (
		<div className="jumbotron8 image mb-3">
			<h1 className="shadow2 display-4 text-center text-white">{"Find Your Craving Here"}</h1>
			<p className="shadow2 lead text-center text-white">
				<strong>{"Chefs don't make mistakes; they make new dishes"}</strong>
			</p>
			<div className="nav-inner d-flex flex-row">
				<div className="ml-auto">
					<Link to="/">
						<p className="lead">
							<a className="btn btn-lg" href="#" role="button">
								{"Home"}
							</a>
						</p>
					</Link>
				</div>
				<form className="nav-search form-inline my-2 my-lg-0">
					<input
						className="search-input form-control mr-sm-2"
						type="search"
						placeholder="Find a Vendor"
						aria-label="Search"
						value={searchName}
						onChange={handleChange}
						// onClick={e => history.push(`/user-main-menu/${vendor_location.vendor_id}`)}
					/>
					<button className="btn my-2 my-sm-0" type="button" onClick={e => actions.getResults(searchName)}>
						Search
					</button>
				</form>
			</div>
		</div>
	);
};
