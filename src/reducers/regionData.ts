import { RECEIVE_REGIONS, REQUEST_REGIONS, RegionAction } from '../actions/Regions';
import { RegionData } from '../types';

const regionData = (state: RegionData = {
                      regions: {},
                      receivedAt: 0,
                      updating: false
                    },
                    action: RegionAction) => {
  switch (action.type) {
    case REQUEST_REGIONS:
      return {...state, updating: true};
    case RECEIVE_REGIONS:
      const regions = {};
      action.regions.forEach(region => regions[region._id] = region);
      return {
        regions,
        receivedAt: action.receivedAt,
        updating: false
      };
    default:
      return state;
  }
};

export default regionData;
