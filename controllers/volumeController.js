const db = require("../db/queries");

async function getVolumes(req, res) {
  const volumes = await db.getAllVolumes();
  res.render("categoryPage", {
    title: "Volumes",
    heading: "Volumes",
    categories: volumes,
    url: "/volumes",
  });
}

async function getBackpackByVolume(req, res) {
  const volId = req.params.vol;
  const vol = await db.getVolumeById(volId);
  const min_vol = vol[0].min_vol;
  const max_vol = vol[0].max_vol;
  const backpacks = await db.getBackpackByVolume(min_vol, max_vol);
  res.render("backpackPage", {
    title: vol[0].category,
    heading: vol[0].category + " Backpacks",
    backpacks: backpacks,
    url: "/backpacks",
  });
}

module.exports = {
  getVolumes,
  getBackpackByVolume,
};
