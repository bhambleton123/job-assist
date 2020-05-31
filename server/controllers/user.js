const CoverLetter = require("../models/coverLetter").CoverLetter;

const getCoverLetters = async (req, res) => {
  try {
    const coverLetters = await CoverLetter.find({
      userId: req.user.id,
    }).exec();
    res.send(coverLetters);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

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

const updateCoverLetter = async (req, res) => {
  const { coverLetterId } = req.params;
  const { title, body } = req.body;
  try {
    await CoverLetter.findOneAndUpdate(
      { _id: coverLetterId },
      {
        $set: {
          title,
          body,
        },
      },
      {
        omitUndefined: true,
        useFindAndModify: false,
      }
    );

    const coverLetter = await CoverLetter.findById(coverLetterId).exec();
    res.send(coverLetter);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const deleteCoverLetter = async (req, res) => {
  const { coverLetterId } = req.params;

  try {
    const deleted = await CoverLetter.findOneAndDelete({
      _id: coverLetterId,
      userId: req.user.id,
    }).exec();
    res.send({ deleted: true, response: deleted });
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

module.exports = {
  getCoverLetters,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
};
