import React,{useState} from "react";
import Header2 from "./Header2";
import "./features.css"
import { Carousel } from 'antd';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import footer from "../../assets/footer-bg.png"
import logo from "../../assets/logo.png"
import $ from "jquery"
import app1 from "../../assets/app-img.png"
import app2 from "../../assets/app-img2.png"
import app3 from "../../assets/app-img3.png"
import app4 from "../../assets/app-img4.png"
import app5 from "../../assets/app-img5.png"
import android from "../../assets/android-icon.svg"
import apple from "../../assets/ios-icon-v2.svg"
import { GrPrevious, GrNext } from "react-icons/gr";
import gifts from "../../assets/3.png";
import GPS from "../../assets/GPS.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineArrowUp, AiOutlineClose } from "react-icons/ai";
import svg1 from "../../assets/svgviewer-output.svg";
import svg2 from "../../assets/svgviewer-output (1).svg";
import svg3 from "../../assets/svgviewer-output (2).svg";
import svg4 from "../../assets/svgviewer-output (3).svg";
import Button from "react-bootstrap/Button";
import playstore from "../../assets/google-severs-music-studio-png-logo-21.png";
import applestore from "../../assets/154870.png";

import { IoIosArrowBack } from "react-icons/io";
import "../../style.css"


const Fetures = () => {
    $('.header-menu a[href="#"]').on('click', function(event) {
        event.preventDefault();
    });
    
    
    
    var mainHeader = $('.main-header');
    
    if($(window).scrollTop() > 100) $('.main-header').addClass('sticky fadeInDown')
    $(window).on('scroll', function(e){
        if($(this).scrollTop() < 100){
            $('.main-header').removeClass('sticky fadeInDown')
        }else
            $('.main-header').addClass('sticky fadeInDown')        
        });

        const [index, setIndex] = useState(0);
        const [shown, setShown] = useState(false);
      
        const handleSelect = (selectedIndex) => {
          setIndex(selectedIndex);
        };
      
        const VideoModal = () => {
          return (
            <div
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                paddingTop: "210px",
                zIndex: 10,
                display : "flex",
                alignItems : "center",
                justifyContent : "center"
              }}
            >
              <iframe
                width="660"
                height="415"
                src="https://www.youtube.com/embed/3QbuYL8b68Y?autoplay=none"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <AiOutlineClose
                className="closeiframe"
                onClick={() => {
                  setShown(false);
                }}
              />
            </div>
          );
        };

    return (
        <>
          <header class="header">
        <div class="main-header">
            <div class="main-menu-wrap">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <div class="logo">
                                <a href="index.html">
                                    <img src={logo} data-rjs="2" alt="nearfold"/>
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-4 col-6 menu-button">
                            <div class="menu--inner-area clearfix">
                                <div class="menu-wraper">
                                    <nav>
                                        <div class="header-menu dosis">
                                            <ul>
                                                <li class="active"><a href="#">Home</a></li>
                                                <li><a href="#">App</a>
                                                    <ul>
                                                        <li><a href="/features">Features</a></li>
                                                        <li><a href="/features#app">App Screens</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Company</a>
                                                    <ul>
                                                        <li><a href="/features#pricing">About Us</a></li>
                                                        <li><a href="/tearmsandcondition">Terms of use</a></li>
                                                        <li><a href="/privacypoliciy">Privacy Policy</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Support</a>
                                                    <ul>
                                                        <li><a href="#">Help</a></li>
                                                        <li><a href="/contactus">Contact Us</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Languages</a>
                                                    <ul>
                                                        <li><a href="#">English</a></li>
                                                        <li><a href="#">العربية</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                       
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </header>
    <div className="termsandconditionsconten">
          <div className="sec-1">
            <h1>NearFold is your best vicinity explorer</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              nesciunt natus facere esse molestiae aspernatur odit praesentium.
              Ducimus, veniam odit doloremque repudiandae cum magni, ab nemo
              dolores repellat culpa ipsum temporibus? Nemo porro ex amet
              deserunt, asperiores expedita est consequuntur vel minus sint
              repellendus impedit. Labore voluptate dolores, voluptatum eaque
              reiciendis repellendus voluptates soluta quae dolore est!
              Assumenda maxime, non similique, vitae accusantium corporis
              aperiam suscipit distinctio velit illo voluptatibus culpa. Neque
              optio laboriosam voluptates?
            </p>
          </div>
        </div>
        <div className="polygon"></div>
        <div className="downloads">
          <div className="downloadsdivplay">
            <img src={playstore} className="downloadsicons" />
            <h3>Playstore</h3>
          </div>
          <div className="downloadsdivapp">
            <img src={applestore} className="downloadsicons" />
            <h3>Appstore</h3>
          </div>
        </div>
        <div className="mobile">
          <img
            src="https://nearfold.com/assets/img/banner/mockup.png"
            alt="mobileimg"
            className="mobileanimated c1"
          />
        </div>
        <div className="appfeature">
          <h1 style={{marginLeft : "10%"}}>App Features</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem quam
            consequuntur aliquam, odit eaque explicabo sit ipsa blanditiis
            labore nisi veritatis, perspiciatis harum placeat culpa commodi
            aperiam tempora laborum ratione. Beatae recusandae modi vero,
            incidunt eveniet quasi, sint magni distinctio sapiente neque rerum
            voluptate blanditiis velit. Quibusdam expedita iste fugiat
            reprehenderit. Enim autem similique, labore, ad assumenda eaque,
            ipsum corrupti maxime excepturi magni eveniet laudantium animi
            aliquid distinctio perspiciatis molestiae adipisci numquam sapiente
            molestias aut incidunt recusandae voluptas. Cumque, ab commodi atque
            autem numquam nisi, tempora corporis sint id voluptatum eligendi
            ducimus vel voluptatem voluptas. Et ex nulla blanditiis laboriosam,
            natus eaque dolorem laudantium! Voluptatibus alias expedita,
            exercitationem laborum accusamus iusto tempora labore ab nisi
            debitis repellendus ipsa veritatis quidem animi dolore excepturi non
            modi architecto perspiciatis mollitia? Modi aliquid possimus at
            harum laboriosam perferendis blanditiis magnam quibusdam
            reprehenderit beatae provident molestias labore debitis dolore
            dolorum, voluptates dolores culpa explicabo.
          </p>
        </div>
        <div className="crousel">
          <div
            id="carouselExampleInterval"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="1000">
                <img src={svg3} class="d-block carimg" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Online/Offline Listings</h5>
                  <p>
                    Any users who have listed their cars can either be seen with
                    their online or offline status
                  </p>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="1000">
                <img src={svg4} class="d-block carimg" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Your Ads Move with you</h5>
                  <p>
                    Some representative placeholder content for the second
                    slide.
                  </p>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="1000">
                <img src={svg1} class="d-block carimg" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Interact with Buyers & Sellers</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="1000">
                <img src={svg2} class="d-block carimg" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Future Features</h5>
                  <p>
                    Some representative placeholder content for the third slide.
                  </p>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
              style={{ color: "orange" }}
            >
              <GrPrevious className="controlpn" />
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
              style={{ color: "orange" }}
            >
              <GrNext className="controlpn" />
              {/* <span class="carousel-control-next-icon" aria-hidden="true"></span> */}
              {/* <span class="visually-hidden">Next</span> */}
            </button>
          </div>
        </div>
        <div className="dealfinalize">
          <div className="dealtext">
            <h2>Interact with other users to finalize your deal</h2>
            <h5>
              When you find your ideal car on the map near you,you can send the
              seller a message withing Website
            </h5>
            <div className="getstarrted">Get Started</div>
          </div>
          <div className="gifts">
            <img src={gifts} className="giftsimg" />
          </div>
        </div>
        <div className="advertisement">
          <div className="gps">
            <img src={GPS} className="gpsimage" />
          </div>
          <div className="adtext">
            <h2>Online/Offline Advertisement Status</h2>
            <h5>
              If you would like your advertisement to be shown to others of the
              application with Live tracking you have to click on Go Live button
              inside our App
            </h5>
            <div className="getstarrted">Get Started</div>
          </div>
        </div>
        <div className="youtubevieo">
          <div>{shown ? <VideoModal /> : null}</div>
          <a onClick={() => setShown(!shown)} className="pulse">
            <span></span>
            <span></span>
            <span></span>
            <BsFillPlayFill className="playbtn" />
          </a>
        </div>
      <div className="arrowup">
        <a href="#">
          <AiOutlineArrowUp className="arrowsvg" />
        </a>
      </div>
    <section class="pt-120 pb-115" id='app'>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-8">
                    
                    <div class="section-title text-center">
                        <h2>NearFold App Screens</h2>
                        <p>Please find below screenshots from our application to get an idea how our application looks and works.</p>
                    </div>
                
                </div>
            </div>
        </div>
        <div class="app-scrin-inner">
            <div class="app-carousel-inner">
                <div class="app-carousel owl-carousel">
                 
                    <div class="single-app-image">
                        <img src={app1} data-rjs="2" alt=""/>
                    </div>
                  
                    <div class="single-app-image">
                        <img src={app2} data-rjs="2" alt=""/>
                    </div>
                   
                    <div class="single-app-image">
                        <img src={app3} data-rjs="2" alt=""/>
                    </div>
                  
                    <div class="single-app-image">
                        <img src={app4} data-rjs="2" alt=""/>
                    </div>
                    
                    <div class="single-app-image">
                        <img src={app5} data-rjs="2" alt=""/>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
    

   
    <section class="pb-90" id='pricing'>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-8">
                   
                    <div class="section-title text-center">
                        <h2>About Us</h2>
                            <h4>Our Story</h4>
                            Founded in 2022, NearFold was created to help millions of UAE citizens buy & sell vahicles in the beginning, and later we will expand into all classified categories. We wanted to provide a platform, where your advertisements move with you. And with the growing community, our app users will be able to find multiple ads in their vicinity. Our company is registered in Dubai under title NEARFOLD FOR COMPUTER SYSTEMS & COMMUNICATION EQUIPMENT SOFTWARE DESIGN.

                            <br/><h4>Our Values</h4>
                            At NearFold, we believe that it is our duty to provide our app users with the best online experience and this is what our mission speaks of - to revolutionize and continuously add value to the way people buy and sell online, in UAE.
                        
                            <br/><h4>Our Customers</h4>
                            At NearFold, we strive to provide our customers an ease of search based on their and other users' location. A huge part of our product development and brainstorming process is looking at our users' feedback to make sure that our product keeps improving to match our client's needs. 

                    </div>
                   
                </div>
            </div>
            
        </div>
        
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-md-12">
                    <div class="download-app-inner text-center">
                        <h2 class="h1">
                            Download our App Today &<br/>
                            Experience Endless Possibilities.
                        </h2>
                      
                        <h3>and get started with a free 7 days trial for your product listing.</h3>
                      
                        <a href="https://play.google.com/store/apps/details?id=com.nearfold" class="btn" target="_blank"><img src={android} width="30%"/> Playstrore</a>                            
                        <a href="https://apps.apple.com/app/nearfold/id1667492627" class="btn" target="_blank"><img src={apple} width="30%"/> Appstore</a>
                        <p><br/></p>
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
                                        <a href="mailto:admin@nearfold.com">admin@nearfold.com</a>
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

    <div class="back-to-top">
        <a href="#"><i class="fa fa-chevron-up"></i></a>
    </div>
        </>
    )
}

export default Fetures