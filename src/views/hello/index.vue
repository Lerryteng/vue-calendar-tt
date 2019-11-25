<template>
  <div class="page page-hello">
    <div class="page-content">
      <commonCalendar
        @handleClickDay="handleClickDay"
        @handlePrevMonth="handlePrevMonth"
        @handleNextMonth="handleNextMonth"
      />
    </div>
  </div>
</template>

<script>
import commonCalendar from '@components/CommonCalendar';

export default {
  components: {
    commonCalendar
  },
  
  data() {
    return {};
  },

  created() {},

  methods: {
    handleClickDay(data) {
      console.log('handleClickDay', data);
    },
    handlePrevMonth() {
      console.log('handlePrevMonth');
    },
    handleNextMonth() {
      console.log('handleNextMonth');
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less">
@import './style.less';
</style>
