<template>
  <div>
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
        <router-view v-slot="slotProps">
          <transition name="contact" mode="out-in">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CoachDetail',
  props: ['id'],
  data() {
    return { show: true };
  },
  methods: {
    showButtonToggle() {
      this.show = !this.show;
    }
  },
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

<style scoped>
.contact-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.contact-enter-active {
  transition: all 1s ease-out;
}

.contact-enter-to,
.contact-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.contact-leave-active {
  transition: all 1s ease-in;
}

.contact-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
