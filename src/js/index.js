// step1 요구사항 구현을 위한 전략

// TODO 메뉴 추가
// [o]- 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
// [o]- 메뉴의 이름을 입력받고 확인버튼을 클릭하면 추가한다.
// [o]- 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// [o]- 총 메뉴 갯수를 count하여 상단에 보여준다.
// [o]- 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// [o]- 사용자 입력값이 빈 값이라면 추가되지 않는다.

// 코드를 간결하게 쓰기위해 선언해줌
const $ = (selector) => document.querySelector(selector);
// ex)  document.querySelector("#espresso-menu-form") ->  $("#espresso-menu-form")
function App() {
  // TODO 메뉴 수정
  // [o]- 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴를 수정하는 모달창(prompt)이 뜬다.
  // [o]- 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.
  $("#espresso-menu-list").addEventListener("click", (e) => {
    // 이벤트 타겟이 가지고 있는 클래스중에 menu-edit-button클래스가 포함되면
    if (e.target.classList.contains("menu-edit-button")) {
      // 수정버튼을 누른 경우만!

      // 타겟에 가장 가까운 부모 ".closest("li")" 로 가서
      // 그 안에있는 클래스 ".querySelector(".menu-name")"를 선택하는 방법
      const $menuName = e.target.closest("li").querySelector(".menu-name");

      //.innerText -> 텍스트로 가져옴
      const updatedMenuName = prompt(
        "메뉴명을 수정하세요",
        $menuName.innerText
      );
      // prompt가 바뀐값을 리턴한다.
      $menuName.innerText = updatedMenuName;
    }
  });

  // form태그가 자동으로 전송되는걸 막아준다.
  // -> form태그 때문에 엔터키 입력시 자동으로 새로고침 되기 때문
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

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
    const menuItemTemplate = (espressoMenuName) => {
      return `
            <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    };
    // 템플릿을 HTML 안에 넣어주기 -> 여기까지만 하면 값이 대체되고 리스트가 추가가 안됌
    //   $("#espresso-menu-list").innerHTML = menuItemTemplate(espressoMenuName);
    // console.log(menuItemTemplate(espressoMenuName));
    // 해결방안(참조) -> https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML
    // Element.insertAdjacentHTML()
    // <!-- beforebegin -->
    // <p>
    // <!-- afterbegin -->
    // foo
    // <!-- beforeend -->
    // </p>
    // <!-- afterend -->
    // 메뉴아이템 리스트 추가
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );
    // 메뉴아이템 갯수 반영 -> CLASS참조 ".클래스이름"
    // li태그가 몇개있는지 세기로 -> querySelectorAll("li") 태그 전부 세기
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
    // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
    $("#espresso-menu-name").value = "";
  };

  // 메뉴의 이름을 입력받는건 ID값 참조 "#아이디"

  // 확인버튼 이벤트
  $("#espresso-menu-submit-button").addEventListener("click", (e) => {
    addMenuName();
  });

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
App();

// TODO 메뉴 삭제
// []- 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴삭제 컨펌 모달창이 뜬다.
// []- 확인 버튼을 클릭하면 메뉴가 삭제된다.
// []- 총 메뉴 갯수를 count하여 상단에 보여준다.
