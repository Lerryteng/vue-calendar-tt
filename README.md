# 插件的安装

## NPM

```
npm i vue-calendar-tt

```

## 引入插件

```
import Vue from 'vue';
import calendarTT from 'vue-calendar-tt';
Vue.use(calendarTT);

```

## 基本用法

```
<commonCalendar
  @handleClickDay="handleClickDay"
  @handlePrevMonth="handlePrevMonth"
  @handleNextMonth="handleNextMonth"
/>

```
