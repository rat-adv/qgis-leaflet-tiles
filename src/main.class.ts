import "reflect-metadata"
import {container, injectable} from "tsyringe";
import {BboxService} from "./services/bbox.service";
import {FetchService} from "./services/fetchService";
import {ConfigurationService} from "./services/configuration.service";

@injectable()
export class MainClass {
    constructor(private readonly bboxSrv: BboxService,
                private readonly fetchSrv: FetchService,
                private confSrv: ConfigurationService) {
    }

    run(): void {
        const conf = this.confSrv.getConfiguration();
        const urls = this.bboxSrv.run();
        this.fetchSrv.run(urls)

    }

}

const main: MainClass = container.resolve(MainClass)

main.run()
