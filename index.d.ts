export = MozambiqueAPI;
/**
 * Core of mozambique-api-wrapper
 *
 * @class
 */
declare class MozambiqueAPI {
  /**
   * @constructor
   * @param {String} apiKey Your [Apex Legends API](https://apexlegendsapi.com) Auth Key
   * @param {Number} [version=5] API version to use
   */
  constructor(apiKey: string, version?: number);
  apiKey: string;
  version: number;
  headers: {
    "User-Agent": string;
    "Content-Type": string;
    Authorization: string;
  };
  /**
   * Search a player using player name or UID
   *
   * @param {PlayerQuery} query - Query parameters
   * @returns {Player} Object with player info
   */
  search(query: PlayerQuery): Player;
  /**
   * Get recent news about Apex Legends
   *
   * @param {String} [lang="en-us"] Language of the news
   * @returns {ApexNews[]} Array of Apex Legends news
   */
  news(lang?: string): ApexNews[];
  /**
   * Get server status for Origin, EA, Apex Legends and apexlegendsapi API
   *
   * @returns {ServersObj} Object with status of all servers
   */
  server(): ServersObj;
  /**
   * Avaliable for everyone but with limitations depending on your api access type
   *
   * @param {String} action - Action for the Match History API (info, get, delete, add)
   * @param {PlayerQuery} [query] - Query parameters
   * @param {Number} [limit] - Limit of events to get on action get
   * @returns {Object} Data returned differs depending on action parameter. Please refer to [API documentation](https://apexlegendsapi.com) for more info
   */
  history(action: string, query?: PlayerQuery, limit?: number): Object;
  /**
   * Get the map rotation
   * @returns {MapRotationData}
   */
  mapRotation(): MapRotationData;
  /**
   * Search a Origin user
   * @param {String} player - player name
   * @param {Boolean} [showAllHits=false] - If true, get all possible hits for the given player name and returns it in an array
   * @returns {OriginData|OriginData[]}
   */
  origin(player: string, showAllHits?: boolean): OriginData | OriginData[];
  /**
   * Compare two players (WIP)
   *
   * @param {PlayerQuery} query1 - Query parameters
   * @param {PlayerQuery} query2 - Player query parameters
   * @returns {Promise<ComparedData>}
   */
  compare(query1: PlayerQuery, query2: PlayerQuery): Promise<ComparedData>;
  /**
   * Avaliable data types:
   * assault_rifles, attachments, consumables, equipment, grenades, legends, light_machine_guns, pistols, shotguns, sniper_rifles, sub_machine_guns
   * @deprecated data not updated
   * @param {String} dataType Type of data requested
   * @returns {Object} Object with requested game data
   */
  gamedata(dataType: string): Object;
}
declare namespace MozambiqueAPI {
  export {
    PlayerQuery,
    Player,
    Legend,
    TrackerObj,
    BadgeObj,
    ApexNews,
    ServersObj,
    RegionsObj,
    RegionDataObj,
    ComparedData,
    MapRotationData,
    OriginData,
  };
}
/**
 * Player query
 */
type PlayerQuery = {
  /**
   * - Player in-game name, obligatory if uid is not specified
   */
  player?: string;
  /**
   * - Player UID, obligatory if player name is not specified
   */
  uid?: string | number;
  /**
   * - Player platform
   */
  platform: string;
};
/**
 * Player data object
 */
type Player = {
  global: {
    name: string;
    uid: number;
    avatar: string;
    platform: string;
    level: number;
    toNextLevelPercent: number;
    internalUpdateCount: number;
    bans: {
      isActive: boolean;
      remainingSeconds: number;
      last_banReason: string;
    };
    rank: {
      rankScore: number;
      rankName: string;
      rankDiv: number;
      ladderPos: number;
      rankImg: string;
      rankedSeason: string;
    };
    battlepass: {
      level: string;
      history: {
        season1: number;
        season2: number;
        season3: number;
        season4: number;
        season5: number;
        season6: number;
        season7: number;
        season8: number;
      };
    };
  };
  /**
   * - realtime data
   */
  realtime: {
    lobbyState: string;
    isOnline: number;
    isInGame: number;
    canJoin: number;
    partyFull: number;
    selectedLegend: string;
  };
  legends: {
    selected: Legend;
    all: {
      Bangalore: Legend;
      Bloodhound: Legend;
      Lifeline: Legend;
      Caustic: Legend;
      Gibraltar: Legend;
      Mirage: Legend;
      Pathfinder: Legend;
      Wraith: Legend;
      Octane: Legend;
      Wattson: Legend;
      Crypto: Legend;
      Revenant: Legend;
      Loba: Legend;
      Rampart: Legend;
      Horizon: Legend;
      Fuse: Legend;
    };
  };
  /**
   * - Internal API data
   */
  mozambiquehere_internal: {
    isNewToDB: boolean;
    claimedBy: string;
    APIAccessType: string;
    ClusterID: string;
    rate_limit: {
      max_per_second: number;
      current_req: string;
    };
  };
  /**
   * - Total stats from all legends together
   */
  total: {
    kd: number;
  };
};
/**
 * Apex Legends News Object
 */
type ApexNews = {
  title: string;
  link: string;
  img: string;
  short_desc: string;
};
/**
 * Servers status data object
 */
type ServersObj = {
  Origin_login: RegionsObj;
  EA_novafusion: RegionsObj;
  EA_accounts: RegionsObj;
  ApexOauth_PC: RegionsObj;
  ApexOauth_PS4: RegionsObj;
  ApexOauth_X1: RegionsObj;
  ApexOauth_Steam: RegionsObj;
  ApexOauth_Crossplay: RegionsObj;
  Mozambiquehere_StatsAPI: RegionsObj;
};
type MapRotationData = {
  current: {
    start: number;
    end: number;
    readableDate_start: string;
    readableDate_end: string;
    map: string;
    DurationInSecs: number;
    DurationInMinutes: number;
    remainingSecs: number;
    remainingMins: number;
    remainingTimer: string;
  };
  next: {
    start: number;
    end: number;
    readableDate_start: string;
    readableDate_end: string;
    map: string;
    DurationInSecs: number;
    DurationInMinutes: number;
  };
};
type OriginData = {
  name: string;
  uid: string;
  pid: string;
  avatar: string;
};
/**
 * Compared players data object
 */
type ComparedData = {
  players: Player[];
  data: {
    trackers: TrackerObj[];
    badges: BadgeObj[];
  };
};
/**
 * Legend data object
 */
type Legend = {
  LegendName: string;
  data: TrackerObj[];
  gameInfo: {
    skin: string;
    frame: string;
    pose: string;
    intro: string;
    badges: BadgeObj[];
  };
  ImgAssets: {
    icon: string;
    banner: string;
  };
};
/**
 * Tracker data object
 */
type TrackerObj = {
  name: string;
  value: string | number;
  key: string;
};
/**
 * Badge data object
 */
type BadgeObj = {
  name: string;
  value: string | number;
};
/**
 * Regions object
 */
type RegionsObj = {
  "EU-West": RegionDataObj;
  "EU-East": RegionDataObj;
  "US-West": RegionDataObj;
  "US-Central": RegionDataObj;
  "US-East": RegionDataObj;
  SouthAmerica: RegionDataObj;
  Asia: RegionDataObj;
};
/**
 * Region data object
 */
type RegionDataObj = {
  Status: string;
  HTTPCode: number;
  ResponseTime: number;
  QueryTimestamp: number;
};
