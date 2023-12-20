import {injectable} from "tsyringe";
import {ConfigurationModel} from "../model/configuration.model";
import {FileAccessService} from "./file-access.service";
import path from "node:path";

@injectable()
export class ConfigurationService {
    private data!: ConfigurationModel;

    constructor(private readonly fileSrv: FileAccessService) {
        // this.getConfiguration();
    }

    getConfiguration(): ConfigurationModel {
        if (this.data !== undefined) return this.data
        const dir =  path.join(process.cwd(), 'data.json5');
        this.data = this.fileSrv.readJsonFile<ConfigurationModel>(dir, 'data.json not exist');
        return this.data
    }
}