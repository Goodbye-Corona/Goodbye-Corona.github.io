
/*
  본 소스코드는 굿바이코로나 공적마스크 재고조회 페이지의 소스코드 입니다.
  https://github.com/dhlife09/Corona-19-API

  Copyright 2021 Goodbye-Corona(dhlife09) All Rights Reserved.
*/

  // 우편번호 찾기 찾기 화면을 넣을 element
  var element_wrap = document.getElementById('wrap');

  function foldDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
  }

  function sample3_execDaumPostcode() {
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new daum.Postcode({
      oncomplete: function(data) {
        // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if(data.buildingName !== '' && data.apartment === 'Y'){
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if(extraAddr !== ''){
            extraAddr = ' (' + extraAddr + ')';
          }
        }

        // 우편번호와 주소 정보 POST
        var j1 = data.sido;
        if(j1 == '서울'){
          var j1 = '서울특별시';
        } else if (j1 == '강원'){
          var j1 = '강원도';
        } else if (j1 == '경기'){
          var j1 = '경기도';
        } else if (j1 == '경남'){
          var j1 = '경상남도';
        } else if (j1 == '경북'){
          var j1 = '경상북도';
        } else if (j1 == '광주'){
          var j1 = '광주광역시';
        } else if (j1 == '대구'){
          var j1 = '대구광역시';
        } else if (j1 == '대전'){
          var j1 = '대전광역시';
        } else if (j1 == '부산'){
          var j1 = '부산광역시';
        } else if (j1 == '울산'){
          var j1 = '울산광역시';
        } else if (j1 == '인천'){
          var j1 = '인천광역시';
        } else if (j1 == '전남'){
          var j1 = '전라남도';
        } else if (j1 == '전북'){
          var j1 = '전라북도';
        } else if (j1 == '제주특별자치도'){
          var j1 = '제주특별자치도';
        } else if (j1 == '충남'){
          var j1 = '충청남도';
        } else if (j1 == '충북'){
          var j1 = '충청북도';
        } else {
          var j1 = '확인중';
        }

        var j2 = data.sigungu;
        var j3 = j1.concat(" ", j2);
        document.getElementById('searchInput').value = j3;
        $('#searchBySearch').modal('hide');
        $('#searchBySearchAfter').modal('show');

        // iframe을 넣은 element를 안보이게 한다.
        // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
        element_wrap.style.display = 'none';

        // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
        document.body.scrollTop = currentScroll;
      },
      // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
      onresize : function(size) {
        element_wrap.style.height = size.height+'px';
      },
      width : '100%',
      height : '100%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.
    element_wrap.style.display = 'block';
  }

  function searchBySearchReSearch() {
  $('#searchBySearchAfter').modal('hide');
  $('#searchBySearch').modal('show');
  }
