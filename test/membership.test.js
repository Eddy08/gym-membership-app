const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const membershipRoutes = require("../routes/membership");
const app = express();
app.use(bodyParser.json());
app.use("/api", membershipRoutes);
describe("Gym Membership Management System", () => {
  it("should register a new member", (done) => {
    request(app)
      .post("/gym-membership-app/api/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        startDate: "2023-10-01",
      })
      .expect(200)
      .expect((res) => {
        if (!("member" in res.body)) throw new Error("Missing member key");
      })
      .end(done);
  });
  it("should retrieve membership details", (done) => {
    request(app)
      .get("/gym-membership-app/api/member")
      .query({ email: "john@example.com" })
      .expect(200)
      .expect((res) => {
        if (res.body.email !== "john@example.com")
          throw new Error("Incorrect member details");
      })
      .end(done);
  });
  it("should return all active members", (done) => {
    request(app)
      .get("/gym-membership-app/api/members")
      .expect(200)
      .expect((res) => {
        if (!Array.isArray(res.body))
          throw new Error("Response is not an array");
      })
      .end(done);
  });
  it("should cancel a membership", (done) => {
    request(app)
      .delete("/gym-membership-app/api/cancel")
      .send({ email: "john@example.com" })
      .expect(200)
      .expect((res) => {
        if (res.body.member.active !== false)
          throw new Error("Membership not cancelled");
      })
      .end(done);
  });
  it("should modify membership start date", (done) => {
    request(app)
      .put("/gym-membership-app/api/modify")
      .send({ email: "john@example.com", newStartDate: "2023-11-01" })
      .expect(200)
      .expect((res) => {
        if (res.body.member.startDate !== "2023-11-01")
          throw new Error("Start date not modified");
      })
      .end(done);
  });
});
