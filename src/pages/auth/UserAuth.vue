<template>
  <div>
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
      {{ userId }}
    </base-card>
  </div>
</template>

<script>
import { actionsTypes } from '@/store/modules/authModule';
import { mapState } from 'vuex';

export default {
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
      mode: 'sign In'
    };
  },
  computed: {
    ...mapState({
      userId: state => state.authModule.userId
    })
  },
  methods: {
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

      if (this.mode === 'sign In') {
        console.log('sign In');
      } else if (this.mode === 'sign Up') {
        console.log('sign Up');

        // console.log(actionsTypes);
        this.$store.dispatch(actionsTypes.signUp, {
          email: this.email.value,
          password: this.password.value
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
