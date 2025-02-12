const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: Number
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobileNo: {
        type: Number,
        unique: true,
        minLength: 10,
        maxLength: 10
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
},{
    timestamps: true
})


userSchema.pre("save", async function (next) {
    if (!this.userId) {
        const count = await mongoose.model("Users").countDocuments();
        this.userId = count + 1;
    }
    next();
});

const userModel = mongoose.model('Users', userSchema);

  

module.exports = userModel;