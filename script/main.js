    $(document).ready(function(){

      //1. 변수선언
      //메인메뉴
      let mnu = $('nav.gnb > ul > li > a');

      //토글버튼 변수
      const toggle_btn = $('#toggle');

      //슬라이드 이미지 변수
      let m_img = $('#mslide .slide');

      //좌, 우 버튼 변수
      let l_btn = $('#mslide .l_btn');
      let r_btn = $('#mslide .r_btn');

      //콘트롤 버튼 변수
      let c_btn = $('.c_btn li');


      //인덱스값 변수 초기값
      let n = 0;

      //탭메뉴 변수
      let tmnu = $('#tab_con ul li a');

      //탭메뉴 클릭시 해당 a요소에 t_on서식을 적용하고 선택안된 a요소는 t_on서식을 제거한다.
      tmnu.click(function(e){
        e.preventDefault();//새로고침 방지

        //선택한 a요소에 서식을 적용하고 선택되지 않은 다른 a요소는 서식을 제거한다.
        $(this).addClass('t_on').parent().siblings().find('a').removeClass('t_on');

        //선택한 a요소의 형제요소인 .con가 나와야
        $('.con').hide();//보이는 콘텐츠 모두 숨기고
        $(this).next().show();//해당 콘텐츠만 나오게 함.

        let idx = $(this).parent().index(); //li태그의 index값을 구한다.

        //탭메뉴(#tab_con ul li a).parent() = li의 인덱스 번호를 구하여
        if(idx===2){ //만약에 선택한 메뉴의 인덱스 번호가 2이면 height:650
          $('#tab_con > article').css('height','660px');
        }else{  //그렇지 않으면 height:500
          $('#tab_con > article').css('height','500px');
        }             
      });

      //2. 메인메뉴 클릭시 서브메뉴 보이게/보일때 클릭하면 숨기게
      mnu.click(function(){
        //$('.sub').hide(); //보이는 서브메뉴는 모두 숨기고
        //$(this).next().toggle(); //선택한 메인메뉴의 다음 요소 sub가 보이거나 숨기게한다.

        //선택한 a요소의 다음요소인 .sub를 나오거나 숨기게하고 부모요소의 형제요소인 li태그의 자손 .sub를 숨긴다.
        $(this).next().toggle().parent().siblings().find('.sub').hide();
      });

      //main을 클릭하면 .sub를 숨긴다
      $('main').click(function(){
        $('.sub').hide();
      });

      //메인 슬라이드 콘텐츠 구현
      //매 3초마다 움직이는 함수
      function moveRight(){
        //0, 1, 2.....
        //콘트롤 버튼 서식을 모두 제거하고 
        c_btn.removeClass('on');

        //현재 보이는 이미지를 숨기고
        $('#mslide .slide').eq(n).fadeOut();
        //해당 인덱스 번호에 맞는 이미지가 나온다.
        if(n==2){
          n=0;
        }else{
          n++;
        }
        //해당 n번째의 이미지가 나와야...
        $('#mslide .slide').eq(n).fadeIn();
        //콘트롤 n번째 버튼에 서식을 적용
        c_btn.eq(n).addClass('on');
      }

      function moveLeft(){
        //0, 2, 1.....
        //콘트롤 버튼 서식을 모두 제거하고 
        c_btn.removeClass('on');
        //현재 보이는 이미지를 숨기고
        $('#mslide .slide').eq(n).fadeOut();
        if(n==0){
          n=2;
        }else{
          n--;
        }
        //해당 n번째의 이미지가 나와야...
        $('#mslide .slide').eq(n).fadeIn();
        //콘트롤 n번째 버튼에 서식을 적용
        c_btn.eq(n).addClass('on');
      }

      //시간객체를 활용하여 3초마다 moveRight함수 호출
      let Timer = setInterval(moveRight, 3000);

      //왼쪽 방향버튼을 클릭시 moveLeft함수호출
      l_btn.click(function(){
        moveLeft();
      });

      //오른쪽 방향버튼을 클릭시 moveRight함수호출
      r_btn.click(function(){
        moveRight();
      });

      //좌,우 버튼에 마우스 올리면 시간을 제거해서 움직임 멈추게하고
      $('#mslide .l_btn, #mslide .r_btn, #mslide .c_btn').hover(function(){
        clearInterval(Timer);
      },function(){ //그렇지 않으면 다시 움직이게
        clearInterval(Timer);
        Timer = setInterval(moveRight, 3000);
      });

      //콘트롤 버튼 클릭시 해당 이미지 나오게 하기
      c_btn.click(function(){
        clearInterval(Timer);//시간을 제거하여 멈추게

        n = $(this).index();//??번째 값을 변수에 담는다.
        console.log(n);//0,1,2.......

        $('#mslide .slide').fadeOut();//현재 슬라이드 숨기고
        $('#mslide .slide').eq(n).fadeIn();//n번째 슬라이드가 나오게

        c_btn.removeClass('on');
        $(this).addClass('on');
      });

      //5. 이벤트 슬라이드
      const eslide = $('.es_wrap'); //3200짜리 3개 이미지 감싸는 부모요소
      const es_lbtn = $('#event i.fa-angle-left'); //왼쪽 버튼 변수
      const es_rbtn = $('#event i.fa-angle-right'); //오른쪽 버튼 변수

      //1번 슬라이드의 앞에 3번을 배치한다.
      $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');

      //왼쪽으로 1200픽셀 이동하여 1번이 가운데 배치가 되게 한다.
      eslide.css('margin-left','0%');

      //moveleft함수
      function e_moveLeft(){
        eslide.animate({'margin-left':'-100%'},500, function(){
          //A.insertAfter(B)  = B의 뒤에 A를 배치
          $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
          eslide.css('margin-left','0%');//제자리에 배치하기 위해
        });
      }

      //시간객체를 사용하여 4초마다 움직이도록 한다.
      let Timer2 = setInterval(e_moveLeft, 4000);

      //moveright함수
      function e_moveRight(){
        eslide.animate({'margin-left':'0px'},500, function(){
          $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
          eslide.css('margin-left','-100%');
        });
      }

      // 좌측버튼 클릭시 
      es_lbtn.click(function(){
        clearInterval(Timer2);
        e_moveLeft();
      });

      //우측버튼 클릭시
      es_rbtn.click(function(){
        clearInterval(Timer2);
        e_moveRight();
      });

      $('#event i.fas').mouseenter(function(){
        clearInterval(Timer2);
      });

      //좌, 우 버튼 마우스 아웃시 다시 시간을 생성해서 움직이게
      $('#event i.fas').mouseleave(function(){
        clearInterval(Timer2);
        Timer2 = setInterval(e_moveLeft, 4000);
      });

      //태블릿,모바일에서 토글버튼 클릭시 .gnb가 아래로 펼쳐지거나 접히게 하기
      toggle_btn.click(function(){
        $('.gnb').slideToggle();
      });

      //메인메뉴 클릭시 해당 서브나오게 하고 다시 메인 메뉴 클릭시 해당 서브 숨기게하기
      mnu.click(function(e){
        $(this).find('.sub').toggle();
        e.preventDefault();
      });

    });