// by qhswp@naver.com
var rival_arr = ["%handle%", "%handle%"];

// makeCookie와 loadCookie는 https://thereclub.tistory.com/59 블로그를 참고하여 작성함.
var makeCookie = function(sName, oScore, exp){
  var date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = sName+ "=" + oScore +";expires" + date + ";oScore=" + oScore + ";";
}

var loadCookie = function(handle) {
  var value = document.cookie.match('(^|;) ?' + handle + '=([^;]*)(;|$)');
  if(value){
    return value[2];
  } else return null;
};
///////////////////////////////////////////////////////////////////////////////////////

for(var i=0; i<rival_arr.length; i++){
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://solved.ac/api/v3/search/user?query=" + rival_arr[i],
    "method": "GET",
    "headers": {
      "Content-Type": "application/json"
    }
  };

  var sName;
  var sScore;
  var oRating;

  $.ajax(settings).done(function (response) {
    
    sName = response["items"]["0"]["handle"];
    sScore = response["items"]["0"]["solvedCount"];
    sRating = response["items"]["0"]["rating"];

    var oScore = loadCookie(sName);
    if(sScore != oScore){
      var score = sScore - oScore;
 
      {
        var divTmp = document.createElement('span');
        divTmp.id = 'divtmp';
        divTmp.style ="color:white; background-color: green; left: 700px; top:1120px;"
        // divTmp.innerText = "<라이벌> heloo님이 1120문제를 더 풀어 3010 점이 되었습니다!";
        divTmp.innerText = "<라이벌> " + sName +"님이 " + score + " 문제를 더 풀어 " + sRating + " 점이 되었습니다!";
        
        document.getElementsByClassName("ProfileHeaderCardstyles__UserNumber-sc-nlagzq-5 fTEOJo")[1].appendChild(divTmp);
        //document.body.appendChild(divTmp);
        divTmp.onclick = function(){
          divTmp.remove();
        };

        // setTimeout(deleteDivTmp, 3000); 3000ms 후 자동으로 사라지게 하고 싶다면 주석해제
      }
      makeCookie(sName, sScore, 1);
    }
    
  });
}
