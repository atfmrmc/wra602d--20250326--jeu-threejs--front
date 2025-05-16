<script lang="ts" setup>
const userFromServer = {
  username: 'Alice',
}

// build your config object:
const gameConfig = reactive({
  computer: {
    diceCount: 2,
    name: 'Computer',
    offset: 3
  },
  human: {
    diceCount: 2,
    name: userFromServer.username,
    offset: -3
  },
})

initGame(gameConfig)
</script>

<template>
  <main class="game">
    <div class="game--interface--computer">
      <h2>{{ gameConfig.computer.name }}</h2>
      <button>
        Add Dice
      </button>
      <p>
        {{ gameConfig.computer.diceCount }}
      </p>
      <button>
        Remove Dice
      </button>
    </div>
    <canvas id='game-screen'></canvas>
    <div class="game--interface--human">
      <h2>
        {{ gameConfig.human.name }}
      </h2>
      <button>
        Add Dice
      </button>
      <p>
        {{ gameConfig.human.diceCount }}
      </p>
      <button>
        Remove Dice
      </button>
    </div>
  </main>
</template>

<style scoped>

</style>