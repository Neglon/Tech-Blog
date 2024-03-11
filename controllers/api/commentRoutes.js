const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_body: req.body.content,
            blogPost_id: req.body.post_id,
            user_id: req.session.user_id || req.body.user_id,
          });
      
          res.status(200).json(newComment);
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
      });

    router.get('/', async (req, res) => {
        try {
          const commentData = await Comment.findAll({
            include: [
              {
                model: User,
                attributes: ['username'],
              },
              {
                model: Post,
                attributes: ['id'],
              },
            ],
          });
          res.status(200).json(commentData);
        } catch (err) {
          res.status(500).json(err);
        }
      });

      router.put('/:id', async (req, res) => {
        try {
          const updatedComment = await Comment.update(
            {
              comment_body: req.body.content,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          );
          res.status(200).json(updatedComment);
        } catch (err) {
          res.status(500).json(err);
        }
      });

      router.delete('/:id', async (req, res) => {
        try {
          const commentData = await Comment.destroy({
            where: {
              id: req.params.id,
            },
          });
          if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
          }
          res.status(200).json(commentData);
        } catch (err) {
          res.status(500).json(err);
        }
      });

      module.exports = router;