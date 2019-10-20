/*
    nodejs 下载网页
*/

const fs = require("fs");
const https = require("https");
const http = require("http");
const cheerio = require('cheerio');

let url = "https://www.jjxsw.la/";

let urlType = url.startsWith("https") ? https : http;


fs.exists('./target.html', function(exists){
    if(exists){
        fs.readFile('./target.html','utf-8', (err, data) => {
            var con = cheerio.load(data);
            //var copyright = con.finc('.new').text;
            //var lesson_list = con('.subnav').find('ul').children('li').text();
            //var title = con('.searchbut').attr('title');
            var novellist = con('.iArticle').find('li a');
            for (const key in novellist) {
                if (novellist.hasOwnProperty(key)) {
                    const element = novellist[key];
                    console.log('title:'+ element.attribs['title']+'  url:'+element.attribs['href']);
                    
                }
            }
            //console.log('title:'+novellist);
        })

    }else{
        urlType.get(url, (res) => {
            var content = "";
        
            //获取数据
            res.on("data", buf => {
                content += buf;
            });
        
            res.on("end", ()=>{
                // //console.log(content);
                // var con = cheerio.load(content);
                // //var copyright = con.finc('.new').text;
                // //var lesson_list = con('.subnav').find('ul').children('li').text();
                // //var title = con('.searchbut').attr('title');
                // var novellist = con.find('li a').attr('title');
                // console.log('title:'+novellist);
                fs.writeFileSync("./target.html", content);
            })
        })
    }
})


// urlType.get(url, (res) => {
//     var content = "";

//     //获取数据
//     res.on("data", buf => {
//         content += buf;
//     });

//     res.on("end", ()=>{
//         //console.log(content);
//         var con = cheerio.load(content);
//         //var copyright = con.finc('.new').text;
//         //var lesson_list = con('.subnav').find('ul').children('li').text();
//         //var title = con('.searchbut').attr('title');
//         var novellist = con.find('li a').attr('title');
//         console.log('title:'+novellist);
//     })
// })

