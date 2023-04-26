import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

import { useForm } from "react-hook-form";

import { Context } from "../store/appContext";
export const Modal = props => {
	const { login, handleSubmit } = useForm();

	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");
	const history = useHistory();
	return (
		<div
			className="modal fade"
			id={props.id}
			style={{ display: props.show ? "inline-block" : "none" }}
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Vendor Login
						</h5>

						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<div className="modal-body">
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Email address</label>

							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								onChange={e => setEmail(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Password</label>

							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">
							Close
						</button>
						<button
							data-dismiss="modal"
							type="button"
							onClick={e => {
								actions.login(email, password);
								history("/admin-main-menu");
							}}
							className="btn btn-primary">
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
Modal.propTypes = {
	onClose: PropTypes.func,
	id: PropTypes.string,
	show: PropTypes.bool
};
