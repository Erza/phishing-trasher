// The purpose of this small script is just to fuck with a guy who tried to phish user accounts
// by spreading a client that contained code that would send user account details to his web API to be collected
// so we here just send junk data to his API to make it harder for him to filter for real accounts, if anyone fell for it

const axios = require("axios");
const { faker } = require('@faker-js/faker');
const url = "http://vortal.5v.pl/pliki/Updater/Aurera/evolunia.php";

async function sendPostRequest() {
  const data = {
    host: "evolunia.net:7171:1098",
    account: faker.internet.userName().toLowerCase().replace(/[-_\.]/g, ""),
    password: faker.internet.password({memorable: true}),
    version: "1342",
    uid: faker.string.uuid(),
  };

  try {
    const response = await axios.post(url, data);
	if (response.status != 200) {
		console.log("Response:", response);
	} else {
		console.log("Successfully planted junk data");
	}
  } catch (error) {
    console.error("Error:", error);
  }
}

setInterval(sendPostRequest, 500);
