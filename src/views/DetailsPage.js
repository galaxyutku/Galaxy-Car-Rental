import React, { useState } from "react";
import "../styles.css";
import { Colors } from "../Colors";
import { Grid, CardMedia, CardHeader, Card, CardContent, Typography, CardActions, Button, Avatar, 
         IconButton, Select, MenuItem, InputLabel, Autocomplete, TextField } from "@mui/material";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';

function DetailsPage() {

    return (
        <div className ="detailsPage">
            <div className="detailsContainer">
                <div className ="leftItems">
                    <div className="leftUpItems">
                        <Grid>
                            <Card className = "carCard">
                                <CardContent className = "carDetails">
                                    <div className = "carScene">
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '140%' }} className = "carName">Araba Adi</Typography>
                                        <img src={require("../assets/car_1.png")} className = "carPicture"></img>
                                    </div>
                                    <div className = "carFeatures">
                                        <div className = "upFeatures">
                                            <Typography><span className ="carFeaturesName"><DirectionsCarFilledOutlinedIcon fontSize="large"/>Car Model:</span> Fronx</Typography>
                                            <Typography><span className ="carFeaturesName"><Person2OutlinedIcon fontSize="large"/>Seats:</span> 4</Typography>
                                            <Typography><span className ="carFeaturesName"><SettingsOutlinedIcon fontSize="large"/>Gear Type:</span> Automatic</Typography>
                                        </div>
                                        <div className = "downFeatures">
                                            <Typography><span className ="carFeaturesName"><PaidOutlinedIcon fontSize="large"/>Daily Price:</span> 5 $</Typography>
                                            <Typography><span className ="carFeaturesName"><PaidOutlinedIcon fontSize="large"/>Weekly Price:</span> 20 $</Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                    <div className = "leftMiddleItems">
                        <Grid>
                            <Card className = "extraDetails">
                                <CardContent>
                                    <Typography className="extraDetailsHeader" sx={{ fontWeight: 'bold' }}>Great Choice</Typography>
                                    <div className ="upExtra">
                                        <ul className ="listExtraContainer">
                                            <li><DoneOutlineOutlinedIcon color="success"/>En popüler yakıt koşulu</li>
                                            <li><DoneOutlineOutlinedIcon color="success"/>Bulması kolay teslim alma noktası</li>
                                            <li><DoneOutlineOutlinedIcon color="success"/>Ücretsiz iptal</li>
                                            <li><DoneOutlineOutlinedIcon color="success"/>Teslim alma noktasında yardımsever çalışanlar</li>
                                        </ul>
                                        <img src={require("../assets/good_choice.png")} className = "extrasPicture"></img>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                    <div className="leftDownItems">
                        <Grid>
                            <Card className = "extraDetails"> 
                                <CardContent>
                                    <Typography className="extraDetailsHeader" sx={{ fontWeight: 'bold' }}>Included In The Price</Typography>
                                    <div className ="downExtra">
                                        <ul className ="listExtraContainer">
                                            <li><DoneOutlineOutlinedIcon color="success"/>Otelden alınmadan 48 saat öncesine kadar ücretsiz iptal etme imkanı</li>
                                            <li><DoneOutlineOutlinedIcon color="success"/>₺0 aşımlı Hasar Sorumluluk Güvencesi</li>
                                            <li><DoneOutlineOutlinedIcon color="success"/>₺0 aşımlı Hırsızlık Koruması</li>
                                            <li><DoneOutlineOutlinedIcon color="success"/>Kiralama başına 1.500 kilometre</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                </div>
                
                <div className = "rightItems">
                    <div className="rightUpItems">
                        <Grid>
                            <Card className = "pickupInformationContainer">
                                <CardContent className = "pickupReturn">
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '140%' }}>Pick-up and Return Information</Typography>
                                    <div className = "pickupInformation">
                                        <Typography><span className ="pickupHeader">Pick-up Date:</span> 01.01.2024</Typography>
                                        <Typography><span className ="pickupHeader">Pick-up Location:</span> Ankara</Typography>
                                    </div>
                                    <div className ="arrow">
                                        <SouthOutlinedIcon sx={{ fontSize: 40 }}/>
                                    </div>
                                    <div className = "returnInformation">
                                        <Typography><span className ="pickupHeader">Return Date:</span> 10.01.2024</Typography>
                                        <Typography><span className ="pickupHeader">Return Location:</span> Ankara Şehir Merkezi</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                    <div className="rightMiddleItems">
                        <Grid>
                            <Card className="paymentContainer">
                                <CardContent className="paymentItems">
                                    <div className="paymentHeader">
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '140%' }}>Car Price Details</Typography>
                                    </div>
                                        <Typography className="rentPayment" sx={{ fontWeight: 'bold'}}><span >Car Rental Fee:</span> 31</Typography>
                                        <Typography className="rentPayment" sx={{ fontWeight: 'bold'}}><span >3 günlük fiyat:</span> 31</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                    <div className="bookButton">
                    <Button variant="contained"  sx={{backgroundColor:"#ffa42c", color:"black",  ":hover": {bgcolor: "#ffa42c",color: "white", transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out"},width:"50%"}} className="bookButton">BOOK NOW</Button>
                    </div>
                    <div className="rightDownItems">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;



