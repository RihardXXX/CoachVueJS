<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <p>
        This page could not be found - may be check out all our
        <router-link :to="{ name: 'coaches' }">coaches</router-link>
      </p>
    </base-card>
  </section>
</template>
