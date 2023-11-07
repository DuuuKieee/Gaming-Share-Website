import { UnityArguments } from "../types/unity-arguments";
import { UnityProvider } from "../types/unity-provider";
import { UnityLoaderStatus } from "../enums/unity-loader-status";
/**
 * Creates a Unity Instance.
 * @param unityLoaderStatus The loader status.
 * @param htmlCanvasElement A reference to the html canvas element.
 * @param unityArguments The Unity instance arguments.
 * @param unityProvider The Unity provider.
 * @returns the Unity Instance among with the status of the Unity Instance.
 */
declare const useUnityInstance: (unityLoaderStatus: UnityLoaderStatus, htmlCanvasElement: HTMLCanvasElement | null, unityArguments: UnityArguments, unityProvider: UnityProvider) => void;
export { useUnityInstance };
//# sourceMappingURL=use-unity-instance.d.ts.map