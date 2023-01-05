import { SOUND_FILTER_FREQUENCY, SOUND_FILTER_MODULATION_DEPTH } from "../config/config";
import { runFFmpeg, runFFprobe } from "../handles/ffmpeg";

type collectProps = {
  filePath: string;
  soundPath?: string;
  output: string;
};

export const distortSound = async (filename: string, output: string) => {
  return runFFmpeg(
    `-i "${filename}" -vn -c:a libopus -af vibrato=f=${SOUND_FILTER_FREQUENCY}:d=${SOUND_FILTER_MODULATION_DEPTH} "${output}"`
  );
};

export const collectAnimationFramesAndSound = ({
  filePath,
  soundPath,
  output,
}: collectProps) => {
  if (soundPath != "") {
    return runFFmpeg(`-i "${filePath}" -i "${soundPath}" "${output}"`);
  }
  return runFFmpeg(`-i "${filePath}" -c:v copy -an "${output}"`);
};

export const collectFramesToVideo = async (
  framesPath: string,
  output: string,
  frameRateFraction: number
) => {
  return runFFmpeg(
    `-r "${frameRateFraction}"\
  -i "${framesPath}"\
  -f mp4\
  -c:v libx264\
  -an\
  -pix_fmt yuv420p\
  "${output}"`
  );
};

export async function getFrameRateFractionAndDuration(filename: string) {

  try {
    const a = await runFFprobe(
      `-v error -select_streams v -of default=noprint_wrappers=1:nokey=1 -show_entries stream=avg_frame_rate -show_entries format=duration "${filename}"`
    );
    console.log(`getFrameRateFractionAndDuration: ${a}`);
    
    const split = a.stdout.split("\n");
    const duration = parseFloat(split[1]);
  
    return split[0], duration;
  } catch (error) {
    console.error(`Error: ${error}`);
    return 0;
  }
}

export async function extractFrameVideo(
  filename: string,
  frameRate: number,
  outputFrame: string
) {
  return await runFFmpeg(`-i "${filename}" -r "${frameRate}" ${outputFrame}`);
}
