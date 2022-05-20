const fs = require('fs');
const io = require("./io.js");

var file = process.argv[2];
if(file == undefined){
    file = process.argv[1];
}
const lines = fs.readFileSync(file, "utf8").split("\r\n");

function check(line){
    const command = line.split(" ")[0];
    var args = line.split(" ");
    args.shift();
    switch(command){
        case "var":
            io.varr(args);
            break;
        case "print":
            io.print(args);
            break;
        case "jump":
            io.call(args);
            break;
        case "func":
            io.addfunc(args);
            break;
        case "add":
            io.add(args);
            break;
        case "sub":
            io.sub(args);
            break;
        case "delvar":
            io.dev(args);
            break;
        case "exit":
            io.ext(args);
            break;
        case "if":
            io.iff(args);
            break;
        case "gettime":
            io.gt(args);
            break;
        case "read":
            io.read(args);
            break;
        case "write":
            io.write(args);
            break;
        case "mkdir":
            io.mkdir(args);
            break;
        case "rmdir":
            io.rmdir(args);
            break;
        case "rm":
            io.rm(args);
            break;
        case "rename":
            io.rename(args);
            break;
        case "copy":
            io.copy(args);
            break;
        case "input":
            io.input(args);
            break;
        case "split":
            io.split(args);
            break;
        case "getchar":
            io.getchar(args);
            break;
        case "getsize":
            io.getsize(args);
            break;
    }
}
for(; require("./cfg.js").index < lines.length; require("./cfg.js").index++){
    const line = lines[require("./cfg.js").index]
    .trim()
    .replace("\\n", "\n")
    .replace("\\r", "\r");  
    if(line == ""){
        continue;
    }
    if(line.endsWith(":") && line.indexOf(" ") === -1){
        io.addfunc([line.replace(":", ""), (require("./cfg.js").index+1).toString()]);
    } else if(line.endsWith("++")){
        io.add([line.replace("++", ""), "++"]);
    } else if(line.endsWith("--")){
        io.sub([line.replace("--", ""), "++"]);
    } else {
        check(line);
    }
}