'use strict';


const btn = document.querySelector('#generate');
const loginInput = document.querySelector('#login');

const result = document.querySelector('#result');

const generateIntraLogin = (value) => {
	return ["abc", "def", "ghi"];
}

const handleClick = (e) => {
	  e.preventDefault();

	  const { value } = loginInput;

	  const names = generateIntraLogin(value);

	  names.map((name) => {
		const li = document.createElement('li');
		li.textContent = name;
		result.appendChild(li);
	  });
};

btn.addEventListener('click', handleClick);
