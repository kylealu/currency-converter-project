let ratesData = {}; // To store rates from API

// Fetch rates once when page loads and fill dropdowns
window.onload = function() {
  fetch("https://open.er-api.com/v6/latest/USD")
    .then(response => response.json())
    .then(data => {
      ratesData = data.rates;
      fillDropdowns(ratesData);
    })
    .catch(error => {
      console.error("Error fetching rates:", error);
      document.getElementById("result").innerText = "Failed to load currency data.";
    });
};

function fillDropdowns(rates) {
  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");

  // Clear existing options (if any)
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  for (const currency in rates) {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.text = currency;
    fromSelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.text = currency;
    toSelect.appendChild(optionTo);
  }

  // Set default selections
  fromSelect.value = "USD";
  toSelect.value = "EUR";
}

function convertCurrency() {
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!amount || amount <= 0) {
    document.getElementById("result").innerText = "Please enter a valid amount greater than 0.";
    return;
  }

  // Calculate conversion
  // Since API rates are relative to USD,
  // first convert from 'fromCurrency' to USD, then from USD to 'toCurrency'

  // Handle case if currencies are USD (rate = 1)
  const rateFrom = fromCurrency === "USD" ? 1 : ratesData[fromCurrency];
  const rateTo = toCurrency === "USD" ? 1 : ratesData[toCurrency];

  if (!rateFrom || !rateTo) {
    document.getElementById("result").innerText = "Currency not found.";
    return;
  }

  // Convert amount to USD first, then to target currency
  const amountInUSD = amount / rateFrom;
  const convertedAmount = amountInUSD * rateTo;

  document.getElementById("result").innerText =
    `${amount} ${fromCurrency} = ${convertedAmount.toFixed(4)} ${toCurrency}`;
}
