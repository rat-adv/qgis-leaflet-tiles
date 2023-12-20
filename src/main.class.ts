import "reflect-metadata"
import {container, injectable} from "tsyringe";
import {lessonsRunInterface} from "./model/lesson-run-interface";
import {Type} from "./model/system.model";
import {FetchMapService} from "./services/fetch-map.service";

@injectable()
export class MainClass {

  run(runner: Type<lessonsRunInterface>): void {
    const instance = container.resolve<lessonsRunInterface>(runner);
    instance.run()
  }
}

const main: MainClass = container.resolve(MainClass)

main.run(FetchMapService)
