<h1 align="center">Distortion Meme Generator</h1>
 
## Description
This is a Node.js project that uses ImageMagick and FFmpeg to create distortion in videos and turn them into memes. The project applies a liquid-rescale effect and uses FFmpeg to create a robotic voice effect.

<p>Check out an example of the final result on YouTube: <br/><a href="https://www.youtube.com/shorts/rUyXfrabcE4" target="_blank">https://www.youtube.com/shorts/rUyXfrabcE4</a><p>


## Installation
Before getting started, you will need to install Node.js and ImageMagick on your machine. You will also need to download and install FFmpeg.

Once the dependencies are installed, simply clone the repository and install the project dependencies with the following command:


```bash
git clone https://github.com/404-Chacal/distortion-meme-generator.git
cd distortion-meme-generator
npm install
```
## Usage
To use the project, simply pass the path of the input video as an argument to the script:

```bash
yarn dev "path/to/input/video.mp4"
```
The distorted video will be generated in the same folder as the input video with the name `Final.mp4`.

## Contribution
If you wish to contribute to the project, feel free to create a pull request. All contributions are welcome and appreciated.

## Credits
This project was made possible thanks to the following libraries and resources:

- [ImageMagick](https://imagemagick.org/)
- [FFmpeg](https://ffmpeg.org/)