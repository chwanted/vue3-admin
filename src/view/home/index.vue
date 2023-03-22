<template>
  <page-layout class="page">
    <div>
      <div class="mt10 mb10" />

      <a-row :gutter="[16, 16]">
        <a-col :lg="6" :md="6" :sm="6" :xs="12">
          <a-card :bordered="false">
            <a-statistic
              title="Active Users"
              :value="9.3"
              :precision="2"
              suffix="%"
              class="demo-class"
              :value-style="{ color: '#cf1322' }"
            >
              <template #prefix>
                <arrow-down-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :lg="6" :md="6" :sm="6" :xs="12">
          <a-card :bordered="false">
            <a-statistic
              title="Feedback"
              :value="11.28"
              :precision="2"
              suffix="%"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            >
              <template #prefix>
                <arrow-up-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :lg="6" :md="6" :sm="6" :xs="12">
          <a-card :bordered="false">
            <a-statistic
              title="Unmerged"
              :value="1128"
              style="margin-right: 50px"
            >
              <template #suffix>
                <like-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :lg="6" :md="6" :sm="6" :xs="12">
          <a-card :bordered="false">
            <a-statistic-countdown
              title="Countdown"
              :value="deadline"
              style="margin-right: 50px"
            />
          </a-card>
        </a-col>
      </a-row>
    </div>

    <div class="mt20 mb20" />

    <a-row :gutter="[16, 16]">
      <a-col :lg="12" :md="12" :sm="24" :xs="24">
        <a-card title="访问量" :bordered="false">
          <div id="LineBox"></div>
        </a-card>
      </a-col>
      <a-col :lg="12" :md="12" :sm="24" :xs="24">
        <a-card title="人流量" :bordered="false">
          <div id="barBox"></div>
          <Echarts class="chart" autoresize :option="chartData2" />
        </a-card>
      </a-col>
    </a-row>
    <div class="mt20 mb20" />
  </page-layout>
</template>
<script>
import { reactive, toRefs, onMounted, onUnmounted } from "vue";
import {
  LikeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import { dependencies, devDependencies } from "../../../package.json";

import { Line } from "@antv/g2plot";
export default {
  components: {
    LikeOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
  },
  setup() {
    const state = reactive({
      lineBox: null,
      barBox: null
    });

    const renderLine = () => {
      const data = require("./data.js").default;
      state.lineBox = new Line("LineBox", {
        data,
        xField: "year",
        yField: "gdp",
        seriesField: "name",
        yAxis: {
          label: {
            formatter: v => `${(v / 10e8).toFixed(1)} B`
          }
        },
        legend: {
          position: "top"
        },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
          appear: {
            animation: "path-in",
            duration: 5000
          }
        }
      });
      state.lineBox.render();
    };

    const renderBar = () => {
      const data = require("./data.js").data;
      state.barBox = new Line("barBox", {
        data,
        xField: "城市",
        yField: "销售额",
        xAxis: {
          label: {
            autoRotate: false
          }
        },
        slider: {
          start: 0.1,
          end: 0.2
        }
      });
      state.barBox.render();
    };

    onMounted(() => {
      renderLine();
      renderBar();
    });

    onUnmounted(() => {
      state.barBox.destroy();
      state.lineBox.destroy();
    });

    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      dependencies,
      devDependencies
    };
  }
};
</script>
<style lang="less" scoped>
.page {
  background-color: #f7f7f7;
}
.chart {
  height: 350px;
}
.bg_fff {
  background-color: #fff;
}
.left_box,
.right_box {
  height: 40px;
  line-height: 40px;
  border: 1px solid #b7b7b7;
  border-top: 0;
}
.box_one {
  border-top: 1px solid #b7b7b7;
}
.left_box {
  background-color: #f1f1f1;
  text-align: right;
  padding-right: 10px;
  border-right: 0;
}
.right_box {
  padding-left: 10px;
}
</style>
