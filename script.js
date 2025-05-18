"use strict";
const key = "3A9F57A25EA30F089DF31D367A02E632";
let ipAddress;

const getIP = async function () {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) {
      throw new Error("response not OK");
    }
    const data = await response.json();
    ipAddress = data.ip;
    const ip = document.querySelector(".ip");
    ip.textContent = ipAddress;
    console.log("IP Address:", ipAddress);
  } catch (error) {
    console.error("Error fetching IP address:", error);
  } finally {
    console.log("IP address fetch attempt completed.");
  }
  return ipAddress;
};
getIP();
const input = document.getElementById("ipInput");
const getIpData = async function () {
  const ipAddress = input.value;
  const response2 = await fetch(`https://ipinfo.io/${ipAddress}/json`);
  if (!response2.ok) {
    throw new Error("Location response not OK");
  }
  const data2 = await response2.json();
  console.log("IP Data:", data2.loc);
  return data2;
};

//-------------------------------------------------------------------//

const message = " Enter IP Address...   ";
let scrollIndex = 0;

function scrollPlaceholder() {
  input.placeholder =
    message.substring(scrollIndex) + message.substring(0, scrollIndex);
  scrollIndex = (scrollIndex + 1) % message.length;
}
setInterval(scrollPlaceholder, 300);

// -----------------------------------------------------------------//

const container = document.querySelector(".container");
const iPcontent = document.querySelector(".iPcontent");
let createdEl;

async function createElement(tag, className, parent, ipData) {
  const element = document.createElement(tag);
  element.className = className;
  element.innerHTML = `<div class="holder">
        <div class="backBtn">
          <button class="back"><i class="fa fa-arrow-left"></i> Back</button>
        </div>
        <h1 class="info">Tracked IP</h1>
      </div>

      <div class="head info">
        <div class="flag">
          <img src="./world.jpeg" alt="country flag" />
        </div>
        <div class="country">
          <p>
            <span><i class="fa fa-map-marker"></i></span> Country
          </p>
          <h3>${ipData.country}</h3>
        </div>
      </div>
      <div class="location">
        <table>
          <tr class="table-header">
            <th><i class="fa fa-map-marker"></i></th>
            <th>location</th>
            <th class="copy"><i class="fa fa fa-copy"></i></th>
          </tr>
          <tr>
            <td>City</td>
            <td class="state">${ipData.city}</td>
          </tr>
          <tr>
            <td>Region</td>
            <td class="region">${ipData.region}</td>
          </tr>
          <tr>
            <td>Zip</td>
            <td>${ipData.zip || ""}</td>
          </tr>
           <tr>
            <td>Timezone</td>
            <td>${ipData.timezone || ""}</td>
          </tr>
        </table>
      </div>
      <div class="gps">
        <table>
          <tr class="table-header">
            <th>bearings</th>
            <th>Details</th>
            <th class="copy"><i class="fa fa fa-copy"></i></th>
          </tr>
          <tr>
            <td>Longitude</td>
            <td class="long">${ipData.loc.split(",")[1]}</td>
          </tr>
          <tr>
            <td>Latitude</td>
            <td class="lat">${ipData.loc.split(",")[0]}</td>
          </tr>
        </table>
      </div>
      <div class="footer"></div>
    </div>`;
  parent.appendChild(element);

  const long = document.querySelector(".long");
  const lat = document.querySelector(".lat");
  const state = document.querySelector(".state");
  const region = document.querySelector(".region");
  console.log(long, lat, state, region);

  function BearingCopier() {
    const lattext = lat.textContent;
    const longtext = long.textContent;
    const copiedText = lattext + " " + longtext;
    navigator.clipboard.writeText(copiedText);
    alert("Copied the text: " + copiedText);
  }
  function locationCopier() {
    const stateText = state.textContent;
    const regiontext = region.textContent;
    const copiedText = stateText + " " + regiontext;
    navigator.clipboard.writeText(copiedText);
    alert("Copied the text: " + copiedText);
  }
  const copy = Array.from(document.querySelectorAll(".copy"));
  console.log(copy);
  copy[0].addEventListener("click", () => {
    locationCopier();
  });
  copy[1].addEventListener("click", () => {
    BearingCopier();
  });

  return element;
}
document.querySelector(".submitBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  if (input.value) {
    const data = await getIpData();
    console.log("IP Data:", data);
    createdEl = await createElement(
      "div",
      "iPcontent hidden",
      document.body,
      data
    );
    container.classList.add("hidden");
    createdEl.classList.remove("hidden");
  } else {
    alert("Please enter a valid IP address.");
  }
});

//-------------------------------------------------------------------//

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("back")) {
    console.log("Back button clicked");
    createdEl.classList.add("hidden");
    container.classList.remove("hidden");
    createdEl.remove();
    input.value = "";
  }
});
