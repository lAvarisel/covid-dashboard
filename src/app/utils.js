export default async function getCovidData() {
  const response = await fetch("https://api.covid19api.com/");
  const data = await response.json();
  return data;
}
