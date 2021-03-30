
// get location function
const getLocation = ()=>{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition)
        // api key AIzaSyDldtiRxTp3hNxp8VQobbuR9jcc4USHfhs

    }
}


const showPosition = (position)=>{
    const longtitudeAndLatitude = `${position.coords.latitude}, ${position.coords.longitude}`
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=
    "+${longtitudeAndLatitude}+"&zoom=14&size=400x300&sensor=false&key=AIzaSyDldtiRxTp3hNxp8VQobbuR9jcc4USHfhs`
    
}

$(document).ready(()=>{
    // sidebar toggler
    $("#side-nav-toggler").on("click", ()=>{
        $(".side-nav").toggleClass("hide-sidenav")
        $("#side-nav-toggler i").toggleClass("fa-arrow-circle-right");
        $("#body-content").toggleClass("content-width");
    })
  

    // get user's location
    $("#get-location-btn").on("click", ()=>{
        console.log("yeah!")
        getLocation();
    })
    


})