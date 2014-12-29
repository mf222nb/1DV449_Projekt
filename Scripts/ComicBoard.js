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
                console.log(data);
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
            //console.log(ComicBoard.title);
            ComicBoard.getInformation();
        })
    }
}

window.addEventListener("load", ComicBoard.init);