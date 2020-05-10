const List = require("../db/models").List;

const createList = async (req, res) => {
  try {
    const list = await List.create({
      title: req.body.title,
      arrangement: req.body.arrangement,
      userId: req.user.id,
    });
    res.send(list);
  } catch (err) {
    res.status(500).send(err);
  }
};
