import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export class StorageService {

  // JSON "set" example
  async setObject(key: string, item: any) {
    await Storage.set({ key, value: JSON.stringify(item) });
  }

  // JSON "get" example
  async getObject(key: string) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async setItem(item: any) {
    return await Storage.set(item);
  }

  async getItem(key) {
    const { value } = await Storage.get(key);
    return value;
  }

  async removeItem(key: string) {
    await Storage.remove({ key });
  }

  async keys() {
    const { keys } = await Storage.keys();
    return keys;
  }

  async clear() {
    await Storage.clear();
  }
}
