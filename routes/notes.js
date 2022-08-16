const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readDb, writeDb } = require("../utils/dbUtils");

router.get("/", async (req, res, next) => {
  try {
    res.json(await readDb());
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return next();
  }

  try {
    const id = uuidv4();
    const data = await readDb();
    data.push({ id, title, text });
    const success = await writeDb(data);
    if (success) {
      return res.sendStatus(201);
    }
    res.sendStatus(500);
  } catch (error) {
    console.log(error);
    next();
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await readDb();
    const reviewIdx = data.findIndex(review => review.id === id);
    if (reviewIdx === -1) return res.sendStatus(400);
    data.splice(reviewIdx, 1);
    const success = await writeDb(data);
    if (!success) {
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
