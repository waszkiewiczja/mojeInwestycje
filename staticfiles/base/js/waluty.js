let wszystkieWalutyKurs = [];

const apiCenyWalut = `https://api.nbp.pl/api/exchangerates/tables/A/`;

fetch(apiCenyWalut)
  .then((response) => {
    return response.json();
  })
  .then((dane) => {
    // const { currency } = dane.rates;
    for (let i = 0; i < dane[0].rates.length; i++) {
      wszystkieWalutyKurs.push(dane[0].rates[i].mid.toFixed(2));
    }
  });
//

const bazaWaluty = [
  "BAT (TAJLANDIA)",
  "DOLAR AMERYKAŃSKI",
  "DOLAR AUSTRALIJSKI",
  "DOLAR HONGKONGU",
  "DOLAR KANADYJSKI",
  "DOLAR NOWOZELANDZKI",
  "DOLAR SINGAPURSKI",
  "EURO",
  "FORINT (WĘGRY)",
  "FRANK SZWAJCARSKI",
  "FUNT SZTERLING",
  "HRYWNA (UKRAINA)",
  "JEN (JAPONIA)",
  "KORONA CZESKA",
  "KORONA DUŃSKA",
  "KORONA ISLANDZKA",
  "KORONA NORWESKA",
  "KORONA SZWEDZKA",
  "KUNA (CHORWACJA)",
  "LEJ RUMUŃSKI",
  "LEW (BUŁGARIA)",
  "LIRA TURECKA",
  "NOWY IZRAELSKI SZEKEL",
  "PESO CHILIJSKIE",
  "PESO FILIPIŃSKIE",
  "PESO MEKSYKAŃSKIE",
  "RAND (REPUBLIKA POŁUDNIOWEJ AFRYKI)",
  "REAL (BRAZYLIA)",
  "RINGGIT (MALEZJA)",
  "RUBEL ROSYJSKI",
  "RUPIA INDONEZYJSKA",
  "RUPIA INDYJSKA",
  "WON POŁUDNIOWOKOREAŃSKI",
  "YUAN RENMINBI (CHINY)",
  "SDR (MFW)",
];

const wszystkieWalutyKod = [
  "THB",
  "USD",
  "AUD",
  "HKD",
  "CAD",
  "NZD",
  "SGD",
  "EUR",
  "HUF",
  "CHF",
  "GBP",
  "UAH",
  "JPY",
  "CZK",
  "DKK",
  "ISK",
  "NOK",
  "SEK",
  "HRK",
  "RON",
  "BGN",
  "TRY",
  "ILS",
  "CLP",
  "PHP",
  "MXN",
  "ZAR",
  "BRL",
  "MYR",
  "RUB",
  "IDR",
  "INR",
  "KRW",
  "CNY",
  "XDR",
];
