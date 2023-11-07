import { UnityLoaderStatus } from "../enums/unity-loader-status";
import { UnityConfig } from "../exports";
/**
 * Hook to embed a Unity Loader script.
 * @param source The source of the unity loader.
 * @returns a hook that returns the status of the loader.
 */
declare const useUnityLoader: (unityConfig: UnityConfig) => UnityLoaderStatus;
export { useUnityLoader };
//# sourceMappingURL=use-unity-loader.d.ts.map