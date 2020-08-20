<template>
  <div class="mb-9">
    <!-- 背景 -->
    <div class="mb-7"  id="header-bottom">
      <bulletChat />
      <div class="bgImg">
        <div class="arrow-down">
          <i class="iconfont icon-down" @click="downPage"></i>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="post-container" v-if="articles">
      <card :articles="articles"/>
    </div>
    <!-- 分页 -->
    <div class="my-10" v-if="articles.length > 0">
      <div class="page-navigator d-flex jc-center">
        <div :class="{ current: 1 == pagination.currentPage }" class="mx-4 hand fs-md">
          <a @click="goToPage(1)" data-hover="首页">
            <span class="text-grey-1">首页</span>
          </a>
        </div>
        <div class="mx-4 hand fs-md">
          <a @click="prev()">
            <span class="text-grey-1">&laquo;</span>
          </a>
        </div>
        <div
          class="mx-4 hand fs-md"
          :class="{ current: article == pagination.currentPage }"
          v-for="article in pagination.totalPage"
          :key="article"
        >
          <a @click="goToPage(article)" :data-hover="article" class="text-grey-1">{{ article }}</a>
        </div>

        <div class="mx-4 hand fs-md">
          <a @click="next()">
            <span class="text-grey-1">&raquo;</span>
          </a>
        </div>
        <div
          class="mx-4 hand fs-md"
          :class="{ current: pagination.totalPage == pagination.currentPage }"
        >
          <a @click="goToPage(pagination.totalPage)" data-hover="末页">
            <span class="text-grey-1">末页</span>
          </a>
        </div>
        <div class="current mx-4 fs-md">
          <span class="text-grey-1">第{{ pagination.currentPage }}页 / 共{{ pagination.totalPage }}页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import bulletChat from '../components/bulletChat'
import card from '../components/card'
export default {
  data() {
    return {
      articles: [],
      pagination: {
        totalPage: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    async fetchData() {
      const res = await this.$http.get(
        `/articles/${this.pagination.currentPage}`
      );
      this.articles = res.data.list;
      this.pagination.totalPage = res.data.totalPage;
      this.pagination.currentPage = res.data.currentPage;
    },
    async goToPage(pageNum) {
      this.pagination.currentPage = pageNum;
      this.fetchData();
    },
    goToSelectPage(id) {
      this.$router.push(`/article/list/${id}`)
    },
    prev() {
      if (this.pagination.currentPage == 1) {
        return;
      }
      this.pagination.currentPage--;
      this.fetchData();
    },
    next() {
      if (this.pagination.currentPage == this.pagination.totalPage) {
        return;
      }
      this.pagination.currentPage++;
      this.fetchData();
    },
    downPage() {
      $("html,body").animate(
        { scrollTop: $("#header-bottom").outerHeight() - 56 },
        500
      );
    }
  },
  mounted() {
    this.fetchData();
  },
  components: {
    bulletChat,
    card
  }
};
</script>

<style lang="scss" scoped>
.arrow-down {
  position: absolute;
  right: 50%;
  bottom: 30px;
  color: #fff;
  animation: arrowDown 0.8s linear infinite alternate;
  .icon-down {
    cursor: pointer;
    font-size: 45px;
  }
}
@keyframes arrowDown {
  0% {
    visibility: hidden;
    opacity: 0;
    -webkit-transform: translatey(-20%);
  }
  20% {
    visibility: visible;
    opacity: 0;
    -webkit-transform: translatey(10%);
  }
  100% {
    visibility: visible;
    opacity: 1;
    -webkit-transform: translatey(20%);
  }
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 13em;
  }
}
@keyframes shine {
  0% {
    visibility: hidden;
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}
@media screen and (max-width: 768px) {
  .shouye-text {
    font-size: 24px !important;
  }
  .line-down {
    font-size: 24px !important;
  }
}
</style>
