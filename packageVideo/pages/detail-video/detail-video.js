// pages/detail-video/detail-video.js
import { getMVUrl, getMVInfo, getMVRelated } from "../../../services/video"

Page({
  data: {
    isPlay: false,
    id: 0,
    mvUrl: "",
    mvInfo: {},
    relatedVideoList: [],
  },
  onLoad(options) {
    // 1.获取id
    const id = options.id
    this.setData({ id })

    // 2.请求数据
    this.fetchMVUrl()
    this.fetchMVInfo()
    this.fetchMVRelated()
  },
  onVideoPlay() {
    this.setData({ isPlay: true })
  },
  onVideoPause() {
    this.setData({ isPlay: false })
  },
  async fetchMVUrl() {
    const res = await getMVUrl(this.data.id)
    this.setData({ mvUrl: res.data.url })
  },
  async fetchMVInfo() {
    const res = await getMVInfo(this.data.id)
    this.setData({ mvInfo: res.data })
  },
  async fetchMVRelated() {
    const res = await getMVRelated(this.data.id)
    this.setData({ relatedVideoList: res.data })
  }
})