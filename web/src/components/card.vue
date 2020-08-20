<template>
    <div class="card">
        <div v-for="(article, i) in articles" :key="i">
            <div class="show a-cont d-flex flex-justify align-center home-art" @click="goToSelectPage(article._id)">
            <div class="main-img min" v-if="article.icon">
                <img :src="article.icon" alt="">
            </div>
            <div class="index-info d-flex flex-column">
                <p>{{ article.title }}</p>
                <div v-html="article.body"></div>
                <p class="d-flex space-p">
                <span class="iconfont icon-riqi2">{{ article.createdAt | date("YYYY-MM-DD") }}</span>
                <span class="iconfont icon-tag1">{{ article.categories[0].name }}</span>
                <i class="iconfont icon-love text-red hand"></i>
                </p>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card',
  data() {
    return {
      currentDate: new Date()
    };
  },
  props: {
      articles: {
          type: Array
      }
  }

};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 10px;
  max-width: 1024px;
  margin: 0 auto;
  .a-cont {
    z-index: 999;
    width: 80%;
    height: 200px;
    margin: 25px auto;
    border-radius: 8px;
    background-color: #f5f7f9;
    .main-img {
      padding-left: 8px;
      img {
        width: 200px;
        height: 180px;
      }
    }
    .index-info {
      // justify-content: space-between;
      padding-left: 18px;
      margin-right: 9px;
      width: calc(100% - 150px);
      p:first-of-type {
        font-size: 28px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0.5rem;
        margin-bottom: 0;
        padding-bottom: 9px;
      }
      div {
        word-break: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .space-p {
        justify-content:flex-start;
        span {
          padding-right: 15px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .min {
      display: none;
  }
  .a-cont {
      height: 150px !important;
      margin: 15px auto  !important;
    .index-info {
        width: 95% !important;
        p:first-of-type {
            font-size: 20px !important;
        }
    }
  }
  
}
</style>