<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>
    <div class="actions">
      <router-link :to="{ name: 'coachesID', params: { id: id } }"
        >Details</router-link
      >
      <router-link :to="coachDetailLink">Contact</router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'MvCoachItem',
  props: ['id', 'firstName', 'lastName', 'areas', 'rate'],
  computed: {
    fullname() {
      return `${this.firstName} ${this.lastName}`;
    },
    coachDetailLink() {
      return this.$route.path + `/${this.id}/contact`; // coaches/t1/contact
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
