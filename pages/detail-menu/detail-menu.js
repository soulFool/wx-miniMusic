// pages/detail-menu/detail-menu.js
import { all } from "underscore"
import { getSongMenuTag, getSongMenuList } from "../../services/music"

Page({
  data: {
    songMenus: []
  },
  onLoad() {
    this.fetchAllMenuList()
  },
  
  async fetchAllMenuList() {
    const tagRes = await getSongMenuTag()
    const tags = tagRes.tags

    const allPromises = []
    for (const tag of tags) {
      const promise = getSongMenuList(tag.name)
      allPromises.push(promise)
    }

    // 获取到所有的数据之后, 调用一次setData
    Promise.all(allPromises).then(res => {
      this.setData({ songMenus: res })
    })
  }
})