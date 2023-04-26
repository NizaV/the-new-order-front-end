import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { GoogleMapReact, Marker } from "google-map-react";
import { useHistory, Link } from "react-router-dom";
import "../../styles/maps.scss";
import { Context } from "../store/appContext";

const center = {
	lat: 25.7617,
	lng: -80.1918
};
const zoom = 14;

const AnyReactComponent = ({ index, locationTitle, lat, text }) => (
	<div key={index} title={locationTitle} data-lat={lat} className=" fas fa-map-marker-alt text-danger ">
		{text}
	</div>
);

export const Maps = props => {
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [searchName, setSearchName] = useState("");
	const handleChange = event => {
		setSearchName(event.target.value);
	};
	// {store.vendor_locations.map((vendor_location, index) => {
	return (
		<div className="page-container d-flex flex-column">
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
						<button
							className="btn my-2 my-sm-0"
							type="button"
							onClick={e => actions.getResults(searchName)}>
							Search
						</button>
					</form>
				</div>
			</div>
			{store.searchResults != null ? (
				<div className="card" style={{ width: "18rem" }}>
					<ul className="list-group list-group-flush">
						{store.searchResults.map(result => {
							return (
								<li className="list-group-item" key={result.id}>
									{result.vendor_name}
									<button
										type="button"
										className="close"
										onClick={() => actions.resetSearch()}
										data-dismiss="modal"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			) : (
				<div className="map-google">
					<GoogleMapReact
						bootstrapURLKeys={{
							key: "AIzaSyD9TcEj0Qk8yov_y_BdZTYv3SG9-3NMQAI"
						}}
						defaultCenter={center}
						defaultZoom={zoom}>
						{store.vendor_locations.map((vendor_location, index) => {
							return (
								<AnyReactComponent
									key={index}
									className=" fas fa-map-marker-alt text-danger "
									style={{ height: "40px", width: "40px" }}
									title={vendor_location.name}
									data-tooltip={vendor_location.name}
									data-lat={vendor_location.lat}
									data-lng={vendor_location.lng}
									text={vendor_location.name}
									onClick={e => history.push(`/user-main-menu/${vendor_location.vendor_id}`)}
								/>
							);
						})}
						<AnyReactComponent lat={25.7617} lng={-80.1918} text="My Marker" />
						<Marker position={{ lat: 51.510228, lng: -0.132992 }} />
					</GoogleMapReact>
				</div>
			)}
		</div>
	);
};

Maps.propTypes = {
	name: PropTypes.string
};

AnyReactComponent.propTypes = {
	index: PropTypes.number,
	locationTitle: PropTypes.string,
	lat: PropTypes.number,
	text: PropTypes.string
};
