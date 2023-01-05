import { exec } from "node:child_process";
import util from "node:util";

const execPromise = util.promisify(exec);

export const runMagi = async (props: string) => {
  try {
    await execPromise(`magick ${props}`);
  } catch (error) {
    return false;
  }
};

export async function checkImagickIsInstalled() {
  try {
    // await for exec to complete
    await execPromise("magick");
    return false;
  } catch (error) {
    console.log(
      "ImageMagick is not installed (https://imagemagick.org/script/download.php)"
    );
    return true;
  }
}
