<template>
  <div id="404">
    <page-layout>
      <a-card>
        <a-result
          status="404"
          title="404"
          sub-title="页面找不到了，请检查浏览器url地址"
        >
          <template #extra>
            <router-link to="/">
              <a-button type="primary"> 返回首页 </a-button>
            </router-link>
          </template>
        </a-result>
      </a-card>
    </page-layout>
  </div>
</template>
