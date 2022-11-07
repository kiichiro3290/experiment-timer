export default interface Api {
  saveFile: (data: any, startedAt: Date) => Promise<void | string[]>;
}
declare global {
  interface Window {
    api: Api;
  }
}
