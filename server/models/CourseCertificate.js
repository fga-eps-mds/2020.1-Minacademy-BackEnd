const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseCertificateSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    assignedPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    courseType: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    workload: {
      type: Number,
      require: true,
      default: 6,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('CourseCertificate', courseCertificateSchema);
