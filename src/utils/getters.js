import store from '@/store'
import Console from "@/utils/Console";

let Getters = {};

Getters.items = {
  _cache: null,
  byItemId(itemId) {
    const got = this.all(true);
    if (!got || !got.get) return {};
    return got.get(itemId) || {}
  },
  byName (name) {
    const got = this.all(false);
    if (!got) return {};
    return got.find(el => el.name === name) || {}
  },
  all(map=false) {
    const items = store.state.data.items;
    if (!items) return [];
    if (map) {
      if (!this._cache) this._cache = new Map(items.map(item => [item.itemId, item]))
      return this._cache
    } else {
      return items
    }
  }
}
Getters.limitations = {
  byStageId(stageId) {
    return store.state.data.limitations.find(el => {
      return el.name === stageId
    })
  }
}
Getters.statistics = {
  byItemId(itemId) {
    const stats = store.state.data[`${store.getters['dataSource/source']}Matrix`];
    Console.debug(stats)
    if (!stats) return [];
    return stats.filter(el => {
      return el.itemId === itemId
    })
  },
  byStageId(stageId) {
    const stats = store.state.data[`${store.getters['dataSource/source']}Matrix`];
    Console.debug(stats)
    if (!stats) return [];
    return stats.filter(el => {
      return el.stageId === stageId
    })
  }
}
Getters.stages = {
  all() {
    return store.state.data.stages || []
  },
  byStageId(stageId) {
    return this.all().find(el => {
      return el.stageId === stageId
    })
  },
  byParentZoneId(zoneId) {
    return this.all().filter(el => {
      return el.zoneId === zoneId
    })
  }
}
Getters.zones = {
  byZoneId(zoneId) {
    return this.all().find(el => {
      return el.zoneId === zoneId
    })
  },
  byType(type) {
    return this.all().filter(el => {
      return el.type === type
    });
  },
  all() {
    return store.state.data.zones || []
  }
}
Getters.trends = {
  byItemId(itemId) {
    let temp = {};
    let trends = this.all();
    if (trends) {
      Object.keys(trends).map(key => {
        if (
          trends[key] &&
          trends[key]["results"] &&
          trends[key]["results"][itemId]
        ) {
          temp[key] = {};
          temp[key]["results"] = trends[key]["results"][
            itemId
          ];
          temp[key]["interval"] = trends[key]["interval"];
          temp[key]["startTime"] = trends[key]["startTime"];
        }
      });
    }
    return temp;
  },
  byStageId(stageId) {
    return this.all() && this.all()[stageId];
  },
  all() {
    if (store.getters['dataSource/source'] !== 'global') {
      return null;
    }
    return store.state.data && store.state.data.trends && store.state.data.trends.results
  }
}

export default Getters