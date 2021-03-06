const express = require('express');
const Router = express.Router();

const multer = require('multer');

const port = process.env.PORT || 5000;

let name='';
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../../Img`);
    },
    filename: function (req, file, cb) {
        let sp = file.originalname.split('.');
        let last = sp[sp.length - 1];
        name=Date.now() + '.' + last;
        cb(null, name);
    }
});

var upload = multer({storage: storage}); // 文件储存路径

Router.post('/img', upload.single('avatar'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    // 接收文件成功后返回数据给前端
    res.json({path: `/Img/${name}`});
});


module.exports = Router;