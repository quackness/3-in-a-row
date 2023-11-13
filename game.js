async function fetchGameAPI() {
  const response = await fetch('https://prog2700.onrender.com/threeinarow/sample');
  // waits until the request completes...
  console.log(response);
}
fetchGameAPI();