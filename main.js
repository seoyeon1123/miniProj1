// DOM 요소 선택
const $addBtn = document.querySelector('#add-btn');
const $inputBox = document.querySelector('#input-box');
const $todoList = document.querySelector('#to-do-list');
const $deleteBtn = document.querySelector('#delete-all-btn');
const $listCount = document.querySelector('#todoList-count');

// 할 일 목록 배열
let todoList = [];

// 새로운 할 일 추가 이벤트
// $addBtn 이벤트 리스너에서 수정
$addBtn.addEventListener('click', function () {
  if ($inputBox.value.trim() !== '') {
    const todoItem = {
      key: Date.now(),
      value: $inputBox.value.trim(),
    };

    todoList.push(todoItem);
    localStorage.setItem('todoList', JSON.stringify(todoList)); // 새로운 항목을 로컬 스토리지에 저장

    renderTodoItem(todoItem); // 새로운 항목을 목록에 추가
    updateListCount(); // 목록 개수 업데이트

    $inputBox.value = ''; // 입력 상자 초기화
  }
});

// 전체 삭제 버튼 클릭 이벤트
$deleteBtn.addEventListener('click', function () {
  // 할 일 목록 초기화
  todoList = [];
  // 로컬 스토리지 업데이트
  updateLocalStorage();
  // 목록 UI 업데이트
  $todoList.innerHTML = '';
  // 목록 개수 업데이트
  updateListCount();
});

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  const storedList = JSON.parse(localStorage.getItem('todoList'));
  if (storedList) {
    todoList = storedList;
    todoList.forEach(renderTodoItem); // 여기서 renderTodoItem 함수를 호출하여 목록을 생성합니다.
  }
  updateListCount();
});

// 할 일 목록 업데이트 함수
function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// 할 일 목록 개수 업데이트 함수
function updateListCount() {
  const itemCount = $todoList.querySelectorAll('li').length;
  $listCount.textContent = itemCount + ' tasks';
  if (itemCount === 0) {
    $listCount.textContent = 'tasks';
  }
}

// 할 일 아이템 렌더링 함수
function renderTodoItem(todoItem) {
  const $li = document.createElement('li');
  const $deleteIcon = document.createElement('i');
  $li.textContent = todoItem.value;
  $deleteIcon.classList.add('delete-icon', 'fas', 'fa-trash-alt');
  $li.appendChild($deleteIcon);
  $todoList.appendChild($li);

  $deleteIcon.addEventListener('click', () => {
    $li.remove();
    const index = todoList.findIndex((item) => item.key === todoItem.key);
    if (index !== -1) {
      todoList.splice(index, 1);
      updateLocalStorage();
      updateListCount();
    }
  });
}

// 입력 필드 감지 이벤트
$inputBox.addEventListener('keyup', function (e) {
  if (e.target.value.trim() !== '') {
    $addBtn.classList.add('active');
  } else {
    $addBtn.classList.remove('active');
  }
});
