'use strict';


const btn = document.querySelector('#generate');
const loginInput = document.querySelector('#login');

const result = document.querySelector('#result');

const localStorageLog = document.querySelector('#local-storage-log');

const generateIntraLogin = (value) => {
	const login = value.toLowerCase();
	const strs = login.split(' ');

	if (strs.length < 2) {
		throw new Error('Login must contain at least 2 words');
	}

	const firstName = strs[0];
	const lastName = strs[strs.length - 1];

	// TODO: handle middle names
	// const middleNameList = strs.slice(1, strs.length - 1);


	let firstNameIndex = 1;
	let tailNumber = 1;

	let candidate;

	const listValue = localStorage.getItem('list') ?? '[]';
	const list = JSON.parse(listValue);

	while (candidate === undefined || list.includes(candidate)) {

		const firstNameCandidate = firstName.slice(0, firstNameIndex);

		candidate = `${firstNameCandidate}${lastName}`;

		const tailNumberLength = tailNumber > 1 ? tailNumber.toString().length : 0;

		if (candidate.length + tailNumberLength > 8) {
			candidate = candidate.slice(0, 8 - tailNumberLength);
		}

		candidate += tailNumber > 1 ? tailNumber.toString() : '';
		
		firstNameIndex++;

		if (firstNameIndex > firstName.length) {
			firstNameIndex = 1;
			tailNumber++;
		}
	}

	return candidate;
}

const handleClick = (e) => {
	  e.preventDefault();

	  const listValue = localStorage.getItem('list') ?? '[]';

	  const list = JSON.parse(listValue);

	  const { value } = loginInput;

	  let newLogin;

	  try {
		newLogin = generateIntraLogin(value);		
	  } catch (e) {
		alert(e.message);
		return;
	  }

	  result.innerHTML = `Your login is: ${newLogin}`;

	  const newList = [...list, newLogin];

	  localStorage.setItem('list', JSON.stringify(newList));

	  localStorageLog.innerHTML = '';
	  newList.map((login) => {
		const item = document.createElement('li');
		item.innerText = login;
		localStorageLog.appendChild(item);
	  });

	  return newLogin;
};

btn.addEventListener('click', handleClick);
