import { commands, Disposable, ExtensionContext } from 'vscode';
import {
  mirror,
  record,
  customFrameRate,
  customVideoBitRate,
  customEnableAudio,
  customAudioBitRate,
  customPath,
  customSize,
  customCrop,
  customStayAwake,
  customTurnScreenOff,
  customShowTouches,
  customEverything,
} from './scrcpy';

function register(
  command: string,
  onExecute: (...args: any[]) => any,
): Disposable {
  return commands.registerCommand(command, onExecute);
}

export function activate(context: ExtensionContext) {
  const registrations = [
    register('scrcpy.mirror', mirror),
    register('scrcpy.mirrorVideoBitRate', () => customVideoBitRate('mirror')),
    register('scrcpy.mirrorEnableAudio', () => customEnableAudio('mirror')),
    register('scrcpy.mirrorAudioBitRate', () => customAudioBitRate('mirror')),
    register('scrcpy.mirrorFrameRate', () => customFrameRate('mirror')),
    register('scrcpy.mirrorSize', () => customSize('mirror')),
    register('scrcpy.mirrorCrop', () => customCrop('mirror')),
    register('scrcpy.mirrorCustom', () => customEverything('mirror')),
    register('scrcpy.mirrorStayAwake', () => customStayAwake('mirror')),
    register('scrcpy.mirrorTurnScreenOff', () => customTurnScreenOff('mirror')),
    register('scrcpy.mirrorShowTouches', () => customShowTouches('mirror')),
    register('scrcpy.record', record),
    register('scrcpy.recordVideoBitRate', () => customVideoBitRate('record')),
    register('scrcpy.recordEnableAudio', () => customEnableAudio('record')),
    register('scrcpy.recordAudioBitRate', () => customAudioBitRate('record')),
    register('scrcpy.recordFrameRate', () => customFrameRate('record')),
    register('scrcpy.recordPath', customPath),
    register('scrcpy.recordSize', () => customSize('record')),
    register('scrcpy.recordCrop', () => customCrop('record')),
    register('scrcpy.recordCustom', () => customEverything('record')),
    register('scrcpy.recordStayAwake', () => customStayAwake('record')),
    register('scrcpy.recordTurnScreenOff', () => customTurnScreenOff('record')),
    register('scrcpy.recordShowTouches', () => customShowTouches('record')),
  ];
  context.subscriptions.push(...registrations);
}
