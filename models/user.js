const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // so we can hash and unhash passwords

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {//validators in mongoose are lowercase
        type: String,
        required: [true, 'You must enter a name'],
        minlength: [1, 'Name must be between 1 and 99 characters'],
        maxlength: [99, 'Name must be between 1 and 99 characters']
    },
    password: {
        type: String,
        required: [true, 'You must enter a password'],
        minlength: [8, 'Password must be between 10 and 128 characters'],
        maxlength: [128, 'Password must be between 10 and 128 characters']
    },
    email: {
        type: String,
        required: [true, 'You must enter an email'],
        minlength: [5, 'Email must be between 5 and 99 characters'],
        maxlength: [99, 'Email must be between 5 and 99 characters']
    }
});

// This returns an object without a password
userSchema.set('toObject', {// every time we send the user json object over the wire, the pw is excluded
    //doc is document we found in the database, ret is the json equivalent of doc
    // whitelisting: allowing only the listed columns into the json object
    transform: function(doc, ret, options) {
        let returnJson = {
            _id: ret._id,
            email: ret.email,
            name: ret.name
        }
        return returnJson;
    }
});

//methods is a user function
userSchema.methods.authenticated = function(password) {
    console.log("Comparing passwords:", password, this.password)
    // Checks if passwords match
    // this.password is the already stored, password is the user input
    return bcrypt.compareSync(password, this.password);
}

userSchema.pre('save', function(next) {
    console.log("I AM RUNNING THE PRE SAVE HOOK!!")
    console.log('password:', this.password)
    if (this.isNew) {
        let hash = bcrypt.hashSync(this.password, 12);
        this.password = hash;//replace the pw in the db with a hash
        console.log("hash:", hash)
    }
    next();
});

module.exports = mongoose.model('User', userSchema);