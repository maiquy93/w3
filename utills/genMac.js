export default function genMAC() {
  var colours = new Array(
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  );
  // Make variable to hold 6 character HEX array
  var partA = new Array(1);
  var partB = new Array(1);
  var partC = new Array(1);
  var partD = new Array(1);
  var partE = new Array(1);
  var partF = new Array(1);
  var mac_address = "";
  for (let i = 0; i < 2; i++) {
    partA[i] = colours[Math.round(Math.random() * 14)];
  }
  for (let i = 0; i < 2; i++) {
    partB[i] = colours[Math.round(Math.random() * 14)];
  }
  for (let i = 0; i < 2; i++) {
    partC[i] = colours[Math.round(Math.random() * 14)];
  }
  for (let i = 0; i < 2; i++) {
    partD[i] = colours[Math.round(Math.random() * 14)];
  }
  for (let i = 0; i < 2; i++) {
    partE[i] = colours[Math.round(Math.random() * 14)];
  }
  for (let i = 0; i < 2; i++) {
    partF[i] = colours[Math.round(Math.random() * 14)];
  }
  mac_address =
    partA[0] +
    partA[1] +
    ":" +
    partB[0] +
    partB[1] +
    ":" +
    partC[0] +
    partC[1] +
    ":" +
    partD[0] +
    partD[1] +
    ":" +
    partE[0] +
    partE[1] +
    ":" +
    partF[0] +
    partF[1];
  return mac_address;
}
