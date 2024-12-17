import Queue from "bull/lib/queue";
import dbClient from "./utils/db";
import fs from 'fs';

const imageThumbnail = require('image-thumbnail');

const fileQueue = new Queue('fileQueue');

const generateThumbnail = async (filePath, size) => {
    const thumbnail = await imageThumbnail(filePath, size);
    return fs.writeFileSync(`${filePath}_${size}`, thumbnail);
}

fileQueue.process(async (job) => {
    const { fieldId, userId } = job.data;

    if (!fieldId) {
        throw new Error('Missing fieldId');
    }

    if (!userId) {
        throw new Error('Missing userId');
    }

    const file = await dbClient.files.findOne({ fieldId, userId });

    if (!file) {
        throw new Error('File not found');
    }

    const size = [500, 250, 100]
    await Promise.all(size.map((s) => generateThumbnail(file.localPath, size)));
    done();
});
