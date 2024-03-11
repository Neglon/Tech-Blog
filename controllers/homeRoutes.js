const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/create", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render("newPost", {
        logged_in: req.session.loggedIn,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/signin");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/create/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    if (req.session.loggedIn) {
      res.render("edit", {
        ...post,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
      });
      return;
    } else {
      res.redirect("/signin");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signin');
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          include: [User],
        },
        {
          model: Comment,
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user)

    res.render("dashboard", {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});


module.exports = router;
