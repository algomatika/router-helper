const fs = require('fs')
const path = require('path')
const os = require('os')
var l = {}
var originDir = ""
var dir = []

var slash = '/'
if(os.platform()==='win32'){
    slash = '\\'
}

global.slash = slash

function readDeeper(dir){
    fs.readdirSync(dir).forEach(File =>{
        if(File!=="index.js"){
            var rp = path.parse(File).name
            checkNow(dir,File)
        }
    })
}

function isDir(dir){
    return fs.lstatSync(dir).isDirectory()
}

function asignPath(ext){
    var x = ext;
    if(ext.indexOf(originDir)>-1){
        var tempDir = ext.split(originDir+slash);
        x = tempDir[1]
    }
    
    //var filename = path.parse(x).name
    var y = x.split('.js')
    var name = y[0].split('Controller')
    var pathReady = ""
    
    var path = name[0].split(global.slash)

    for(var a = 0;a<path.length;a++){
        if(a>0&&a===(path.length-1)&&path[a]==="Main"){
          continue
        }
        pathReady+="/"+path[a]
    }
    
    l[pathReady] = require(originDir+slash+x)
}

function checkNow(dir,file){
    if(isDir(dir+slash+file)){
        readDeeper(dir+slash+file)
    }else if(fs.lstatSync(dir+slash+file).isFile()&&file.indexOf("Controller")>-1){
        asignPath(dir+slash+file)
    }
}

function init(folder){
    originDir = folder+slash+"controllers"
    fs.readdirSync(originDir).forEach(File =>{
    
        if(File!=="index.js"){
            //var rp = path.parse(File).name
            checkNow(originDir,File)
        }
    })

    return l
}


module.exports = init