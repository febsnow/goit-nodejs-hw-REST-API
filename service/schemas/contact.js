const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      min: 10,
      max: 10,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.path('name').validate((value) => {
  const entry = /[A-Z]\w+/;
  return entry.test(String(value));
});

contactSchema.path('phone').validate((value) => {
  const entry = /^[0-9]+$/;
  return entry.test(Number(value));
});

// contactSchema.path('email').validate((value) => {
//     const entry =
// })

const Contact = model('contact', contactSchema);

module.exports = Contact;
