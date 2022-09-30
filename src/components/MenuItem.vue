<template>
  <div class="card" style="width: 18rem">
    <div
      v-if="data.imageUrl"
      class="card-img-top"
      :style="{
        backgroundImage: `url(${data.imageUrl})`,
        ...cardImgStyle,
      }"
    ></div>
    <div
      v-else
      class="card-img-top"
      :style="{
        backgroundImage: `url(${defaultImageUrl})`,
        ...cardImgStyle,
      }"
    ></div>
    <div class="card-body">
      <h5 class="card-title">{{ data.title }}</h5>
      <p class="card-text">{{ data.description }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <span>{{ data.price }} $</span>
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#menuItemModal"
          @click="setEditData"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  data: () => ({
    cardImgStyle: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "12.5rem",
    },
    defaultImageUrl: require("@/assets/default.jpg"),
  }),
  props: {
    data: {
      type: Object,
    },
  },
  methods: {
    setEditData() {
      this.$store.commit("setEditData", this.data);
    },
  },
  components: {},
};
</script>
