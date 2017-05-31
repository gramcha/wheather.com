var element = (<div><input id="cityinp"></input><button onClick={UserAction}>click</button></div>);
ReactDOM.render(element, document.getElementById('btngrp'));



function getUrlForFiveDayPrediction(cityname)
{
  return "http://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid=78d72ce5884e1d70df86081c1cd84e5b";
}

function UserAction(){

  var cityname = document.getElementById('cityinp').value;
  if(cityname.length<1){
    alert("enter city name");
    return;
  }
 
  var cityqueryurl = "http://api.openweathermap.org/data/2.5/weather?"+"q="+cityname+"&appid=78d72ce5884e1d70df86081c1cd84e5b";

  element = (<div><h4>Now</h4></div>);
  ReactDOM.render(element, document.getElementById('divnow'));

  httpGetAsync(cityqueryurl,respCallbackCurrent);


  element = (<div><h4>3 hour forecast data for next 15 hours</h4></div>);
  ReactDOM.render(element, document.getElementById('div3h'));

  httpGetAsync(getUrlForFiveDayPrediction(cityname),respCallbackForcast);

}

/*function CurrentWheather(props){
  return(
      <div id={props.position}>
          <table>
          <tbody>
          <tr>
          <td>City Name
          </td>
          <td>{props.cname}
          </td>
          </tr>
          <tr>
                <td>Country Name</td>
                <td>{props.countryname}</td>
              </tr>
          <tr>
                <td>Current Temperature</td>
                <td>{props.temperature}</td>
              </tr>
          <tr>
                <td>Humidity</td>
                <td>{props.humidity}</td>
              </tr>
                <tr>
                <td>Pressure</td>
                <td>{props.pressure}</td>
              </tr>
          <tr>
                <td>Sunrise</td>
                <td>{props.sunrise}</td>
              </tr> 
          <tr>
                <td>Sunset</td>
                <td>{props.sunset}</td>
              </tr>
          </tbody>
          </table>
    </div>
      );
}*/

class CurrentWheather extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log("currentwheather");
    return(
      <div id={this.props.position}>
          <table>
          <tbody>
          <tr>
          <td>City Name
          </td>
          <td>{this.props.cname}
          </td>
          </tr>
          <tr>
                <td>Country Name</td>
                <td>{this.props.countryname}</td>
              </tr>
          <tr>
                <td>Current Temperature</td>
                <td>{this.props.temperature}</td>
              </tr>
          <tr>
                <td>Humidity</td>
                <td>{this.props.humidity}</td>
              </tr>
                <tr>
                <td>Pressure</td>
                <td>{this.props.pressure}</td>
              </tr>
          <tr>
                <td>Sunrise</td>
                <td>{this.props.sunrise}</td>
              </tr> 
          <tr>
                <td>Sunset</td>
                <td>{this.props.sunset}</td>
              </tr>
          </tbody>
          </table>
    </div>
      );
  }
}

class FuturePrediction extends React.Component{
  //const FuturePrediction = React.createClass({
  constructor(props){
    super(props);
  }
  /*render(){
    return(<div><h1>hello world{this.props.index}</h1></div>);
  }*/
  render(){
    console.log("render");
    var index=this.props.index; 
    var cname=this.props.wdata.city.name;
  var countryname = this.props.wdata.city.country;
  var temperature = (this.props.wdata.list[index].main.temp_max-273.15).toFixed(1)+" celcius";
  var humidity= this.props.wdata.list[index].main.humidity+"%";
  var pressure = this.props.wdata.list[index].main.pressure+" hPa";
  var time = timeConverter(this.props.wdata.list[index].dt);
  var rain = (this.props.wdata.list[index].rain!=null)?(this.props.wdata.list[index].rain["3h"]+" mm"):"NA";
  var description = this.props.wdata.list[index].weather[0].description;
  var wind = "direction: "+this.props.wdata.list[index].wind.deg+"(degree), speed:"+this.props.wdata.list[index].wind.speed+"(meter/sec)";
  var clouds = (this.props.wdata.list[index].clouds!=null)?(this.props.wdata.list[index].clouds.all+"%"):"NA";
  var snow = (this.props.wdata.list[index].snow!=null)?(this.props.wdata.list[index].snow["3h"]):"NA";
    return(
      <div id={this.props.position}>
          <center><h5>{time}</h5></center>

          <table>
          <tbody>
          <tr>
          <td>City Name
          </td>
          <td>{cname}
          </td>
          </tr>
          <tr>
                <td>Country Name</td>
                <td>{countryname}</td>
              </tr>
          <tr>
                <td>Current Temperature</td>
                <td>{temperature}</td>
              </tr>
          <tr>
                <td>Humidity</td>
                <td>{humidity}</td>
              </tr>
                <tr>
                <td>Pressure</td>
                <td>{pressure}</td>
              </tr>
          <tr>
                <td>Wind</td>
                <td>{wind}</td>
              </tr> 
          <tr>
                <td>Description</td>
                <td>{description}</td>
              </tr>
          <tr>
                <td>Rain</td>
                <td>{rain}</td>
              </tr>
          <tr>
                <td>Clouds</td>
                <td>{clouds}</td>
              </tr>
          <tr>
                <td>Time</td>
                <td>{time}</td>
              </tr>
          </tbody>
          </table>
    </div>
      );
  }
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function respCallbackCurrent(response){
//alert("callback3");
  var responseText = JSON.parse(response);
  //responseobj=responseText;
  //console.log(responseText);
  var props={wdata:responseText};
    //console.log(props);
    var element = tablecreation(props);
    //console.log(element);
  ReactDOM.render(element, document.getElementById('root'));

}
var responseobj=null;
function respCallbackForcast(response){
//alert("callback3");
  var responseText = JSON.parse(response);
  responseobj=responseText;
  //console.log(responseText);
  var props={wdata:responseText};
    //console.log(props);
    var element = forcastTableCreation(props);
    //console.log(element);
  ReactDOM.render(element, document.getElementById('rootForcast'));

}

function tablecreation(props)
{
  var cname=props.wdata.name;
  var countryname = props.wdata.sys.country;
  var temperature = (props.wdata.main.temp_max-273.15).toFixed(1)+" celcius";
  var humidity= props.wdata.main.humidity+"%";
    var pressure = props.wdata.main.pressure+" hPa";
    var sunrise = timeConverter(props.wdata.sys.sunrise);
    var sunset = timeConverter(props.wdata.sys.sunset);
  return (
  <div>
  <CurrentWheather position="pos1" cname={cname} countryname={countryname} temperature={temperature} humidity={humidity} pressure={pressure} sunrise={sunrise} sunset={sunset}/>
  </div>
  );
}
function forcastTableCreation(props){
  
  return (
  <div>
  {"\n"}  
  <FuturePrediction position="pos1" wdata={props.wdata} index="0"/>
  <FuturePrediction position="pos2" wdata={props.wdata} index="1"/>
  <FuturePrediction position="pos3" wdata={props.wdata} index="2"/> 
  <FuturePrediction position="pos4" wdata={props.wdata} index="3"/>
  <FuturePrediction position="pos5" wdata={props.wdata} index="4"/>
  </div>
  );
}
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}