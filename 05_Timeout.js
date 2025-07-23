console.log("Start");

setTimeout(() => {
  console.log("1 second timeout");
}, 1000);

setTimeout(() => {
  console.log("0 second timeout");
}, 0);

console.log("End");
