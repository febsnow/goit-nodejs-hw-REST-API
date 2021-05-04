const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
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

const Contact = model('contact', contactSchema);

module.exports = Contact;
