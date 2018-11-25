const express = require("express");
const hardmobService = require("./hardmobService");

const app = express();

app.set("port", process.env.PORT || 80);

app.get("/", async (req, res) => {
  const promotions = await hardmobService.getPromotions();
  res.json(promotions);
});

app.listen(app.get("port"), function() {
  console.log("Node app is running at port:" + app.get("port"));
});
