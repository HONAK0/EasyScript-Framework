const fs = require("fs");

var vars = [["\\s", " "],["++",1]];
var funcs = [];
const prompt = require('prompt-sync')();

function findVar(name){
    var id = 0;
    var res;
    vars.forEach(elem => {
        if(elem[0] == name)
            res = [id, elem[1]];
        id++;
    });
    return res;
}

function varr(args){
    var getvar = findVar(args[0]);
    if(getvar == undefined){
        var name = args[0];
        var typ = args[1];
        args.shift();args.shift();
        var cont = args.join(" ");
        if(typ == "int")
            cont = parseInt(args.join(" "));
        vars.push([name, cont]);
    } else {
        var name = args[0];
        var typ = args[1];
        args.shift();args.shift();
        var cont = args.join(" ");
        if(typ == "int")
            cont = parseInt(args.join(" "));
        vars[getvar[0]] = [name, cont];
    }
}
function print(args){
    var res = findVar(args[0]);
    if(res == undefined){
        console.error(`Var(${args[0]}) not found`);
        process.exit(1);
    } else {
        process.stdout.write(res[1].toString());
    }
}
function addfunc(args){
    funcs.push([args[0], parseInt(args[1])-2]);
}
function call(args){
    funcs.forEach(elem => {
        if(elem[0] == args[0])
            require("./cfg.js").index = elem[1];
    });
}
function add(args){
    var var1 = findVar(args[0]);
    var var2 = findVar(args[1]);
    vars[var1[0]][1] = var1[1]+var2[1];
}
function sub(args){
    var var1 = findVar(args[0]);
    var var2 = findVar(args[1]);
    vars[var1[0]][1] = var1[1]-var2[1];
}
function println(args){
    print(args);
    console.log();
}
function dev(args){
    delete vars[findVar(args[0])[0]];
}
function ext(args){
    process.exit(0);
}
function iff(args){
    switch(args[1]){
        case "==":
            if(findVar(args[0])[1] == findVar(args[2])[1]){
                call([args[3]]);
            }
            break;
        case ">=":
            if(findVar(args[0])[1] >= findVar(args[2])[1]){
                call([args[3]]);
            }
            break;
        case "<=":
            if(findVar(args[0])[1] <= findVar(args[2])[1]){
                call([args[3]]);
            }
            break;
        case ">":
            if(findVar(args[0])[1] > findVar(args[2])[1]){
                call([args[3]]);
            }
            break;
        case "<":
            if(findVar(args[0])[1] < findVar(args[2])[1]){
                call([args[3]]);
            }
            break;
        case "!=":
            if(findVar(args[0])[1] != findVar(args[2])[1]){
                call([args[3]]);
            }
            break;
    }
}
function gt(args){
    var varr = findVar(args[0]);
    var time = new Date().getTime();
    vars[varr[0]][1] = time;
}
function read(args){
    vars[findVar(args[1])[0]][1] = fs.readFileSync(findVar(args[0])[1], "utf8");
}
function write(args){
    fs.writeFileSync(findVar(args[0])[1],findVar(args[1])[1], "utf8");
}
function mkdir(args){
    fs.mkdirSync(findVar(args[0])[1]);
}
function rmdir(args){
    fs.rmdirSync(findVar(args[0])[1]);
}
function rm(args){
    fs.rmSync(findVar(args[0])[1]);
}
function rename(args){
    fs.renameSync(findVar(args[0])[1], findVar(args[1])[1]);
}
function copy(args){
    fs.copyFileSync(findVar(args[0])[1], findVar(args[1])[1]);
}
function input(args){
    vars[findVar(args[0])[0]][1] = prompt(findVar(args[1])[1]);
}
function split(args){
    vars[findVar(args[0])[0]][1] = findVar(args[1])[1].split("");
}
function getchar(args){
    vars[findVar(args[0])[0]][1] = findVar(args[1])[1][findVar(args[2])[1]];
}
function getsize(args){
    vars[findVar(args[0])[0]][1] = findVar(args[1])[1].length;
}

module.exports={varr,print,addfunc,call,add,sub,println,dev,ext,iff,gt,findVar, vars,read,write,mkdir,rmdir,rm,rename,copy,input,split,getchar,getsize};