import { request } from "./index"

export function getTopMV(offset = 0, limit = 20) {
  return request.get({
    url: "/top/mv",
    data: {
      limit,
      offset
    }
  })
}

export function getMVUrl(id) {
  return request.get({
    url: "/mv/url",
    data: {
      id
    }
  })
}

export function getMVInfo(mvid) {
  return request.get({
    url: "/mv/detail",
    data: {
      mvid
    }
  })
}

export function getMVRelated(id) {
  return request.get({
    url: "/related/allvideo",
    data: {
      id
    }
  })
}
