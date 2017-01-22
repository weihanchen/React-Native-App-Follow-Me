Follow me app 開發雜記
===
## Learn Once, Write Anywhere
使用React Native來開發產品並不能像以往開發Hybrid App的方式Write once run ever where，但是基於React抽象層，讓我們可以學一套框架就能在極小的改動下開發出不同平台的Native App，相對的也比Hybrid App有著更好的效能與使用者體驗，雖然開發Fllow me首要目標平台鎖定於Android，但難保未來不會擴展至IOS，因此為了節省額外的時間成本，才選擇了React Native這套框架來完成。

## StyleSheet
在React Native世界裡，UI的排版、美化都是藉由StyleSheet樣式表來完成，類似於Web開發的CSS，但又基於CSS進行了一些改進，讓我們能夠達到CSS in JS。

### 特點
* 以駝峰式命名使用
* 共享常數
* 模組化
* Flexbox排版
* 目前尚未全面支援原生CSS語法

### 如何使用
首先宣告樣式
```
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    }
})
```
套用樣式
```
export default class HelloWorld extends Component {
   render() {
      return (
          <View style={styles.container} >
            <Text>Hello World</Text>
          </View>
      )
   }
}
```

### 語法說明
* `justifyContent` 內容物的水平排列方式
  * `flex-start` 靠左對齊
  * `flex-end` 靠右對齊
  * `center` 水平置中
  * `space-between` 平均分配元素，但是第一個及最後一個元素分別向最左最右靠齊
  * `space-around` 平均分配元素，間距也是平均分配
* `alignItems` 內容物的垂直排列方式
  * `flex-start` 靠上對齊
  * `flex-end` 靠下對齊
  * `center` 垂直置中
  * `stretch` 將容器內容整個撐開至父容器的高度
  * `baseline` 以內容元素為基線對齊，例如三個容器的文字第一行

## Google Map API

### 地理編碼
創建群組時將地址轉為地理圖標(經緯度)，讓使用者能夠快速定位終點

### Google Maps Directions
* 首次進入地圖時根據user的目前位置到終點進行路線規劃
* 若未開啟GPS，則以上次記錄的位置到中點進行規劃
* 獲取API中的overview_polyline並解碼後進行路線圖繪製
* [overview_polyline編碼折線演算法](https://developers.google.com/maps/documentation/utilities/polylinealgorithm?hl=zh-tw)

## Firebase API
