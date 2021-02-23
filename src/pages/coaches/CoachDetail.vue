<template>
  <section>
    <BaseCard>
      <h2>{{ fullname }}</h2>
      <h3>{{ rate }} $/ hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Interested? reach out now</h2>
        <BaseButton link="true" :to="contactLink">Contact</BaseButton>
      </header>
      <router-view></router-view>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <BaseBadge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></BaseBadge>
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CoachDetail',
  props: ['id'],
  computed: {
    ...mapState({
      coachesAll: state => state.coachesModule.coaches
    }),
    selectCoaches() {
      return this.coachesAll.find(coach => coach.id === this.id);
    },
    fullname() {
      const { firstName, lastName } = this.selectCoaches;
      return firstName + ' ' + lastName;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
    rate() {
      return this.selectCoaches.hourlyRate;
    },
    areas() {
      return this.selectCoaches.areas;
    },
    description() {
      return this.selectCoaches.description;
    }
  }
};
</script>
