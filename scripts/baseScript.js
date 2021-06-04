let modal = document.getElementById('id01');

function showModal() {
    modal.style.display="block";
    modal.style.width="auto";
}

function myFunction2() {
    document.getElementsByTagName("h1")[0].innerHTML = "updated 2"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

$(document).ready(function(){
    $(".datepicker").each(function() {
        $(this).datepicker();
    });
});

function saveState() {
    sessionStorage.setItem("monthlyExpenses", document.getElementsByName("uname")[0].value);
    sessionStorage.setItem("bed", document.getElementsByName("psw")[0].value);
    console.log(sessionStorage.getItem("monthlyExpenses"));
    console.log(sessionStorage.getItem("bed"));
    modal.style.display="none";
    return false;
}