module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vul lòng nhập tiêu đề!");
        res.redirect(req.headers.referer);
        return;
    }
    next();
}