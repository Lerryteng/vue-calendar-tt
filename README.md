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

## API

| 事件名 | 说明 | 参数 |
| - | :- | :- | :-: |
| handleClickDay | 点击某天的回调 | 某天日期 |
| handlePrevMonth | 点击上个月的回调 | - |
| handleNextMonth | 点击下个月的回调 | - |

