const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(getString);
console.log(myInfo);

console.log(myInfo.get('first'));