import { window, commands, Uri } from 'vscode';
import * as cp from 'child_process';
import {
  getDefaultRecordingPath,
  getDefaultFileName,
  askForVideoBitRate,
  askForEnableAudio,
  askForAudioBitRate,
  askForFrameRate,
  askForPath,
  askForSize,
  askForCrop,
  askForStayAwake,
  askForTurnScreenOff,
  askForShowTouches,
  showNotSpecifiedMessage,
} from './utils';
import { Options, Mode } from './types';

function start(options: Options) {
  const { videoBitrate, enableAudio, audioBitrate, framerate, path, size, crop } = options;
  const p =
    options.mode === 'record' ? path || getDefaultRecordingPath() : undefined;

  const recordParam =
    options.mode === 'record' ? `--record ${p}/${getDefaultFileName()}` : '';
  const videoBitrateParam = videoBitrate ? `--video-bit-rate ${videoBitrate}` : '';
  const enableAudioParam = enableAudio == false ? '--no-audio' : '';
  const audioBitrateParam = audioBitrate ? `--audio-bit-rate ${audioBitrate}` : '';
  const framerateParam = framerate ? `--max-fps ${framerate}` : '';
  const sizeParam = size ? `--max-size ${size}` : '';
  const cropParam = crop ? `--crop ${crop}` : '';
  const stayAwakeParam = options.stayAwake ? '--stay-awake' : '';
  const turnScreenOffParam = options.turnScreenOff ? '--turn-screen-off' : '';
  const showTouchesParam = options.showTouches ? '--show-touches' : '';

  showNotSpecifiedMessage(options);

  cp.exec(
    `scrcpy ${recordParam} ${videoBitrateParam} ${enableAudioParam} ${audioBitrateParam} ${framerateParam} ${sizeParam} ${cropParam} ${stayAwakeParam} ${turnScreenOffParam} ${showTouchesParam}`,
    error => {
      if (error?.message?.includes('command not found')) {
        window
          .showInformationMessage('scrcpy not found', {}, 'How to install')
          .then(action => {
            if (action === 'How to install') {
              commands.executeCommand(
                'vscode.open',
                Uri.parse('https://github.com/Genymobile/scrcpy#get-the-app'),
              );
            }
          });
      } else if (error) {
        window.showErrorMessage(error.message);
      }
    },
  );
}

function mirror() {
  start({ mode: 'mirror' });
}

function record() {
  start({ mode: 'record' });
}

async function customVideoBitRate(mode: Mode) {
  const bitrate = await askForVideoBitRate();
  start({ mode: mode, bitrate: bitrate || null });
}

async function customEnableAudio(mode: Mode) {
  const enableAudio = await askForEnableAudio();
  start({ mode: mode, enableAudio: enableAudio === 'Yes' });
}

async function customAudioBitRate(mode: Mode) {
  const bitrate = await askForAudioBitRate();
  start({ mode: mode, audioBitrate: bitrate || null });
}

async function customFrameRate(mode: Mode) {
  const framerate = await askForFrameRate();
  start({ mode: mode, framerate: framerate || null });
}

async function customStayAwake(mode: Mode) {
  const stayAwake = await askForStayAwake();
  start({ mode: mode, stayAwake: stayAwake === 'Yes' });
}

async function customTurnScreenOff(mode: Mode) {
  const turnScreenOff = await askForTurnScreenOff();
  start({ mode: mode, turnScreenOff: turnScreenOff === 'Yes' });
}

async function customShowTouches(mode: Mode) {
  const showTouches = await askForShowTouches();
  start({ mode: mode, showTouches: showTouches === 'Yes' });
}

async function customPath() {
  const path = await askForPath();
  start({ mode: 'record', path: path || null });
}

async function customSize(mode: Mode) {
  const size = await askForSize();
  start({ mode: mode, size: size || null });
}

async function customCrop(mode: Mode) {
  const crop = await askForCrop();
  start({ mode: mode, crop: crop || null });
}

async function customEverything(mode: Mode) {
  const videoBitRate = await askForVideoBitRate();
  const enableAudio = await askForEnableAudio();
  const audioBitRate = await askForAudioBitRate();
  const framerate = await askForFrameRate();
  const size = await askForSize();
  const crop = await askForCrop();
  const stayAwake = await askForStayAwake();
  const turnScreenOff = await askForTurnScreenOff();
  const showTouches = await askForShowTouches();
  let path;
  if (mode === 'record') {
    path = await askForPath();
  }
  start({
    mode: mode,
    videoBitrate: videoBitRate || null,
    enableAudio: enableAudio === 'Yes',
    audioBitrate: audioBitRate || null,
    framerate: framerate || null,
    path: path || null,
    size: size || null,
    crop: crop || null,
    stayAwake: stayAwake === 'Yes',
    turnScreenOff: turnScreenOff === 'Yes',
    showTouches: showTouches === 'Yes',
  });
}

export {
  mirror,
  record,
  customVideoBitRate,
  customEnableAudio,
  customAudioBitRate,
  customFrameRate,
  customPath,
  customSize,
  customCrop,
  customStayAwake,
  customTurnScreenOff,
  customShowTouches,
  customEverything,
};
