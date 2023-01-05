import * as fs from "node:fs";
import * as path from "node:path";

import { checkImagickIsInstalled } from "../handles/magi";
import { distorteImage } from "./image";
import {
  collectAnimationFramesAndSound,
  collectFramesToVideo,
  distortSound,
  extractFrameVideo,
  getFrameRateFractionAndDuration,
} from "./video";

const final_path = path.join(__dirname, "..", "..", "result");
const path_frame = path.join(__dirname, "..", "..", "frames");
const distorted_frames = path.join(__dirname, "..", "..", "distortedFrames");

export const startAnimation = async (filename:string) => {
  if (await checkImagickIsInstalled()) return;


  const filepathname = "./frames/%05d.png";

  console.log("STARTING.....");
  //create output directories
  fs.mkdirSync(path_frame, { recursive: true });
  fs.mkdirSync(distorted_frames, { recursive: true });
  fs.mkdirSync(final_path, { recursive: true });

  // read frames and delete frames
  deleteTemp();

  //extract frames
  const frameRateFraction = await getFrameRateFractionAndDuration(filename);
  console.log("Extracting frames......");

  const responseExtract = await extractFrameVideo(
    filename,
    frameRateFraction,
    filepathname
  );
  if (responseExtract) return;
  // read frames
  const readNewFrames = fs.readdirSync(path_frame); // read folder
  let currentFramePosition = 0;
  console.log("Distorcing frames......");

  for (let index = 0; index < readNewFrames.length; index++) {
    currentFramePosition = index;
    process.stdout.write(
      `progress: ${Math.round(
        (currentFramePosition / readNewFrames.length) * 100
      )}%\r`
    );
    const response = readNewFrames[index];
    const origpath = path.join(path_frame, response);
    const finalOutput = path.join(distorted_frames, response);

    await distorteImage(origpath, finalOutput);
  }

  console.log("Creating video......");
  fs.readdirSync(final_path).forEach((f) =>
    fs.rmSync(`${final_path}/${f}`, { recursive: true })
  );

  const readNewdistortedFrames = path.join(distorted_frames, "%05d.png"); // read folder

  const final = path.join(final_path, "frames.mp4");

  await collectFramesToVideo(readNewdistortedFrames, final, frameRateFraction);

  const sound = path.join(final_path, "audio.ogg");
  await distortSound(filename, sound);
  console.log("Creating video......");
  fs.rmSync("Final.mp4", { recursive: true });
  await collectAnimationFramesAndSound({
    filePath: final,
    soundPath: sound,
    output: "Final.mp4",
  });
  deleteTemp();
};

function deleteTemp() {
  // read frames and delete frames
  fs.readdirSync(distorted_frames).forEach((f) =>
    fs.unlinkSync(path.join(distorted_frames, f))
  );
  fs.readdirSync(path_frame).forEach((f) =>
    fs.unlinkSync(path.join(path_frame, f))
  );
}

export async function collectVideoAndSound(filename: string, sound: string) {
  await collectAnimationFramesAndSound({
    filePath: filename,
    soundPath: sound,
    output: "Collect.mp4",
  });
}
