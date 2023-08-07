import fs from "fs"
import path from "path"
import { Request, Response } from "express"


export function stream(req: Request, res: Response) {
	const id = req.query.v as string
	const range = req.headers.range as string
	const mime = req.query.m as string

	if (!range) return res.status(400).json({ error: "Missing `range` in header" })
	if (!mime) return res.status(400).json({ error: "Missing `m` in query" })
	if (!id) return res.status(400).json({ error: "Missing `v` in query" })

	try {
		const filePath = path.join(process.cwd(), "media", id)
		const fileSize = fs.statSync(filePath).size

		const CHUNK_SIZE = 10 ** 6

		const chunkStart = Number(range.replace(/\D/g, ""))
		const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, fileSize - 1)
		const chunkSize = chunkEnd - chunkStart + 1

		const headers = {
			"Content-Range": `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": chunkSize,
			"Content-Type": mime,
		}

		res.writeHead(206, headers)
		const stream = fs.createReadStream(filePath, { start: chunkStart, end: chunkEnd })
		stream.pipe(res)

	} catch (error: any) {
		if (error.code === "ENOENT") return res.status(404).json({ error: "File Not Found" });
		else return res.status(500).json({ error: "Internal Server Error" })
	}
}