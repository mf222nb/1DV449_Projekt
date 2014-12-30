var ComicBoard = {
    title:undefined,
    init:function(){
        ComicBoard.getComics();
        ComicBoard.getComicBook();
    },
    getComics:function(){
        $.ajax({
            type: "GET",
            url: "Calls/MarvelRequest.php",
            success: function(data){
                data = JSON.parse(data);

                for(var i = 0; i < data.data["results"].length; i++){
                    ComicBoard.renderCharacters(data.data["results"][i].name);
                }
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
                var pageId = data.query.pageids[0];
                var readData = data.query.pages[pageId]["revisions"][0]["*"];
                console.log(readData);
                /*var content = document.getElementById("content");
                var pTag = document.createElement("p");
                pTag.textContent = data["query"]["pages"][pageId]["revisions"][0]["*"];
                content.appendChild(pTag);*/
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
    }
}

window.addEventListener("load", ComicBoard.init);