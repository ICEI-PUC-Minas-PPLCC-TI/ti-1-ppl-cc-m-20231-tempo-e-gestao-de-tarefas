
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

function edicao_tarefas(id){
    let url = "../Edicao_de_tarefas/index.html?id="+id;
    window.location.href = url;
}

function edicao_eventos(id){
    let url = "../Edicao_de_eventos/index.html?id="+id;
    window.location.href = url;
}