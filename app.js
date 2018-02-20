var video = $('video').get(0);


var archivos = [{
    id: 0,
    titulo: 'Me falta el aliento',
    path: 'aliento',
    type: 'music',
    caratula: 'estopa'
},
{
    id: 1,
    titulo: 'Video Luis',
    path: 'custom',
    type: 'video',
    caratula: 'custom',
    subtitulo: 'cc'
},
{
    id: 2,
    titulo: 'Ya no me acuerdo',
    path: 'acuerdo',
    type: 'music',
    caratula: 'estopa'
},
{
    id: 3,
    titulo: 'Bruno mars',
    path: 'videoplayback',
    type: 'video',
    caratula: 'videoplayback',
    subtitulo: null
}
]

generarCanciones();

function generarCanciones() {
    var contLista = document.getElementsByClassName('contenedorcanciones')[0];
    for (let i = 0; i < archivos.length; i++) {

        var div = document.createElement("div");
        div.className = "cancion";
        div.id = "archivo-" + archivos[i].id;


        let divcont = '<span class="cancion-titulo">' + archivos[i].titulo + '</span><span class="cancion-icono"><i class="fas fa-headphones"></i></span>'

        div.innerHTML = divcont;

        contLista.appendChild(div)

        div.addEventListener('click', () => {
            var thisid = archivos[i].id;
            limpiardivscanciones();

            document.getElementById("archivo-" + thisid).setAttribute("playing", "true");
            reproducir(archivos[i])
            marcarcancion();
        }, false)

    }
}

function reproducir(element) {
    while (video.firstChild) {
        video.removeChild(video.firstChild);
    }

    if (element.type == "video") {
        video.src = "videos/" + element.path + ".mp4";

        if (element.subtitulo != null) {



            var subs = document.createElement('track');

            subs.setAttribute('label', 'Spanish subtitles');
            subs.setAttribute('kind', 'subtitles');
            subs.setAttribute('srclang', 'es');
            subs.setAttribute('src', 'video/' + element.subtitulo + '.vtt');
            subs.setAttribute('default', '');
            video.appendChild(subs);
        }
    } else {
        video.src = "musica/" + element.path + ".mp3";
        video.poster = "musica/" + element.caratula + ".jpg";
    }

    marcarcancion();
    video.setAttribute("currentid", element.id);
    video.play();
}

function limpiardivscanciones() {
    var divs = document.querySelectorAll(".cancion");

    divs.forEach(element => {
        element.className = "cancion";
        element.removeAttribute("playing");
    });


}

function marcarcancion() {
    var divs = document.querySelectorAll(".cancion");

    divs.forEach(element => {
        if (element.getAttribute("playing") != null) {
            element.className = "cancion playing";
        } else {
            element.className = "cancion";
            element.removeAttribute("playing");
        }
    });


}


video.addEventListener('ended', function () {
    limpiardivscanciones();

    var currentId = parseInt(video.getAttribute("currentid"));

    if (currentId + 1 >= archivos.length) {
        reproducir(archivos[0]);
        document.getElementById("archivo-" + archivos[0].id).setAttribute("playing", "true");

    } else {

        reproducir(archivos[currentId + 1]);
        document.getElementById("archivo-" + archivos[currentId + 1].id).setAttribute("playing", "true");

    }
    // video.load();
    video.play();
    marcarcancion();

}, false)


$(document).ready(function () {


    $(document).delegate('#play', 'click', function () {
        video.play();
        $(this).fadeOut(100, "linear").disabled = true;
        $('#pause').fadeIn(100, "linear");
    })
        .delegate('#pause', 'click', function () {
            video.pause();
            $(this).fadeOut(100, "linear");
            $('#play').fadeIn(100, "linear");
        })
        .delegate('#prevsecond', 'click', function () {

            video.currentTime -= 10;
        })
        .delegate('#nextsecond', 'click', function () {
            video.currentTime += 10;
            video.play();
        })
        .delegate('#volumup', 'click', function () {

            video.volume += 0.1;
        })
        .delegate('#volumdown', 'click', function () {

            video.volume -= 0.1;
        })
        .delegate('#next', 'click', function () {


            var currentId = parseInt(video.getAttribute("currentid"));

            limpiardivscanciones();

            archivos.forEach(element => {
                if (parseInt(currentId) == parseInt(archivos.length - 1)) {
                    reproducir(archivos[0]);
                    document.getElementById("archivo-" + archivos[0].id).setAttribute("playing", "true");

                } else
                    if (element.id - 1 == parseInt(currentId)) {
                        reproducir(element)
                        document.getElementById("archivo-" + element.id).setAttribute("playing", "true");

                    }
            });

            marcarcancion();

        })
        .delegate('#prev', 'click', function () {
            var currentId = video.getAttribute("currentid");
            limpiardivscanciones();

            archivos.forEach(element => {
                if (parseInt(currentId) == 0) {
                    reproducir(archivos[archivos.length - 1]);
                    document.getElementById("archivo-" + archivos[archivos.length - 1].id).setAttribute("playing", "true");
                } else if (element.id == parseInt(currentId) - 1) {
                    reproducir(element)
                    document.getElementById("archivo-" + element.id).setAttribute("playing", "true");

                }
            });

            marcarcancion();
        });



    $('video').on('loadedmetadata', function () {
        $('#duration').text(Math.floor(video.duration));
    })
        .on('timeupdate', function () {
            $('#current').text(Math.floor(video.currentTime));
        });


});