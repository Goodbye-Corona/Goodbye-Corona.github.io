/*
  본 소스코드는 굿바이코로나(Corona-19-API) 서비스에서 사용되는 소스코드 입니다.
  Copyright 2021 Goodbye-Corona(dhlife09) All Rights Reserved.
*/

function getCount() {
    $.ajax({
        type: "GET",
        url: "https://api.corona-19.kr/system/apiSVC/",
        dataType: 'json',
        async: false,
        success: function(data) {
            document.getElementById("totalCount").innerHTML = data.totalCount;
            document.getElementById("totalRequest").innerHTML = data.totalRequest;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("서비스 갯수, 서비스 요청 횟수를 받아오는 중 오류가 발생했습니다 :(");
            return;
        }
    });
}
getCount();

setInterval(function() {
    getCount();
}, 10000);
