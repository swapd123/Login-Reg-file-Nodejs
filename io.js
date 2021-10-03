const fs = require('fs')
const upio = require('up.io')
const path = require('path')

module.exports.con = async socket => {
    var uploader = new upio()
    uploader.listen(socket)
    console.log("connected")
	
	socket.on('path', async location => {
		const files = []
		let parent = path.parse(location).dir
		fs.readdir(location, {withFileTypes: true}, (err, dir) => {
			for (const f of dir) files.push({
				name: f.name,
				path: path.join(location, f.name), 
				isFile: f.isFile(),
			})
			socket.emit('files', {files, location, parent})
		})
	})
}