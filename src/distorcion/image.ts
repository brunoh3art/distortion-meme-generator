import { DISTORT_PERCENTAGE } from "../config/config";
import { runMagi } from "../handles/magi";

export const distorteImage = async (filePath: string, outputPath: string) => {
  try {
    await runMagi(
      `${filePath} -scale 512x512  -liquid-rescale ${DISTORT_PERCENTAGE}% -scale 200% ${outputPath}`
    );
  } catch (error) {
    return true;
  }
};
