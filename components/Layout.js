import Header from './blocks/Header'
import Sidebar from './blocks/Sidebar'
import Footer from './blocks/Footer'
import React from 'react'


const isLogin = localStorage.getItem('isLoggedIn')?localStorage.getItem('isLoggedIn'):"false"
const admin_user_id = localStorage.getItem('admin_user_id')?localStorage.getItem('admin_user_id'):"0"

const Layout = (props) => {
	return (
		
					<div>
						<Header />
						<Sidebar />
							{props.children}
						<Footer />
					</div>
			
        )
}

export default Layout;