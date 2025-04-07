const Competition = require('../models/Competition');

exports.createCompetition = async (req, res) => {
  try {
    const { name, deadline, competitionDate, prizeInfo } = req.body;
    const competition = new Competition({ name, deadline, competitionDate, prizeInfo });
    await competition.save();
    res.status(201).json(competition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { participantName, email, submission } = req.body;
    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }
    competition.entries.push({ participantName, email, submission });
    await competition.save();
    res.status(201).json({ message: 'Entry submitted successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
