import { window, workspace } from 'vscode';
import { Options } from './types';

function getCurrentDateTimeString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}\\ at\\ ${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}`;
}

function getDefaultRecordingPath() {
  const root = workspace.workspaceFolders
    ? workspace.workspaceFolders[0]
    : null;
  const path = root?.uri?.fsPath;
  if (!path) {
    window.showErrorMessage(
      "Can't access workspace root folder. To be able to record, you should open a folder, or use the version of the record command that allows specifying record path.",
    );
  }
  return path;
}

function getDefaultFileName() {
  return `scrcpy\\ recording\\ ${getCurrentDateTimeString()}.mp4`;
}

async function askForBitRate(): Promise<string | undefined> {
  return window.showInputBox({ placeHolder: 'Enter bit rate (e.g. 8M)' });
}

async function askForVideoBitRate(): Promise<string | undefined> {
  return window.showInputBox({ placeHolder: 'Enter the video bit rate (e.g. 8M)' });
}

async function askForEnableAudio(): Promise<string | undefined> {
  return window.showQuickPick(['Yes', 'No'], { placeHolder: 'Enable audio?' });
}

async function askForAudioBitRate(): Promise<string | undefined> {
  return window.showInputBox({ placeHolder: 'Enter audio bit rate (e.g. 8M)' });
}

async function askForFrameRate(): Promise<string | undefined> {
  return window.showInputBox({ placeHolder: 'Enter frame rate (e.g. 30)' });
}

async function askForPath(): Promise<string | undefined> {
  return window.showInputBox({
    placeHolder: 'Enter full path to directory to save in',
  });
}

async function askForStayAwake(): Promise<string | undefined> {
  return window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Stay awake?',
  });
}

async function askForTurnScreenOff(): Promise<string | undefined> {
  return window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Turn screen off?',
  });
}

async function askForShowTouches(): Promise<string | undefined> {
  return window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Show touches?',
  });
}

async function askForSize(): Promise<string | undefined> {
  return window.showInputBox({
    placeHolder:
      'Enter max size (e.g. 1024). The other dimension will be computer accordingly to preserve device aspect ratio.',
  });
}

async function askForCrop(): Promise<string | undefined> {
  return window.showInputBox({
    placeHolder:
      'Enter crop (e.g. 1224:1440:0:0 for 1224x1440 at offset (0,0))',
  });
}

/**
 * Informs the user that for the fields they were prompted for but they
 * skipped, default values will be used.
 *
 * Fields will be null when they were asked of the user but the user skipped.
 * Fields that were not asked of the user will be undefined.
 */
function showNotSpecifiedMessage(options: Options) {
  const { bitrate, framerate, path, size, crop } = options;

  const fields = [];
  if (bitrate === null) fields.push('bit rate');
  if (framerate === null) fields.push('frame rate');
  if (path === null) fields.push('path');
  if (size === null) fields.push('size');
  if (crop === null) fields.push('crop');

  if (fields.length === 0) return;

  window.showInformationMessage(
    fields.length === 1
      ? `Using default value for ${fields[0]} as it was not specified`
      : `Using default values for ${fields.join(
          ', ',
        )} as they were not specified.`,
  );
}

export {
  getCurrentDateTimeString,
  getDefaultRecordingPath,
  getDefaultFileName,
  askForBitRate,
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
};
