const fs = require('fs');

console.log("Start reading file...");

fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("File content:", data);
});

console.log("File read requested, doing other work...");
