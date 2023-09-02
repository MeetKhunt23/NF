import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./allvehical.css";
import dolar from "../../assets/dollar-coin-vector-1953442.png";
import car from "../../assets/car img.png";
import calender from "../../assets/calender.png";
import modification from "../../assets/modification.png";
import edit from "../../assets/edit.png";
import deleted from "../../assets/delete.png";
import orangecar from "../../assets/istockphoto-186578902-612x612.jpg";
import carengine from "../../assets/car_engine.png";
import { HeartFilled } from "@ant-design/icons"
import { MdOutlineSettingsInputComposite } from "react-icons/md"
import { Button, Modal } from 'antd';
import { Select, Space } from 'antd';
import { ImLocation2 } from "react-icons/im"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';


const Allvehical = () => {
    const navigate = useNavigate();
    const [array, setarray] = useState([1]);
    const [modal2Open, setModal2Open] = useState(false);
    const [value, setValue] = useState(1);
    const minDistance = 10;
    const [value1, setValue1] = React.useState([10, 66688]);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleChangeSlider = (event, newValue) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
        }
    };

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    function valuetext(value) {
        return `AED ${value}`;
      }

    return (
        <>
            <div>
                <div className="upperheadermyvehicles">
                    <div onClick={() => navigate(-1)} className="backbtn">
                        <IoIosArrowBack />
                        Back
                    </div>
                    <div className="myvehiclesheader">All vehicles</div>
                </div>
            </div>
            <div className="searchfield">
                <input type="text" name="searchvehicle" placeholder="Search..." className="input" />
                <MdOutlineSettingsInputComposite className="filtericon" onClick={() => setModal2Open(true)} />
            </div>
            <Modal
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
            >
                <div>
                    <div>
                        <label for="cars">Vehicle Type</label><br />
                        <select name="cars" id="cars" className="selecttypecar">
                            <option value="All">All</option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div><br />
                    <div className="brandmodel-select">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                            <label for="cars">Brand</label><br />
                            <select name="cars" id="cars" className="selecttypecar">
                                <option value="All">All</option>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                            <label for="cars">Model</label><br />
                            <select name="cars" id="cars" className="selecttypecar">
                                <option value="All">All</option>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>
                    <div><br />
                        <label for="cars">Location</label><br />
                        <input type="text" name="location" className="location" />
                        <ImLocation2 className="location-icon" />
                    </div><br />
                    <div>
                        <label>Distance</label>
                        <Box sx={{ width: 475 }}>
                            <Typography id="non-linear-slider" gutterBottom style={{ fontSize: "14px" }}>
                                {value} km
                            </Typography>
                            <Slider
                                sx={{ color: "#d76258" }}
                                value={value}
                                min={0}
                                step={1}
                                max={100}
                                onChange={handleChangeSlider}
                                valueLabelDisplay="auto"
                                aria-labelledby="non-linear-slider"
                            />
                        </Box>
                    </div><br />
                    <div>
                        <label>Price Range</label>
                        <Box sx={{ width: 475 }}>
                        <Typography id="non-linear-slider" gutterBottom style={{ fontSize: "14px" }}>
                                AED {value1[0]} - AED {value1[1]}
                            </Typography>
                            <Slider
                                sx={{ color: "#d76258" }}
                                getAriaLabel={() => 'Minimum distance'}
                                value={value1}
                                onChange={handleChange1}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                            />
                        </Box>
                    </div><br/>
                    <div>
                        <label for="cars">Sort By</label><br />
                        <select name="cars" id="cars" className="selecttypecar">
                            <option value="All">All</option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </div>
            </Modal>
            {array.length ? (
                <>
                    <div className="vehiclecont">
                        <div style={{ display: "flex" }}>
                            <div className="cont-1">
                                <h2 className="modelname">TestTiya</h2>
                                <div className="logowithtextcont">
                                    <div className="logowithtext">
                                        <div className="box">
                                            <img src={dolar} className="logoimgs" />
                                        </div>
                                        <div className="box">AED 6666</div>
                                    </div>
                                    <div className="logowithtext">
                                        <div className="box">
                                            <img src={car} className="logoimgs" />
                                        </div>
                                        <div className="box">1 OF 1 Cars</div>
                                    </div>
                                </div>
                                <div className="logowithtextcont">
                                    <div className="logowithtext">
                                        <div className="box">
                                            <img src={calender} className="logoimgs" />
                                        </div>
                                        <div className="box">2023</div>
                                    </div>
                                    <div className="logowithtext">
                                        <div className="box">
                                            <img src={modification} className="logoimgs" />
                                        </div>
                                        <div className="box">Awaiting Moderation</div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            <div className="cont-2">
                                <img src={orangecar} className="vehicleimg" />
                                <HeartFilled style={{ fontSize: "30px", position: "absolute", marginTop: "5px" }} />
                                <div className="featured">Featured</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="addvehicle" onClick={() => { window.location.href = "/subscriptionplan" }}><h2>No vehical found</h2></div>
            )}
        </>
    );
};

export default Allvehical;