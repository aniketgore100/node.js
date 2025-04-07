const fs = require('fs').promises;
const path = require('path');

// Read file and return raw buffer
const dataRead = async (filePath) => {
    try {
        return await fs.readFile(filePath);
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
};

// Write string data to a file
const dataWrite = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, data);
        console.log(`Data written successfully to ${filePath}`);
    } catch (error) {
        console.error('Error writing file:', error);
        throw error;
    }
};

// Convert buffer to binary string and write it
const encodeToBinary = async (inputPath, outputPath) => {
    const data = await dataRead(inputPath);
    const binaryString = [...data]
        .map(byte => byte.toString(2).padStart(8, '0'))
        .join('');
    await dataWrite(outputPath, binaryString);
};

// Decode binary string back to text
const decodeFromBinary = async (filePath) => {
    try {
        const binaryStr = await fs.readFile(filePath, 'utf-8');
        const byteArray = [];

        for (let i = 0; i < binaryStr.length; i += 8) {
            const byte = binaryStr.slice(i, i + 8);
            if (byte.length === 8) {
                byteArray.push(parseInt(byte, 2));
            }
        }

        return Buffer.from(byteArray).toString('utf-8');
    } catch (error) {
        console.error('Error decoding binary data:', error);
        throw error;
    }
};

// === Run Flow ===
(async () => {
    const inputFile = 'data.txt';
    const encodedFile = 'encodedData.txt';

    try {
        await encodeToBinary(inputFile, encodedFile);
        const decoded = await decodeFromBinary(encodedFile);
        dataWrite('decodedData.txt', decoded);
        console.log('Decoded data:', decoded);
    } catch (error) {
        console.error('Error in processing:', error);
    }
})();
