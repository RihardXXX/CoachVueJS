<template>
  <section>
    <CoachFilter @change-filter="setFilter" />
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">refresh</BaseButton>
        <BaseButton link="true" :to="{ name: 'register' }"
          >register as coach</BaseButton
        >
      </div>
      <ul v-if="hasCoaches">
        <MvCoachItem
          v-for="coach in filteredCoaches"
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
import CoachFilter from '@/components/coaches/CoachFilter';

export default {
  name: 'MvCoachList',
  components: {
    MvCoachItem,
    CoachFilter
  },
  data() {
    return {
      activeFilter: {
        frontend: true,
        backend: true,
        career: true
      }
    };
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
    },
    filteredCoaches() {
      const coaches = this.coaches;

      return coaches.filter(coach => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    }
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilter = updatedFilters;
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
