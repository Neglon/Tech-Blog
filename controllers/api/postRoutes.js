const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
        where: {
            id: req.params.id,
        },
        });
    
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
    });

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
        where: {
            id: req.params.id,
        },
        });
    
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
    });

    module.exports = router;