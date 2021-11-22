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
// [o] 메뉴를 수정할 때
// [o] 메뉴를 삭제할 때
// [o] localStorage에 있는 데이터를 읽어온다.
/* 
localStorage.setItem("menu","espresso") 
-> 로컬스토리지에 데이터 저장(키, 값)
localStorage.getItem("menu") -> 로컬스토리지에서 데이터 가져오기(키)
'espresso' 
*/

// TODO 카테고리별 메뉴판 관리
// [o] 에스프레소 메뉴판 관리
// [o] 프라푸치노 메뉴판 관리
// [o] 블렌디드 메뉴판 관리
// [o] 티바나 메뉴판 관리
// [o] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// [o] 페이지가 최초로 로딩될때 localStorage 에서 에스프레소 메뉴를 읽어온다.
// [o] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// [ ] 품절 버튼을 추가한다.
// [ ] 품절 버튼을 클릭하면 localStorage에 상태값이 저장도니다.
// [ ] 클릭이벤트에서 가장가까운 li태그의 class속성 값에 sold-out 을 추가한다.

import { $ } from "./utils/dom.js";
import store from "./store/index.js";
import MenuApi from "./api/index.js";

// step3 요구사항 - 서버와의 통신을 통해 메뉴 관리하기

// TODO 서버 요청 부분
// [O] 웹 서버를 띄운다
// [o] 서버에 새로운 메뉴가 추가될 수 있게 요청한다.
// [o] 서버에서 카테고리별 메뉴리스트를 불러온다.
// [O] 서버에 메뉴가 수정 될 수 있도록 요청한다.
// [o] 서버에 메뉴의 품절 상태를 토글할 수 있도록 요청한다.
// [O] 서버에 메뉴가 삭제 될 수 있도록 요청한다.

// TODO 리펙터링 부분
// [o] localStorage에 저장하는 로직은 지운다.
// [o] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

// TODO 사용자 경험
// [O] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외처리를 진행한다.
// [o] 중복되는 메뉴는 추가할 수 없다.

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  // 갯수는 업데이트만 되면 되지 메뉴명의 길이로 구하면 되서 관리할 대상 아님.
  this.menu = {
    // 객체의 키값
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  }; // -> 상태값선언, 초기화
  this.currentCategory = "espresso"; // 현재카테고리(기본값 espresso)

  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    render();
    initEventListeners();
  };

  const render = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    const template = this.menu[this.currentCategory]
      .map((menuItem) => {
        return `
    <li data-menu-id="${
      menuItem.id
    }" class="menu-list-item d-flex items-center  py-2">
          <span class="${
            menuItem.isSoldOut ? "sold-out" : ""
          } w-100 pl-2 menu-name">${menuItem.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
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
    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    // 메뉴아이템 갯수 반영 -> CLASS참조 ".클래스이름"
    // li태그가 몇개있는지 세기로 -> querySelectorAll("li") 태그 전부 세기
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 두가지 이벤트에서 재사용할 수 있는 함수 만들기
  const addMenuName = async (e) => {
    // 사용자 입력값이 빈 값이라면 추가되지 않는다.
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요."); // 여기까지만 하면 뒷부분이 실행되서 빈값이 목록에 추가됌
      // 해결하기 위해서는 return해주면됌
      return; // 뒷부분이 실행이 안됌!
    }
    // 인풋폼에 메뉴의 이름을 입력받고 추가한다.
    const menuName = $("#menu-name").value;
    const duplicatedItem = this.menu[this.currentCategory].find(
      (menuItem) => menuItem.name === menuName
    );
    if (duplicatedItem) {
      alert("이미 등록된 메뉴입니다. 다시 입력해주세요.");
      $("#menu-name").value = "";
      return;
    }

    await MenuApi.createMenu(this.currentCategory, menuName);
    render();
    $("#menu-name").value = "";
  };

  // 수정기능 함수
  const updateMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId; // data-menu-id 속성에 접근(.dataset.menuId)
    // e 객체를 받아서~
    // 타겟에 가장 가까운 부모 ".closest("li")" 로 가서
    // 그 안에있는 클래스 ".querySelector(".menu-name")"를 선택하는 방법
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    //.innerText -> 텍스트로 가져옴
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText); // prompt가 바뀐값을 리턴한다.
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);
    render();
  };

  // 삭제기능 함수
  const removeMenuName = async (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId; // data-menu-id 속성에 접근(.dataset.menuId)
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      render();
    }
  };

  // 품절기능 함수
  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
  };

  // 카테고리 변경 함수
  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      // html 속성 가져오기 ->  data-category-name="속성값"
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  };

  // 이벤트 리스너 모음 함수
  const initEventListeners = () => {
    // 이벤트 위임 -> https://blog.makerjun.com/5326e691-16cf-43f9-8908-00cc586f0884
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        // 이벤트 타겟이 가지고 있는 클래스중에 menu-edit-button클래스가 포함되면
        // 수정버튼을 누른 경우만!
        updateMenuName(e); // e -> 이벤트 객체를 함수에 넘겨준다
        return; // return을 붙이면 불필요한 아래의 연산을 할 필요가 없어진다(습관들이기)
      }

      if (e.target.classList.contains("menu-remove-button")) {
        // 삭제버튼을 누른 경우만!
        removeMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    // form태그가 자동으로 전송되는걸 막아준다.
    // -> form태그 때문에 엔터키 입력시 자동으로 새로고침 되기 때문
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // 확인버튼 이벤트
    $("#menu-submit-button").addEventListener("click", addMenuName);

    // 엔터키 이벤트
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        // enter키를 안눌렀을때 종료가되고
        // enter키를 누르면 실행되고
        return;
      }
      addMenuName();
    });

    // 카테고리 메뉴 선택시 바뀌게
    $("nav").addEventListener("click", changeCategory);
  };
}
const app = new App(); // new 를 안쓰면 this.menu의 this 가 윈도우가 된다
app.init();
