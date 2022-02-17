<template>
  <div>
    <div class="welcome-top">
      <div class="top-up">
        <img :src="img1" style="width: 100%; height: 250px" />
      </div>
      <div class="top-left">
        <img :src="logoUrl" style="width: 100%; height: 400px" />
      </div>
      <div class="top-right">
        <a-timeline mode="alternate" style="margin-top: 10px">
          <a-timeline-item>Create a services site 2021-09-01</a-timeline-item>
          <a-timeline-item color="green">BUILD CIM MODEL 2021-10-10</a-timeline-item>
          <a-timeline-item>
            <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
            ADD KCIM MODEL 2021-11-11
          </a-timeline-item>
          <a-timeline-item color="red">JDY 精斗云云会计数据模型 2021-12-12</a-timeline-item>
          <a-timeline-item>星辰财务数据模型 2021-12-21</a-timeline-item>
          <a-timeline-item>
            <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
            Technical testing 2015-09-01
          </a-timeline-item>
        </a-timeline>
      </div>
    </div>
    <div class="welcome-mid">
      <div style="height: 350px; padding: 20px; text-align: center">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-card class="cardImg" style="height: 300px" title="Innovate Faster" :bordered="false">
              <p style="font-size: 20px">Achieve faster time to value through interoperability</p>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card
              class="cardImg"
              style="height: 300px"
              title="Influence & Collabrate"
              :bordered="false"
            >
              <p style="font-size: 20px; overflow: hidden"
                >Create seamless, customized experiences across cloud-native applications</p
              >
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card
              class="cardImg"
              style="height: 300px"
              title="Improve Analytics"
              :bordered="false"
            >
              <p style="font-size: 20px"
                >Enable a cross-system view of data and reduce time to build and maintain
                integrations</p
              >
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="welcome-btm">
      <div class="top-up">
        <img
          src="./Image_1.png"
          style="width: 100%; height: 500px; margin-left: 10px; margin-right: 10px"
        />
      </div>
    </div>
    <div class="footer">
      <a-layout-footer style="text-align: center; height: 100px">
        Kingdee CIM Footer ©2021 Created by CIM
      </a-layout-footer>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ClockCircleOutlined } from '@ant-design/icons-vue';
  import img1 from './图片1.png';
  import logoUrl from './logo.jpg';
</script>

<style>
  .welcome-top {
    /* overflow: hidden; */
    margin-top: 10px;
    background-color: white;
  }
  .top-left {
    float: left;
    width: 30%;
    /* margin-top: 10px; */
    background-color: white;
    /* background-size: cover; */
  }
  .top-right {
    margin-top: 10px;
    height: 390px;
    overflow: hidden;
  }
  .welcome-btm {
    width: 100%;
  }
  .footer {
    overflow: visible;
  }
  .cardImg {
    width: 85%;
    background: url(./图片2.png);
    background-size: 100% 100%;
  }
  .cardText {
    overflow: hidden;
  }
</style>
