// pages/detail-search/detail-search.js
import { getSearchHot, getSearchSuggest, getSearchResult } from '../../services/search'
import debounce from '../../utils/debounce'
import stringToNodes from '../../utils/string2nodes'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 100)

Page({
  data: {
    hotKeywords: [],
    suggestSongs: [],
    suggestSongsNodes: [],
    resultSongs: [],
    searchValue: ''
  },
  onLoad(options) {
    this.getPageData()
  },

  handleSearchChange(event) {
    const searchValue = event.detail

    this.setData({ searchValue })

    if (!searchValue.length) {
      this.setData({ suggestSongs: [], resultSongs: [] })
      debounceGetSearchSuggest.cancel()
      return
    }

    debounceGetSearchSuggest(searchValue).then(res => {
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs })
      if (!suggestSongs) return

      // 转成nodes节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
  },
  handleSearchAction: function () {
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
      console.log(res)
      this.setData({ resultSongs: res.result.songs })
    })
  },
  handleKeywordItemClick: function (event) {
    const keyword = event.currentTarget.dataset.keyword

    this.setData({ searchValue: keyword })

    this.handleSearchAction()
  },
  getPageData() {
    getSearchHot().then(res => {
      this.setData({ hotKeywords: res.result.hots })
    })
  }
})
