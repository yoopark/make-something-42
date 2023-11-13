'use strict';


const btn = document.querySelector('#generate');
const loginInput = document.querySelector('#login');

const result = document.querySelector('#result');

const localStorageLog = document.querySelector('#local-storage-log');

const generateIntraLogin = (value) => {
	return "abc";
}

const handleClick = (e) => {
	  e.preventDefault();

	  const listValue = localStorage.getItem('list') ?? '[]';

	  const list = JSON.parse(listValue);

	  console.log(list);

	  const { value } = loginInput;

	  const newLogin = generateIntraLogin(value);

	  result.innerHTML = `Your login is: ${newLogin}`;

	  const newList = [...list, newLogin];

	  localStorage.setItem('list', JSON.stringify(newList));

	  localStorageLog.innerHTML = '';
	  newList.map((login) => {
		const item = document.createElement('li');
		item.innerText = login;
		localStorageLog.appendChild(item);
	  });	  
};

btn.addEventListener('click', handleClick);
