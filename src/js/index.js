// 오늘 얻은 인사이트
// 1. 이벤트 위임
// 2. 요구사항 접근법 - 단계별로 세세하게 나누는 것이 중요
// 3. DOM요소를 가져올때는 $표시를 써서 변수처럼 사용할 수 있음
// 4. 메서드 -> innerHTML, innerText, insertAdjacentHtml, closest, e.target

// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// [o]- 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
// [o]- 메뉴의 이름을 입력받고 확인버튼을 클릭하면 추가한다.
// [o]- 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// [o]- 총 메뉴 갯수를 count하여 상단에 보여준다.
// [o]- 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// [o]- 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// [o]- 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴를 수정하는 모달창(prompt)이 뜬다.
// [o]- 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// [o]- 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴삭제 컨펌(confirm) 모달창이 뜬다.
// [o]- 확인 버튼을 클릭하면 메뉴가 삭제된다.
// [o]- 총 메뉴 갯수를 count하여 상단에 보여준다.

//////////////////////////////////////////////////////////////////////////////////

// step2 요구사항 - 상태 관리로 메뉴 관리하기

// TODO localStorage Read & Write
// localStorage에 데이터를 저장한다.
// [o] 메뉴를 추가할 때
// [] 메뉴를 수정할 때
// [] 메뉴를 삭제할 때
// [ ] localStorage에 있는 데이터를 읽어온다.
/* 
localStorage.setItem("menu","espresso") 
-> 로컬스토리지에 데이터 저장(키, 값)

localStorage.getItem("menu") -> 로컬스토리지에서 데이터 가져오기(키)
'espresso' 
*/

// TODO 카테고리별 메뉴판 관리
// [ ] 에스프레소 메뉴판 관리
// [ ] 프라푸치노 메뉴판 관리
// [ ] 블렌디드 메뉴판 관리
// [ ] 티바나 메뉴판 관리
// [ ] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// [ ] 페이지가 최초로 로딩될때 localStorage 에서 에스프레소 메뉴를 읽어온다.
// [ ] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// [ ] 품절 버튼을 추가한다.
// [ ] 품절 버튼을 클릭하면 localStorage에 상태값이 저장도니다.
// [ ] 클릭이벤트에서 가장가까운 li태그의 class속성 값에 sold-out 을 추가한다.

// 코드를 간결하게 쓰기위해 선언해줌
const $ = (selector) => document.querySelector(selector);
// ex)  document.querySelector("#espresso-menu-form") ->  $("#espresso-menu-form")

// 로컬스토리지 관리
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
    // 문자열로만 저장이 되어야해서 JSON.stringify(menu)를 활용
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  },
};
// 로컬스토리지 확인하는 방법 -> 개발자도구 - 애플리케이션 - 로컬스토리지

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  // 갯수는 업데이트만 되면 되지 메뉴명의 길이로 구하면 되서 관리할 대상 아님.
  this.menu = []; // -> 상태값선언, 초기화

  const updateMenuCount = () => {
    // 메뉴아이템 갯수 반영 -> CLASS참조 ".클래스이름"
    // li태그가 몇개있는지 세기로 -> querySelectorAll("li") 태그 전부 세기
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 두가지 이벤트에서 재사용할 수 있는 함수 만들기
  const addMenuName = () => {
    // 사용자 입력값이 빈 값이라면 추가되지 않는다.
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요."); // 여기까지만 하면 뒷부분이 실행되서 빈값이 목록에 추가됌
      // 해결하기 위해서는 return해주면됌
      return; // 뒷부분이 실행이 안됌!
    }
    // 인풋폼에 메뉴의 이름을 입력받고 추가한다.
    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu.push({ name: espressoMenuName }); // 상태 배열값에 메뉴 추가
    store.setLocalStorage(this.menu); // 상태변화가 되었을때 데이터 저장
    const template = this.menu
      .map((item, index) => {
        return `
  <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item.name}</span>
      <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
       >
       수정
      </button>
      <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
       삭제
      </button>
  </li>`;
      })
      .join("");

    // 메뉴아이템 리스트 추가
    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
    // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
    $("#espresso-menu-name").value = "";
  };

  // 수정기능 함수
  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId; // data-menu-id 속성
    // e 객체를 받아서~
    // 타겟에 가장 가까운 부모 ".closest("li")" 로 가서
    // 그 안에있는 클래스 ".querySelector(".menu-name")"를 선택하는 방법
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    //.innerText -> 텍스트로 가져옴
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu); // 로컬스토리지에 업데이트
    // prompt가 바뀐값을 리턴한다.
    $menuName.innerText = updatedMenuName;
  };

  // 삭제기능 함수
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      // e.target.closest("li") ->  li태그 안의 전부를 가져옴
      // console.log(e.target.closest("li"));
      e.target.closest("li").remove(); // 삭제
      updateMenuCount(); // 총 갯수 카운터에 반영
    }
  };

  // 이벤트 위임 -> https://blog.makerjun.com/5326e691-16cf-43f9-8908-00cc586f0884
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      // 이벤트 타겟이 가지고 있는 클래스중에 menu-edit-button클래스가 포함되면
      // 수정버튼을 누른 경우만!
      updateMenuName(e); // e -> 이벤트 객체를 함수에 넘겨준다
    }

    if (e.target.classList.contains("menu-remove-button")) {
      // 삭제버튼을 누른 경우만!
      removeMenuName(e);
    }
  });

  // form태그가 자동으로 전송되는걸 막아준다.
  // -> form태그 때문에 엔터키 입력시 자동으로 새로고침 되기 때문
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴의 이름을 입력받는건 ID값 참조 "#아이디"

  // 확인버튼 이벤트
  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  // 엔터키 이벤트
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      // enter키를 안눌렀을때 종료가되고
      // enter키를 누르면 실행되고
      return;
    }
    addMenuName();
  });
}
new App(); // new 를 안쓰면 this.menu의 this 가 윈도우가 된다
