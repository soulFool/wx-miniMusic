// pages/detail-song/detail-song.js
import recommendStore from '../../store/recommendStore'
import rankingStore from '../../store/rankingStore'
import playerStore from '../../store/playerStore'
import { getPlaylistDetail } from '../../services/music'

Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    id: '',

    songInfo: {}
  },
  onLoad(options) {
    // type: ranking -> 榜单数据
    // type: recommend -> 推荐数据
    const type = options.type
    this.setData({ type })

    // 获取store中榜单数据
    if (type === 'ranking') {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (type === 'recommend') {
      recommendStore.onState('recommendSongInfo', this.handleRanking)
    } else if (type === 'menu') {
      const id = options.id
      this.data.id = id
      this.fetchMenuSongInfo()
    }
  },

  onSongItemTap() {
    playerStore.setState('playSongList', this.data.songInfo.tracks)
  },

  handleRanking(value) {
    // if (this.data.type === "recommend") {
    //   value.name = "推荐歌曲"
    // }
    this.setData({ songInfo: value })
    wx.setNavigationBarTitle({
      title: value.name
    })
  },

  onUnload() {
    if (this.data.type === 'ranking') {
      rankingStore.offState(this.data.key, this.handleRanking)
    } else if (this.data.type === 'recommend') {
      recommendStore.offState('recommendSongInfo', this.handleRanking)
    }
  },
  async fetchMenuSongInfo() {
    const res = await getPlaylistDetail(this.data.id)
    this.setData({ songInfo: res.playlist })
  }
})
