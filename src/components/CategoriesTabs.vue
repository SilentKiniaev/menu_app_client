<template>
  <ul class="nav nav-tabs justify-content-center">
    <li class="nav-item" @click="(e) => setCategoryId(0)">
      <button class="nav-link">ALL</button>
    </li>
    <li
      class="nav-item"
      v-for="category of categories"
      :key="category.id"
      @click="(e) => setCategoryId(category.id)"
    >
      <button class="nav-link">
        {{ category.title.toUpperCase() }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CategoriesTabs",
  methods: {
    setCategoryId(categoryId = 0) {
      this.$store.commit("setMenuFilter", { categoryId });
      this.$router.push({ query: { categoryId } });
    },
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  mounted() {
    if (this.$route.query?.categoryId) {
      this.$store.commit("setMenuFilter", {
        categoryId: +this.$route.query?.categoryId,
      });
    }
    this.$store.dispatch("fetchCategories");
  },
};
</script>
