const Vote = require("../models/Vote");
const Post = require("../models/Post");
const tallyVotes = (votes) => {
  // console.log(votes)
  let count = {
    toast: 0,
    sandwich: 0,
    taco: 0,
    sushi: 0,
    breadbowl: 0,
    calzone: 0,
    salad: 0
  }
  for (let i=0; i<votes.length; i++) {
    console.log(votes[i])
    count[votes[i].vote]++
  }
  // console.log(count)
  return count
}
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
      const post = await Post.findById(req.params.id);
      // const votes = await Vote.find({post: req.params.id});
      const votes = await Vote.find({post: req.params.id})
      // console.log(post)
      // console.log(votes)
      // console.log(tallyVotes(votes))
      let counts = tallyVotes(votes)
      // Respond with voting results for the post
      res.render("post.ejs", { post: post, user: req.user, comments: {}, votes: counts });
    } catch (err) {
      console.log(err);
    }
  },
  getVotes: async (req,res) => {
    try {
      const votes = await Vote.findById(req.params.id);
      // Respond with voting results for the post
      res.json(votes)
    } catch (error) {
      console.log(error);
    }
      }
};