let praweGlowne = document.querySelector(".main-right");
const leweGlowne = document.querySelector(".main-left");
const kartaDodaj = document.body.querySelector(".dodaj");
const btndodaj = document.body.querySelector("#potwiedzenieInwest");
let allKarta = document.body.querySelectorAll(".karta");
let allDodatkowa = document.body.querySelectorAll(".dodatkowa");
let allDodatkowedane = document.body.querySelectorAll(".dodatkowedane");
let i = 0;

//Cookie test
// const btnCookie = document.querySelector("#btncookie");
// btnCookie.addEventListener("click", () => {
//   console.log("test");
//   document.cookie = "tesgddfgdt=922";
//   document.cookie = "ebka=922";
// Gdy są polskie znaki w cookie, to wywala całą strone
// document.cookie = "testę=666";

// Sat, 1 Jan 2022 00:00:00 GMT
// });

// const app = require("express")();
// app.get("/", (req, res) => {
//   res.setHeader("set-cookie", ["setfromserver=1"]);
//   res.sendFile(`${__dirname}/index.html`);
// });
// app.listen(8080, () => console.log("Port 8080"));

//Sprawdzanie istniejących cookie
//

//
//Wczytywanie zapisanych cookie
//
let mojeCookie;
let cookieMoichInwestycjiNazwa = [];
let cookieMoichInwestycjiRodzaj = [];
let licznikMoichInwestycji = 0;

// document.addEventListener("DOMContentLoaded", function () {
//   mojeCookie = document.cookie.split(";");
//   mojeCookie = mojeCookie.map((x) => x.trim());
//   console.log(mojeCookie);

//   let cookieMoichInwestycjiIstnieje = false;

//   mojeCookie.forEach((singleC) => {
//     pojedynczyCookieNazwa = singleC.split("=")[0];
//     // console.log(pojedynczyCookieNazwa);
//     pojedynczyCookieRodzaj = singleC.split("=")[1];
//     // console.log(pojedynczyCookieRodzaj);

//     if (pojedynczyCookieRodzaj == 0) {
//       console.log("Usunięty cookie - nie powinien się wyświetlać");
//     } else if (pojedynczyCookieRodzaj == 1) {
//       // console.log("Złoto");
//       cookieMoichInwestycjiIstnieje = true;
//       licznikMoichInwestycji++;
//       cookieMoichInwestycjiNazwa.push(pojedynczyCookieNazwa);
//       cookieMoichInwestycjiRodzaj.push(pojedynczyCookieRodzaj);
//     } else if (pojedynczyCookieRodzaj == 2) {
//       // console.log("Akcje");
//       cookieMoichInwestycjiIstnieje = true;
//       licznikMoichInwestycji++;
//       cookieMoichInwestycjiNazwa.push(pojedynczyCookieNazwa);
//       cookieMoichInwestycjiRodzaj.push(pojedynczyCookieRodzaj);
//     } else if (pojedynczyCookieRodzaj == 3) {
//       // console.log("waluty");
//       cookieMoichInwestycjiIstnieje = true;
//       licznikMoichInwestycji++;
//       cookieMoichInwestycjiNazwa.push(pojedynczyCookieNazwa);
//       cookieMoichInwestycjiRodzaj.push(pojedynczyCookieRodzaj);
//     } else if (pojedynczyCookieRodzaj == 4) {
//       // console.log("waluty");
//       cookieMoichInwestycjiIstnieje = true;
//       licznikMoichInwestycji++;
//       cookieMoichInwestycjiNazwa.push(pojedynczyCookieNazwa);
//       cookieMoichInwestycjiRodzaj.push(pojedynczyCookieRodzaj);
//     } else {
//       console.log("Brak zapisanych cookie - pierwszy raz na stronie");
//     }
//   });

//   //Tworzenie karty bez zawartości, ktora będzie wczytana pozniej
//   for (let i = 0; i < licznikMoichInwestycji; i++) {
//     if (cookieMoichInwestycjiIstnieje) {
//       const newKarta = document.createElement("div");
//       newKarta.classList.add("karta");
//       newKarta.innerHTML = `
//           <div class="usun">X</div>
//           <div class="glowna">
//               <div class="kursczego">${cookieMoichInwestycjiNazwa[i]}:
//               </div>
//               <div class="kursdzis" id="kurs ${cookieMoichInwestycjiNazwa[i]}">
//                 00.00 zł
//               </div>
//           </div>
//           <div class="dodatkowa">+</div>
//           <div class="dodatkowedane">
//               <div class="datazakupu">1.1.2019</div>
//               <div class="ilosczakupu">1</div>
//               <div class="cenazakupu">201.12</div>
//               <div class="zyskzakupu">20.92</div>
//           </div>
//           `;
//       praweGlowne.appendChild(newKarta);
//       kartaDodaj.remove();
//       praweGlowne.appendChild(kartaDodaj);

//       praweGlowne = document.body.querySelector(".praweGlowne");
//       allKarta = document.body.querySelectorAll(".karta");
//       allDodatkowa = document.body.querySelectorAll(".dodatkowa");
//       allDodatkowedane = document.body.querySelectorAll(".dodatkowedane");

//       //
//       // Wczytanie aktualnego kursu kart zapisanych w cookie
//       //

//       //
//       //Złoto:
//       if (cookieMoichInwestycjiRodzaj[i] == 1) {
//         //
//         //Akcje:
//       } else if (cookieMoichInwestycjiRodzaj[i] == 2) {
//         let indexTemp = bazaAkcji.indexOf(cookieMoichInwestycjiNazwa[i]);

//         //Pobieranie Excel
//         let url = "akcjetest.xlsx";
//         let req = new XMLHttpRequest();
//         req.open("GET", url, true);
//         req.responseType = "arraybuffer";
//         req.onload = function (e) {
//           let data = new Uint8Array(req.response);
//           let workbook = XLSX.read(data, { type: "array" });
//           let first_sheet_name = workbook.SheetNames[0];
//           let worksheet = workbook.Sheets[first_sheet_name];

//           newKarta.childNodes[3].childNodes[3].innerText = `${
//             XLSX.utils.sheet_to_json(worksheet)[indexTemp].Kurs
//           } zł`;
//         };
//         req.send();

//         //
//         //Waluty:
//       } else if (cookieMoichInwestycjiRodzaj[i] == 3) {
//         let indexTemp = bazaWaluty.indexOf(cookieMoichInwestycjiNazwa[i]);

//         // Program się wywala gdy w nazwie waluty są polskie znaki np [dolar amerykański]
//         fetch(`https://api.nbp.pl/api/exchangerates/tables/A/`)
//           .then((response) => {
//             return response.json();
//           })
//           .then((dane) => {
//             newKarta.childNodes[3].childNodes[3].innerText = `${dane[0].rates[
//               indexTemp
//             ].mid.toFixed(2)} zł`;
//           });
//         //
//         //Kryptowaluty:
//       } else if (cookieMoichInwestycjiRodzaj[i] == 4) {
//         let indexTemp = bazaKryptowalut.indexOf(cookieMoichInwestycjiNazwa[i]);

//  Bitcoin API - by działało na lokalnym serwerze musi być przy użyciu cors-anywhere
//  https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
//         const proxy = `https://cors-anywhere.herokuapp.com/`;
//         const apiKryptowaluty = `${proxy}https://bitbay.net/API/Public/${cookieMoichInwestycjiNazwa[i]}PLN/orderbook.json`;

//         fetch(apiKryptowaluty)
//           .then((response) => {
//             return response.json();
//           })
//           .then((dane) => {
//             for (let i = 0; i < 1; i++) {
//               newKarta.childNodes[3].childNodes[3].innerText = `${dane.asks[0][0]} zł`;
//             }
//           });
//       }
//     }
//   }
// });

//
//
//
// let praweGlowne = document.body.querySelector(".praweGlowne");
// const kartaDodaj = document.body.querySelector(".dodaj");
// const btndodaj = document.body.querySelector("#btndodaj");
// let allKarta = document.body.querySelectorAll(".karta");
// let allDodatkowa = document.body.querySelectorAll(".dodatkowa");
// let allDodatkowedane = document.body.querySelectorAll(".dodatkowedane");
// let i = 0;

let aktualnyKurs;
let wybrrodzaj;
let wybrierzRodzajDoCookie;

// Rozwiajna lista wybor inwestycji
// Wybor rodzaju inwestycji
let rodzajinwestycji = document.querySelector(".rodzajinwestycji");
let wybranaInwestycja = document.querySelector("#wybranaInwestycja");
let wybranaPojedynczaInwestycja = document.querySelector(
  ".wybranaPojedynczaInwestycja"
);
let btnDodajInwestycje = document.body.querySelectorAll(".btnDodajInwestycje");
const modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".modal-close");
let dodatkowaDolna = document.querySelectorAll(".dodatkowadolna");
let dodajInwerstycjeIndex;

// Wyswietlanie option inwestycji
// rodzajinwestycji.addEventListener("change", () => {
//   let szczegolyInwestycji = document.querySelector("#szczegolyInwestycji");
//   let sszczegolyInwestycjioption = document.querySelectorAll(
//     "#szczegolyInwestycji option"
//   );

//   sszczegolyInwestycjioption.forEach((single) => {
//     single.remove();
//   });

//   // Dane do prawidlowego dodania wybranego rodzaju inwestycji
//   let wybrinw = [];

//   if (
//     rodzajinwestycji.options[rodzajinwestycji.selectedIndex].text === "Akcje"
//   ) {
//     wybrinw = bazaAkcji;
//     wybrrodzaj = "Akcje";
//   } else if (
//     rodzajinwestycji.options[rodzajinwestycji.selectedIndex].text === "Złoto"
//   ) {
//     wybrinw = bazaZloto;
//     wybrrodzaj = "Złoto";
//   } else if (
//     rodzajinwestycji.options[rodzajinwestycji.selectedIndex].text === "Waluty"
//   ) {
//     wybrinw = bazaWaluty;
//     wybrrodzaj = "Waluty";
//   } else if (
//     rodzajinwestycji.options[rodzajinwestycji.selectedIndex].text ===
//     "Kryptowaluty"
//   ) {
//     wybrinw = bazaKryptowalut;
//     wybrrodzaj = "Kryptowaluty";
//   }

//   // Wyswietlanie wybranej inwestycji
//   wybrinw.forEach((wybr) => {
//     const newWybr = document.createElement("option");
//     newWybr.setAttribute("value", `${wybr}`);
//     newWybr.innerHTML = `${wybr}`;
//     szczegolyInwestycji.appendChild(newWybr);
//   });

//   szczegolyInwestycji.addEventListener("change", () => {
//     wybranaPojedynczaInwestycja.innerText =
//       szczegolyInwestycji.options[szczegolyInwestycji.selectedIndex].text;
//   });
// });

// Dodawanie nowej karty
//
let obecnyKurs;
// btndodaj.addEventListener("click", function () {
//   const newKarta = document.createElement("div");
//   newKarta.classList.add("karta");
//   console.log(wybranaPojedynczaInwestycja.innerText);

//   if (wybrrodzaj === "Złoto") {
//     wybrierzRodzajDoCookie = 1;
//   } else if (wybrrodzaj === "Akcje") {
//     wybrierzRodzajDoCookie = 2;
//   } else if (wybrrodzaj === "Waluty") {
//     wybrierzRodzajDoCookie = 3;
//   } else if (wybrrodzaj === "Kryptowaluty") {
//     wybrierzRodzajDoCookie = 4;
//   }

//   // Utworzenie zawartości nowej karty
//   const zawartoscNowejKart = function () {
//     newKarta.innerHTML = `
//     <div class="usun">X</div>
//     <div class="glowna">
//         <div class="kursczego">
//           ${wybranaPojedynczaInwestycja.innerText} :
//         </div>

//         <div class="kursdzis" id="kurs ${wybranaPojedynczaInwestycja.innerText}">
//           00.00 zł
//         </div>
//         <div class='kursspadek'> <b>-0,00%</b> <br>  -0,00 zł  </div>
//     </div>
//     <div class="dodatkowa">+</div>
//     <div class="dodatkowedane">
//     <div class="dodatkowagorna">Szczegóły inwestycji:</div>
//     <div class="dodatkowadolna">
//       <div class="datazakupu">2021-01-30</div>
//       <div class="ilosczakupu">1000</div>
//       <div class="cenazakupu">5,02</div>
//       <div class="zyskzakupu">200</div>
//     </div>
//     <div class="dodatkowaponizej">
//     <button class="btnDodajInwestycje btndodajszczeg">Dodaj inwestycję</button>
//     </div>
//     </div>

//     `;
//     // document.cookie = `${wybranaPojedynczaInwestycja.innerText}=${wybrierzRodzajDoCookie}`;
//   };
//   zawartoscNowejKart();

//   i++;
//   praweGlowne.appendChild(newKarta);
//   kartaDodaj.remove();
//   praweGlowne.appendChild(kartaDodaj);
//   praweGlowne = document.body.querySelector(".praweGlowne");
//   allKarta = document.body.querySelectorAll(".karta");
//   allDodatkowa = document.body.querySelectorAll(".dodatkowa");
//   allDodatkowedane = document.body.querySelectorAll(".dodatkowedane");
//   btnDodajInwestycje = document.body.querySelectorAll(".btnDodajInwestycje");
//   dodatkowaDolna = document.querySelectorAll(".dodatkowadolna");

//   //
//   //Dynamiczne dodawanie obecnegoKursu

//   if (wybrrodzaj === "Złoto") {
//     let indexTemp = bazaZloto.indexOf(wybranaPojedynczaInwestycja.innerText);
//     console.log(indexTemp);
//     if (indexTemp === 1 || indexTemp === 2 || indexTemp === 3) {
//       fetch(`https://api.nbp.pl/api/cenyzlota/`)
//         .then((response) => {
//           return response.json();
//         })
//         .then((dane) => {
//           let { cena } = dane[0];
//           // 1 gram:
//           if (indexTemp === 1) {
//             newKarta.childNodes[3].childNodes[3].innerText = `${cena} zł`;
//             newKarta.childNodes[3].childNodes[5].innerText = `5.07 zł`;
//           }
//           // 1 uncja:
//           else if (indexTemp === 2) {
//             cena = cena * 31.1;
//             newKarta.childNodes[3].childNodes[3].innerText = `${cena} zł`;
//           }
//           // 1 kg:
//           else if (indexTemp === 3) {
//             cena = cena * 1000;
//             newKarta.childNodes[3].childNodes[3].innerText = `${cena} zł`;
//           }
//         });
//     } else if (indexTemp > 3) {
//       let url = "zloto.xlsx";
//       let req = new XMLHttpRequest();
//       req.open("GET", url, true);
//       req.responseType = "arraybuffer";
//       req.onload = function (e) {
//         let data = new Uint8Array(req.response);
//         let workbook = XLSX.read(data, { type: "array" });
//         let first_sheet_name = workbook.SheetNames[0];
//         let worksheet = workbook.Sheets[first_sheet_name];

//         for (let i = 0; i < 22; i++) {
//           if (XLSX.utils.sheet_to_json(worksheet)[i].Id === indexTemp) {
//             newKarta.childNodes[3].childNodes[3].innerText = `${
//               XLSX.utils.sheet_to_json(worksheet)[i].Kurs
//             } `;
//             newKarta.childNodes[3].childNodes[5].innerText = `${
//               XLSX.utils.sheet_to_json(worksheet)[i].Zmiana
//             } `;
//           }
//         }
//       };
//       req.send();
//     }
//   }
//   //
//   else if (wybrrodzaj === "Akcje") {
//     let indexTemp = bazaAkcji.indexOf(wybranaPojedynczaInwestycja.innerText);

//     //Pobieranie Excel
//     let url = "akcje.xlsx";
//     let req = new XMLHttpRequest();
//     req.open("GET", url, true);
//     req.responseType = "arraybuffer";
//     req.onload = function (e) {
//       let data = new Uint8Array(req.response);
//       let workbook = XLSX.read(data, { type: "array" });
//       let first_sheet_name = workbook.SheetNames[0];
//       let worksheet = workbook.Sheets[first_sheet_name];
//       newKarta.childNodes[3].childNodes[3].innerText = `${XLSX.utils
//         .sheet_to_json(worksheet)
//         [indexTemp].Kurs.slice(0, -2)} zł`;
//       if (
//         Number(
//           XLSX.utils
//             .sheet_to_json(worksheet)
//             [indexTemp].Zmiana.split(",")
//             .join(".")
//         ) >= 0
//       ) {
//         newKarta.childNodes[3].childNodes[5].innerText = `${XLSX.utils
//           .sheet_to_json(worksheet)
//           [indexTemp].Zmiana.slice(0, -2)}zł
//           +${XLSX.utils
//             .sheet_to_json(worksheet)
//             [indexTemp].ZmianaProcentowa.slice(0, -2)}% `;
//         newKarta.childNodes[3].childNodes[5].classList.add("kurswzrost");
//       } else if (
//         Number(
//           XLSX.utils
//             .sheet_to_json(worksheet)
//             [indexTemp].Zmiana.split(",")
//             .join(".")
//         ) < 0
//       ) {
//         newKarta.childNodes[3].childNodes[5].innerText = `${XLSX.utils
//           .sheet_to_json(worksheet)
//           [indexTemp].Zmiana.slice(0, -2)}zł
//           ${XLSX.utils
//             .sheet_to_json(worksheet)
//             [indexTemp].ZmianaProcentowa.slice(0, -2)}% `;
//         newKarta.childNodes[3].childNodes[5].classList.add("kursspadek");
//       }
//     };
//     req.send();
//   }
//   //
//   else if (wybrrodzaj === "Waluty") {
//     let indexTemp = bazaWaluty.indexOf(wybranaPojedynczaInwestycja.innerText);

//     fetch(`https://api.nbp.pl/api/exchangerates/tables/A/`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((dane) => {
//         newKarta.childNodes[3].childNodes[3].innerText = `${dane[0].rates[
//           indexTemp
//         ].mid.toFixed(2)} zł`;
//       });
//   }
//   //
//   else if (wybrrodzaj === "Kryptowaluty") {
//     const proxy = `https://cors-anywhere.herokuapp.com/`;
//     const apiKryptowaluty = `${proxy}https://bitbay.net/API/Public/${wybranaPojedynczaInwestycja.innerText}PLN/orderbook.json`;

//     fetch(apiKryptowaluty)
//       .then((response) => {
//         return response.json();
//       })
//       .then((dane) => {
//         for (let i = 0; i < 1; i++) {
//           newKarta.childNodes[3].childNodes[3].innerText = `${dane.asks[0][0]} zł`;
//         }
//       });
//   }

//   //
//   // Dodawanie szczegółów inwestycji
//   //

//   btnDodajInwestycje.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//       console.log("klik");
//       console.log(
//         Array.prototype.indexOf.call(btnDodajInwestycje, event.target)
//       );
//       dodajInwerstycjeIndex = Array.prototype.indexOf.call(
//         btnDodajInwestycje,
//         event.target
//       );
//       modalBg.classList.add("modal-bg-active");
//     });
//   });

//   modalClose.addEventListener("click", () => {
//     modalBg.classList.remove("modal-bg-active");
//   });
// });

// // Usuwanie karty i usuwanie cookie

// praweGlowne.addEventListener("click", function (e) {
//   if (e.target.classList[0] === "usun") {
//     praweGlowne.removeChild(e.target.parentNode);
//     console.log(e.target.parentNode);
//     let currenCookie = e.target.parentNode
//       .querySelector(".kursdzis")
//       .getAttribute("id");
//     currenCookie = currenCookie.split(" ").slice(1).join(" ");
//     console.log(currenCookie);
//     document.cookie = `${currenCookie}=; expires = Thu, 01 Jan 1970T00:00:00Z`;
//   }
// });

//
// Wyswietlanie dodatkowych opcji zysku
//
let wszystkiePrzyciskSzczegoly =
  document.querySelectorAll(".przyciskSzczegoly");
let wszystkieZyskiLewy = document.querySelectorAll(".lewy3");
let wszystkieZyskiPrawy = document.querySelectorAll(".prawy3");

// wszystkiePrzyciskSzczegoly.forEach((przycisk) => {
//   przycisk.addEventListener("click", function (e) {
//     przycisk.parentNode.childNodes[7].classList.toggle("lewy3active");
//     przycisk.parentNode.parentNode.childNodes[3].childNodes[7].classList.toggle(
//       "prawy3active"
//     );
//     if (e.target.parentNode.childNodes[1].textContent.trim() === "+") {
//       console.log("testy");
//       przycisk.parentNode.childNodes[1].textContent = `-`;
//     } else if (e.target.parentNode.childNodes[1].textContent.trim() === "-") {
//       e.target.parentNode.childNodes[1].textContent = `+`;
//     }
//   });
// });

// praweGlowne.addEventListener("click", function (e) {
//   if (e.target.classList[0] === "przyciskSzczegoly") {
//     if (e.target.parentNode.childNodes[1].textContent.trim() === "+") {
//       e.target.parentNode.childNodes[1].textContent = `-`;
//       e.target.parentNode.childNodes[7].style.display = "flex";
//       e.target.parentNode.parentNode.childNodes[3].childNodes[7].style.display =
//         "flex";
//     } else if (e.target.parentNode.childNodes[1].textContent.trim() === "-") {
//       e.target.parentNode.childNodes[1].textContent = `+`;
//       e.target.parentNode.childNodes[7].style.display = "none";
//       e.target.parentNode.parentNode.childNodes[3].childNodes[7].style.display =
//         "none";
//     }
//   }
// });

//
// Dodawanie szczegółów inwestycji
//

//btnDodajInwestycje.forEach((btn) => {
//  btn.addEventListener("click", (event) => {
//    console.log("klik");
//    // console.log(Array.prototype.indexOf.call(NodeList, element));
//    dodajInwerstycjeIndex = Array.prototype.indexOf.call(
//      btnDodajInwestycje,
//      event.target
//    );
//
//    modalBg.classList.add("modal-bg-active");
//    if (
//      allKarta[dodajInwerstycjeIndex].children[3].children[2].children[0]
//        .innerText == "Edytuj"
//    ) {
//      console.log("karamba");
//      modalBg.children[0].children[1].innerHTML = `<h2>Edytuj inwestycje</h2>`;
//    } else if (
//      allKarta[dodajInwerstycjeIndex].children[3].children[2].children[0]
//        .innerText == "Dodaj inwestycje"
//    ) {
//      modalBg.children[0].children[1].innerHTML = `<h2>Dodaj inwestycje</h2>`;
//    }
//  });
//});
//
//modalClose.addEventListener("click", () => {
//  modalBg.classList.remove("modal-bg-active");
//});
//
//const btnDodaj = document.querySelector("#dod");
//btnDodaj.addEventListener("click", (e) => {
//  const inputAll = document.querySelectorAll("input");
//  allKarta = document.body.querySelectorAll(".karta");
//
//  dodatkowaDolna[dodajInwerstycjeIndex].childNodes[1].innerText =
//    inputAll[0].value;
//  dodatkowaDolna[dodajInwerstycjeIndex].childNodes[3].innerText =
//    inputAll[1].value;
//  dodatkowaDolna[dodajInwerstycjeIndex].childNodes[5].innerText =
//    inputAll[2].value;
//  dodatkowaDolna[dodajInwerstycjeIndex].childNodes[7].innerText = (
//    Number(
//      allKarta[dodajInwerstycjeIndex].children[1].children[1].innerText
//        .split(" ")[0]
//        .replace(",", ".")
//    ) *
//      inputAll[1].value -
//    inputAll[1].value * inputAll[2].value
//  ).toFixed(2);
//
//  if (
//    Number(
//      allKarta[dodajInwerstycjeIndex].children[1].children[1].innerText
//        .split(" ")[0]
//        .replace(",", ".")
//    ) *
//      inputAll[1].value -
//      inputAll[1].value * inputAll[2].value >=
//    0
//  ) {
//    dodatkowaDolna[dodajInwerstycjeIndex].childNodes[7].classList.remove(
//      "zyskspadek"
//    );
//    dodatkowaDolna[dodajInwerstycjeIndex].childNodes[7].classList.add(
//      "zyskwzrost"
//    );
//  } else if (
//    Number(
//      allKarta[dodajInwerstycjeIndex].children[1].children[1].innerText
//        .split(" ")[0]
//        .replace(",", ".")
//    ) *
//      inputAll[1].value -
//      inputAll[1].value * inputAll[2].value <
//    0
//  ) {
//    dodatkowaDolna[dodajInwerstycjeIndex].childNodes[7].classList.remove(
//      "zyskwzrost"
//    );
//    dodatkowaDolna[dodajInwerstycjeIndex].childNodes[7].classList.add(
//      "zyskspadek"
//    );
//  }
//
//  modalBg.classList.remove("modal-bg-active");
//  btnDodajInwestycje[dodajInwerstycjeIndex].innerText = "Edytuj";
//  btnDodajInwestycje[dodajInwerstycjeIndex].classList.add(
//    "btndodajszczegPoDodaniu"
//  );
//  allKarta[dodajInwerstycjeIndex].children[3].children[2].style.textAlign =
//    "left";
//});

//
//
//
//
//
//
//

const selected2 = document.querySelector(".selected2");
const optionsContainer2 = document.querySelector(".options-container2");
const optionsList2 = document.querySelectorAll(".option2");

if (selected2) {
  selected2.addEventListener("click", () => {
    optionsContainer2.classList.toggle("active");
  });
}

let wybranyRodzajInwestycji;
let wybranaBazaDanych = [];
let optionsList = document.querySelectorAll(".option");
let selected = document.querySelector(".selected");
let anonimoSelected;
let anonimoSelected2;
const optionsContainer = document.querySelector(".options-container");
const btnPotwiedzWyborInwestycji = document.querySelector(
  ".btn-investment-confirmation"
);
const searchBox = document.querySelector(".search-box input");
const id_title = document.querySelector("#id_title");
const id_rodzajInw = document.querySelector("#id_rodzajInw");

optionsList2.forEach((o) => {
  o.addEventListener("click", () => {
    selected2.innerHTML = o.querySelector("label").innerHTML;
    wybranyRodzajInwestycji = selected2.innerHTML;
    // console.log(wybranyRodzajInwestycji);
    optionsContainer2.classList.remove("active");
    optionsContainer.classList.add("active");
    id_rodzajInw.value = selected2.innerHTML;

    //

    if (wybranyRodzajInwestycji === "Akcje") {
      wybranaBazaDanych = bazaAkcji;
    } else if (wybranyRodzajInwestycji === "Złoto") {
      wybranaBazaDanych = bazaZloto;
    } else if (wybranyRodzajInwestycji === "Waluty") {
      wybranaBazaDanych = bazaWaluty;
    } else if (wybranyRodzajInwestycji === "Kryptowaluty") {
      wybranaBazaDanych = bazaKryptowalut;
    } else if (wybranyRodzajInwestycji === "Indeksy") {
      wybranaBazaDanych = bazaIndeksow;
    } else if (wybranyRodzajInwestycji === "New Connect") {
      wybranaBazaDanych = bazaNewconnect;
    } else if (wybranyRodzajInwestycji === "TOP 100 USA") {
      wybranaBazaDanych = bazaTopusa;
    }
    optionsContainer.innerHTML = "";
    selected.innerHTML = "Szczegóły...";
    searchBox.value = "";
    filterList("");

    wybranaBazaDanych.forEach((opcjeWybor) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("option");
      newDiv.innerHTML = `<input type="radio" class="radio" id="${opcjeWybor}" name="category" />
                <label for="${opcjeWybor}">${opcjeWybor}</label>`;
      optionsContainer.appendChild(newDiv);
      optionsList = document.querySelectorAll(".option");
      selected = document.querySelector(".selected");
    });

    optionsList.forEach((o) => {
      o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        anonimoSelected = selected.innerHTML;
        anonimoSelected2 = selected2.innerHTML;
        // console.log(selected.innerHTML);
        // console.log(selected2.innerHTML);
        id_title.value = selected.innerHTML;
        optionsContainer.classList.remove("active");
        btnPotwiedzWyborInwestycji.classList.add(
          "btn-investment-confirmation-active"
        );
      });
    });
  });
});

//
//
//

if (selected) {
  selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
    searchBox.value = "";
    filterList("");

    if (optionsContainer.classList.contains("active")) {
      searchBox.focus();
    }
  });
}

if (searchBox) {
  searchBox.addEventListener("keyup", function (e) {
    filterList(e.target.value);
  });
}

const filterList = (searchTerm) => {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach((option) => {
    let label =
      option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};

//
//
//
// Wyswietl dodaj inwestycje po klikniecu button
//
//
const btnDodajWyborInwestycji = document.querySelector(".btn-add-investment");
const contentLewyPrawy = document.querySelector(".box-add-main-left-right");
const box = document.querySelector(".box-add");

if (btnDodajWyborInwestycji) {
  btnDodajWyborInwestycji.addEventListener("click", () => {
    btnDodajWyborInwestycji.classList.add("btn-add-investment-not-active");
    contentLewyPrawy.classList.add("box-add-main-left-right-active");
    box.style.alignItems = "flex-start";
    optionsContainer2.classList.add("active");
  });
}

if (btnPotwiedzWyborInwestycji) {
  btnPotwiedzWyborInwestycji.addEventListener("click", () => {
    optionsContainer2.classList.remove("active");
    optionsContainer.classList.remove("active");
    btnPotwiedzWyborInwestycji.classList.remove(
      "btn-investment-confirmation-active"
    );
    selected2.innerHTML = "Wybierz...";

    optionsContainer.innerHTML = "";
    selected.innerHTML = "Szczegóły...";
    searchBox.value = "";
    filterList("");
    btnDodajWyborInwestycji.classList.remove("btn-add-investment-not-active");
    contentLewyPrawy.classList.remove("box-add-main-left-right-active");
    box.style.alignItems = "center";
  });
}

//
//Ustawienia
//Ekran powiatlny
//
const toggleInput = document.querySelector(".toggle__input");
boxGlowny = document.querySelector(".box-welcome");

if (toggleInput != null) {
  toggleInput.addEventListener("click", () => {
    const boxGlownystyle = getComputedStyle(boxGlowny);
    if (boxGlownystyle.display === "flex") {
      boxGlowny.style.display = "none";
      box.style.display = "none";
    } else if (boxGlownystyle.display === "none") {
      boxGlowny.style.display = "flex";
      box.style.display = "flex";
    }
  });
}

//
//Ustawienia
//Tło
//
// const toggleInputTlo = document.querySelector(".toggle__inputtlo");
// const prawy1Glowny = document.querySelector(".prawy1Glowny");
// const prawy2Glowny = document.querySelector(".prawy2Glowny");
// const boxdodany = document.querySelector(".boxdodany");
// const allboxdodany = document.querySelectorAll(".boxdodany");

// toggleInputTlo.addEventListener("click", () => {
//   leweGlowne.classList.toggle("leweGlowneBiale");
//   praweGlowne.classList.toggle("praweGlowneBiale");
//   prawy1Glowny.classList.toggle("prawy1GlownyBiale");
//   prawy2Glowny.classList.toggle("prawy2GlownyBiale");
//   btnDodajWyborInwestycji.classList.toggle("btnDodajWyborInwestycjiBiale");
//   boxGlowny.classList.toggle("boxGlowny");
//   boxGlowny.classList.toggle("boxGlownyBialy");
//   box.classList.toggle("box");
//   box.classList.toggle("boxBialy");

//   allboxdodany.forEach((boxdodany) => {
//     boxdodany.classList.toggle("boxdodany");
//     boxdodany.classList.toggle("boxdodanyBialy");
//   });
// });

//
//Ustawienia
//Zysk
//
const toggleInputZysk = document.querySelector(".toggle__inputzysk");

if (toggleInputZysk != null) {
  toggleInputZysk.addEventListener("click", () => {
    console.log(toggleInputZysk.checked);
    wszystkieZyskiLewy = document.querySelectorAll(".lewy3");
    wszystkieZyskiPrawy = document.querySelectorAll(".prawy3");
    wszystkiePrzyciskSzczegoly =
      document.querySelectorAll(".przyciskSzczegoly");

    if (toggleInputZysk.checked) {
      wszystkieZyskiLewy.forEach((lewy3) => {
        lewy3.classList.add("lewy3active");
      });

      wszystkieZyskiPrawy.forEach((prawy3) => {
        prawy3.classList.add("prawy3active");
      });
    }

    if (!toggleInputZysk.checked) {
      wszystkieZyskiLewy.forEach((lewy3) => {
        lewy3.classList.remove("lewy3active");
      });

      wszystkieZyskiPrawy.forEach((prawy3) => {
        prawy3.classList.remove("prawy3active");
      });
    }
  });
}

//
//Wyswietlanie obecnego kursu
//

const rodInwestycji = document.querySelectorAll(".lewy11");
const nazInwestycji = document.querySelectorAll(".lewy1");
const obecnyKursInwestycji = document.querySelectorAll(".prawy1");

for (let i = 0; i < nazInwestycji.length; i++) {
  //
  // Złoto
  if (rodInwestycji[i].innerText === "Złoto") {
    let indexTemp = bazaZloto.indexOf(nazInwestycji[i].innerText);
    if (indexTemp === 0 || indexTemp === 1 || indexTemp === 2) {
      fetch(`https://api.nbp.pl/api/cenyzlota/`)
        .then((response) => {
          return response.json();
        })
        .then((dane) => {
          let { cena } = dane[0];
          // 1 gram:
          if (indexTemp === 0) {
            obecnyKursInwestycji[i].innerText = `${cena
              .toFixed(2)
              .replace(".", ",")} zł`;
          }
          // 1 uncja:
          else if (indexTemp === 1) {
            cena = cena * 31.1;
            cena = cena.toFixed(2);
            obecnyKursInwestycji[i].innerText = `${cena.replace(".", ",")} zł`;
          }
          // 1 kg:
          else if (indexTemp === 2) {
            cena = cena * 1000;
            obecnyKursInwestycji[i].innerText = `${cena
              .toFixed(2)
              .replace(".", ",")} zł`;
          }
        });
    } else if (indexTemp > 2) {
      let url = "/static/base/data/zloto2.xlsx";
      let req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.responseType = "arraybuffer";
      req.onload = function (e) {
        let data = new Uint8Array(req.response);
        let workbook = XLSX.read(data, { type: "array" });
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];

        for (let j = 0; j < 22; j++) {
          if (XLSX.utils.sheet_to_json(worksheet)[j].Id === indexTemp) {
            obecnyKursInwestycji[i].innerText = `${
              XLSX.utils.sheet_to_json(worksheet)[j].Kurs
            } `;
          }
        }
      };
      req.send();
    }
    //
    //Waluty
  } else if (rodInwestycji[i].innerText === "Waluty") {
    let indexTemp = bazaWaluty.indexOf(nazInwestycji[i].innerText);

    fetch(`https://api.nbp.pl/api/exchangerates/tables/A/`)
      .then((response) => {
        return response.json();
      })
      .then((dane) => {
        obecnyKursInwestycji[i].innerText = `${dane[0].rates[
          indexTemp
        ].mid.toFixed(2)} zł`;
      });
    //
    //Kryptowaluty
  } else if (rodInwestycji[i].innerText === "Kryptowaluty") {
    let number = i;
    let indexTemp = bazaKryptowalut.indexOf(nazInwestycji[i].innerText);

    const options = {
      method: "GET",
      headers: { Accept: "application/json" },
    };

    fetch(
      `https://api.zonda.exchange/rest/trading/ticker/${bazaKryptowalut[indexTemp]}-PLN`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        obecnyKursInwestycji[
          number
        ].innerText = `${response.ticker.rate.replace(".", ",")} zł`;
      })
      .catch((err) => console.error(err));
    //
    // TOP 100 USA
  } else if (rodInwestycji[i].innerText === "TOP 100 USA") {
    let number = i;
    let wybrana_akcja = nazInwestycji[i].innerText;
    for (let i = 0; i < bazaTopusa.length; i++) {
      if (wybrana_akcja.toLowerCase() === bazaTopusa[i].toLocaleLowerCase()) {
        try {
          fetch(
            `https://cloud.iexapis.com/stable/stock/${bazaTopusaKod[i]}/quote?token=pk_b1da4aa5fd714d3db22ee5db45d173c8`
          )
            .then((response) => {
              return response.json();
            })
            .then((dane) => {
              if (dane.iexRealtimePrice == null) {
                obecnyKursInwestycji[number].innerText = `${dane.iexClose
                  .toString()
                  .replace(".", ",")} $`;
              } else {
                obecnyKursInwestycji[
                  number
                ].innerText = `${dane.iexRealtimePrice
                  .toString()
                  .replace(".", ",")} $`;
              }
            });
        } catch {
          console.log("fetch error usa");
        }
      }
    }
  }
}

//
//
//
//Sidebar
//Najpopularniejsze
//
//

const eurousd = document.querySelector(".eurousd");
const plnusd = document.querySelector(".plnusd");
const plneuro = document.querySelector(".plneuro");
const plngbp = document.querySelector(".plngbp");

const tesla = document.querySelector(".tesla");
const amazon = document.querySelector(".amazon");
const netflix = document.querySelector(".netflix");
const sp500 = document.querySelector(".sp500");

const bitcoin = document.querySelector(".bitcoin");

//NBP API
try {
  if (eurousd && plnusd) {
    fetch(`https://api.nbp.pl/api/exchangerates/tables/A/`)
      .then((response) => {
        return response.json();
      })
      .then((dane) => {
        eurousd.innerText = `${(dane[0].rates[7].mid / dane[0].rates[1].mid)
          .toFixed(2)
          .replace(".", ",")}`;

        plnusd.innerText = `${dane[0].rates[1].mid
          .toFixed(2)
          .replace(".", ",")} zł`;

        plneuro.innerText = `${dane[0].rates[7].mid
          .toFixed(2)
          .replace(".", ",")} zł`;

        plngbp.innerText = `${dane[0].rates[10].mid
          .toFixed(2)
          .replace(".", ",")} zł`;
      });
  }
} catch {
  console.log("fetch error nbp");
}

//BITCOIN API
try {
  if (bitcoin) {
    const options = {
      method: "GET",
      headers: { Accept: "application/json" },
    };

    fetch("https://api.zonda.exchange/rest/trading/ticker/BTC-PLN", options)
      .then((response) => response.json())
      .then((response) => {
        bitcoin.innerHTML = `${response.ticker.rate.replace(".", ",")} zł`;
      })
      .catch((err) => console.error(err));
  }
} catch {
  console.log("fetch error bitcoin");
}

//
//
//Obliczaniezysku
const zyskzakupupall = document.querySelectorAll(".zyskzakupup");
const ilosczakupupall = document.querySelectorAll(".ilosczakupup");
const cenazakupupall = document.querySelectorAll(".cenazakupup");

const obliczZysk = function () {
  for (let i = 0; i < zyskzakupupall.length; i++) {
    const prawy1all = document.querySelectorAll(".prawy1");

    zyskzakupupall[i].innerText = `${
      ilosczakupupall[i].innerText *
        prawy1all[i].innerText.split(" ")[0].replace(",", ".") -
      ilosczakupupall[i].innerText * cenazakupupall[i].innerText
    } zł`;
  }
};
setTimeout(obliczZysk, 2000);

//
// mobile menu
//
const przycisk3linieOrazX = document.querySelector(".przycisk3linieOrazX");
const leweGorne = document.querySelector(".lewegorne");

przycisk3linieOrazX.addEventListener("click", () => {
  przycisk3linieOrazX.classList.toggle("zmiana3liniiNaX");
  leweGorne.classList.toggle("lewegorneWidocznosc");
});

//
//
// Dla anonimowych uzytkownikow
//
//

const get_anonimo = () => {
  const anonimo = document.querySelector("#anonimo");
  if (anonimo.innerHTML === "Anonimo") {
    const potwiedzenieJS = document.querySelector("#potwiedzenieJS");
    praweGlowne = document.querySelector(".main-right");

    potwiedzenieJS.addEventListener("click", () => {
      const div = document.createElement("div");
      div.setAttribute("class", "box-new");
      div.innerHTML = `
      <span></span>
      <div class="przyciskUsun2" title="Usuń">X</div>
      <div class="box-new-main-content">
        <div class="box-new-main-left-right">
          <div class="box-new-main-left-side">
            <div class="lewy1" id="jsselected">${anonimoSelected.toUpperCase()}</div>
            <div class="lewy11">{{task.rodzajInw}}</div>
            <div class="lewy2"></div>
            <div class="lewy3"></div>
          </div>
          <div class="box-new-main-right-side">
            <div class="prawy1"></div>
            <div class="prawy11"></div>
            <div class="prawy2"></div>
            <div class="prawy3"></div>
          </div>
        </div>
      </div>
      `;

      praweGlowne.append(div);
      praweGlowne = document.body.querySelector(".main-right");

      //
      //
      // Dodawanie kursu
      // console.log(anonimoSelected2);
      if (anonimoSelected2 === "Złoto") {
        let indexTemp = bazaZloto.indexOf(anonimoSelected);
        if (indexTemp === 0 || indexTemp === 1 || indexTemp === 2) {
          fetch(`https://api.nbp.pl/api/cenyzlota/`)
            .then((response) => {
              return response.json();
            })
            .then((dane) => {
              let { cena } = dane[0];
              // 1 gram:
              if (indexTemp === 0) {
                div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${cena
                  .toFixed(2)
                  .replace(".", ",")} zł`;
              }
              // 1 uncja:
              else if (indexTemp === 1) {
                cena = cena * 31.1;
                div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${cena
                  .toFixed(2)
                  .replace(".", ",")} zł`;
              }
              // 1 kg:
              else if (indexTemp === 2) {
                cena = cena * 1000;
                div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${cena} zł`;
              }
            });
        } else if (indexTemp > 2) {
          let url = "/static/base/data/zloto2.xlsx";
          let req = new XMLHttpRequest();
          req.open("GET", url, true);
          req.responseType = "arraybuffer";
          req.onload = function (e) {
            let data = new Uint8Array(req.response);
            let workbook = XLSX.read(data, { type: "array" });
            let first_sheet_name = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[first_sheet_name];
            console.log(indexTemp);
            console.log(XLSX.utils.sheet_to_json(worksheet)[9].Id);
            console.log(XLSX.utils.sheet_to_json(worksheet)[10].Id);

            for (let i = 0; i < 22; i++) {
              if (XLSX.utils.sheet_to_json(worksheet)[i].Id === indexTemp) {
                console.log("wchodzi");
                div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${
                  XLSX.utils.sheet_to_json(worksheet)[i].Kurs
                } `;
              }
            }
          };
          req.send();
        }

        //
        // Akcje
      } else if (anonimoSelected2 === "Akcje") {
        // const apiIndeksy = `http://127.0.0.1:8000/api/akcje/`;
        const apiIndeksy = `https://moje-finanse.herokuapp.com/api/akcje/`;
        fetch(apiIndeksy)
          .then((response) => {
            return response.json();
          })
          .then((dane) => {
            for (let i = 0; i < dane.length; i++) {
              if (dane[i].name === anonimoSelected) {
                div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${String(
                  dane[i].price
                ).replace(".", ",")} zł`;
              }
            }
          });

        //
        //Waluty
      } else if (anonimoSelected2 === "Waluty") {
        let indexTemp = bazaWaluty.indexOf(anonimoSelected);
        fetch(`https://api.nbp.pl/api/exchangerates/tables/A/`)
          .then((response) => {
            return response.json();
          })
          .then((dane) => {
            div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${dane[0].rates[
              indexTemp
            ].mid
              .toFixed(2)
              .replace(".", ",")} zł`;
          });

        //
        // Kryptowaluty;
        // } else if (anonimoSelected2 === "Kryptowaluty") {
        //   const proxy = `https://cors-anywhere.herokuapp.com/`;
        //   const apiKryptowaluty = `${proxy}https://bitbay.net/API/Public/${anonimoSelected}PLN/orderbook.json`;

        //   fetch(apiKryptowaluty)
        //     .then((response) => {
        //       return response.json();
        //     })
        //     .then((dane) => {
        //       for (let i = 0; i < 1; i++) {
        //         div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${dane.asks[0][0]
        //           .toFixed(2)
        //           .replace(".", ",")} zł`;
        //       }
        //     });

        // Kryptowaluty;
        // } else if (anonimoSelected2 === "Kryptowaluty") {
        //   const apiKryptowaluty = `https://bitbay.net/API/Public/${anonimoSelected}PLN/orderbook.json`;

        //   fetch(apiKryptowaluty)
        //     .then((response) => {
        //       return response.json();
        //     })
        //     .then((dane) => {
        //       for (let i = 0; i < 1; i++) {
        //         div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${dane.asks[0][0]
        //           .toFixed(2)
        //           .replace(".", ",")} zł`;
        //       }
        //     });
      } else if (anonimoSelected2 === "Kryptowaluty") {
        const options = {
          method: "GET",
          headers: { Accept: "application/json" },
        };

        fetch(
          `https://api.zonda.exchange/rest/trading/ticker/${anonimoSelected}-PLN`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${response.ticker.rate.replace(
              ".",
              ","
            )} zł`;
          })
          .catch((err) => console.error(err));

        //
        //Indeksy
      } else if (anonimoSelected2 === "Indeksy") {
        // const apiIndeksy = `http://127.0.0.1:8000/api/indeksy/`;
        const apiIndeksy = `https://moje-finanse.herokuapp.com/api/indeksy/`;
        fetch(apiIndeksy)
          .then((response) => {
            return response.json();
          })
          .then((dane) => {
            for (let i = 0; i < dane.length; i++) {
              if (dane[i].name === anonimoSelected) {
                div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${dane[i].price} zł`;
              }
            }
          });
        //
        //New connect
      } else if (anonimoSelected2 === "New Connect") {
        // const apiIndeksy = `http://127.0.0.1:8000/api/newconnect/`;
        const apiIndeksy = `https://moje-finanse.herokuapp.com/api/newconnect/`;
        fetch(apiIndeksy)
          .then((response) => {
            return response.json();
          })
          .then((dane) => {
            for (let i = 0; i < dane.length; i++) {
              if (dane[i].name === anonimoSelected) {
                div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${String(
                  dane[i].price
                ).replace(".", ",")} zł`;
              }
            }
          });
        //
        // TOP 100 USA
      } else if (anonimoSelected2 === "TOP 100 USA") {
        let wybrana_akcja = anonimoSelected;
        for (let i = 0; i < bazaTopusa.length; i++) {
          if (
            wybrana_akcja.toLowerCase() === bazaTopusa[i].toLocaleLowerCase()
          ) {
            try {
              fetch(
                `https://cloud.iexapis.com/stable/stock/${bazaTopusaKod[i]}/quote?token=pk_b1da4aa5fd714d3db22ee5db45d173c8`
              )
                .then((response) => {
                  return response.json();
                })
                .then((dane) => {
                  if (dane.iexRealtimePrice == null) {
                    div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${dane.iexClose
                      .toString()
                      .replace(".", ",")} $`;
                  } else {
                    div.childNodes[5].childNodes[1].childNodes[3].childNodes[1].innerHTML = `${dane.iexRealtimePrice
                      .toString()
                      .replace(".", ",")} $`;
                  }
                });
            } catch {
              console.log("fetch error usa");
            }
          }
        }
      }
    });

    //
    //
    // Usuwanie karty
    praweGlowne.addEventListener("click", function (e) {
      if (e.target.classList[0] === "przyciskUsun2") {
        e.target.parentNode.remove();
      }
    });
  }
};

setTimeout(get_anonimo, 1000);
