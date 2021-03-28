$(document).ready(()=>{
    $(".content-body").hide();
    setTimeout(()=>{
        $("#loader .spinner-grow").hide();
        $(".content-body").show(1000);
    }, 2000)
})


export const hello_word = ()=>{
    console.log("hello world!");
}