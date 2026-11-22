// អត្រាជារៀល/ម៉ោង: [រហូតដល់ 8h, លើស 8h]
const RATES = { car: [500, 1000], moto: [200, 300] };
const LIMIT_HOURS = 8;
const RIEL_PER_USD = 4000;

function toMinutes(value) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

document.getElementById("calc").addEventListener("click", () => {
  const vehicle = document.getElementById("vehicle").value;
  const tin  = document.getElementById("tin").value;
  const tout = document.getElementById("tout").value;
  const msg  = document.getElementById("msg");
  const riel = document.getElementById("riel");
  const usd  = document.getElementById("usd");

  if (!tin || !tout) {
    msg.textContent = "សូមបញ្ចូលម៉ោងចូល និងម៉ោងចេញ";
    riel.value = usd.value = "";
    return;
  }
  msg.textContent = "";

  let minutes = toMinutes(tout) - toMinutes(tin);
  if (minutes <= 0) minutes += 24 * 60;      // ចេញថ្ងៃបន្ទាប់

  const hours = Math.ceil(minutes / 60);     // បង្គត់ឡើងជាម៉ោងពេញ
  const [normal, over] = RATES[vehicle];
  const rate  = hours > LIMIT_HOURS ? over : normal;
  const total = hours * rate;

  riel.value = total.toLocaleString("en-US");
  usd.value  = (total / RIEL_PER_USD).toFixed(2);
  msg.textContent = hours + " h × " + rate.toLocaleString("en-US") + "៛";
});
