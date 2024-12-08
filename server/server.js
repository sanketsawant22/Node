const fs = require("fs")
const http = require("http");
const path = require("path");

const port = 3000;

const server = http.createServer((req, res) => {

    const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

    // additional code ----------------------------------------------------------------
    const extentionName = String(path.extname(filePath)).toLowerCase();

    const mimiType = {
        ".html" : "text/html",              
        ".css" : "text/css",           
        ".js" : "text/javascript"              
    }

    const contentType = mimiType[extentionName] || "application/octet-stream";
    // ---------------------------------------------------------------------------------

    fs.readFile(filePath, (err, content) => {
        if (err) {

            // custom error

            if (err.code === "ENOENT") {
                res.writeHead(404);
                res.end("404 : Page not found broiiiii....!");
            }
        }

        else {
            res.writeHead(200, { "content-type": contentType });
            res.end(content, "utf-8");
        }
    })
});

server.listen(port, () => {
    console.log("server listening on port : " + port);
})
