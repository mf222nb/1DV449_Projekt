var ComicBoard = {
    title:undefined,
    init:function(){
        //En koll för att se om webbläsaren är online eller offline
        if(navigator.onLine){
            ComicBoard.getComics();
            ComicBoard.getComicBook();
        }
        else{
            ComicBoard.goOffline();
        }
    },
    getComics:function(){
        //Fix för att göra så att enter tangenten fungerar lika bra som att trycka på knappen
        $("#character").keypress(function(event){
            if(event.keyCode == 13){
                event.preventDefault();
                $(".submit").click();
            }
        });
        //För att få en post på formuläret var jag tvungen att ha en knapp istället för en submit annars skedde ingen post i AJAX
        $(".submit").click(function(){
            var character = $("#character").val();
            var div = document.createElement("div");
            var img = document.createElement("img");
            img.src = "Pics/ajax-loader.gif";
            div.appendChild(img);
            div.className = "loader";
            $('#list').prepend(div);
            $.ajax({
                type: "POST",
                url: "Calls/MarvelRequest.php",
                data: {character: character},
                success: function(data){
                    if(typeof(Storage) !== "undefined"){
                        sessionStorage.setItem("marvel", data);
                        data = JSON.parse(data);
                    }
                    if(data.data["results"].length === 0){
                        var content = document.getElementById("content");
                        content.innerHTML = "";
                        $('#content').css('background', '#7f0000');
                        var pTag = document.createElement("p");

                        pTag.textContent = "Your search didn't match anything, please do another search";

                        $(".loader").remove();

                        content.appendChild(pTag);
                    }
                    for(var i = 0; i < data.data["results"].length; i++){
                        ComicBoard.renderCharacters(data.data["results"][i].name);
                    }
                },
                error: function(){
                    ComicBoard.noData();
                }
            })
        })
    },
    getInformation:function(){
        $.ajax({
            type: "GET",
            url: "Calls/WikiRequest.php",
            data: {title: ComicBoard.title},
            headers: { 'Api-User-Agent': '' },
            success:function(data){
                data = JSON.parse(data);
                var content = document.getElementById("content");
                content.innerHTML = "";
                $('#content').css('background', '#7f0000');
                if(data.query.pageids != undefined){
                var pageId = data.query.pageids[0];
                if(pageId < 0){
                    var pTag = document.createElement("p");
                    pTag.textContent = "Missing information";
                    content.appendChild(pTag);
                }
                else{
                    var readData = data.query.pages[pageId]["revisions"][0]["*"];
                    $("#content").append(readData);

                    if(document.getElementsByClassName('redirectText').length !== 0){

                        var redirect = document.getElementsByClassName('redirectText')[0].textContent;

                        if(redirect != ''){
                            ComicBoard.title = redirect;
                            ComicBoard.getInformation();
                        }
                    }
                }
                }
            },
            error: function(){
                ComicBoard.noData();
            }
        })
    },
    //Om det blir error i AJAX får man upp ett felmeddelande
    noData:function(){
        var content = document.getElementById("content");
        content.innerHTML = "";
        $('#content').css('background', '#7f0000');
        var pTag = document.createElement("p");

        pTag.textContent = "Unfortunately there is no data to show";

        content.appendChild(pTag);
    },
    renderCharacters:function(name){
        var list = document.getElementById("list");
        var aTag = document.createElement("a");
        var li = document.createElement("li");
        $('#list').css('background', '#7f0000');

        aTag.textContent = name;
        aTag.href = "#"+name;
        aTag.id = name;

        li.appendChild(aTag);

        $(".loader").remove();

        list.insertBefore(li, list.firstChild);
    },
    getComicBook:function(){
        $('#list').on('click', function(v){
            ComicBoard.title = v.target.id;
            ComicBoard.getInformation();
        })
    },
    //Om man är offline får man ut sin senaste sökning om man gjort någon annars får amn bara ett felmeddelande
    goOffline:function(){
        if(sessionStorage && sessionStorage.getItem("marvel")){
            var data = sessionStorage.getItem("marvel");
            data = JSON.parse(data);
            for(var i = 0; i < data.data["results"].length; i++){
                ComicBoard.renderCharacters(data.data["results"][i].name);
            }

            var content = document.getElementById("content");
            $('#content').css('background', '#7f0000');
            var pTag = document.createElement("p");
            pTag.textContent = "You seem to be offline, please connect to internet to experience the application";

            content.appendChild(pTag);
        }
        else{
            var content = document.getElementById("content");
            $('#content').css('background', '#7f0000');
            var pTag = document.createElement("p");
            pTag.textContent = "You seem to be offline, please connect to internet to experience the application";

            content.appendChild(pTag);
        }
    }
}

window.addEventListener("load", ComicBoard.init);