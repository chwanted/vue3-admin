<template>
  <div id="500">
    <page-layout>
      <a-card>
        <a-result
          status="500"
          title="500"
          sub-title="Sorry, the server is wrong."
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
