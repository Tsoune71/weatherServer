const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const schemaUser = new Schema(
    {
        id: {
            required: true,
            type: String,
            unique: true,
        },
        password: {
            required: true,
            type: String,
        },
        right: {
            type: Number,
            required: true,
        },
        message: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: false,
    }
);

schemaUser.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

schemaUser.statics.login = async function (email, password) {
    const user = await this.findOne({ id: email }, { password: true });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};
const mod = model("user", schemaUser);

module.exports = mod;
