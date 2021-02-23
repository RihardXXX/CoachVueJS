<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your email</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearInput('email')"
      />
      <p v-if="!email.isValid" class="errors">
        Please input email
      </p>
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.val"
        @blur="clearInput('message')"
      ></textarea>
      <p v-if="!message.isValid" class="errors">Please input message</p>
    </div>
    <p v-if="!formIsValid" class="errors">Error, please valid form</p>
    <div class="actions">
      <base-button>send message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ContactCoach',
  data() {
    return {
      email: {
        val: '',
        isValid: true
      },
      message: {
        val: '',
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    validateForm() {
      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.val === '') {
        this.message.isValid = false;
        this.formsIsValid = false;
      }
    },
    clearInput(input) {
      this[input].isValid = true;
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }

      const newRequest = {
        email: this.email.val,
        message: this.message.val
      };
      console.log(newRequest);
      this.formIsValid = true;
      this.email.val = '';
      this.message.val = '';
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
}

.actions {
  text-align: center;
}
</style>
