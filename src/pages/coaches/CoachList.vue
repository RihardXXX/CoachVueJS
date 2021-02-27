<template>
  <div>
    <section>
      <CoachFilter @change-filter="setFilter" />
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="getAllCoaches(true)"
            >refresh</BaseButton
          >
          <BaseButton link="true" :to="{ name: 'register' }" v-if="!isLoading"
            >register as coach</BaseButton
          >
        </div>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <base-dialog
          v-else-if="errors"
          :show="dialogWindow"
          title="ERROR"
          @close="handlerCloseError"
        >
          {{ errors.message + ', please try again' }}
        </base-dialog>
        <ul v-else-if="hasCoaches">
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MvCoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter';
import { actionsTypes } from '@/store/modules/coachesModule';

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
      },
      dialogWindow: true
    };
  },
  created() {
    this.getAllCoaches();
  },
  computed: {
    ...mapState({
      coaches: state => state.coachesModule.coaches,
      isLoading: state => state.coachesModule.isLoading,
      errors: state => state.coachesModule.errors
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
    },
    getAllCoaches(refresh = false) {
      this.dialogWindow = true;
      this.$store.dispatch(actionsTypes.getAllCoaches, { refresh: refresh });
    },
    handlerCloseError() {
      this.dialogWindow = false;
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
