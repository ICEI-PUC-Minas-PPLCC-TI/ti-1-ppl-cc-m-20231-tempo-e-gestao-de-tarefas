
function prev(){
    document.getElementById('slider-container').scrollLeft -= 270;
}

function next()
{
    document.getElementById('slider-container').scrollLeft += 270;
}


$(".slide div").on("click" , function(){
$(this).toggleClass('zoomed');
$(".overlay").toggleClass('active');
})

function edicao_rotina(id){
    let url = "../Edicao_de_rotinas/index.html?id="+id;
    window.location.href = url;
}