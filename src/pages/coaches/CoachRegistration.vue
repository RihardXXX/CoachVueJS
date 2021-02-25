<template>
  <section>
    <BaseCard>
      <h2>Register Coach</h2>
      <CoachForm @save-data="saveData" />
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm';
import { actionsTypes } from '@/store/modules/coachesModule';

export default {
  name: 'CoachRegistration',
  components: {
    CoachForm
  },
  methods: {
    saveData(data) {
      this.$store.dispatch(actionsTypes.registerCoach, data);
      this.$router.push({ name: 'coaches' });
    }
  }
};
</script>
