import * as fs from 'fs';
import {unlinkSync} from 'fs';
import {join, resolve} from 'path';
import {injectable} from 'tsyringe';
import {parse} from 'json5';
import {IEmptyObject} from "../model/model";


@injectable()
export class FileAccessService {
    writeFile(pathToFile: string, content: string, error: string): void {
        try {
            fs.writeFileSync(pathToFile, content);
        } catch (_err: unknown) {
            throw new Error('error');
        }
    }

    writeJsonFile(pathToFile: string, content: IEmptyObject, error: string): void {
        const jsonContent: string = JSON.stringify(content, null, 2);
        this.writeFile(pathToFile, `${jsonContent}\n`, error);
    }

    readFile(pathToFile: string, error: string): string {
        this.checkExistFile(pathToFile, error);
        try {
            return fs.readFileSync(pathToFile, {encoding: 'utf-8'})
                .toString();
        } catch (_err: unknown) {
            throw new Error('Cannot read file');
        }
    }

    readJsonFile<T extends IEmptyObject>(pathToFile: string, error: string): T {

        const file = this.readFile(pathToFile, error);
        return parse(file);
    }

    checkExistFile(pathToFile: string, _error: string): boolean {
        if (!fs.existsSync(pathToFile)) {
            throw new Error('File not exist');
        }
        return true;
    }

    fileExist(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

    getPathToFile(elements: Array<string>): string {
        const path: string = elements.join('');
        return join(resolve(), path);
    }

    removeFile(path: string): void {
        if (this.fileExist(path)) {
            unlinkSync(path);
        }
    }

    renameFile(pathFrom: string, pathTo: string): void {
        fs.renameSync(pathFrom, pathTo);
    }

    moveFile(pathFrom: string, pathTo: string): void {
        fs.renameSync(pathFrom, pathTo);
    }
}
