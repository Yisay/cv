<template>
  <el-container style="height: 100%">
    <el-header>
      <el-menu default-active="/" :router="true">
        <el-menu-item index="/">返回主页</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <el-row class="fillheight">
        <el-col :span="6"
          ><el-collapse v-model="activeName" accordion>
            <el-collapse-item title="实现功能" name="1">
              <div>
                登录，注册，添加好友，修改个人信息，修改好友备注，添加拉黑删除好友操作，
              </div>
              <div>
                websorck
              </div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>
                控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
              </div>
              <div>
                页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
              </div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>
                清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
              </div>
              <div>
                帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
              </div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>
                用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
              </div>
              <div>
                结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
              </div>
            </el-collapse-item>
          </el-collapse></el-col
        >
        <!--主界面-->
        <el-col :span="12" class="fillheight" style="max-height: 600px">
          <el-row class="fillheight">
            <!--左侧菜单栏-->
            <el-col
              :span="2"
              class="fillheight"
              style="
                background: #2b2b2b;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
              "
            >
              <div
                class="flex fillheight"
                style="flex-direction: column; justify-content: space-between"
              >
                <!--左侧上部-->
                <div>
                  <!--头像-->
                  <div @click="showmyself()">
                    <el-avatar
                      class="aligncenter"
                      :size="40"
                      shape="square"
                      style="margin-top: 20px; margin-bottom: 20px"
                      :src="userinfo.headimg"
                    />
                  </div>
                  <!--信息-->
                  <div
                    class="el-icon-chat-round aligncenter"
                    style="
                      width: 26px;
                      line-height: 40px;
                      font-size: 26px;
                      color: #484b4e;
                    "
                    @click="showMessageList"
                  ></div>
                  <!--好友-->
                  <div
                    class="el-icon-notebook-1 aligncenter"
                    style="
                      width: 26px;
                      line-height: 40px;
                      font-size: 26px;
                      color: #484b4e;
                    "
                    @click="showFriendList"
                  ></div>
                </div>
                <!--左侧下部-->
                <div>
                  <el-popover
                    placement="right-end"
                    width="100"
                    trigger="click"
                    style="padding: 0px"
                    visible-arrow="false"
                  >
                    <el-menu
                      style="width: 100px"
                      active-text-color="#2f3032"
                      background-color="#2b2b2a"
                      text-color="#8c8c8c"
                    >
                      <el-menu-item @click="dialogLoginVisible = true"
                        >登录</el-menu-item
                      >
                      <el-menu-item @click="dialogRegistVisible = true"
                        >注册</el-menu-item
                      >
                      <el-menu-item @click="dialogAddFriendVisible = true"
                        >添加好友</el-menu-item
                      >
                      <!--<el-menu-item @click="dialogSettingVisible = true">设置</el-menu-item>
                      <el-menu-item @click="dialogAddressVisible = true">注销</el-menu-item>-->
                    </el-menu>
                    <div
                      class="el-icon-more-outline aligncenter"
                      slot="reference"
                      style="
                        width: 26px;
                        line-height: 50px;
                        font-size: 26px;
                        color: #484b4e;
                      "
                    ></div>
                  </el-popover>
                </div>
              </div>
            </el-col>
            <!---->
            <!--中间列表列-->
            <el-col :span="8" style="background: #eae8e7" class="fillheight">
              <!--搜索栏-->
              <div class="flex" style="padding: 20px 10px">
                <!--输入框-->
                <div class="el-input el-input--mini el-input--prefix">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="搜索"
                    class="el-input__inner"
                    style="background: #dbd9d8"
                  />
                  <span class="el-input__prefix">
                    <i
                      class="el-input__icon el-icon-search"
                      style="color: #818181"
                    ></i>
                  </span>
                </div>
                <!--添加按钮-->
                <el-button
                  icon="el-icon-plus"
                  size="mini"
                  style="padding: 6px; margin-left: 10px; background: #dbd9d8"
                ></el-button>
              </div>
              <!--好友列表-->
              <div
                v-if="showList == 'friend'"
                class="scroll_config"
                style="overflow-y: scroll; height: 85%"
              >
                <el-collapse>
                  <el-collapse-item name="1">
                    <template slot="title">
                      <i
                        class="el-icon-circle-close"
                        style="
                          color: #fff;
                          background-color: #a0a0a0;
                          font-size: 28px;
                          border-radius: 4px;
                          margin: 12px;
                          padding: 4px;
                        "
                      />黑名单
                    </template>
                    <div
                      v-for="(item, index) in friendList"
                      :key="index"
                      @click="showFriendInfo(item)"
                    >
                      <div v-if="item.relation == 0" class="flex list-link">
                        <div style="margin: 12px; width: 36px; height: 36px">
                          <el-avatar
                            shape="square"
                            :size="36"
                            :src="item.headimg"
                          ></el-avatar>
                        </div>
                        <!--昵称/备注-->
                        <div
                          style="
                            padding-top: 20px;
                            font-size: 14px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                          "
                        >
                          {{ item.notes == "" ? item.nickname : item.notes }}
                        </div>
                      </div>
                    </div>
                    <!--头像-->
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template slot="title">
                      <i
                        class="el-icon-circle-plus-outline"
                        style="
                          color: #fff;
                          background-color: #ffa020;
                          font-size: 28px;
                          border-radius: 4px;
                          margin: 12px;
                          padding: 4px;
                        "
                      />好友请求
                    </template>
                    <div
                      v-for="(item, index) in friendList"
                      :key="index"
                      @click="showFriendInfo(item)"
                    >
                      <div v-if="item.relation == 2" class="flex list-link">
                        <div style="margin: 12px; width: 36px; height: 36px">
                          <el-avatar
                            shape="square"
                            :size="36"
                            :src="item.headimg"
                          ></el-avatar>
                        </div>
                        <!--昵称/备注-->
                        <div
                          style="
                            padding-top: 20px;
                            font-size: 14px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                          "
                        >
                          {{ item.notes == "" ? item.nickname : item.notes }}
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
                <!--循环赋值-->
                <div
                  v-for="(item, index) in friendList"
                  :key="index"
                  @click="showFriendInfo(item)"
                >
                  <div v-if="item.relation == 1" class="flex list-link">
                    <div style="margin: 12px; width: 36px; height: 36px">
                      <el-avatar
                        shape="square"
                        :size="36"
                        :src="item.headimg"
                      ></el-avatar>
                    </div>
                    <!--昵称/备注-->
                    <div
                      style="
                        padding-top: 20px;
                        font-size: 14px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      "
                    >
                      {{ item.notes == "" ? item.nickname : item.notes }}
                    </div>
                  </div>
                </div>
              </div>
              <!--消息列表-->
              <div
                v-if="showList == 'message'"
                class="scroll_config"
                style="overflow-y: scroll; height: 85%"
              >
                <div
                  v-for="(item, index) in messageList"
                  :key="index"
                  class="flex list-link"
                  @click="openMessage(item)"
                  @contextmenu.prevent="rightClick(item.fuid)"
                >
                  <!--消息badge、头像-->
                  <div style="margin: 12px">
                    <el-badge
                      v-if="item.newmessage > 0"
                      :value="item.newmessage"
                      class="item"
                    >
                      <el-avatar
                        shape="square"
                        :size="36"
                        :src="item.headimg"
                      ></el-avatar>
                    </el-badge>
                    <el-avatar
                      v-else
                      shape="square"
                      :size="36"
                      :src="item.headimg"
                    ></el-avatar>
                  </div>
                  <div style="width: 100%">
                    <!--右上部分-->
                    <div
                      class="flex"
                      style="
                        width: 100%;
                        justify-content: flex-end;
                        padding-top: 10px;
                      "
                    >
                      <!--昵称/备注-->
                      <div style="flex: 1; font-size: 12px">
                        <div
                          style="
                            width: 90%;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                          "
                        >
                          {{ item.notes == "" ? item.nickname : item.notes }}
                        </div>
                      </div>
                      <!--最近一条信息时间-->
                      <div
                        class="c696969"
                        style="width: 70px; margin-left: 4px; font-size: 10px"
                      >
                        {{
                          item.chattime !== null
                            ? chattimeFormatter(item.chattime)
                            : ""
                        }}
                      </div>
                    </div>
                    <!--最近一条消息-->
                    <div
                      class="c696969"
                      style="
                        width: 180px;
                        font-size: 12px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        line-height: 24px;
                      "
                    >
                      {{ item.body }}
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <!--右侧详细窗口列-->
            <el-col :span="14" style="background: #f5f5f5" class="fillheight">
              <!--如初始化列-->
              <div
                v-if="showBox == 'index'"
                style="
                  margin-top: 120px;
                  line-height: 14px;
                  font-size: 14px;
                  word-space: 0px;
                  letter-spacing: 0px;
                "
              >
                <div>
                  &nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__
                </div>
                <div>
                  &nbsp;/\&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;/\&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\&nbsp;\
                </div>
                <div>
                  &nbsp;\&nbsp;\&nbsp;\___&nbsp;&nbsp;&nbsp;__&nbsp;\&nbsp;\&nbsp;&nbsp;\&nbsp;&nbsp;\&nbsp;\&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;_&nbsp;&nbsp;\_\&nbsp;\
                </div>
                <div>
                  &nbsp;&nbsp;\&nbsp;\&nbsp;&nbsp;_&nbsp;`\/\&nbsp;_&nbsp;`\&nbsp;\&nbsp;&nbsp;\&nbsp;&nbsp;\&nbsp;\&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;/\&nbsp;&nbsp;___\/\&nbsp;&nbsp;\&nbsp;&nbsp;/\&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;/\&nbsp;&nbsp;__`\/\&nbsp;\/&nbsp;`\/'_`&nbsp;&nbsp;\
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;\&nbsp;\&nbsp;\/\&nbsp;\&nbsp;\&nbsp;_&nbsp;/\&nbsp;\&nbsp;&nbsp;\_\&nbsp;\&nbsp;&nbsp;\_&nbsp;\&nbsp;\&nbsp;\L\&nbsp;\&nbsp;\&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;/\&nbsp;\&nbsp;\L\&nbsp;\&nbsp;\&nbsp;&nbsp;/\/\&nbsp;\L\&nbsp;\
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;\_\&nbsp;\_\&nbsp;\__/\&nbsp;\&nbsp;___\&nbsp;\___&nbsp;\&nbsp;\&nbsp;&nbsp;___\&nbsp;\__/\__/&nbsp;&nbsp;&nbsp;\&nbsp;\____\&nbsp;\_\&nbsp;\&nbsp;\___,_\
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\/_/\/_/\/__/&nbsp;\/___/\/___/&nbsp;\/___/&nbsp;\/_/\/_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\/___/\/_/&nbsp;&nbsp;\/__,_&nbsp;/
                </div>
              </div>
              <!--如好友资料列-->
              <div v-if="showBox == 'info'" style="padding: 60px">
                <div class="flex">
                  <div>
                    <el-avatar
                      shape="square"
                      :size="80"
                      :src="info.headimg"
                    ></el-avatar>
                  </div>
                  <div style="margin-left: 20px">
                    <div>{{ info.nickname }}</div>
                    <div
                      style="font-size: 12px; color: #696969; margin-top: 16px"
                    >
                      {{ info.signature }}
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
                <div>
                  <div class="flex lh40">
                    <span class="w50 c696969" style>备注：</span>
                    <input
                      class="inputupdate"
                      style="
                        padding: 0;
                        border: 0;
                        height: 38px;
                        font-size: 16px;
                        background: #ffffff00;
                      "
                      :value="info.notes"
                      @change="updateFriendNote($event)"
                    />
                  </div>
                  <div class="flex lh40">
                    <span class="w50 c696969">地址：</span>
                    <div>
                      <span>{{ info.address }}</span>
                    </div>
                  </div>
                  <div class="flex lh40">
                    <span class="w50 c696969">账号：</span>
                    <span>{{ info.fuid }}</span>
                  </div>
                  <div class="flex lh40">
                    <span class="w50 c696969">性别：</span>
                    <div class="lh40">
                      <img
                        v-if="info.sex == 0"
                        src="http://api.25cl.cn/static/img/0.png"
                        style="width: 16px; height: 16px; padding-top: 12px"
                      />
                      <img
                        v-else
                        src="http://api.25cl.cn/static/img/1.png"
                        style="width: 16px; height: 16px; padding-top: 12px"
                      />
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
                <div v-if="info.relation < 2">
                  <el-button type="success" @click="goMessageBox"
                    >发送信息</el-button
                  >
                  <el-button
                    v-if="info.relation == 0"
                    type="info"
                    @click="friendCommand('offblacklist')"
                    >取消拉黑</el-button
                  >
                  <el-button
                    v-if="info.relation == 1"
                    type="info"
                    @click="friendCommand('onblacklist')"
                    >拉黑</el-button
                  >
                  <el-button type="info" @click="friendCommand('reject')"
                    >删除好友</el-button
                  >
                </div>
                <div v-else>
                  <el-button type="success" @click="friendCommand('agree')"
                    >同意</el-button
                  >
                  <el-button type="info" @click="friendCommand('reject')"
                    >拒绝</el-button
                  >
                </div>
              </div>
              <!--如聊天窗口列-->
              <div
                v-if="showBox == 'message'"
                style="height: 100%; display: flex; flex-direction: column"
              >
                <!--标题栏-->
                <div
                  class="bgf5"
                  style="
                    height: 60px;
                    border-bottom: 1px;
                    border-bottom-style: solid;
                    line-height: 60px;
                    font-size: 18px;
                    border-color: #e0e0e0;
                    padding-left: 20px;
                  "
                >
                  {{
                    nowmessagefriend.notes == ""
                      ? nowmessagefriend.nickname
                      : nowmessagefriend.notes
                  }}
                </div>
                <!--主体栏-->
                <div
                  ref="main1"
                  class="bgf5 scroll_config"
                  style="flex: 1; overflow-y: auto"
                >
                  <div style="height: 100%">
                    <div v-for="(item, index) in nowmessagelist" :key="index">
                      <div
                        v-if="item.status == 0"
                        class="flex"
                        style="width: 100%; padding-top: 10px"
                      >
                        <el-avatar
                          shape="square"
                          :src="nowmessagefriend.headimg"
                          :size="40"
                          style="margin-left: 20px"
                        ></el-avatar>
                        <div
                          style="
                            margin-left: 10px;
                            margin-right: 20%;
                            padding: 10px;
                            background-color: #ffffff;
                            font-size: 14px;
                            border-radius: 4px;
                            border: 1px;
                            border-style: solid;
                            border-color: #e0e0e0;
                          "
                        >
                          {{ item.body }}
                        </div>
                      </div>
                      <div
                        v-if="item.status == 1"
                        class="flex"
                        style="
                          width: 100%;
                          padding-top: 10px;
                          justify-content: flex-end;
                        "
                      >
                        <div
                          style="
                            margin-right: 10px;
                            margin-left: 20%;
                            padding: 10px;
                            background-color: #9eea6a;
                            font-size: 14px;
                            border-radius: 4px;
                            border: 1px;
                            border-style: solid;
                            border-color: #e0e0e0;
                          "
                        >
                          {{ item.body }}
                        </div>
                        <el-avatar
                          shape="square"
                          :src="userinfo.headimg"
                          :size="40"
                          style="margin-right: 20px"
                        ></el-avatar>
                      </div>
                    </div>
                  </div>
                </div>
                <!--输入栏-->
                <div
                  style="
                    border-top: 1px;
                    border-top-style: solid;
                    border-color: #e0e0e0;
                    background-color: #ffffff;
                    padding-left: 20px;
                    padding-right: 20px;
                    height: 120px;
                  "
                >
                  <!--工具栏-->
                  <div style="height: 30px; background-color: #ffffff">
                    <el-dropdown
                      trigger="click"
                      :hide-on-click="false"
                      placement="top"
                    >
                      <span class="el-dropdown-link">😃</span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item style="width: 250px">
                          <a
                            v-for="item in emoji"
                            :key="item"
                            @click="inputemoji(item)"
                            style="font-size: 18px"
                            >{{ item }}</a
                          >
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <!--发送内容栏-->
                  <div style="width: 100%">
                    <textarea
                      v-model="sendmessage"
                      placeholder
                      style="
                        height: 60px;
                        border: none;
                        resize: none;
                        width: 100%;
                        padding: 0px;
                        outline: none;
                      "
                    />
                  </div>
                  <!--发送按钮-->
                  <div
                    class="flex"
                    style="
                      justify-content: flex-end;
                      margin-left: auto;
                      padding-right: 20px;
                    "
                    @click="sendMessage"
                  >
                    <el-button type style="padding: 4px 20px">发送</el-button>
                  </div>
                </div>
              </div>
              <!--如个人资料列-->
              <div v-if="showBox == 'myself'" style="padding: 60px">
                <!--基础信息-->
                <div class="flex">
                  <!--头像-->
                  <div style="width: 80px; height: 80px">
                    <el-upload
                      class="avatar-uploader"
                      action="http://api.25cl.cn/project/chat/headimgupload"
                      :headers="headers"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      style="width: 80px; height: 80px"
                    >
                      <el-avatar
                        v-if="myselfinfo.headimg"
                        :src="myselfinfo.headimg"
                        class="avatar"
                        :size="80"
                        shape="square"
                      />
                    </el-upload>
                  </div>
                  <div style="margin-left: 20px">
                    <input
                      class="inputupdate"
                      style="
                        padding: 0;
                        margin-top: 4px;
                        border: 0;
                        height: 24px;
                        font-size: 16px;
                        background: #ffffff00;
                      "
                      v-model="myselfinfo.nickname"
                    />
                    <input
                      class="inputupdate"
                      style="
                        padding: 0;
                        margin-top: 4px;
                        border: 0;
                        height: 20px;
                        font-size: 12px;
                        background: #ffffff00;
                        color: #696969;
                      "
                      v-model="myselfinfo.signature"
                    />
                  </div>
                </div>
                <el-divider></el-divider>
                <div>
                  <div class="flex lh40">
                    <span class="w50 c696969">账号：</span>
                    <span>{{ myselfinfo.uid }}</span>
                  </div>
                  <div class="flex lh40">
                    <span class="w50 c696969">生日：</span>
                    <el-date-picker
                      class="dateinput"
                      v-model="myselfinfo.birthday"
                      type="date"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      prefix-icon="none"
                      :clearable="false"
                      style="padding: 0px"
                    ></el-date-picker>
                  </div>
                  <div class="flex lh40" @click="dialogAddressVisible = true">
                    <span class="w50 c696969">地址：</span>
                    <span>{{ myselfinfo.address }}</span>
                  </div>
                  <div class="flex lh40">
                    <span class="w50 c696969">性别：</span>
                    <div class="lh40">
                      <img
                        v-if="myselfinfo.sex == 0"
                        src="http://api.25cl.cn/static/img/0.png"
                        style="width: 16px; height: 16px; padding-top: 12px"
                        @click="myselfinfo.sex = 1"
                      />
                      <img
                        v-else
                        src="http://api.25cl.cn/static/img/1.png"
                        style="width: 16px; height: 16px; padding-top: 12px"
                        @click="myselfinfo.sex = 0"
                      />
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
                <el-button @click="updateMyself">保存修改</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6"></el-col>
        <el-dialog
          title="登录界面"
          :visible.sync="dialogLoginVisible"
          width="300px"
        >
          <el-form>
            <el-form-item label="用户名" label-width="60px">
              <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="60px">
              <el-input v-model="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="dialogLoginVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
          title="注册界面"
          :visible.sync="dialogRegistVisible"
          width="500px"
        >
          <el-form
            :model="regForm"
            :rules="rules"
            ref="regForm"
            class="demo-ruleForm"
          >
            <el-form-item
              label="昵称"
              label-width="80px"
              style="margin-bottom: 20px"
              prop="regnickname"
            >
              <el-input v-model="regForm.regnickname"></el-input>
            </el-form-item>
            <el-form-item
              label="账号"
              label-width="80px"
              style="margin-bottom: 20px"
              prop="reguid"
            >
              <el-input v-model="regForm.reguid"></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              label-width="80px"
              style="margin-bottom: 20px"
              prop="regpass"
            >
              <el-input
                v-model="regForm.regpass"
                show-password
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              label-width="80px"
              style="margin-bottom: 20px"
              prop="checkPass"
            >
              <el-input
                v-model="regForm.checkPass"
                show-password
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="邮箱"
              label-width="80px"
              style="margin-bottom: 20px"
              prop="regemail"
            >
              <el-input v-model="regForm.regemail">
                <el-button slot="append" @click="sendRegisterCode"
                  >获取验证码</el-button
                >
              </el-input>
            </el-form-item>
            <el-form-item
              label="验证码"
              label-width="80px"
              style="margin-bottom: 20px"
            >
              <el-input v-model="regForm.code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="regist">注册</el-button>
              <el-button @click="dialogRegistVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
          title="地址选择器"
          :visible.sync="dialogAddressVisible"
          width="400px"
        >
          <v-distpicker
            @province="selectProvince"
            @city="selectCity"
            @area="selectDist"
          ></v-distpicker>
          <el-divider></el-divider>
          <el-button type @click="saveaddress">确认</el-button>
          <el-button type @click="dialogAddressVisible = false">取消</el-button>
        </el-dialog>
        <el-dialog
          title="添加好友"
          :visible.sync="dialogAddFriendVisible"
          width="400px"
        >
          <el-form>
            <el-form-item label="账号" label-width="60px">
              <el-input v-model="addFriendUid" placeholder>
                <el-button slot="append" @click="selectUser">查询</el-button>
              </el-input>
              <el-card
                v-if="selectUserInfo.uid"
                style="height: 146px; margin-top: 8px"
              >
                <div class="flex">
                  <div>
                    <el-avatar
                      shape="square"
                      :size="44"
                      :src="selectUserInfo.headimg"
                    ></el-avatar>
                  </div>
                  <div style="margin-left: 14px">
                    <div style="line-height: 14px">
                      {{ selectUserInfo.nickname }}
                    </div>
                    <div
                      style="
                        font-size: 12px;
                        color: #696969;
                        margin-top: 12px;
                        line-height: 14px;
                      "
                    >
                      {{ selectUserInfo.signature }}
                    </div>
                  </div>
                </div>
                <el-button style="margin-top: 10px" @click="addFriend"
                  >申请好友</el-button
                >
              </el-card>
            </el-form-item>
          </el-form>
        </el-dialog>
        <div
          id="menu"
          class="menu"
          v-show="menuVisible"
          style="
            position: absolute;
            z-index: 99999;
            background-color: #ffffff;
            font-size: 12px;
            border: 1px;
            border-style: solid;
            border-color: #e0e0e0;
          "
        >
          <el-button @click="removeMessage">删除</el-button>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>
<style>
</style>
<script>
import axios from 'axios'
import VDistpicker from 'v-distpicker'
export default {
  components: { VDistpicker },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码长度应大于 8 位'))
      } else if (this.ruleForm.checkPass !== value) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.regpass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateEmail = (rulem, value, callback) => {
      let email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!email.test(value)) {
        callback(new Error('请输入正确的邮箱号码'))
      } else {
        callback()
      }
    }
    return {
      // 星期
      emoji: [
        '😀',
        '😁',
        '😂',
        '😃',
        '😄',
        '😅',
        '😆',
        '😉',
        '😊',
        '😋',
        '😎',
        '😍',
        '😘',
        '😗',
        '😙',
        '😚',
        '😇',
        '😐',
        '😑',
        '😶',
        '😏',
        '😣',
        '😥',
        '😮',
        '😯',
        '😪',
        '😫',
        '😴',
        '😌',
        '😛',
        '😜',
        '😝',
        '😒',
        '😓',
        '😔',
        '😕',
        '😲',
        '😷',
        '😖',
        '😞',
        '😟',
        '😤',
        '😢',
        '😭',
        '😦',
        '😧',
        '😨',
        '😬',
        '😰',
        '😱',
        '😳',
        '😵',
        '😡',
        '😠'
      ],
      week: [
        '星期天',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ],
      // 地址选择器参数
      address: {
        province: '',
        city: '',
        dist: ''
      },
      // 请求头部
      headers: {
        token: '',
        userid: ''
      },
      // 要添加的好友账号
      addFriendUid: '',
      selectUserInfo: '',
      // 好友信息
      info: {},
      // 好友列表
      friendList: [],
      // 消息列表
      messageList: [],
      removeMessageUid: '',
      // 当前聊天列表
      nowmessagelist: [],
      // 当前聊天对象
      nowmessagefriend: [],
      // 聊天输入框
      sendmessage: '',
      // 控制列表显示
      showList: 'index',
      // 控制窗口显示
      showBox: 'message',
      key: '',
      // 登录弹窗控制
      dialogLoginVisible: false,
      // 注册弹窗控制
      dialogRegistVisible: false,
      // 地址选择器弹窗控制
      dialogAddressVisible: false,
      // 添加好友弹窗控制
      dialogAddFriendVisible: false,
      menuVisible: false,
      // 用户名
      username: '',
      // 密码
      password: '',
      // 用户信息
      userinfo: '',
      // 个人信息 修改
      myselfinfo: '',
      // token
      usertoken: '',
      //  websocket对象
      path: 'ws://47.94.109.216:8282',
      ws: '',
      // 注册
      regForm: {
        regnickname: '',
        reguid: '',
        regpass: '',
        checkPass: '',
        regemail: '',
        code: ''
      },
      rules: {
        regnickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { max: 18, message: '长度应小于 18 个字符', trigger: 'blur' }
        ],
        reguid: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ],
        regpass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        regemail: [{ validator: validateEmail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    /**
     * websocket 相关操作
     * init 初始化
     * onopen 连接成功事件
     * onerror 连接失败事件
     * onmessage 监听事件
     */
    init () {
      var that = this
      if (typeof WebSocket === 'undefined') {
        alert('浏览器不支持')
      } else {
        that.ws = new WebSocket(that.path)
        that.ws.onopen = that.onopen
        that.ws.operror = that.onerror
        that.ws.onmessage = that.onmessage
      }
    },
    onopen () {
      console.log('连接成功')
    },
    onerror () {
      console.log('连接错误')
    },
    onmessage (msg) {
      let that = this
      let re = JSON.parse(msg.data)
      if (re.fuid === 'success') {
        console.log(re.message)
      } else if (re.fuid === 'error') {
        console.log(re.message)
      } else {
        if (re.fuid === that.nowmessagefriend.fuid) {
          that.nowmessagelist.push({
            status: 0,
            body: re.message,
            chattime: re.chattime
          })
          that.$nextTick(() => {
            that.$refs.main1.scrollTop = that.$refs.main1.scrollHeight
          })
        }
        if (that.showList === 'message') {
          that.updateMessageList()
        }
      }
    },
    // 登录
    login () {
      var that = this
      axios
        .get('http://api.25cl.cn/project/chat/login', {
          params: {
            username: that.username,
            password: that.password
          }
        })
        .then((res) => {
          if (res.data) {
            that.dialogLoginVisible = false
            that.userinfo = res.data.userinfo
            that.headers.token = res.data.token
            that.headers.userid = that.username
            that.ws.send('{"code":"login","uid":"' + that.username + '"}')
            that.$message({
              message: '登录成功',
              type: 'success'
            })
            console.log(that.userinfo)
          } else {
            console.log('false')
            that.$message({
              message: '登录失败',
              type: 'error'
            })
          }
        })
    },
    // 注册
    regist () {
      let that = this
      let params = new URLSearchParams()
      params.append('reguid', that.regForm.reguid)
      params.append('regpassword', that.regForm.regpass)
      params.append('regpassword1', that.regForm.checkPass)
      params.append('regnickname', that.regForm.regnickname)
      params.append('regemail', that.regForm.regemail)
      params.append('regcode', that.regForm.code)
      console.log(params)
      axios.post('http://api.25cl.cn/project/chat/register', params)
    },
    // 显示好友列表
    showFriendList () {
      this.showList = 'friend'
      this.updateFriendList()
    },
    // 更新好友列表
    updateFriendList () {
      let that = this
      console.log('update')
      axios
        .get('http://api.25cl.cn/project/chat/updateShow', {
          params: {
            status: 'friendlist'
          },
          headers: that.headers
        })
        .then((res) => {
          console.log(res)
          that.friendList = res.data
        })
    },
    // 显示聊天列表
    showMessageList () {
      this.showList = 'message'
      this.updateMessageList()
    },
    // 移出聊天列表
    removeMessage () {
      let that = this
      axios
        .get('http://api.25cl.cn/project/chat/friendcommand', {
          params: {
            command: 'removeMessage',
            fuid: that.removeMessageUid
          },
          headers: that.headers
        })
        .then((res) => {
          that.showMessageList()
        })
    },
    // 更新聊天列表
    updateMessageList () {
      let that = this
      axios
        .get('http://api.25cl.cn/project/chat/updateShow', {
          params: {
            status: 'chatlist'
          },
          headers: that.headers
        })
        .then((res) => {
          console.log(res)
          that.messageList = res.data
        })
    },
    // 发送信息按钮跳转至聊天窗口
    goMessageBox () {
      let that = this
      axios
        .get('http://api.25cl.cn/project/chat/friendcommand', {
          params: {
            fuid: that.info.fuid,
            command: 'addchatlist'
          },
          headers: that.headers
        })
        .then((res) => {
          that.openMessage(that.info)
          that.showMessageList()
        })
    },
    // 获取验证码
    sendRegisterCode () {
      let that = this
      let params = new URLSearchParams()
      params.append('email', that.regForm.regemail)
      console.log(params)
      axios.post('http://api.25cl.cn/project/chat/addRegisterCode', params)
    },
    // 查询用户
    selectUser () {
      let that = this
      axios
        .get('http://api.25cl.cn/project/chat/selectUser', {
          params: {
            selectUser: that.addFriendUid
          },
          headers: that.headers
        })
        .then((res) => {
          that.selectUserInfo = res.data
        })
      console.log(that.selectUserInfo)
    },
    // 添加好友
    addFriend () {
      let that = this
      axios.get('http://api.25cl.cn/project/chat/addFriend', {
        params: {
          fuid: that.selectUserInfo.uid,
          time: Date.parse(new Date()) / 100
        },
        headers: that.headers
      })
    },
    // 好友相关操作
    friendCommand (command) {
      let that = this
      axios
        .get('http://api.25cl.cn/project/chat/friendcommand', {
          params: {
            fuid: that.info.fuid,
            command: command
          },
          headers: that.headers
        })
        .then((res) => {
          if (that.showList === 'friend') {
            that.updateFriendList()
          }
          if (command === 'onblacklist') {
            that.info.relation = 0
          } else if (command === 'offblacklist') {
            that.info.relation = 1
          } else if (command === 'agree') {
            that.info.relation = 1
          }
        })
    },
    // 打开消息窗口
    openMessage (item) {
      let that = this
      that.nowmessagelist = []
      that.updateMessage(item.fuid, new Date().valueOf(), 0)
      that.nowmessagefriend = item
      console.log(item)
      that.sendmessage = ''
      that.showBox = 'message'
    },
    // 更新消息
    updateMessage (fuid, chattime, status) {
      let that = this
      axios
        .get('http://api.25cl.cn/project/chat/selectMessage', {
          params: {
            fuid: fuid,
            chattime: chattime,
            status: status
          },
          headers: that.headers
        })
        .then((res) => {
          console.log(res)
          let arr = res.data.reverse()
          for (let index = 0; index < arr.length; index++) {
            that.nowmessagelist.push(arr[index])
            that.$nextTick(() => {
              that.$refs.main1.scrollTop = that.$refs.main1.scrollHeight
            })
          }
        })
    },
    // 发送消息
    sendMessage () {
      let that = this
      let mtime = Date.now()
      that.nowmessagelist.push({
        status: 1,
        body: that.sendmessage,
        chattime: mtime
      })
      console.log(that.nowmessagelist)
      console.log(
        '{"code":"send","fuid":"' +
          that.nowmessagefriend.fuid +
          '","message":"' +
          that.sendmessage +
          '","time":"' +
          mtime +
          '"}'
      )
      that.ws.send(
        '{"code":"send","fuid":"' +
          that.nowmessagefriend.fuid +
          '","message":"' +
          that.sendmessage +
          '","time":"' +
          mtime +
          '"}'
      )
      that.sendmessage = ''
      that.$nextTick(() => {
        that.$refs.main1.scrollTop = that.$refs.main1.scrollHeight
      })
      that.updateMessageList()
    },
    // 更新好友备注
    updateFriendNote (event) {
      let that = this
      that.info.notes = event.currentTarget.value
      console.log(event.currentTarget.value)
      axios
        .get('http://api.25cl.cn/project/chat/updatefriendnote', {
          params: {
            fuid: that.info.fuid,
            notes: event.currentTarget.value
          },
          headers: that.headers
        })
        .then((res) => {
          that.updateFriendList()
        })
    },
    // 显示好友信息
    showFriendInfo (item) {
      this.showBox = 'info'
      this.info = ''
      this.info = item
      console.log(item)
    },
    // 显示自己信息
    showmyself () {
      console.log(this.userinfo)
      this.myselfinfo = { ...this.userinfo }
      this.showBox = 'myself'
    },
    // 更新自己信息
    updateMyself () {
      let that = this
      console.log(that.myselfinfo)
      axios
        .get('http://api.25cl.cn/project/chat/savemyselfinfo', {
          params: {
            nickname: that.myselfinfo.nickname,
            sex: that.myselfinfo.sex,
            birthday: that.myselfinfo.birthday,
            signature: that.myselfinfo.signature,
            address: that.myselfinfo.address
          },
          headers: that.headers
        })
        .then((res) => {
          that.userinfo = res.data
        })
    },
    // 保存地址
    saveaddress () {
      let that = this
      console.log(that.userinfo)
      that.myselfinfo.address =
        (that.address.province === that.address.city
          ? that.address.province
          : that.address.province + ' ' + that.address.city) +
        ' ' +
        that.address.dist
      console.log(that.myselfinfo)
      that.dialogAddressVisible = false
    },
    // 地址选择器--省
    selectProvince (e) {
      if (e.value.length > 2) {
        this.address.province = e.value
      } else {
        this.address.province = ''
      }
    },
    // 地址选择器--市
    selectCity (e) {
      if (e.value.length > 2) {
        this.address.city = e.value
      } else {
        this.address.city = ''
      }
    },
    // 地址选择器--区
    selectDist (e) {
      if (e.value.length > 2) {
        this.address.dist = e.value
      } else {
        this.address.dist = ''
      }
    },
    handleAvatarSuccess (res, file) {
      this.myselfinfo.headimg = URL.createObjectURL(file.raw)
      this.userinfo.headimg = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    inputemoji (item) {
      this.sendmessage += item
      console.log(this.sendmessage)
    },
    rightClick (uid) {
      // 鼠标右击触发事
      event.preventDefault()
      this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector('#menu')
      menu.style.left = event.clientX + 5 + 'px'
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      menu.style.top = event.clientY - 80 + 'px'
      console.log(uid)
      this.removeMessageUid = uid
    },

    foo () {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false

      document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    chattimeFormatter (value) {
      console.log(value)
      var date = new Date(parseInt(value)) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      console.log(date)
      let y = date.getYear()
      let M = date.getMonth() + 1
      let d = date.getDate()
      let week = date.getDay()
      let h = date.getHours()
      let m = date.getMinutes()
      var nowDate = new Date()
      let nowy = nowDate.getYear()
      let nowM = nowDate.getMonth() + 1
      let nowd = nowDate.getDate()
      let nowweek = nowDate.getDay()
      if (nowy === y && nowM === M) {
        if (nowd === d) {
          return h + ':' + (m < 10 ? '0' + m : m)
        } else if (nowd - 1 === d) {
          return '昨天'
        } else if (nowd - nowweek <= d) {
          return this.week[week]
        } else {
          return (y + '').substr(1, 2) + '/' + M + '/' + d
        }
      } else {
        return (y + '').substr(1, 2) + '/' + M + '/' + d
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
