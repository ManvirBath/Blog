import express from 'express';
import bodyparser from 'body-parser';

let app = express();
let port = 3000;

let posts = [];

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/posts')

app.get("/", (req, res) => {
    res.render("home.ejs", { posts });
});

app.post('/create_post', (req, res) => {
    const { postContent } = req.body;
    if(posts.length < 4) {
    const newPost =  {
        id: posts.length + 1,
        content: postContent
    };
    posts.push(newPost);
    res.redirect('/');
    } else {
        res.status(403).send("Maximum number of posts reached");
    }
});

app.get('/posts/:id/edit', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id === parseInt(postId));
    if(post) {
        res.render('edit_post', {post});
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/:id/edit', (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;
    const postIndex = posts.findIndex(post => post.id === parseInt(postId));
    if(postIndex !== - 1) {
        posts[postIndex].content = content;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/:id/delete', (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== parseInt(postId));
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});