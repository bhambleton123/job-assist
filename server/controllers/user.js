const CoverLetter = require("../models/coverLetter").CoverLetter;

const createCoverLetter = async (req, res) => {
  try {
    const { title, body } = req.body;
    const coverLetter = new CoverLetter({
      title,
      body,
      userId: req.user.id,
    });
    await coverLetter.save();
    res.send(coverLetter);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

module.exports = { createCoverLetter };
