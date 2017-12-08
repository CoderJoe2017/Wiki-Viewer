(function () {
    var req,timeStamp;
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        console.log("HttpRequest object is created");
    } else if (window.ActiveXObject) {
        req = new ActiveXObject(Microsoft.XMLHTTP);
    }
    var $search = $("#searchBtn");
    var $luckyTerm = $("#searchLucky");
    var $targetMsg = $("#searchText");
    var $output = $("#searchContainer");
    $search.on("click", searchAction);
    $targetMsg.on("focus", changeStyle);
     function changeStyle() {
        $("#mainContainer").addClass("contentsDisplay");
        $(".wikiPediaLogo").addClass("littleLogo";
    }
    $targetMsg.on("keypress", function (event) {
        if (event.keyCode == 13)
            $search.click();
    });
    function searchAction() {
        var URL =""; var searchString =""; $output.text("");
        URL = "https://en.wikipedia.org/w/api.php?"; timeStamp = "";
        searchString = $targetMsg.val();        
        URL = URL + '&action=opensearch&search=' + searchString + '&format=json' + "&callback=?";
        timeStamp = ((/\?/).test(URL) ? "&" : "?") + (new Date()).getTime();
        URL += timeStamp;
        var jqXHR = $.ajax({
            type: "GET",
            url: URL,
            dataType:"json",
            success: function (data, status, jqXHR) {
            }
        })
        .done(function (data) {
            for (var i = 1; i < 10; i++) {
                var title = data[1][i];
                var dfn = data[2][i];
                var link = data[3][i];
              if(title == undefined || title==""){
                title=searchString; dfn=searchString + " not available in wikipedia";
                link = "try it in www.google.com";
              }
                var content = "<h4>" + title + "</h4><div>" + dfn + "</div><myLink>" + link + "</myLink>";
                $output.append(content);
            }
        })
        .fail(function (error,status,jqXHR) {
        })
        .always(function () {
        });
        jqXHR.always(function () {
          $(".footer").html("<p>Coded By:<small>Joe LaPenna 2017</small></p>")
        });
    }
    
}());