const express = require("express");
const router = express.Router();
const Member = require("../models/members");
let members = [];
// Register Membership
router.post("/register", (req, res) => {
  const { name, email, startDate } = req.body;
  const newMember = new Member(name, email, startDate);
  if (members && !members.find((m) => m.email === email)) {
    members.push(newMember);
    res.json({ message: "Membership registered", member: newMember });
  } else {
    res.status(404).json({
      message:
        "Member with email already exists : " +
        JSON.stringify(members.find((m) => m.email === email)),
    });
  }
});
// // View Membership Details
router.get("/member", (req, res) => {
  const { email } = req.query;
  const member = members.find((m) => m.email === email);
  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});
// View All Active Members
router.get("/members", (req, res) => {
  const activeMembers = members.filter((m) => m.active);
  res.json(activeMembers);
});
// Cancel Membership
router.delete("/cancel", (req, res) => {
  const { email } = req.body;
  const member = members.find((m) => m.email === email);
  if (member) {
    member.active = false;
    res.json({ message: "Membership cancelled", member });
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});
// Modify Membership Start Date
router.put("/modify", (req, res) => {
  const { email, newStartDate } = req.body;
  const member = members.find((m) => m.email === email);
  if (member) {
    member.startDate = newStartDate;
    res.json({ message: "Membership start date modified", member });
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});
module.exports = router;
