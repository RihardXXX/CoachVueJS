<template>
  <div>
    <base-dialog :show="isLoading" title="Authentication...." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <div v-if="errors">
      <base-dialog show="true" title="error" @close="closeWindow">
        <h3>Error please try again</h3>
      </base-dialog>
    </div>

    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="email.value"
            @blur="clearInput('email')"
          />
          <p v-if="!email.isValid" class="errors">please corrected email</p>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password.value"
            @blur="clearInput('password')"
          />
          <p v-if="!password.isValid" class="errors">
            please corrected password
          </p>
        </div>
        <base-button :disabled="disabled">{{ mode }}</base-button>
        <base-button
          :disabled="disabled"
          type="button"
          mode="flat"
          @click="switchAuthMode"
          >toggle SigIn or SignUp</base-button
        >
      </form>
      <div v-if="statusMessage" class="message">
        <h2>{{ message }}</h2>
        <base-button @click="closeStatusMessage" class="message"
          >close message</base-button
        >
      </div>
    </base-card>
  </div>
</template>

<script>
import { actionsTypes } from '@/store/modules/authModule';
import { mapState } from 'vuex';
import BaseDialog from '../../components/ui/BaseDialog.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';

export default {
  components: { BaseDialog, BaseSpinner },
  name: 'UserAuth',
  data() {
    return {
      email: {
        value: '',
        isValid: true
      },
      password: {
        value: '',
        isValid: true
      },
      formsIsValid: true,
      disabled: false,
      mode: 'sign In',
      statusMessage: false,
      message: '',
      errorWindows: this.errors
    };
  },
  computed: {
    ...mapState({
      userId: state => state.authModule.userId,
      errors: state => state.authModule.errors,
      isLoading: state => state.authModule.isLoading
    })
  },
  methods: {
    closeWindow() {
      this.$router.push({ name: 'coaches' });
    },
    closeStatusMessage() {
      this.statusMessage = false;
    },
    clearInput(input) {
      this[input].isValid = true;
    },
    validateForm() {
      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValid = false;
        this.formsIsValid = false;
      }
      if (this.password.value === '' || this.password.value.length < 8) {
        this.password.isValid = false;
        this.formsIsValid = false;
      }
    },
    submitForm() {
      this.formsIsValid = true;

      this.validateForm();

      if (!this.formsIsValid) {
        return;
      }

      const credentials = {
        email: this.email.value,
        password: this.password.value
      };

      if (this.mode === 'sign In') {
        console.log('sign In');

        this.$store.dispatch(actionsTypes.signIn, credentials).then(message => {
          this.statusMessage = true;
          this.message = message;
        });

        setTimeout(() => {
          this.$router.push({ name: 'coaches' });
        }, 5000);
      } else if (this.mode === 'sign Up') {
        console.log('sign Up');

        // console.log(actionsTypes);
        this.$store.dispatch(actionsTypes.signUp, credentials).then(message => {
          this.statusMessage = true;
          this.message = message;
        });
      }

      this.email.value = '';
      this.password.value = '';
    },
    switchAuthMode() {
      if (this.mode === 'sign In') {
        this.mode = 'sign Up';
      } else if (this.mode === 'sign Up') {
        this.mode = 'sign In';
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

.message {
  text-align: center;
  /* color: white; */
  margin: 0 auto;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
  text-align: center;
}

.actions {
  text-align: center;
}
</style>
