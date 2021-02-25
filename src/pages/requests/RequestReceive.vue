<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequest">
        <RequestsItem
          v-for="request in filteredRequests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        />
      </ul>
      <h3 v-else>You haven`t received any requests yet</h3>
    </base-card>
    <!-- {{ filteredRequests }} -->
  </section>
</template>

<script>
import { mapState } from 'vuex';
import RequestsItem from '@/components/requests/RequestsItem';

export default {
  name: 'RequestsReceive',
  components: {
    RequestsItem
  },
  computed: {
    ...mapState({
      requestsAll: state => state.requestsModule.requests,
      userId: state => state.userId
    }),
    // Filter requests for id where every coach
    filteredRequests() {
      return this.requestsAll.filter(req => req.coachId === this.userId);
    },
    hasRequest() {
      return this.filteredRequests && this.filteredRequests.length > 0;
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
