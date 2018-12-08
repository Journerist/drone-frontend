export function transmitMotorInformationToServer(motors = []) {

  const url = new URL("http://192.168.178.79");

  motors.forEach( (m, i) => url.searchParams.append('motor' + m.getIndex(), m.getSpeed()));

  fetch(url);
}

const fetchRetry = async (url, n) => {
  const options = {};
  try {
    return await fetch(url, options);
  } catch(err) {
    if (n === 1) throw err;
    return await fetchRetry(url, options, n - 1);
  }
};