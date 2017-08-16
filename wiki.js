var s = document.getElementById("search");
var search_result = document.getElementById("search_result");
var wiki = "https://en.wikipedia.org/?curid=";

function wikiSearch(){
  var search = s.value;

  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&utf8=1&prop=extracts&exintro=1&exlimit=20&exchars=200&gsrsearch=' + search, 
    type: 'GET',
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(result){
      var pages = result.query.pages;
      for (var page in pages){
        var title = document.createElement("h3");
        title.className = "title";
        title.innerHTML = pages[page].title;
        
        var des = document.createElement("p");
        des.innerHTML = pages[page].extract;
        des.className = "description";
        
        var resultBlock = document.createElement("div");
        resultBlock.className = "result";
        resultBlock.appendChild(title);
        resultBlock.append(des);
        
        var link = document.createElement("a");
        link.href = wiki + pages[page].pageid;
        link.target = "_blank";
        link.appendChild(resultBlock);
        
        search_result.appendChild(link);
      }
    },
    error: function (jqXHR, exception) {
      var msg = '';
      if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }
      console.log(msg);
    },
  });
}