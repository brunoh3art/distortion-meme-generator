import path from "path";
import { startAnimation } from "./src/distorcion/animation";
import mime from "mime";

let inputFile = '';

for (let i = 2; i < process.argv.length; i++) {
  inputFile = path.join(inputFile, process.argv[i]);
}

const inputFileType = mime.getType(inputFile);
//collectVideoAndSound(filename, filesound);
//inputFile = inputFile.replace(/\\/g, '\\');
if (inputFileType !== 'video/mp4' && inputFileType !== 'video/x-matroska') {
  console.error('Error: Input file is not a valid MP4 or MKV video.');
  process.exit(1);
}
if(inputFileType == 'video/mp4' || inputFileType == 'video/x-matroska') {
  console.log(`filname: ${inputFile}`)
 startAnimation(inputFile.toString());
}
