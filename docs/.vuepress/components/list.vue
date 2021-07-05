<template>
  <div class="features">
    <div class="feature">
      <h2>Html</h2>
      <p>Html-的进阶之路.</p>
    </div>
    <div class="feature">
      <h2>Css</h2>
      <p>Css-进阶之路.</p>
    </div>
    <div class="feature">
      <h2>JavaScript</h2>
      <p>JavaScript-进阶之路.</p>
    </div>
    <div class="feature">
      <h2>Vue</h2>
      <p>Vue-进阶之路.</p>
    </div>
    <div class="feature">
      <h2>Vue3</h2>
      <p>Vue3-进阶之路.</p>
    </div>
    <div class="feature">
      <h2>TypeScript</h2>
      <p>TypeScript-进阶之路.</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.features {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  color: #2c3e50;
  border-top: 1px solid #eaecef;
  padding: 1.2rem 0;
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}
.feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;
}
.feature h2 {
    font-size: 1.4rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    color: #3a5169;
}
.feature p {
    color: #4e6e8e;
}
</style>
