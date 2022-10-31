export default interface Api {
  saveFile: (data: any) => Promise<void | string[]>;
}
declare global {
  interface Window {
    api: Api;
  }
}
