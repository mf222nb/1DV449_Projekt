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
                    ComicBoard.renderTitles(data.data["results"][i].name);
                }
            }
        })
    },
    getInformation:function(){
        $.ajax({
            type: "POST",
            url: "Calls/WikiRequest.php",
            headers: { 'Api-User-Agent': '' },
            success:function(data){
                data = JSON.parse(data);
                console.log(data);
            }
        })
    },
    renderTitles:function(title){
        var list = document.getElementById("list");
        var aTag = document.createElement("a");
        var li = document.createElement("li");

        aTag.textContent = title;
        aTag.href = "#"+title;
        aTag.id = title;

        li.appendChild(aTag);
        list.appendChild(li);
    },
    getComicBook:function(){
        $('#list').on('click', function(v){
            this.title = v.target.id;
            ComicBoard.getInformation();
        })
    }
}

window.addEventListener("load", ComicBoard.init);