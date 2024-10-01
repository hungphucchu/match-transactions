import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ConfigService {
  private configFilePath = join(
    process.cwd(),
    'configs',
    'match.transaction.json',
  );
  private config: any;

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    try {
      const fileContent = readFileSync(this.configFilePath, 'utf-8');
      this.config = JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Could not load configuration file: ${error.message}`);
    }
  }

  private saveConfig() {
    try {
      writeFileSync(
        this.configFilePath,
        JSON.stringify(this.config, null, 2),
        'utf-8',
      );
    } catch (error) {
      throw new Error(`Could not save configuration file: ${error.message}`);
    }
  }

  get matchPreferences() {
    return this.config.matchPreferences;
  }

  get similarCharsMap() {
    return this.config.similarCharsMap;
  }
}
