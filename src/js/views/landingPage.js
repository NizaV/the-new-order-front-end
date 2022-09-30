import React from "react";
import "../../styles/landingPage.scss";

export const LandingPage = () => {
	return (
		<div className="home-container fluid d-flex flex-column" style={{ height: "100%" }}>
			<div className="header text-center ">
				<h1>Welcome to The New Order</h1>
			</div>
			<div className="motto" />
			<div className="row d-flex justify-content-md-center pb-5">
				<div className="carousel-container">
					<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
						<div className="carousel-inner ">
							<div className="carousel-item active ">
								<img
									src="https://www.rd.com/wp-content/uploads/2018/11/food-truck.jpg"
									className="d-block w-100 h-100"
									alt="food truck"
								/>
							</div>
							<div className="carousel-item ">
								<img
									src="https://www.catersource.com/sites/default/files/Kruzin%20Cuisine%20Food%20Truck%20%20%282%29.jpg"
									className="d-block w-100 h-100"
									alt="food truck"
								/>
							</div>
							<div className="carousel-item">
								<img
									src="https://cdn2.lamag.com/wp-content/uploads/sites/6/2017/03/foodtruck.jpg"
									className="d-block w-100 h-100"
									alt="food truck"
								/>
							</div>
							<div className="carousel-item">
								<img
									src="https://s.abcnews.com/images/US/dog-food-truck-14-ht-jef-191010_hpMain_16x9_992.jpg"
									className="d-block w-100 h-100"
									alt="food truck"
								/>
							</div>
						</div>
						<a
							className="carousel-control-prev"
							href="#carouselExampleControls"
							role="button"
							data-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true" />
							<span className="sr-only">Previous</span>
						</a>
						<a
							className="carousel-control-next"
							href="#carouselExampleControls"
							role="button"
							data-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true" />
							<span className="sr-only">Next</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
