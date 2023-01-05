import { exec } from "node:child_process";
import util from "node:util";

const execPromise = util.promisify(exec);

export const runFFmpeg = async (props: string) => {
  try {
    await execPromise(`ffmpeg ${props}`);
  } catch (error) {
    console.error(error);
    return true;
  }
};
type responseFrames = {
  stdout: string;
  stderr: string;
};
export const runFFprobe = async (
  props: string
): Promise<responseFrames | any> => {
  try {
    return await execPromise(`ffprobe ${props}`);
  } catch (error) {
    console.error(error);
        
    return true;
  }
};
