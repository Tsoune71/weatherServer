const { default: axios } = require("axios");

module.exports.weather = async (req, res) => {
    const { time, param, position } = req.body;
    let setting = "";
    for (let set of param) {
        const [key, value] = set;
        setting += `${key}:${value},`;
    }
    try {
        const response = await axios.get(`https://${process.env.V_USER}:${process.env.V_PASSWORD}@api.meteomatics.com/${time}/${setting.slice(0, setting.length - 1)}/${position}/json`);
        res.send(response.data.data);
    } catch (err) {
        console.log(err);
        res.send(false);
    }
};

module.exports.autocom = async (req,res) => {
    const {input,country} = req.body
    try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${input}+${country}&key=${process.env.V_GEO}`);
        res.send(response.data.results)
    } catch (err) {
        console.log(err);
    }
};
