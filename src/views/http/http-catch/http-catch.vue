<template>
  <div class="http-catch">
    <iframe src="http://localhost:9898" width="100%" height="500px"></iframe>
  </div>
</template>

<script>
export default {
    name: 'http-catch',
    data: () => ({
        htmlData: ''
    }),
    methods: {

    }
}
</script>

<style scoped>

</style>

<!--
fetch 返回：

如果是 json字符串 ，使用 res.json() 方法来将数据转换成 json 格式数据

  fetch('请求地址').then(res=>{
    return res.json();
  }).then(res=>{
    console.log(res); // 这里得到的就是 json 格式数据
  });
如果是普通的字符串，使用 res.text() 方法将数据转换成普通字符串

  fetch('请求地址').then(res=>{
    return res.text();
  }).then(res=>{
    console.log(res); // 这里得到的就是普通字符串格式数据
  });
-->
