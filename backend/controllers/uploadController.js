const Groq = require('groq-sdk');
const { extractFromPDF, extractFromImage } = require('../utils/extractText');
const Itinerary = require('../models/Itinerary');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.processUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: 'No files uploaded' });

    let combinedText = '';
    const uploadedFiles = [];

    for (const file of req.files) {
      uploadedFiles.push({ name: file.originalname, type: file.mimetype });
      let extracted = '';

      if (file.mimetype === 'application/pdf') {
        extracted = await extractFromPDF(file.buffer);
      } else if (file.mimetype.startsWith('image/')) {
        extracted = await extractFromImage(file.buffer);
      }

      combinedText += `\n\n--- ${file.originalname} ---\n${extracted}`;
    }

    if (!combinedText.trim())
      return res.status(422).json({ message: 'Could not extract text from uploaded files' });

    const prompt = `You are a travel assistant. Given the following extracted text from travel booking documents, generate a structured travel itinerary in JSON format.

Extracted Text:
${combinedText}

Return ONLY a valid JSON object with this exact structure (no markdown, no backticks, no extra text):
{
  "title": "Trip title based on destination",
  "summary": "2-3 sentence summary of the trip",
  "destination": "Main destination city/country",
  "startDate": "YYYY-MM-DD or descriptive date",
  "endDate": "YYYY-MM-DD or descriptive date",
  "days": [
    {
      "day": 1,
      "date": "Date string",
      "title": "Day title",
      "activities": [
        {
          "time": "HH:MM or time range",
          "description": "Activity description",
          "location": "Location name",
          "type": "flight|hotel|activity|transport|meal|other"
        }
      ]
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const content = completion.choices[0].message.content.trim();

    let itineraryData;
    try {
      itineraryData = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        itineraryData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('AI returned invalid JSON');
      }
    }

    const itinerary = await Itinerary.create({
      user: req.user._id,
      ...itineraryData,
      rawExtractedText: combinedText,
      uploadedFiles,
    });

    res.status(201).json({ message: 'Itinerary generated successfully', itinerary });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message || 'Failed to process upload' });
  }
};