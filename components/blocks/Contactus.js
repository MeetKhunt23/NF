import React from "react";
import Header2 from "./Header2";
import footer from "../../assets/footer-bg.png"
import logo from "../../assets/logo.png"
import videobg from "../../assets/video-bg.jpg"
import "../../style.css"

const Contactus = () =>{
    return(
        <>
        <Header2/>
        <div class="page-title-wrap" data-bg-img={videobg} style={{ background: `url(${videobg}) center center` }}>
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="page-title-content text-center">
                        <ul class="mb-0 list-unstyle nav">
                            <li><a href="index.html">Home</a></li>
                        </ul>
                        <h1 class="h2">Contact Us</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
       <section class="pt-120 pb-150">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    
                    <div class="blog-details-inner">
                        
                        <div class="single-blog-inner">
                            
                            
                          
                        
                            
                        </div>
 
                    </div>
                   
                    
                    
                </div>

                
            </div>
        </div>
    </section>

    <footer class="footer" id="contact-us">
        <div class="footerbg">
        <img src={footer} alt=""/>
        </div>
        <div class="footer-top pt-120 pb-110">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-sm-6">
                        <div class="footer-widget">
                            <div class="footer-logo">
                                <a href="index.html"><img src={logo} alt=""/></a>
                            </div>
                            <p>NearFold is an application that helps users to find nearby products or services based on their location.</p>
                            <div class="footer-social-area">
                                <ul class="social-icons social-icons-light nav">
                                    <li><a href="https://www.facebook.com/nearfold" target="_blank"><i class="fa fa-facebook-f"></i></a></li>
                                    <li><a href="https://twitter.com/NearFold" target="_blank"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="https://www.linkedin.com/company/nearfold" target="_blank"><i class="fa fa-linkedin"></i></a></li>
                                    <li><a href="https://youtube.com/@nearfold" target="_blank"><i class="fa fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-sm-6">
                        <div class="footer-widget">
                            <div class="widget-header">
                                <h5>Our Address</h5>
                            </div>
                        
                            <div class="widget-body">
                                <ul class="address-list">
                                    <li>
                                        <span><i class="fa  fa-phone-square"></i></span>
                                        971 7 244 6589
                                    </li>
                                    <li>
                                        <span><i class="fa  fa-envelope"></i></span>
                                        <a href="mailto:support@nearfold.com">support@nearfold.com</a>
                                    </li>
                                    <li>
                                        <span><i class="fa  fa-map"></i></span>
                                        12 Serena Bella Casa,
                                        Dubai, UAE.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    

                   
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-text text-center">
                <p>© copyright 2022 by NearFold</p>       
            </div>
        </div>
        
    </footer>
        </>
    )
}

export default Contactus