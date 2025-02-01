import fs from "fs";
import http from "http";

function getMimeType(filePath) {
    const extension = filePath.split(".").pop();

    switch (extension) {
        case "html":
            return "text/html";
        case "js":
            return "application/javascript";
        case "css":
            return "text/css";
        default:
            return "text/plain";
    }
}

function httpHandler(request, response) {
    const filePath = "./public" + (request.url === "/" ? "/index.html" : request.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(404);
            response.end();
            return;
        }

        response.setHeader("Content-Type", getMimeType(filePath));
        response.writeHead(200);
        response.end(data);
    });
}

http.createServer(httpHandler).listen(8080);