export interface ConfigurationModel {
    numberOfSimultaneousRequests: number,

    WMSAddress: string
    generateFile: boolean,
    fileName: string,
    downloadTiles: boolean,
    layers: Array<{
        WMSLayer: string,
        zoomStart: number,
        zoomStop: number,
        WMSName: string
    }>
}