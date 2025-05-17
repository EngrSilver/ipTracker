// "use strict";
// const key = "3A9F57A25EA30F089DF31D367A02E632";
// let ipAddress;

// const getIP = async function () {
//   try {
//     const response = await fetch("https://api.ipify.org?format=json");
//     const data = await response.json();
//     ipAddress = data.ip;
//     console.log("IP Address:", ipAddress);
//     if (!response.ok) {
//       throw new Error("response not OK");
//     }
//     // const ipLocationAPI = `https://api.ip2location.io/?key=${key}&ip=${ipAddress}`;
//     // const ipLocationAPI = `https://api.ip2location.io/?key=3A9F57A25EA30F089DF31D367A02E632&ip=102.89.68.150`;
//     // const IplocationDATA = await fetch(ipLocationAPI);
//     // const locationResponse = await IplocationDATA.json();

//     const response2 = await fetch(`https://ipinfo.io/${ipAddress}/json`);
//     const data2 = await response2.json();
//     console.log("IP Location Data:", data2);

//     if (!locationResponse.ok) {
//       throw new Error("Location response not OK");
//     }
//   } catch (error) {
//     console.error("Error fetching IP address:", error);
//   } finally {
//     console.log("IP address fetch attempt completed.");
//   }
// };
// getIP();
