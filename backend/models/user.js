// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName:  { type: String, required: true },
//     email:     { type: String, required: true, unique: true },
//     password:  { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
  'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
  'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA',
  'WA', 'WV', 'WI', 'WY', 'District of Columbia', 'California', 'Texas', 'New York'
];

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "driver", "customer"],
      default: "customer"
    }
,
    // Optional fields for profile completion
    customerId: {
      type: String,
      match: [/^\d{3}-\d{2}-\d{4}$/, 'invalid_driver_id'],
      unique: true,
      default: null, // Optional during signup
    },
    phoneNumber: { type: String, default: null }, // Optional during signup

    address: { type: String, default: null }, // Optional during signup
    city: { type: String, default: null }, // Optional during signup
    state: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || US_STATES.includes(v); // Allow null or valid state
        },
        message: 'malformed_state',
      },
      default: null, // Optional during signup
    },
    zipCode: {
      type: String,
      match: [/^\d{5}(-\d{4})?$/, 'malformed_zip'],
      default: null, // Optional during signup
    },

    creditCard: {
      cardType: { type: String, default: null }, // Optional during signup
      last4Digits: {
        type: String,
        match: [/^\d{4}$/, 'Invalid last4Digits'],
        default: null, // Optional during signup
      },
      expiryMonth: { type: String, default: null }, // Optional during signup
      expiryYear: { type: String, default: null }, // Optional during signup
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
