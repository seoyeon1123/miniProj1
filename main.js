//작성하기
//삭제하기
//전체삭제
//리스트 보여주기

//css를 사용할 때에는 class를, js를 사용할 때에는 id를

const $addBtn = document.querySelector('#add-btn');
const $inputBox = document.querySelector('#input-box');
const $todoList = document.querySelector('#to-do-list');
const $deleteBtn = document.querySelector('#delete-all-btn');
const $listCount = document.querySelector('#todoList-count');

$addBtn.addEventListener('click', function () {
  if ($inputBox.value.trim() !== '') {
    const $li = document.createElement('li');
    const $deleteIcon = document.createElement('i');

    $li.textContent = $inputBox.value.trim();
    $deleteIcon.classList.add('delete-icon', 'fas', 'fa-trash-alt');

    $li.appendChild($deleteIcon);
    $todoList.appendChild($li);
    $inputBox.value = '';

    // 삭제 아이콘을 클릭하면 리스트가 삭제되도록 이벤트 추가
    $deleteIcon.addEventListener('click', function () {
      $todoList.removeChild($li);
      updateListCount(); // 항목이 삭제될 때마다 목록의 개수 업데이트
    });

    updateListCount(); // 항목이 추가될 때마다 목록의 개수 업데이트
  }
});

//전체 삭제 버튼 (리스트 개수 업데이트)
$deleteBtn.addEventListener('click', function () {
  while ($todoList.firstChild) {
    $todoList.removeChild($todoList.firstChild);
  }

  updateListCount();
});

//리스트 업데이트
function updateListCount() {
  const itemCount = $todoList.querySelectorAll('li').length;
  $listCount.textContent = itemCount + ' tasks'; // 목록의 개수를 "tasks" 뒤에 추가하여 업데이트합니다.
  if (itemCount === 0) {
    $listCount.textContent = 'tasks';
  }
}

$inputBox.addEventListener('keyup', function (e) {
  if (e.target.value.trim() !== '') {
    $addBtn.classList.add('active');
  } else {
    $addBtn.classList.remove('active');
  }
});
