const serviceUuid = '19b10000-e8f2-537e-4f6c-d104768a1214'; // Replace with your BLE service UUID

let myBLE;
let connectedCharacteristic;

// Initialize the p5.ble.js instance
function setup() {
    // noCanvas(); // No need for a canvas in this application
    myBLE = new p5ble();

    // Attach click events to buttons
    const connectButton = document.getElementById('connectButton');
    connectButton.addEventListener('click', connectToDevice);

    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', sendData);
}

// Function to connect to a BLE device
function connectToDevice() {
    myBLE.connect(serviceUuid, gotCharacteristics);
}

// Callback when characteristics are found
function gotCharacteristics(error, characteristics) {
    if (error) {
        console.error('Error: ', error);
        return;
    }
    console.log('Characteristics: ', characteristics);
    connectedCharacteristic = characteristics[0]; // Assuming the first characteristic is used
}

// Function to handle sending data to a BLE device
function sendData() {
    if (!connectedCharacteristic) {
        console.error('No connected device. Please connect first.');
        return;
    }

    const frequency = parseFloat(document.getElementById('frequency').value);
    const granularity = parseFloat(document.getElementById('granularity').value);
    const pressure = document.getElementById('pressure').checked;
    const tilt = document.getElementById('tilt').checked;
    const imuX = document.getElementById('imuX').checked;
    const imuY = document.getElementById('imuY').checked;
    const imuZ = document.getElementById('imuZ').checked;

    // Create a data object to send
    const data = {
        frequency: frequency,
        granularity: granularity,
        pressure: pressure,
        tilt: tilt,
        imuX: imuX,
        imuY: imuY,
        imuZ: imuZ
    };

    console.log('Data to send:', data);

    // Send data to the BLE device
    const dataString = JSON.stringify(data);
    myBLE.write(connectedCharacteristic, dataString);
}

