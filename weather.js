import React, { useEffect, useState } from 'react'

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

var cloudy = 0;
var latitude = 0;
var longitude = 0;
var timeZone = 0;

const UI = (props) => {

    const [data, setData] = useState();
    const [expand, setExpand] = useState(false);


    useEffect(() => {


        const fetchData = async (API_KEY, City) => {
            console.log(API_KEY);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}`;;
            try {
                const response = await fetch(url);
                const result = await response.json();
                console.log(result);
                setData(result);
                if (data.message !== "city not found") {
                    cloudy = result.clouds.all;
                    longitude = result.coord.log;
                    latitude = result.coord.lat;
                    timeZone = result.sys.timeZone;
                }

            } catch (error) {
                console.log(error);
            }

        }

        fetchData(props.API_KEY, props.City);
    }, [props.API_KEY, props.City])


    const fullStyle = {
        height: "100%",
        width: "100%",
        float: "right",
        textAlign: "center",
        color: props.tempInformationBackgrundColor.color,
        backgroundColor: props.tempInformationBackgrundColor.backgroundColor
    }

    const halfScreen = {
        width: "50%",
        height: "100%",
        float: "left",
        textAlign: "center",
        color: props.tempInformationBackgrundColor.color,
        backgroundColor: props.tempInformationBackgrundColor.backgroundColor
    }


    const temp_main = {
        width: "30%",
        height: "100%",
        float: "left",
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
        color: props.tempBackgroundColor.color,
        textAlign: "center",
        backgroundColor: props.tempBackgroundColor.backgroundColor
    }

    const expand_layout = {
        width: "50%",
        height: "100%",
        float: "right",
        textAlign: "center",
        color: props.HiddenSectionBackgroundColor.color,
        backgroundColor: props.HiddenSectionBackgroundColor.backgroundColor
    }

    const expand_layout_helper = {
        width: "70%",
        height: "100%",
        overflow: "hidden",
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "12px"
    }

    const root_wedget = {
        width: "100%",
        height: "100%"
    }




    return (
        <div style={props.WedgetStyle}>
            <div style={root_wedget}>
                {
                    !data ?
                        null
                        :
                        <div style={root_wedget}>
                            <div style={temp_main}>
                                {(data.message !== "city not found") ? (props.IsDay === true) ? <WbSunnyIcon style={{ height: "35%", width: "35%", marginTop: "2%" }} /> : <NightsStayIcon style={{ height: "35%", width: "35%", marginTop: "2%" }} /> : null}
                                {(data.message !== "city not found") ? <h1>{(data.main.temp - 273.15).toPrecision(2) + "°C"} </h1> : <h1>City Not Found</h1>}
                            </div>

                            <div style={expand_layout_helper}>
                                <div className="m" style={(!expand) ? fullStyle : halfScreen}>
                                    {(!data.message !== "city not found") ? <p>{data.name} </p> : null}
                                    {(data.message !== "city not found") ? <div>
                                        <p>{"Max Temp : " + (data.main.temp_max - 273.15).toPrecision(2) + "°C, Min Temp : " + (data.main.temp_min - 273.15).toPrecision(2) + "°C,"}</p>
                                        <p>{"Wind Speed : " + data.wind.speed + " ms"}</p>
                                        <div style={{ display: "flex", justifyContent: "center", color: props.tempInformationBackgrundColor.color }} onClick={() => { setExpand(!expand) }}>
                                            <p style={{ marginTop: "0%" }}>{(!expand) ? "Show More" : "Show Less"}</p>
                                            <ExpandMoreIcon style={(!expand) ? { transform: "rotate(-90deg)" } : { transform: "rotate(90deg)" }} />
                                        </div>
                                    </div> : null}

                                </div>

                                {(expand) ? <div className="expand_layout" style={expand_layout}>
                                    <p>{`Humidity :  ${data.main.humidity}%, Clody : ${data.clouds.all}%`}</p>
                                    <p>{`Latitude : ${data.coord.lat}, Longitude  : ${data.coord.lon}`}</p>
                                    <p>{"Country Code : " + data.sys.country}</p>
                                </div>
                                    : null}
                            </div>

                        </div>
                }
            </div>
        </div >
    )
}

export default UI;
export { cloudy, timeZone, latitude, longitude };