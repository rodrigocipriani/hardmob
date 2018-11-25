const express = require("express");
const hardmobService = require("./hardmobService");

const PORT = 3000;

const app = express();

app.get("/", async (req, res) => {
  const promotions = await hardmobService.getPromotions();
  res.json(promotions);
});

app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
