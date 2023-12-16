const userModel = require("../model/user.js");

module.exports.login = async (req, res) => {
    const { id, password } = req.body;
    try {
        const log = await userModel.login(id, password);
        const rightUser = await userModel.findById(log._id, { right: true, _id: false });
        res.send(rightUser);
    } catch (err) {
        res.send(false);
    }
};
module.exports.signUp = async (req, res) => {
    const { id, right, password } = req.body;
    try {
        const response = await userModel.create({ id, right, password });
        res.send(response);
    } catch (err) {
        res.send(false);
    }
};
