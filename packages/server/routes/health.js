const express = require("express");

const router = express.Router();

function format(timeInSeconds){
    function pad(s){
        return (s < 10 ? '0' : '') + s;
    }

    const hours = Math.floor(timeInSeconds / (60 * 60));
    const minutes = Math.floor(timeInSeconds % (60 * 60) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

router.get("/", async(req, res) => {
    res.json({uptime: format(process.uptime())});
})

module.exports = router;
