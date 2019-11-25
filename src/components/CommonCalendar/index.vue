<template>
  <div class="common-calendar">
    <div class="calendar-header">
      <div class="calendar-box">
        <div class="calendar-content">
          <span class="calendar-prev" @click="handlePrevMonth"></span>
          <span class="calendar-headDate"> {{this.headOptions.date}} </span>
          <span class="calendar-next" @click="handleNextMonth"></span>
        </div>
      </div>
    </div>
    <ul class="calendar-week">
      <li v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">{{item}}</li>
    </ul>
    <ul class="calendar-view">
      <li v-for="(item, index) in visibleCalendar" 
        :key="index" 
        class="date-view"
        :class="[
          {'month-class': !isCurrentMonth(item.date)},
          {'today-bg': isCurrentDay(item.date)},
          {'handle-day': item.clickDay}
        ]"
        @click="handleClickDay(item)"
      >
        <span class="date-day" :class="[{'opacity-class': !isCurrentMonth(item.date)}]">
          {{item.day}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as utils from '@common/utils';

  export default {
    name: 'common-calendar',
    data() {
      let {year, month, day} = utils.getNewDate(new Date());
      return {
        headOptions: {
          date: '',
        },
        calendarTitleArr: ['日', '一', '二', '三', '四', '五', '六'],
        time: {year, month, day},
        calendarList: []
      }
    },
    computed : {
      visibleCalendar () {
        let calendatArr = [];
        let {year, month, day} = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1));
        // 获取本月第一天日期      
        let currentFirstDay = utils.getDate(year, month, 1);
        // 获取当前月第一天是星期几
        let weekDay = currentFirstDay.getDay();
        // 获取当前日历第一天的时间戳（ms）
        let startTime = currentFirstDay - (weekDay) * 24 * 60 * 60 * 1000;
        // 设置为展示35天的日历
        let monthDayNum = 35;
        for (let i = 0; i < monthDayNum; i++) {
          calendatArr.push({
            date: new Date(startTime + i * 24 * 60 * 60 * 1000), 
            year:new Date(startTime + i * 24 * 60 * 60 * 1000). getFullYear(), 
            month: new Date(startTime + i * 24 * 60 * 60 * 1000).getMonth() + 1, // 返回第0~11月，真实当前月份要+1
            day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
            clickDay: false,
          })
        };
        this.headOptions.date = `${year}年${utils.chineseMonth(month)}`;
        return calendatArr
      }
    },
    created () {
      this.calendarList = this.visibleCalendar;
    },
    methods: {
      // 是否是当前月
      isCurrentMonth (date) {
        let {year: currentYear, month: currentMonth} = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1));
        let {year, month} = utils.getNewDate(date);
        return currentYear == year && currentMonth == month
      },
      // 是否是今天 
      isCurrentDay (date) {
        let {year: currentYear, month: currentMonth, day: currentDay} = utils.getNewDate(new Date());
        let {year, month, day} = utils.getNewDate(date);
        return currentYear == year && currentMonth == month && currentDay == day;
      },
      // 上一个月
      handlePrevMonth () {
        let prevMonth = utils.getDate(this.time.year, this.time.month, 1);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        this.time = utils.getNewDate(prevMonth);
        this.headOptions.date = `${this.time.year}年${utils.chineseMonth(this.time.month)}`;
        this.$emit('handlePrevMonth');
      },
      // 下一个月
      handleNextMonth () {
        let nextMonth = utils.getDate(this.time.year, this.time.month, 1);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        this.time = utils.getNewDate(nextMonth);
        this.headOptions.date = `${this.time.year}年${utils.chineseMonth(this.time.month)}`;
        this.$emit('handleNextMonth');
      },
      // 点击某一天
      handleClickDay (item) {
        this.$forceUpdate();
        this.$emit('handleClickDay', item);
        this.calendarList.map( x => { 
          this.$set(x, 'clickDay', false);
        });
        this.$set(item, 'clickDay', true);
      }
    }
  }
</script>

<style lang="less">
  .common-calendar {
    padding: 23px 30px 30px;
    width: 100%;
    height: 100%;
    background: #F9FAFC;
    box-sizing: border-box;
    .calendar-header {
      margin-bottom: 23px;
      width: 100%;
      .calendar-box {
        position: relative;
        height: 32px;
        line-height: 32px;
      }
      .calendar-box .calendar-content {
        width: 100%;
        text-align: center;
        .calendar-headDate {
          vertical-align: middle;
          margin: 0 12px;
          font-size: 18px;
          color: #424953;
        }
        .calendar-prev,
        .calendar-next {
          display: inline-block;
          vertical-align: middle;
          width: 8px;
          height: 11px;
          background: url('~@assets/img/left.png') no-repeat;
          background-size: contain;
        }
        .calendar-next {
          background: url('~@assets/img/right.png') no-repeat;
          background-size: contain;
        }
      }
    }

    .calendar-week {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
    .calendar-week .week-item {
      float: left;
      width: 14.285%;
      text-align: center;
      font-size: 14px;
      color: #424953;
      font-weight: 600;
    }
    .calendar-view {
      width: 100%;
      .date-view {
        float: left;
        width: 14.285%;
      }
      .date-view .date-day {
        margin: 0 auto;
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: #7F8794;
        background-color: lightcyan;
        border-radius: 100%;
      }
      .date-view .calendar-num {
        margin-top: 6px;
        display: block;
        width: 100%;
        text-align: center;
        font-size: 30px;
        color: #424953;
      }
      .opacity-class {
        opacity: .5;
      }
      // .month-class {
      //   background-image: linear-gradient(45deg,rgba(000, 000, 000, .03) 25%,transparent 25%,transparent 50%,rgba(000, 000, 000, .03) 50%,rgba(000, 000, 000, .03) 75%,transparent 75%,transparent);
      //   background-size: 20px 20px;
      // }
      .today-bg {
        background: red;
      }
      .handle-day {
        background: #2061FF !important;
      }
      .handle-day .date-day {
        color: #BCCFFF !important;
      }
      .handle-day .calendar-num {
        color: #fff !important;
      }
    }
  }
</style>