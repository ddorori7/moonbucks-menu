// 로컬스토리지 관리
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
    // 문자열로만 저장이 되어야해서 JSON.stringify(menu)를 활용
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
    // 문자를 다시 JSON객체로 저장
  },
};
// 로컬스토리지 확인하는 방법 -> 개발자도구 - 애플리케이션 - 로컬스토리지

export default store;
