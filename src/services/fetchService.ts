import {injectable} from "tsyringe";
import {bufferCount, concatMap, forkJoin, map, Observable, of} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import axios from "axios";
import {ConfigurationService} from "./configuration.service";

@injectable()
export class FetchService {
    constructor(
        private confSrv: ConfigurationService
    ) {
    }

    run(data: Array<string>): void {
        let count = 0;
        const conf = this.confSrv.getConfiguration();
        of(...data).pipe(
            bufferCount(conf.numberOfSimultaneousRequests),
            map(item => ({data: item, count: count++})),
            concatMap(part => {
                console.log('run part:', part.count);
                return forkJoin([of(part.count), ...this.getBufferedFileFromNet(part.data)])
            })
        ).subscribe(([count, data]) => {
            console.log('processed part:', count, data.statusText);
        });
    }

    getBufferedFileFromNet(urls: Array<string>): Array<Observable<any>> {
        return urls.map(url => fromPromise(axios({
            method: "get",
            responseType: 'arraybuffer',
            url: url,
        })))
    }
}