const serviceUuid = '19b10000-0001-537e-4f6c-d104768a1214'; // Replace with your BLE service UUID
let characteristicUUID = "19b10001-0001-537e-4f6c-d104768a1214";

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
    // if (!connectedCharacteristic) {
    //     console.error('No connected device. Please connect first.');
    //     return;
    // }

    const frequency = document.getElementById('frequency').value;
    const granularity = document.getElementById('granularity').value;
    const pressure = document.getElementById('pressure').checked;
    const tilt = Number(document.getElementById('tilt').checked);
    const imuX = Number(document.getElementById('imuX').checked);
    const imuY = Number(document.getElementById('imuY').checked);
    const imuZ = Number(document.getElementById('imuZ').checked);

    // Create a data object to send
    // const data = frequency.toString() + "," + granularity.toString() + "," + granularity.toString();

    const data = granularity.toString() + ',' +
        Number(pressure) + ',' +
        Number(imuX) + ',' +
        Number(imuY) + ',' +
        Number(imuZ) + ',' +
        Number(tilt) + ',' +
        frequency.toString() + ';';
    console.log('Data to send:', data);

    // Send data to the BLE device
    const dataString = data.toString();
    myBLE.write(connectedCharacteristic, dataString);
}

