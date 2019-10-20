/*
    nodejs 下载网页
*/

const fs = require("fs");
const https = require("https");
const http = require("http");
const cheerio = require('cheerio');

let url = "https://www.jjxsw.la/";

let urlType = url.startsWith("https") ? https : http;

urlType.get(url, (res) => {
    var content = "";

    //获取数据
    res.on("data", buf => {
        content += buf;
    });

    res.on("end", ()=>{
        //console.log(content);
        var con = cheerio.load(content);
        //var copyright = con.finc('.new').text;
        var lesson_list = con('.subnav').find('ul').children('li').text;
        console.log(lesson_list);
    })
})

