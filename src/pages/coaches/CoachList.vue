<template>
  <section>
    FILTER
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <button>refresh</button>
        <router-link :to="{ name: 'register' }">register as coach</router-link>
      </div>
      <ul v-if="hasCoaches">
        <MvCoachItem
          v-for="coach in coaches"
          :key="coach.is"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        />
      </ul>
      <h3 v-else>No coaches</h3>
    </BaseCard>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import MvCoachItem from '@/components/coaches/CoachItem.vue';

export default {
  name: 'MvCoachList',
  components: {
    MvCoachItem
  },
  computed: {
    ...mapState({
      coaches: state => state.coachesModule.coaches
    }),
    nameCoaches() {
      return this.$store.getters.coachesName;
    },
    hasCoaches() {
      return this.$store.getters.hasCoaches;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
