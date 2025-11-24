<template>
  <Carousel :items-to-show="1" :wrap-around="true" class="project-carousel">
    <Slide key="1">
      <div class="carousel__item">
        <img :src="slide1" alt="Gráfico de projeto" />
      </div>
    </Slide>

    <Slide key="2">
      <div class="carousel__item">
        <img :src="slide2" alt="Time colaborando" />
      </div>
    </Slide>

    <Slide key="3">
      <div class="carousel__item">
        <img :src="slide3" alt="Kanban em ação" />
      </div>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import slide1 from "@/assets/imgs/slide-1.jpg";
import slide2 from "@/assets/imgs/slide-1.jpg";
import slide3 from "@/assets/imgs/slide-1.jpg";
</script>

<style scoped>
.project-carousel {
  width: 555px;
  height: 325px;
}

.carousel__item {
  width: 555px;
  height: 255px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #555;
  overflow: hidden;
  cursor: grab;
}
.carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.carousel__pagination {
  margin-top: 25px;
}

:deep(.carousel__pagination-button) {
  width: 10px;
  height: 10px;
  padding: 0;
  margin: 0 5px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

:deep(.carousel__pagination-button--active) {
  background-color: #75127c;
}
</style>
