<template>
  <li>
    <h3>{{ fullname }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :title="area">{{
        area
      }}</BaseBadge>
    </div>
    <div class="actions">
      <BaseButton
        mode="outline"
        link="true"
        :to="{ name: 'coachesID', params: { id: id } }"
        >Details</BaseButton
      >
      <BaseButton link="true" :to="coachDetailLink">Contact</BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  name: 'MvCoachItem',
  props: ['id', 'firstName', 'lastName', 'areas', 'rate'],
  computed: {
    fullname() {
      return this.firstName + ' ' + this.lastName;
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
