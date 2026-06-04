const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

exports.extractFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch {
    return '';
  }
};

exports.extractFromImage = async (buffer) => {
  try {
    const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
      logger: () => {},
    });
    return text;
  } catch {
    return '';
  }
};