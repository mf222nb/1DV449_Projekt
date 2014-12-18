var ComicBoard = {
    init:function(){
        ComicBoard.getComics();
    },
    getComics:function(){
        $.ajax({
            type: "GET",
            url: "Calls/MarvelRequest.php",
            success: function(data){
                data = JSON.parse(data);

                //console.log(data);
                for(var i = 0; i < data.data["results"].length; i++){
                    ComicBoard.renderTitles(data.data["results"][i].title);
                }
            }
        })
    },
    renderTitles:function(title){
        var list = document.getElementById("list");
        var aTag = document.createElement("a");
        var li = document.createElement("li");

        aTag.textContent = title;

        li.appendChild(aTag);
        list.appendChild(li);
    }
}

window.addEventListener("load", ComicBoard.init);