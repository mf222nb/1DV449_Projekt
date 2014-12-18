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
                    console.log(data.data["results"][i].title);
                }
            }
        })
    }

}

window.addEventListener("load", ComicBoard.init);