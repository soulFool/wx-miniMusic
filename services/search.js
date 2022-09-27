import { request } from "./index";

export function getSearchHot() {
  return request.get({
    url: "/search/hot"
  })
}

export function getSearchSuggest(keywords) {
  return request.get({
    url: "/search/suggest",
    data: {
      keywords,
      type: "mobile"
    }
  })
}

export function getSearchResult(keywords) {
  return request.get({
    url: "/search",
    data: {
      keywords
    }
  })
}
