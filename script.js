const clientId = "web_client_" + Math.random().toString(16).substr(2, 8);
const host = "wss://pemulungilmu.cloud.shiftr.io:443";
const options = {
    keepalive: 60,
    clientId: clientId,
    username: "pemulungilmu",
    password: "bosacong",
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30000,
};

const client = mqtt.connect(host, options);

client.on("connect", () => {
    console.log("Connected to MQTT broker");
});

function setupButton(id, iconId, topic, commandOn, commandOff) {
    const button = document.getElementById(id);
    const ledIcon = document.getElementById(iconId);
    let isOn = false;

    button.addEventListener("click", () => {
        isOn = !isOn;
        button.innerText = isOn ? "TURN OFF" : "TURN ON";
        button.classList.toggle("btn-red", isOn);
        button.classList.toggle("btn-blue", !isOn);
        ledIcon.src = isOn ? "led-on.png" : "led-off.png"; // Change LED image based on state
        client.publish(topic, isOn ? commandOn : commandOff);
    });
}

// Setup buttons for each room
setupButton("dapur-button", "dapur-led-icon", "home/dapur", "on", "off");
setupButton("ruang-tamu-button", "ruang-tamu-led-icon", "home/ruang-tamu", "on", "off");
setupButton("ruang-makan-button", "ruang-makan-led-icon", "home/ruang-makan", "on", "off");
setupButton("toilet-button", "toilet-led-icon", "home/toilet", "on", "off");

client.on("error", (error) => {
    console.error("MQTT connection error:", error);
});
