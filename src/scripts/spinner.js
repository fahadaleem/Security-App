$(document).ready(()=>{
    $(".content-body").hide();
    setTimeout(()=>{
        $("#loader .spinner-grow").hide();
        $(".content-body").show(1000);
    }, 3000)
})