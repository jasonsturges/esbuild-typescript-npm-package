import { isOdd } from "../src/index";

// Test your library here
console.log("isOdd(3):", isOdd(3));
console.log("isOdd(4):", isOdd(4));

document.getElementById("root")!.innerHTML = `
  <p>isOdd(3): ${isOdd(3)}</p>
  <p>isOdd(4): ${isOdd(4)}</p>
`;
