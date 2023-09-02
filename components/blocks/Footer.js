import React from 'react';
let c_date = new Date();
let year = c_date.getFullYear();

const Footer = () => {

		return (
		 	<footer className="footer-sec p-1 p-sm-1 p-md-2  p-lg-3">
				<div className="container-fluid ">
					<div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  copy-right-sec  mt-0 text-center mt-sm-0 mt-md-0 mt-lg-auto">
						<p className="mb-0">Copyrights © {year} <b>Swayam Infotech.</b> All Rights Reserved.</p>
					</div>
				</div>
			</footer>
		);
	
}

export default Footer