export function randomStr() {
  const len = 20;
  const arr = "1234567890abcdefghijklmnopqrstuvw";
  let id = "";
  for (let i = len; i > 0; i--) {
    id += arr[Math.floor(Math.random() * arr.length)];
  }
  console.log(id);
  return id;
}
