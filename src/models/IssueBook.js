const mongoose = require("mongoose");

const issueBookSchema = {
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    bookName: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Issued", "Returned"],
        default: "Issued"
    }
};

const IssueBook = mongoose.model("IssueBook", issueBookSchema);

module.exports = IssueBook;