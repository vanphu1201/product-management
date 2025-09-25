const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatusHelper");
const paginationHelper = require("../../helpers/paginationHelper");
const systemConfig = require("../../config/system")

// [GET] /admin/products
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    };
    if (req.query.status){
        find.status = req.query.status;
    }

    let keyword = req.query.keyword;
    if (keyword){
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }

    // Pagination
    const countProducts = await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        {
        currentPage: 1,
        limitItem: 4
        },
        req.query,
        countProducts
    )
     // end Pagination

    // sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }
    // end sort
    

    const products = await Product
        .find(find).limit(objectPagination.limitItem)
        .skip(objectPagination.skip)
        .sort(sort)



    res.render("admin/pages/products/index", {
        pageTitle: "Trang tổng quan",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword,
        pagination: objectPagination
    });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id
    
    await Product.updateOne({_id: id}, {status: status});

    req.flash('success', 'Cập nhập trạng thái thành công');
    
    res.redirect(req.headers.referer);

};

// [PATCH] /admin/products//change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"})
            req.flash('success', `Cập nhập trạng thái ${ids.length} sản phẩm thành công`);
            break

        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"})
            req.flash('success', `Cập nhập trạng thái ${ids.length} sản phẩm thành công`);
            break

        case "delete-all":
            await Product.updateMany({_id: {$in: ids}}, {deleted: true, deletedAt: new Date()})
            break

        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")
                position = parseInt(position)
                await Product.updateOne({_id: id}, {position: position})
            }
            // 
            break

        default:
        break
    }

    res.redirect(req.headers.referer);
};

// /admin/products/delete/68a6ee4e9c1fb3a5330c145e
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id
    
    await Product.updateOne({_id: id}, {deleted: true, deletedAt: new Date()})

    res.redirect(req.headers.referer)
};


// [GET]/admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Thêm mới sản phẩm"
    });
};


// [POST]/admin/products/create
module.exports.createPost = async (req, res) => {
    if (!req.body.title) {
        req.flash("error", "Vul lòng nhập tiêu đề!");
        res.redirect(req.headers.referer);
        return;
    }

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET]/admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);

        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};


// [PATCH]/admin/products/edit/:id
module.exports.editPatch = async (req, res) => {

    console.log(req.body)

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    
   if(req.file) {
     req.body.thumbnail = `/uploads/${req.file.filename}`;
   }

    await Product.updateOne({_id: req.params.id}, req.body);


    res.redirect(req.headers.referer);
};


// [GET]/admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};