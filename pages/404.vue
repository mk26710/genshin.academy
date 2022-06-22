<template>
  <MainContainer :vertical-center="true">
    <div class="container mx-auto max-w-xl text-center">
      <h1 class="font-bold text-5xl mb-2">404: Not Found</h1>
      <p>You are trying to visit a non existing page :(</p>

      <div class="mt-12">
        <router-link to="/">
          <button
            class="rounded-lg bg-primary-600 hover:shadow-lg hover:shadow-primary-600/30 text-neutral-100 py-2 px-3 transition-all duration-200 ease-in-out font-bold"
          >
            Click to go home
          </button>
        </router-link>
      </div>
    </div>
  </MainContainer>
</template>
