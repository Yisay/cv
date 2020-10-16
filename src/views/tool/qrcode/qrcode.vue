<template>
  <div class="flex">
    <el-tabs
      type="card"
      style="width: 360px; margin: 8px"
    >
      <el-tab-pane label="基础" name="first" style="padding-right: 12px">
        <div class="flex">
          <div style="width: 120px">
            <el-input v-model="qrWidth" placeholder="">
              <template slot="prepend">宽度</template>
            </el-input>
          </div>
          <div style="flex: 1; margin-left: 12px">
            <el-slider
              v-model="qrWidth"
              :max="500"
            ></el-slider>
          </div>
        </div>
        <div class="flex">
          <div style="width: 120px">
            <el-input v-model="qrHeight" placeholder="">
              <template slot="prepend">高度</template>
            </el-input>
          </div>

          <div style="flex: 1; margin-left: 12px">
            <el-slider
              v-model="qrHeight"
              :max="500"
            ></el-slider>
          </div>
        </div>
        <el-button-group >
          <el-button size="small" @click="qrjc='L'">L7%</el-button>
          <el-button size="small" @click="qrjc='M'">M15%</el-button>
          <el-button size="small" @click="qrjc='Q'">Q20%</el-button>
          <el-button size="small" @click="qrjc='H'">H30%</el-button>
        </el-button-group>
        <el-input
          v-model="qrBody"
          type="textarea"
          placeholder=""
          :autosize="{ minRows: 6 }"
          ><template slot="prepend">文本内容</template></el-input
        >
        <el-button type="" @click="creatQR">生成</el-button>
      </el-tab-pane>
      <el-tab-pane label="颜色" name="second">
        <div class="flex">
          <el-tag>前景色</el-tag>
          <el-color-picker
            v-model="beforeColor"
            show-alpha
            @change='creatQR'
            size="medium"
          ></el-color-picker>
        </div>
        <div class="flex">
          <el-tag>背景色</el-tag>
          <el-color-picker
            v-model="afterColor"
            show-alpha
            @change='creatQR'
            size="medium"
          ></el-color-picker>
        </div>
      </el-tab-pane>
      <el-tab-pane label="logo" name="third"><el-upload
          action="#"
          :auto-upload="false"
          list-type="picture-card"
          :show-file-list="false"
          :on-change="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i> </el-upload
      >
      <div class="flex">
          <div style="width: 120px">
            <el-input v-model="logoWidth" placeholder="">
              <template slot="prepend">宽度</template>
            </el-input>
          </div>
          <div style="flex: 1; margin-left: 12px">
            <el-slider
              v-model="logoWidth"
              :max="qrWidth"
            ></el-slider>
          </div>
        </div>
        <div class="flex">
          <div style="width: 120px">
            <el-input v-model="logoHeight" placeholder="">
              <template slot="prepend">高度</template>
            </el-input>
          </div>

          <div style="flex: 1; margin-left: 12px">
            <el-slider
              v-model="logoHeight"
              :max="qrHeight"
            ></el-slider>
          </div>
        </div>
      <el-button type="" @click='logoZindex=-logoZindex'>{{logoZindex==1?'置底':'置顶'}}</el-button>
      <el-button type="" @click="saveImage">合成</el-button>
      </el-tab-pane>
    </el-tabs>
    <div
      style="border: 1px solid #ccc"
      :style="{
        width: qrWidth + 'px',
        height: qrHeight + 'px',
        'min-width': qrWidth + 'px',
        'min-height': qrHeight + 'px',
        position: 'relative',
      }"
    >
      <img
        ref="logoimg"
        :src="logoUrl"
        v-show="logoUrl.length>0"
         @mousedown="move"
        :style="{
          left: '1px',
          top:'2px',
          width: logoWidth+'px',
          height: logoHeight+'px',
          //width: qrWidth + 'px',
          //height: qrHeight + 'px',
          'z-index': logoZindex,
          position: 'absolute',
        }"
      />
      <div ref="QRCodeBox" style="position: absolute"></div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      qrWidth: 280,
      qrHeight: 280,
      logoWidth: 140,
      logoHeight: 140,
      qrjc: 'L',
      qrjcarray: {
        'L': QRCode.CorrectLevel.L,
        'M': QRCode.CorrectLevel.M,
        'Q': QRCode.CorrectLevel.Q,
        'H': QRCode.CorrectLevel.H},
      beforeColor: '#000000',
      afterColor: '#ffffff',
      qrBody: '',
      qrcode: '',
      logoUrl: '',
      logoZindex: 1
    }
  },
  methods: {
    creatQR () {
      this.$refs.QRCodeBox.innerHTML = ''
      this.qrcode = null
      this.qrcode = new QRCode(this.$refs.QRCodeBox, {
        text: this.qrBody,
        width: this.qrWidth,
        height: this.qrHeight,
        colorDark: this.beforeColor,
        colorLight: this.afterColor,
        correctLevel: this.qrjcarray[this.qrjc]
      })
    },
    handleRemove (file, fileList) {
      this.logoUrl = ''
    },
    handlePictureCardPreview (file) {
      let that = this
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function (event) {
        let bs64 = this.result
        that.logoUrl = bs64
      }
    },
    saveImage () {
      let that = this
      var canvas = document.createElement('canvas')
      canvas.width = this.qrWidth
      canvas.height = this.qrHeight
      var context = canvas.getContext('2d')
      console.log(canvas)
      context.rect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#ffffff00'
      context.fill()
      var qrcodeimg = that.$refs.QRCodeBox.getElementsByTagName('img')[0]
      var myImage = new Image()
      if (that.logoZindex > 0) {
        myImage.src = qrcodeimg.src
        myImage.setAttribute('crossOrigin', 'anonymous')
        myImage.onload = function () {
          context.drawImage(myImage, 0, 0, qrcodeimg.width, qrcodeimg.height)
          var myImage2 = new Image()
          myImage2.src = that.$refs.logoimg.src
          myImage2.setAttribute('crossOrigin', 'anonymous')
          myImage2.onload = function () {
            context.drawImage(myImage2, parseFloat(that.$refs.logoimg.style.left), parseFloat(that.$refs.logoimg.style.top), parseFloat(that.$refs.logoimg.width), parseFloat(that.$refs.logoimg.height))
            var base64 = canvas.toDataURL('image/png', 1)
            qrcodeimg.setAttribute('crossOrigin', 'anonymous')
            qrcodeimg.src = base64
            that.logoUrl = ''
          }
        }
      } else {
        myImage.src = that.$refs.logoimg.src
        myImage.setAttribute('crossOrigin', 'anonymous')
        myImage.onload = function () {
          context.drawImage(myImage, parseFloat(that.$refs.logoimg.style.left), parseFloat(that.$refs.logoimg.style.top), parseFloat(that.$refs.logoimg.width), parseFloat(that.$refs.logoimg.height))
          var myImage2 = new Image()
          myImage2.src = qrcodeimg.src
          myImage2.setAttribute('crossOrigin', 'anonymous')
          myImage2.onload = function () {
            context.drawImage(myImage2, 0, 0, qrcodeimg.width, qrcodeimg.height)
            var base64 = canvas.toDataURL('image/png')
            qrcodeimg.setAttribute('crossOrigin', 'anonymous')
            qrcodeimg.src = base64
            that.logoUrl = ''
          }
        }
      }
    },
    move (e) {
      let odiv = e.target // 获取目标元素
      // 计算出鼠标相对点击元素的位置,e.clientX获取的是鼠标的位置，OffsetLeft是元素相对于外层元素的位置
      let x = e.clientX - odiv.offsetLeft
      let y = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {
        // 获取拖拽元素的位置
        let left = e.clientX - x
        let top = e.clientY - y
        this.positionX = left
        this.positionY = top
        // console.log(document.documentElement.clientHeight,odiv.offsetHeight)
        // 把拖拽元素 放到 当前的位置
        if (left <= 0) {
          left = 0
        } else if (
          left >=
          document.documentElement.clientWidth - odiv.offsetWidth
        ) {
          // document.documentElement.clientWidth 屏幕的可视宽度
          left = document.documentElement.clientWidth - odiv.offsetWidth
        }

        if (top <= 0) {
          top = 0
        } else if (
          top >=
          document.documentElement.clientHeight - odiv.offsetHeight
        ) {
          // document.documentElement.clientHeight 屏幕的可视高度
          top = document.documentElement.clientHeight - odiv.offsetHeight
        }
        odiv.style.left = left + 'px'
        odiv.style.top = top + 'px'
      }
      // 为了防止 火狐浏览器 拖拽阴影问题
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>
