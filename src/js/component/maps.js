import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import { useHistory, Link } from "react-router-dom";
import "../../styles/maps.scss";
import { Context } from "../store/appContext";
import { MapsHeader } from "./maps-header";

const center = {
	lat: 25.7617,
	lng: -80.1918
};
const zoom = 14;

const AnyMarkers = () => {
	const { store } = useContext(Context);
	const history = useHistory();

	return store.vendor_locations.map((vendor_location, index) => {
		return (
			<div
				key={index}
				className=" fas fa-map-marker-alt text-danger "
				style={{ height: "40px", width: "40px" }}
				title={vendor_location.name}
				data-tooltip={vendor_location.name}
				data-lat={vendor_location.lat}
				data-lng={vendor_location.lng}
				// text={vendor_location.name}
				onClick={e => history.push(`/user-main-menu/${vendor_location.vendor_id}`)}
			/>
		);
	});
};

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
			<MapsHeader />
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
				<div className="map-google" style={{ height: "100vh", width: "100%" }}>
					<GoogleMapReact
						bootstrapURLKeys={{
							key: "AIzaSyD9TcEj0Qk8yov_y_BdZTYv3SG9-3NMQAI"
						}}
						defaultCenter={center}
						defaultZoom={zoom}>
						<AnyMarkers />
					</GoogleMapReact>
				</div>
			)}
		</div>
	);
};

Maps.propTypes = {
	name: PropTypes.string
};
