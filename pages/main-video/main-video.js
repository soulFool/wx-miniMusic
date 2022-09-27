// pages/main-video/main-video.js
import { getTopMV } from '../../services/video'

Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },

  onLoad() {
    this.fetchTopMV()
  },

  onReachBottom() {
    // 是否有更多的数据
    if (!this.data.hasMore) return

    this.fetchTopMV()
  },
  async onPullDownRefresh() {
    this.setData({ videoList: [] })
    this.data.offset = 0
    this.data.hasMore = true

    await this.fetchTopMV()

    wx.stopPullDownRefresh()
  },

  async fetchTopMV() {
    const res = await getTopMV(this.data.offset)
    const newVideoList = [...this.data.videoList, ...res.data]

    this.setData({ videoList: newVideoList })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  }
})
