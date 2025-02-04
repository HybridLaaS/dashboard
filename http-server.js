import fs from "fs";
import http from "http";
import path from "path";

const publicDir = path.resolve(process.argv[2] || "./public");

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
    const filePath = path.resolve(publicDir + (request.url === "/" ? "/index.html" : request.url));

    if (!filePath.startsWith(publicDir)) {
        response.writeHead(403);
        response.end();
        return;
    }

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