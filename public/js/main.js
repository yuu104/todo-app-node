'use strict';

(() => {


  const todoForm = document.getElementById('todo_form');
  const add = document.getElementById('add');
  const subInp = document.querySelector('.sub_inp');
  const priorityFa = document.querySelector('.fa-list-ol');
  const sendTask = document.querySelector('.send_task');
  const taskUl = document.getElementById('task_ul');
  const compUl = document.getElementById('comp_ul');
  const taskTitle = document.querySelector('.task_title');
  const compTitle = document.querySelector('.comp_title');
  const priorityIcon = document.querySelector('.priority_icon');
  const priorityDialog = document.querySelector('.priority_dialog');
  const priorityLabel = document.querySelectorAll('.priority_label');
  const editBtn = document.querySelectorAll('.edit_btn');
  const editBox = document.querySelectorAll('.edit_box');
  const contPlanForm = document.querySelector('.cont_plan_form');
  const sendContPlan = document.querySelector('.send_cont_plan');
  const questionBtn = document.querySelector('.question_btn');
  const modalMask = document.getElementById('modal_mask');
  const modalContents = document.getElementById('modal_contents');
  const modalClose = document.querySelector('.modal_close');




  function inpCheck(sendItem, formName) {
    sendItem.addEventListener('click', () => {
      const inputs = formName.getElementsByTagName('input');
      for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value === '') {
          swal('入力されていない箇所があります');
          return;
        }
      }
      formName.submit();
    });
  }

  function noEvent(e) {
    e.preventDefault();
  }



  window.onload = function() { 
    if(taskUl.childElementCount) {
      taskTitle.style.display = 'inline-block';
    } else {
      taskTitle.style.display = 'none';
    }
    if(compUl.childElementCount) {
      compTitle.style.display = 'inline-block';
    } else {
      compTitle.style.display = 'none';
    }
  }



  inpCheck(sendTask, todoForm);
  inpCheck(sendContPlan, contPlanForm);

  taskTitle.addEventListener('click', () => {
    taskUl.classList.toggle('close');
    taskTitle.classList.toggle('close');
    document.querySelector('.tasks').classList.toggle('close');
  });

  compTitle.addEventListener('click', () => {
    compUl.classList.toggle('close');
    compTitle.classList.toggle('close');
    document.querySelector('.comps').classList.toggle('close');
  });

  priorityIcon.addEventListener('click', () => {
    if(priorityDialog.style.display === 'none') {
      priorityDialog.style.display = 'block';
    } else {
      priorityDialog.style.display = 'none';
    }
  });

  priorityLabel.forEach((e, index) => {
    e.addEventListener('click', () => {
      priorityDialog.style.display = 'none';
      if(index === 0) priorityFa.style.color = '#e13e39';
      if(index === 1) priorityFa.style.color = '#ffc817';
      if(index === 2) priorityFa.style.color = '#4b6fde';
      if(index === 3) priorityFa.style.color = '#dcdcdc';
    });
  });

  add.addEventListener('focus', () => {
    todoForm.style.border = '1px solid #6495ed'
    todoForm.style.backgroundColor = '#fff';
    subInp.style.display = 'flex';
    add.style.backgroundColor = '#fff';
  });

  document.addEventListener('click', (e) => {
    if(!e.target.closest('#todo_form')) {
      todoForm.style.border = 'none';
      subInp.style.display = 'none';
      add.style.backgroundColor = '#f5f5f5';
    }

    if(!e.target.closest('.priority_dialog') && !e.target.closest('.priority_icon')) {
      priorityDialog.style.display = 'none';
    }
  });

  for(let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', () => {
      editBox[i].style.display = 'block';
      if(editBox[i].style.display === 'block') {
        document.addEventListener('click', (e) => {
          if(!e.target.closest('.edit_box') && !e.target.closest(`#editBtn_${i}`)) {
            editBox[i].style.display = 'none';
          }
        });
      } 
    });
  }

  questionBtn.addEventListener('click', () => {
    modalMask.classList.remove('hidden');
    modalContents.classList.remove('hidden');
    document.addEventListener('touchmove', noEvent, { passive: false });
    document.addEventListener('mousewheel', noEvent, { passive: false });
  });

  modalMask.addEventListener('click', () => {
    modalMask.classList.add('hidden');
    modalContents.classList.add('hidden');
    document.removeEventListener('touchmove', noEvent, { passive: false });
    document.removeEventListener('mousewheel', noEvent, { passive: false });
  });

  modalClose.addEventListener('click', () => {
    modalMask.classList.add('hidden');
    modalContents.classList.add('hidden');
    document.removeEventListener('touchmove', noEvent, { passive: false });
    document.removeEventListener('mousewheel', noEvent, { passive: false });
  });































})();