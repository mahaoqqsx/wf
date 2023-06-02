import { RequestHandler } from "express";

const checkDailyMissionBonusController: RequestHandler = (_req, res) => {
    const data = Buffer.from([
        0x44, 0x61, 0x69, 0x6c, 0x79, 0x4d, 0x69, 0x73, 0x73, 0x69, 0x6f, 0x6e, 0x42, 0x6f, 0x6e, 0x75, 0x73, 0x3a,
        0x31, 0x2d, 0x44, 0x61, 0x69, 0x6c, 0x79, 0x50, 0x56, 0x50, 0x57, 0x69, 0x6e, 0x42, 0x6f, 0x6e, 0x75, 0x73,
        0x3a, 0x31, 0x0a
    ]);
    res.writeHead(200, {
        "Content-Type": "text/html",
        "Content-Length": data.length
    });
    res.end(data);
};

export { checkDailyMissionBonusController };
