export const WS_FEED_INIT = 'feed/wsInit';

export interface IFeedWsInitAction {
    readonly type: typeof WS_FEED_INIT;
    payload: string;
}