<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="hasRequest">
        <RequestsItem
          v-for="request in requestsAll"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        />
      </ul>
      <div v-else-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div v-else-if="errors">
        <base-dialog
          :show="modalWindow"
          title="Error requests Coaches"
          @close="closeWindows"
          >{{ errors.message }}
        </base-dialog>
      </div>
      <h3 v-else>You haven`t received any requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import RequestsItem from '@/components/requests/RequestsItem';
import { actionsTypes } from '@/store/modules/requestsModule';

export default {
  name: 'RequestsReceive',
  components: {
    RequestsItem
  },
  data() {
    return {
      modalWindow: true
    };
  },
  methods: {
    fetchedRequest() {
      this.modalWindow = true;
      this.$store.dispatch(actionsTypes.getRequests, this.userId);
    },
    closeWindows() {
      this.modalWindow = false;
    }
  },
  created() {
    this.fetchedRequest();
  },
  computed: {
    ...mapState({
      requestsAll: state => state.requestsModule.requests,
      isLoading: state => state.requestsModule.isLoading,
      errors: state => state.requestsModule.errors,
      userId: state => state.userId
    }),
    // Filter requests for id where every coach
    // filteredRequests() {
    //   return this.requestsAll.filter(req => req.coachId === this.userId);
    // },
    hasRequest() {
      return this.requestsAll && this.requestsAll.length > 0;
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
