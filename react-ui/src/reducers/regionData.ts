import { RECEIVE_REGIONS, REQUEST_REGIONS, RegionAction, ADD_REGION } from '../actions/Regions';
import { RegionData, Region } from '../types';

const regionData = (state: RegionData = {
                      regions: {},
                      receivedAt: 0,
                      updating: false
                    },
                    action: RegionAction) => {
  switch (action.type) {
    case ADD_REGION:
      return {...state,
        regions: {...state.regions,
          [action.region.id]: action.region
        }
      };
    case REQUEST_REGIONS:
      return {...state, updating: true};
    case RECEIVE_REGIONS:
      const regions: {[k: string]: Region} = {};
      action.regions.forEach(region => regions[region.id] = region);
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
