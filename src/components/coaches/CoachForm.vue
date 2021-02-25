<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstname.val"
        @blur="clearInput('firstname')"
      />
      <p v-if="!firstname.isValid" class="status-message">
        Firstname is empty. please add input
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastname.val"
        @blur="clearInput('lastname')"
      />
      <p v-if="!lastname.isValid" class="status-message">
        Lastname is empty. please add input
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearInput('description')"
      ></textarea>
      <p v-if="!description.isValid" class="status-message">
        Description is empty. please add input
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearInput('rate')"
      />
      <p v-if="!rate.isValid" class="status-message">
        Rate is empty. please add input
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearInput('areas')"
        />
        <label for="frontend">Frontend Developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearInput('areas')"
        />
        <label for="backend">Backend Developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearInput('areas')"
        />
        <label for="carrer">Career consulting</label>
      </div>
      <p v-if="!areas.isValid" class="status-message">
        Areas is empty. please add input
      </p>
    </div>
    <p v-if="!formsIsValid" class="status-message">{{ messageValid }}</p>
    <button>Register Coach</button>
  </form>
</template>

<script>
export default {
  name: 'FormCoach',
  emits: ['save-data'],
  data() {
    return {
      firstname: {
        val: '',
        isValid: true
      },
      lastname: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formsIsValid: true,
      messageValid: 'Please valid form'
    };
  },
  methods: {
    clearInput(input) {
      this[input].isValid = true;
    },
    validateForm() {
      if (this.firstname.val === '') {
        this.firstname.isValid = false;
        this.formsIsValid = false;
      }
      if (this.lastname.val === '') {
        this.lastname.isValid = false;
        this.formsIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formsIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formsIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formsIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formsIsValid) {
        return;
      }

      const coachData = {
        firstName: this.firstname.val,
        lastName: this.lastname.val,
        description: this.description.val,
        hourlyRate: this.rate.val,
        areas: this.areas.val
      };

      this.$emit('save-data', coachData);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

.status-message {
  color: red;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
