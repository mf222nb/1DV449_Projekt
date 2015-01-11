var ComicBoard = {
    title:undefined,
    init:function(){
        if(navigator.onLine){
            ComicBoard.getComics();
            ComicBoard.getComicBook();
        }
        else{
            ComicBoard.goOffline();
        }
    },
    getComics:function(){
        $.ajax({
            type: "GET",
            url: "Calls/MarvelRequest.php",
            success: function(data){
                if(sessionStorage && sessionStorage.getItem("marvel")){
                    data = sessionStorage.getItem("marvel");
                    data = JSON.parse(data);
                }
                else if(sessionStorage){
                    sessionStorage.setItem("marvel", data);
                    data = JSON.parse(data);
                }
                for(var i = 0; i < data.data["results"].length; i++){
                    ComicBoard.renderCharacters(data.data["results"][i].name);
                }
            },
            error: function(){
                var content = document.getElementById("content");
                content.innerHTML = "";
                var pTag = document.createElement("p");

                pTag.textContent = "Tyvärr fanns det ingen data att visa";

                content.appendChild(pTag);
            }
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
            },
            error: function(){
                var content = document.getElementById("content");
                content.innerHTML = "";
                var pTag = document.createElement("p");

                pTag.textContent = "Tyvärr fanns det ingen data att visa";

                content.appendChild(pTag);
            }
        })
    },
    renderCharacters:function(name){
        var list = document.getElementById("list");
        var aTag = document.createElement("a");
        var li = document.createElement("li");

        aTag.textContent = name;
        aTag.href = "#"+name;
        aTag.id = name;

        li.appendChild(aTag);
        list.appendChild(li);

    },
    getComicBook:function(){
        $('#list').on('click', function(v){
            ComicBoard.title = v.target.id;
            ComicBoard.getInformation();
        })
    },
    goOffline:function(){
        if(sessionStorage && sessionStorage.getItem("marvel")){
            var data = sessionStorage.getItem("marvel");
            data = JSON.parse(data);

            for(var i = 0; i < data.data["results"].length; i++){
                ComicBoard.renderCharacters(data.data["results"][i].name);
            }
        }
        else{
            var content = document.getElementById("content");
            var pTag = document.createElement("p");
            pTag.textContent = "You seem to be offline, please connect to internet to experience the application";

            content.appendChild(pTag);
        }
    }
}

window.addEventListener("load", ComicBoard.init);