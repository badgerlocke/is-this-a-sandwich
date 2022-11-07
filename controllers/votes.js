const Vote = require("../models/Vote");
//TODO: check findById/findOne statements, throw error if nothing was found
module.exports = {
  castVote: async (req, res) => {
    try {
        let newVote = {
            vote: req.body.vote,
            post: req.params.id,
            user: req.user.id
          }
      await Vote.findOneAndUpdate(
        {
            post: req.params.id,
            user: req.user
        },
        {$set: newVote},
        {upsert: true}
      );
      console.log("Vote has been added!");
      // res.redirect("/post/" + req.params.id);
      return
    } catch (err) {
      console.log(err);
    }
  },
};