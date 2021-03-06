const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
//const ApiUsage = require('../metrics/api-usage');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    passwordResetToken: String,
    passwordResetExpires: Date,
    facebook: String,
    tokens: Array,
    profile: {
      name: String,
      avatar: String,
      cover: String
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    strict: false
  }
);

// Password hash middleware.
UserSchema.pre('save', function(callback) {
  var user = this;
  if (!user.isModified('password')) return callback();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto
    .createHash('md5')
    .update(this.email)
    .digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
