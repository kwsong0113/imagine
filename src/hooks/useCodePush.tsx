import { useState } from 'react';
import CodePush, {
  DownloadProgress,
  LocalPackage,
  RemotePackage,
} from 'react-native-code-push';
import { useEffectOnce } from './useEffectOnce';

export enum CodePushStatus {
  IDLE = 'IDLE',
  CHECKING = 'CHECKING',
  DOWNLOADING = 'DOWNLOADING',
  INSTALLING = 'INSTALLING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const useCodePush = () => {
  const [status, setStatus] = useState<CodePushStatus>(CodePushStatus.IDLE);
  const [isMandatory, setIsMandatory] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    totalBytes: 1,
    receivedBytes: 0,
  });

  const checkCodePush = async () => {
    try {
      CodePush.notifyAppReady();
      CodePush.disallowRestart();
      setStatus(CodePushStatus.CHECKING);
      const update = await CodePush.checkForUpdate();
      if (!update) {
        setStatus(CodePushStatus.SUCCESS);
        return;
      }
      setIsMandatory(update.isMandatory);
      await installCodePushUpdate(update);
    } catch (error) {
      setStatus(CodePushStatus.ERROR);
    }
  };

  const installCodePushUpdate = async (update: RemotePackage) => {
    try {
      setStatus(CodePushStatus.DOWNLOADING);
      update
        .download((progress: DownloadProgress) => {
          setDownloadProgress(progress);
        })
        .then((newPackage: LocalPackage) => {
          setStatus(CodePushStatus.INSTALLING);
          newPackage
            .install(
              update.isMandatory
                ? CodePush.InstallMode.IMMEDIATE
                : CodePush.InstallMode.ON_NEXT_RESTART,
            )
            .then(() => {
              setStatus(CodePushStatus.SUCCESS);
            });
        });
    } catch (error) {
      setStatus(CodePushStatus.ERROR);
    }
  };

  useEffectOnce(() => {
    checkCodePush();
  });

  return { status, isMandatory, downloadProgress };
};
